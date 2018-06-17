import history from '../config/browserHistory';
import serverHistory from '../config/serverHistory';

// BUILD CLIENT i18n STORE
export function buildI18nStore(appName) {
  if (window.__i18n) {
    return {
      [window.__i18n.locale]: {
        [appName]: window.__i18n.resources[appName],
        common: window.__i18n.resources.common
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

// TOKEN FULLY EXPIRED
export function tokenFullyExpired(expiry, time = 172800) {
  if (!expiry) return false;
  const timeDiff = Math.round((Date.now() - expiry) / 1000);
  return timeDiff >= time;
}