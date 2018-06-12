import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { I18nextProvider } from 'react-i18next';
import createi18nServerInstance from '../i18n.server'; // initialised i18next instances
import getServerHtml from '../../config/server-html';
import Server from '../../components/app/server';

export default ({
  res, AppContainer, promises, locale, store, url, appName
}) => {
  // CREATE i18next INSTANCE
  const i18n = createi18nServerInstance(appName);
  // HANDLE LOCALES
  const i18nServer = i18n.cloneInstance();
  i18nServer.changeLanguage(locale, () => { // call back required as change language is asyncronous
    const resources = i18n.getResourceBundle(locale, appName);
    const i18nClient = { locale, resources };

    // RETURN RENDERED RESULT WHEN PROMISES RESOLVE
    return Promise.all(promises).then(() => {
      // Dehydrates the state
      const dehydratedState = JSON.stringify(store.getState());
      // Context is passed to the StaticRouter and it will attach data to it directly
      const context = {};
      const sheet = new ServerStyleSheet();
      const appHtml = ReactDOMServer.renderToString( // eslint-disable-line
        <I18nextProvider i18n={ i18nServer }>
          <Provider store={ store }>
            <StyleSheetManager sheet={ sheet.instance }>
              <Server location={ url } context={ context } AppContainer={ AppContainer } />
            </StyleSheetManager>
          </Provider>
        </I18nextProvider>
      ); // eslint-disable-line
      const helmet = Helmet.renderStatic();
      const serverHtml = getServerHtml(appHtml, dehydratedState, helmet, sheet, i18nClient, appName);

      // Context has url, which means `<Redirect>` was rendered somewhere
      if (context.url) {
        return res.redirect(302, context.url);
      }
      // We're good, send the response
      return res.status(context.status || 200).send(serverHtml);
    });
  });
};