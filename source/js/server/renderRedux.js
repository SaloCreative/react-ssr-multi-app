import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { I18nextProvider } from 'react-i18next';
import createi18nServerInstance from './i18n.server'; // initialised i18next instances

// COMPONENTS
import getServerHtml from './serverHTML';
import Server from './server';
import { AuthProvider } from '../auth';

export default ({
  res, AppContainer, promises, locale, store, url, appName, tokens
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
    // Context is passed to the StaticRouter and it will attach data to it directly
    const context = {};
    const sheet = new ServerStyleSheet();
    const AppHtml = (
      <Provider store={ store }>
        <AuthProvider tokens={ tokens }>
          <I18nextProvider i18n={ i18nServer }>
            <StyleSheetManager sheet={ sheet.instance }>
              <Server location={ url } context={ context } AppContainer={ AppContainer } />
            </StyleSheetManager>
          </I18nextProvider>
        </AuthProvider>
      </Provider>
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

    // RETURN RENDERED RESULT WHEN PROMISES RESOLVE
    return Promise.all(promises).then(() => {
      const dehydratedState = JSON.stringify(store.getState());
      renderApp(dehydratedState);
    });
  });
};