import createHistory from 'history/createBrowserHistory';

const isBrowser = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

let history = null;
if (isBrowser) {
  history = createHistory();
}

export default history;