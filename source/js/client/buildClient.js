import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import Cookies from 'universal-cookie';
import 'isomorphic-fetch';

// COMPONENTS
import { AuthProvider } from '../contexts/auth';

// HELPERS
import { ENV, getTokensClient } from '../helpers';

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

  const cookies = new Cookies();
  const tokens = getTokensClient(cookies);

  return ReactDOM.hydrate(
    <ApolloProvider client={ apollo }>
      <AuthProvider tokens={ tokens }>
        <Client />
      </AuthProvider>
    </ApolloProvider>,
    document.getElementById('root')
  );
};

const buildClient = (params) => renderApp(params);

export default buildClient;