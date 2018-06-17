import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next'; // as we build ourself via webpack
import { Provider } from 'react-redux';
import 'babel-polyfill';
import 'isomorphic-fetch';

import createi18nInstance from '../i18n'; // initialised i18next instances
import { ENV, buildI18nStore } from '../helpers';

// Load SCSS
import '../../scss/app.scss';

// Defined by webpack.
const version = VERSION;

// Ensure latest version.
if (localStorage) {
  if (version !== localStorage.getItem('version')) {
    localStorage.clear();
    try {
      localStorage.setItem('version', version);
    } catch (e) {
      console && console.log('could not set version into localStorage');
    }
  }
}

const renderApp = (appName, store, Client) => {
  // Force no render for npm start of multi app structure
  let RENDER = true;
  if (ENV === 'development') {
    RENDER = window.location.pathname.replace(/^\/+/g, '').split('/')[0] === appName;
  }
  if (!RENDER) return null;

  // Create i18n instance
  const i18n = createi18nInstance(appName);

  return ReactDOM.hydrate(
    <Provider store={ store }>
      <AppContainer warnings={ false }>
        <I18nextProvider
          i18n={ i18n }
          initialI18nStore={ buildI18nStore(appName) }
          initialLanguage={ window.__i18n ? window.__i18n.locale : '' }
        >
          <Client />
        </I18nextProvider>
      </AppContainer>
    </Provider>,
    document.getElementById('root')
  );
};

const buildClient = (appName, store, Client) => {
  return renderApp(appName, store, Client);
};

export default buildClient;