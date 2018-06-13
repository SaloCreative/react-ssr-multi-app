import history from '../config/browserHistory';
import serverHistory from '../config/serverHistory';

export const isBrowser = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

export function ssrSafeRedirect(url) {
  if (isBrowser) {
    return history.push(url);
  }
  return serverHistory.push(url);
}

export const ENV = process.env.NODE_ENV;