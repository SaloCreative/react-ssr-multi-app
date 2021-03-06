import { matchRoutes } from 'react-router-config';

// Server functions
import { getLocaleParams } from '../../helpers/server';
import Render from '../render';

// ============================== //
// ==== APP SPECIFIC IMPORTS ==== //
// ============================== //

import routesConfig from '../../apps/apollo/routes';
import App from '../../apps/apollo/routes/app/app';

// ================================== //
// ==== APP SPECIFIC IMPORTS END ==== //
// ================================== //

const showApp = (req, res) => {
  // GET ROUTE DETAILS
  const branch = matchRoutes([{ app: App, routes: routesConfig }], req.url);

  // MATCH REQUEST LANGUAGE AND PASS PARAMS BACK
  const { locale } = getLocaleParams(req.language, branch);

  // RENDER FUNCTION
  return Render({
    res, App, locale, url: req.url, appName: 'apollo', tokens: req.tokens
  });
};

export default showApp;