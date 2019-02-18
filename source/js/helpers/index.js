import history from '../config/browserHistory';
import serverHistory from '../config/serverHistory';

// BUILD CLIENT i18n STORE
export function buildI18nStore(appName) {
  if (window.__i18n) { // eslint-disable-line no-underscore-dangle
    return {
      [window.__i18n.locale]: { // eslint-disable-line no-underscore-dangle
        [appName]: window.__i18n.resources[appName], // eslint-disable-line no-underscore-dangle
        common: window.__i18n.resources.common // eslint-disable-line no-underscore-dangle
      }
    };
  }
  return null;
}


// CHECK IF BROWSER
export const isBrowser = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

// PERFORM SSR SAFE REDIRECT
export function ssrSafeRedirect(url) {
  if (isBrowser) {
    return history.push(url);
  }
  return serverHistory.push(url);
}

// GET NODE ENV
export const ENV = process.env.NODE_ENV;

// TOKENS
export {
  tokenFullyExpired,
  getTokensServer,
  getTokensClient,
  mapCookieToState
} from './tokens';