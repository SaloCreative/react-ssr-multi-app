import { matchRoutes } from 'react-router-config';
import 'babel-polyfill';

// Server functions
import { getLocaleParams } from '../../helpers/server';
import RenderApollo from '../renderApollo';

// ============================== //
// ==== APP SPECIFIC IMPORTS ==== //
// ============================== //

import routesConfig from '../../apps/APP_NAME/routes';
import App from '../../apps/APP_NAME/routes/app/app';

// ================================== //
// ==== APP SPECIFIC IMPORTS END ==== //
// ================================== //

const showApp = (req, res) => {
  // GET ROUTE DETAILS
  const branch = matchRoutes([{ app: App, routes: routesConfig }], req.url);

  // MATCH REQUEST LANGUAGE AND PASS PARAMS BACK
  const { locale } = getLocaleParams(req.language, branch);

  // RENDER FUNCTION
  return RenderApollo({
    res, App, locale, url: req.url, appName: 'APP_NAME', tokens: req.tokens
  });
};

export default showApp;