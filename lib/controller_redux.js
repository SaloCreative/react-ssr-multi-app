import { matchRoutes } from 'react-router-config';
import 'babel-polyfill';

// Server functions
import { getLocaleParams, initialPropsFetch } from '../../helpers/server';
import RenderRedux from '../renderRedux';

// ============================== //
// ==== APP SPECIFIC IMPORTS ==== //
// ============================== //

import routesConfig from '../../apps/APP_NAME/routes';
import App from '../../apps/APP_NAME/routes/app/app';
import AppContainer from '../../apps/APP_NAME/routes/app/container';

// Import builder for this apps store
import { configureAppStore } from '../../apps/APP_NAME/config/store';
// Import the root reducer
import rootReducer from '../../apps/APP_NAME/reducers';

// ================================== //
// ==== APP SPECIFIC IMPORTS END ==== //
// ================================== //

const showApp = (req, res) => {
  // CREATE A STORE FOR EACH REQUEST
  const store = configureAppStore(rootReducer);
  // GET ROUTE DETAILS
  const branch = matchRoutes([{ app: App, routes: routesConfig }], req.url);

  // MATCH REQUEST LANGUAGE AND PASS PARAMS BACK
  const { locale, matchParams } = getLocaleParams(req.language, branch);

  // CHECK FOR INITIAL PROPS FETCH
  const promises = initialPropsFetch({
    branch, store, token: req.jwtToken, matchParams
  });

  // RENDER FUNCTION
  return RenderRedux({
    res, AppContainer, promises, locale, store, url: req.url, appName: 'APP_NAME', tokens: req.tokens
  });
};

export default showApp;