import Home from '../pages/home';
import NotFound from '../pages/notFound';
import Whoops from '../pages/whoops';
import AuthenticatedRoute from '../pages/authenticated';

import { HOME, WHOOPS, FOUROHFOUR, AUTHENTICATED_ROUTE } from '../config/pages';

const routesConfig = [
  {
    exact: true,
    component: Home,
    authenticated: false,
    ...HOME
  },
  {
    exact: true,
    component: Whoops,
    authenticated: false,
    ...WHOOPS
  },
  {
    exact: true,
    component: AuthenticatedRoute,
    ...AUTHENTICATED_ROUTE
  },
  {
    exact: true,
    component: NotFound,
    authenticated: false,
    ...FOUROHFOUR
  }
];

export default routesConfig;