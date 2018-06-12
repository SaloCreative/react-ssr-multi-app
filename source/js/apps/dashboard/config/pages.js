import AppConfig from '../config';

const base = `/${ AppConfig.name }`;

export const HOME = {
  path: `${ base }/:language`
};

export const WHOOPS = {
  path: `${ base }/:language/whoops`
};

export const FOUROHFOUR = {
  path: `${ base }/:language/404`
};