import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Helmet from 'react-helmet';
import { I18nextProvider } from 'react-i18next';
import fetch from 'node-fetch';

// COMPONENTS
import getServerHtml from './serverHTML';
import Server from './server';

// HELPERS
import createi18nServerInstance from './i18n.server'; // initialised i18next instances

export default ({
  res, App, locale, url, appName
}) => {
  // CREATE i18next INSTANCE
  const i18n = createi18nServerInstance(appName);
  // HANDLE LOCALES
  const i18nServer = i18n.cloneInstance();
  i18nServer.changeLanguage(locale, () => { // call back required as change language is asyncronous
    const app = i18n.getResourceBundle(locale, appName);
    const common = i18n.getResourceBundle(locale, 'common');
    const i18nClient = {
      locale,
      resources: {
        [appName]: app,
        common
      }
    };
    // Setup ApolloClient instance for SSR fetches
    const client = new ApolloClient({
      ssrMode: true,
      link: createHttpLink({
        uri: 'http://localhost:3030/graphql',
        fetch
      }),
      cache: new InMemoryCache()
    });
    // Context is passed to the StaticRouter and it will attach data to it directly
    const context = {};
    const sheet = new ServerStyleSheet();
    const AppHtml = (
      <ApolloProvider client={ client }>
        <I18nextProvider i18n={ i18nServer }>
          <StyleSheetManager sheet={ sheet.instance }>
            <Server location={ url } context={ context } AppContainer={ App } />
          </StyleSheetManager>
        </I18nextProvider>
      </ApolloProvider>
    );

    const renderApp = (state = '') => {
      const content = ReactDOMServer.renderToString(AppHtml);
      const helmet = Helmet.renderStatic();
      const serverHtml = getServerHtml({
        appHtml: content,
        helmet,
        styles: sheet,
        i18n: i18nClient,
        state,
        appName
      });
      // Context has url, which means `<Redirect>` was rendered somewhere
      if (context.url) {
        return res.redirect(301, context.url);
      }
      // We're good, send the response
      return res.status(context.status || 200).send(serverHtml);
    };

    // Use ApolloClient to fetch data pre-render
    return getDataFromTree(AppHtml).then(() => {
      const dehydratedState = client.extract();
      const state = JSON.stringify(dehydratedState).replace(/</g, '\\u003c');
      renderApp(state);
    }).catch(() => {
      // IF GraphQL errors render without state
      renderApp();
    });
  });
};