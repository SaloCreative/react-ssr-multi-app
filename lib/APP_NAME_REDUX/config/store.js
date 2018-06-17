// Build store function
import buildStore from '../../../store/buildReduxStore';

// Import the root reducer
import rootReducer from '../reducers';

export const configureAppStore = (reducer) => {
  const store = buildStore(reducer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default; // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

const store = configureAppStore(rootReducer);
export default store;