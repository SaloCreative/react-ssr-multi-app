import CONFIG from '../config';

// CHECK LOCALE & PARAMS
export const getLocaleParams = (lang, branch) => {
  let locale = lang;
  let matchParams;
  branch.forEach(({ match }) => {
    if (match && match.params && Object.keys(match.params).length > 0) {
      if (match.params.language && CONFIG.languages.indexOf(match.params.language) !== -1) {
        locale = match.params.language;
      }
      matchParams = match.params;
    }
  });
  return { locale, matchParams };
};

// CHECK FOR INITIAL PROPS FETCH
export const initialPropsFetch = ({
  branch, store, token, matchParams
}) => {
  return branch.map(({ route }) => {
    if (route.component && route.component.getInitialProps && route.path !== '*') {
      const { getInitialProps } = route.component;
      if (getInitialProps instanceof Function && matchParams) {
        return getInitialProps(store, matchParams, token);
      }
    }
    return Promise.resolve(null);
  });
};