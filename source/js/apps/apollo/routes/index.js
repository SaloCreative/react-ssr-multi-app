import Home from '../pages/home';
import NotFound from '../pages/notFound';
import Whoops from '../pages/whoops';

import { HOME, WHOOPS, FOUROHFOUR } from '../config/pages';

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
    exact: false,
    component: NotFound,
    authenticated: false,
    ...FOUROHFOUR
  }
];

export default routesConfig;