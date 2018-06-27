import AppConfig from '../config';

const base = `/:language/${ AppConfig.name }`;

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
  permissions: [1234]
};

export const FORBIDDEN = {
  path: `${ base }/403-error`,
  title: '403'
};

export const FOUROHFOUR = {
  path: `${ base }/*`,
  title: '404'
};