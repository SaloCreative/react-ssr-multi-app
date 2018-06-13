import AppConfig from '../config';

const base = `/${ AppConfig.name }/:language`;

export const HOME = {
  path: `${ base }`
};

export const WHOOPS = {
  path: `${ base }/whoops`
};

export const FOUROHFOUR = {
  path: `${ base }/*`
};