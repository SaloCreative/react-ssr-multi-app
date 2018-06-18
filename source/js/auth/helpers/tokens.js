import { isEmpty } from 'lodash';

// TOKEN FULLY EXPIRED
export function tokenFullyExpired(expiry, time = 172800) {
  if (!expiry) return false;
  const timeDiff = Math.round((Date.now() - expiry) / 1000);
  return timeDiff >= time;
}

// GET USER TOKENS SERVER
export function getTokensServer(cookies) {
  let tokens = null;
  const jwt = cookies && cookies.jwt ? cookies.jwt : {};
  const user = cookies && cookies.user ? cookies.user : {};
  if (!isEmpty(jwt) && !isEmpty(user)) {
    tokens = {
      jwt: JSON.parse(jwt),
      user: JSON.parse(user)
    };
  }
  return tokens;
}

// GET USER TOKENS CLIENT
export function getTokensClient(cookies) {
  let tokens = null;
  const jwt = cookies.get('jwt');
  const user = cookies.get('user');
  if (!isEmpty(jwt) && !isEmpty(user)) {
    tokens = {
      jwt,
      user
    };
  }
  return tokens;
}