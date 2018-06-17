import { matchRoutes } from 'react-router-config';
import 'babel-polyfill';

// Server functions
import { getToken, getLocaleParams, initialPropsFetch } from '../helpers';
import RenderRedux from '../renderRedux';

// ============================== //
// ==== APP SPECIFIC IMPORTS ==== //
// ============================== //

import routesConfig from '../../apps/apollo/routes';
import App from '../../apps/apollo/routes/app/app';
import AppContainer from '../../apps/apollo/routes/app/container';

// Import builder for this apps store
import { configureAppStore } from '../../apps/apollo/config/store';
// Import the root reducer
import rootReducer from '../../apps/apollo/reducers';

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
    res, AppContainer, promises, locale, store, url: req.url, appName: 'apollo'
  });
};

export default showApp;
