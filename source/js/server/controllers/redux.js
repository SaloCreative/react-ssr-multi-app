import { matchRoutes } from 'react-router-config';

// Server functions
import { getLocaleParams, initialPropsFetch } from '../../helpers/server';
import RenderRedux from '../renderRedux';

// ============================== //
// ==== APP SPECIFIC IMPORTS ==== //
// ============================== //

import routesConfig from '../../apps/redux/routes';
import App from '../../apps/redux/routes/app/app';
import AppContainer from '../../apps/redux/routes/app/container';

// Import builder for this apps store
import { configureAppStore } from '../../apps/redux/config/store';
// Import the root reducer
import rootReducer from '../../apps/redux/reducers';

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
    branch, store, tokens: req.tokens, matchParams
  });

  // RENDER FUNCTION
  return RenderRedux({
    res, AppContainer, promises, locale, store, url: req.url, appName: 'redux', tokens: req.tokens
  });
};

export default showApp;