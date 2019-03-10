import React from 'react';
import { get } from 'lodash';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import Helmet from 'react-helmet';
import { I18nextProvider } from 'react-i18next';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

// COMPONENTS
import getServerHtml from './serverHTML';
import Server from './server';
import { AuthProvider } from '../contexts/auth';
import FiveHundred from '../../assets/pages/500.html';

// HELPERS
import { ENV } from '../helpers';
import CONFIG from '../config';
import createi18nServerInstance from './i18n.server'; // initialised i18next instances

function getI18n({ locale, appName }) {
  return new Promise((resolve) => {
    const i18n = createi18nServerInstance(appName);
    i18n.changeLanguage(locale, () => { // changeLanguage is asyncronous
      const app = i18n.getResourceBundle(locale, appName);
      const common = i18n.getResourceBundle(locale, 'common');
      const i18nData = {
        locale,
        resources: {
          [appName]: app,
          common
        }
      };
      resolve({ i18n, i18nData });
    });
  });
}

function getApolloClient({ tokens }) {
  // Setup ApolloClient instance for SSR fetches
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const JWT = get(tokens, 'jwt.t', '');

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: JWT ? `Bearer ${ JWT }` : ''
      }
    };
  });

  const httpLink = createHttpLink({
    uri: CONFIG.GraphQLUrl,
    fetch
  });

  return new ApolloClient({
    ssrMode: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}

async function getApolloData({ AppHtml, client }) {
  // Use ApolloClient to fetch data pre-render
  try {
    const content = await renderToStringWithData(AppHtml);
    const dehydratedApolloState = client.extract();
    return {
      content,
      state: JSON.stringify(dehydratedApolloState).replace(/</g, '\\u003c')
    };
  } catch (error) {
    console.error('Error in getApolloData', error.graphQLErrors || error);
    return { state: '{}', content: '', error: error.graphQLErrors || error };
  }
}

function renderReact(AppHtml) {
  try {
    return {
      html: AppHtml
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
      return { html: '', error };
    }
    throw error;
  }
}

export default async ({
  res, App, locale, url, appName, tokens
}) => {
  const { i18n, i18nData } = await getI18n({ locale, appName });
  const apolloClient = getApolloClient({ tokens });

  // Context is passed to the StaticRouter and it will attach data to it directly
  const context = {};

  // Styled components SSR render
  const sheet = new ServerStyleSheet();
  const AppHtml = (
    <ApolloProvider client={ apolloClient }>
      <AuthProvider tokens={ tokens }>
        <I18nextProvider i18n={ i18n }>
          <StyleSheetManager sheet={ sheet.instance }>
            <Server location={ url } context={ context } AppContainer={ App } />
          </StyleSheetManager>
        </I18nextProvider>
      </AuthProvider>
    </ApolloProvider>
  );

  const apolloState = await getApolloData({ AppHtml, client: apolloClient });
  try {
    const appHtml = renderReact(apolloState.content);
    // Context has url, which means `<Redirect>` was rendered somewhere
    if (context.url) {
      return res.redirect(302, context.url);
    }
    if (url.includes(':language')) {
      return res.redirect(302, url.replace(':language', locale));
    }

    const helmet = Helmet.renderStatic();
    const serverHtml = getServerHtml({
      appHtml,
      helmet,
      styles: sheet,
      i18n: i18nData,
      apolloState,
      appName
    });

    // We're good, send the response
    return res.status(context.status || 200).send(serverHtml);
  } catch (e) {
    return res.status(500).send(FiveHundred);
  }
};