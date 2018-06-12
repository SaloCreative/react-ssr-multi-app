import { createStore, applyMiddleware, compose } from 'redux';
import 'babel-polyfill';
import thunk from 'redux-thunk';
import { apiMiddleware } from '@aftonbladet/redux-api-middleware';

import logger from '../dev/logger';
import { ENV } from '../helpers';

const isProduction = ENV !== 'development';

let INIT_STATE = null;

try {
  INIT_STATE = __SALO_CREATIVE_DEHYDRATED_STATE; // eslint-disable-line no-undef
} catch (e) {
  console.log('Salo Creative: No dehydrated state'); // eslint-disable-line no-console
}

if (typeof INIT_STATE === 'string') {
  INIT_STATE = JSON.parse(INIT_STATE);
}

const buildStore = (rootReducer) => {
  let store = null;
  let middleware = null;

  if (isProduction) {
    // In production avoid dev tools
    middleware = applyMiddleware(thunk, apiMiddleware);
  } else {
    if (!process.env.SERVER_RENDER) {
      // In development logger and DevTools are added
      middleware = applyMiddleware(thunk, apiMiddleware, logger);
    } else {
      // On server no logger
      middleware = applyMiddleware(thunk, apiMiddleware);
    }

    // Enable DevTools if browser extension is installed
    if (!process.env.SERVER_RENDER && window.__REDUX_DEVTOOLS_EXTENSION__) { // eslint-disable-line
      middleware = compose(
        middleware,
        // DevTools.instrument(),
        window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
      );
    }
  }

  // Add dehydrated state if any
  if (INIT_STATE) {
    // Remove if you are not using server rendering
    store = createStore(
      rootReducer,
      INIT_STATE,
      middleware
    );
  } else {
    store = createStore(
      rootReducer,
      middleware
    );
  }

  return store;
};

export default buildStore;