import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next'; // as we build ourself via webpack
import { ApolloProvider } from 'react-apollo';
import Cookies from 'universal-cookie';
import 'isomorphic-fetch';

// COMPONENTS
import { AuthProvider } from '../contexts/auth';

// HELPERS
import createi18nInstance from './i18n'; // initialised i18next instances
import { ENV, buildI18nStore, getTokensClient } from '../helpers';

// Load SCSS
import '../../scss/app.scss';

// Defined by webpack.
const version = webpackVars.VERSION; // eslint-disable-line no-undef

// Ensure latest version.
if (localStorage) {
  if (version !== localStorage.getItem('version')) {
    localStorage.clear();
    try {
      localStorage.setItem('version', version);
    } catch (e) {
      console && console.log('could not set version into localStorage'); // eslint-disable-line
    }
  }
}

const renderApp = ({ appName, apollo, Client }) => {
  // Force no render for npm start of multi app structure
  let RENDER = true;
  if (ENV === 'development') {
    RENDER = window.location.pathname.replace(/^\/+/g, '').split('/')[1] === appName; // offset to account for language param
  }
  if (!RENDER && appName !== 'dashboard') return null;

  // Create i18n instance
  const i18n = createi18nInstance(appName);
  const locale = window.__i18n ? window.__i18n.locale : 'en'; // eslint-disable-line
  
  const cookies = new Cookies();
  const tokens = getTokensClient(cookies);

  return ReactDOM.hydrate(
    <ApolloProvider client={ apollo }>
      <AuthProvider tokens={ tokens }>
        <I18nextProvider
          i18n={ i18n }
          initialI18nStore={ buildI18nStore(appName) }
          initialLanguage={ locale }
        >
          <Client />
        </I18nextProvider>
      </AuthProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );
};

const buildClient = (params) => renderApp(params);

export default buildClient;