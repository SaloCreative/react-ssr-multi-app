import { matchRoutes } from 'react-router-config';
import { isEmpty } from 'lodash';
import 'babel-polyfill';

// Server functions
import { getToken, getLocaleParams, initialPropsFetch } from '../helpers';
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
    res, AppContainer, promises, locale, store, url: req.url, appName: 'APP_NAME'
  });
};

export default showApp;