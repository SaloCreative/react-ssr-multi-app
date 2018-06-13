import { matchRoutes } from 'react-router-config';
import { isEmpty } from 'lodash';
import 'babel-polyfill';

// Server functions
import { getToken, getLocaleParams, initialPropsFetch } from '../helpers';
import RenderRedux from '../helpers/RenderRedux';

// ============================== //
// ==== APP SPECIFIC IMPORTS ==== //
// ============================== //

import routesConfig from '../../apps/dashboard/routes';
import App from '../../apps/dashboard/routes/app';
import AppContainer from '../../apps/dashboard/routes/app/container';

// Import builder for this apps store
import { configureAppStore } from '../../apps/dashboard/config/store';
// Import the root reducer
import rootReducer from '../../apps/dashboard/reducers';

// ================================== //
// ==== APP SPECIFIC IMPORTS END ==== //
// ================================== //

const showApp = (req, res) => {
  // CREATE A STORE FOR EACH REQUEST
  const store = configureAppStore(rootReducer);
  // GET ROUTE DETAILS
  const branch = matchRoutes([{ app: App, routes: routesConfig }], req.url);
  // GET REQUEST COOKIES
  const authToken = getToken(req);

  // MATCH REQUEST LANGUAGE AND PASS PARAMS BACK
  const { locale, matchParams } = getLocaleParams(req.language, branch);

  // CHECK FOR INITIAL PROPS FETCH
  const promises = initialPropsFetch({
    branch, store, token: authToken, matchParams
  });

  // RENDER FUNCTION
  return RenderRedux({
    res, AppContainer, promises, locale, store, url: req.url, appName: 'dashboard'
  });
};

export default showApp;