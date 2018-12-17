import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { I18nextProvider } from 'react-i18next'; // as we build ourself via webpack
import { ApolloProvider } from 'react-apollo';
import Cookies from 'universal-cookie';
import 'isomorphic-fetch';

// COMPONENTS
import { AuthProvider, getTokensClient } from '../auth';

// HELPERS
import createi18nInstance from './i18n'; // initialised i18next instances
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

const renderApp = ({
  appName, Client, apollo
}) => {
  // Don't render if the page URL is for a different app (eg: npm start of multi app structure)
  if (ENV === 'development') {
    const urlAppName = window.location.pathname.replace(/^\/+/g, '').split('/')[1]; // offset to account for language param
    if (urlAppName !== appName) {
      return null;
    }
  }

  // Create i18n instance
  const i18n = createi18nInstance(appName);
  const locale = window.__i18n ? window.__i18n.locale : 'en'; // eslint-disable-line

  const cookies = new Cookies();
  const tokens = getTokensClient(cookies);

  return ReactDOM.hydrate(
    <ApolloProvider client={ apollo }>
      <AuthProvider tokens={ tokens }>
        <AppContainer warnings={ false }>
          <I18nextProvider
            i18n={ i18n }
            initialI18nStore={ buildI18nStore(appName) }
            initialLanguage={ locale }
          >
            <Client />
          </I18nextProvider>
        </AppContainer>
      </AuthProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );
};

const buildClient = (params) => renderApp(params);

export default buildClient;