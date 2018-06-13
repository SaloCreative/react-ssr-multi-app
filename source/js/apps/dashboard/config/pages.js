import AppConfig from '../config';

const base = `/:language/${ AppConfig.name }`;

export const HOME = {
  path: `${ base }/`
};

export const WHOOPS = {
  path: `${ base }/whoops`
};

export const FOUROHFOUR = {
  path: `${ base }/*`
};