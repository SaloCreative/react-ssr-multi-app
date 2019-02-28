import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import 'isomorphic-fetch';

// HELPERS
import { ENV } from '../helpers';

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

  return ReactDOM.hydrate(
    <ApolloProvider client={ apollo }>
      <Client />
    </ApolloProvider>,
    document.getElementById('root')
  );
};

const buildClient = (params) => renderApp(params);

export default buildClient;