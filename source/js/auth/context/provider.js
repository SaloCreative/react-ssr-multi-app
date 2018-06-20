import React from 'react';
import PropTypes from 'prop-types';
import { map, union, isEmpty } from 'lodash';
import Cookies from 'universal-cookie';

// COMPONENTS
import { Provider } from './index';

const cookies = new Cookies();
const cookieDomain = 'localhost';

export default class AuthProvider extends React.Component {
  constructor() {
    super();
    this.login = () => {
      const jwt = {
        i: 3,
        lg: 'en',
        t: 'jwt.token.io',
        ts: Date.now()
      };
      const user = {
        u: {
          fn: 'Rich',
          ln: 'Comber',
          avatar: 'https://image.com/image.jpg'
        },
        r: [1, 2, 3, 4, 5]
      };
      this.setState({ user, jwt, loggedOut: false });
      cookies.set('jwt', JSON.stringify(jwt), { path: '/', domain: cookieDomain });
      cookies.set('user', JSON.stringify(user), { path: '/', domain: cookieDomain });
    };
    this.loggedIn = (jwt) => {
      console.log(this.state);
      return !isEmpty(this.state.jwt);
    };
    this.logout = () => {
      this.setState({ user: {}, jwt: {}, loggedOut: true });
      cookies.remove('jwt', { path: '/', domain: cookieDomain });
      cookies.remove('user', { path: '/', domain: cookieDomain });
    };
    this.state = {
      user: {},
      jwt: {},
      login: this.login,
      logout: this.logout,
      loggedIn: this.loggedIn,
      loggedOut: false
    };
  }

  // Set user into state from tokens
  static getDerivedStateFromProps(nextProps, prevState) {
    const { user, jwt, loggedOut } = prevState;
    const { tokens } = nextProps;
    if ((isEmpty(user) || isEmpty(jwt)) && tokens && !loggedOut) {
      const userObj = {
        id: tokens.jwt.i,
        firstName: tokens.user.u.fn,
        lastName: tokens.user.u.ln,
        avatar: tokens.user.u.av,
        language: tokens.jwt.lg
      };
      const jwtObj = {
        token: tokens.jwt.t,
        token_start: tokens.jwt.ts
      };
      return {
        user: userObj,
        jwt: jwtObj
      };
    }
    return null;
  }

  render() {
    const { children } = this.props;
    const {
      user, jwt, login, logout, loggedIn
    } = this.state;
    return (
      <Provider
        value={ {
          user, jwt, login, logout, loggedIn
          } }
      >
        { children }
      </Provider>
    );
  }
}

AuthProvider.defaultProps = {
  token: null
};

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
  tokens: PropTypes.object
};