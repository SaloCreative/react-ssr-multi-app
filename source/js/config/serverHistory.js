import createMemoryHistory from 'history/createMemoryHistory';

const isBrowser = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

let history = null;
if (!isBrowser) {
  history = createMemoryHistory();
}

export default history;