import AppConfig from '../config';

const base = `/${ AppConfig.name }/:language`;

export const HOME = {
  path: `${ base }`,
  title: 'HOME'
};

export const WHOOPS = {
  path: `${ base }/whoops`,
  title: 'WHOOPS'
};

export const AUTHENTICATED_ROUTE = {
  path: `${ base }/authenticated-route`,
  title: 'AUTHENTICATED_ROUTE',
  permissions: [1, 2, 3]
};

export const FOUROHFOUR = {
  path: `${ base }/*`,
  title: '404'
};