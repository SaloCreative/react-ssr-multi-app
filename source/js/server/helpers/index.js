import Cookies from 'universal-cookie';
import CONFIG from '../../config';

// GET USER AUTHTOKEN
export function getToken(cookies) {
  const token = {
    JWT: '',
    expire: ''
  };
  const authToken = cookies && cookies.authToken ? cookies.authToken : {};
  if (Object.keys(authToken).length > 0) {
    token.JWT = JSON.parse(authToken).token;
    token.expire = JSON.parse(authToken).token_start;
  }
  return token;
}

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