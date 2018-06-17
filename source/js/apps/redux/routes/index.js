import Home from '../pages/home';
import NotFound from '../pages/notFound';
import Whoops from '../pages/whoops';

import { HOME, WHOOPS, FOUROHFOUR } from '../config/pages';

const routesConfig = [
  {
    exact: true,
    component: Home,
    ...HOME
  },
  {
    exact: true,
    component: Whoops,
    ...WHOOPS
  },
  {
    exact: true,
    component: NotFound,
    ...FOUROHFOUR
  }
];

export default routesConfig;