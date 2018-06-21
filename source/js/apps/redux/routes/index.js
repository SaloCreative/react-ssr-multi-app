import Home from '../pages/home';
import NotFound from '../pages/notFound';
import Whoops from '../pages/whoops';
import AuthenticatedRoute from '../pages/authenticated';
import ForbiddenRoute from '../pages/forbidden';

import { HOME, WHOOPS, FOUROHFOUR, AUTHENTICATED_ROUTE, FORBIDDEN } from '../config/pages';

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
    redirect: FORBIDDEN.path,
    ...AUTHENTICATED_ROUTE
  },
  {
    exact: true,
    component: ForbiddenRoute,
    ...FORBIDDEN
  },
  {
    exact: true,
    component: NotFound,
    authenticated: false,
    ...FOUROHFOUR
  }
];

export default routesConfig;