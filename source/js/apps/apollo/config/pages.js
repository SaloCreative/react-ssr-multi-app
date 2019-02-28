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

export const FOUROHFOUR = {
  path: `${ base }/*`,
  title: '404'
};