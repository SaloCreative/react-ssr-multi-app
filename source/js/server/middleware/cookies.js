import Cookies from 'universal-cookie';

import { getToken } from '../helpers';
import { tokenFullyExpired } from '../../helpers';

// ==================== //
// DECODE USERS COOKIES //
// ==================== //
export const handleCookies = (req, res, next) => {
// GET REQUEST COOKIES
  const cookies = new Cookies(req.headers.cookie);

  // GET JWT TOKEN & USER TOKEN
  let jwtToken = getToken(cookies);

  // GET RID OF EXPIRED TOKENS
  if (jwtToken && jwtToken.expire && tokenFullyExpired(jwtToken.expire)) {
    res.clearCookie('jwt');
    jwtToken = {}; // Blank values used later
  }

  // CHECK IF TOKEN NEEDS REFRESHING
  // if (jwtToken && jwtToken.expire && !tokenFullyExpired(jwtToken.expire) && tokenExpired(jwtToken.expire)) {
  //   // TODO: ADD TOKEN REFRESH
  //   console.log('Refresh cookie');
  // }

  // SET TO req so we can access in the app
  req.jwtToken = jwtToken;
  next();
};