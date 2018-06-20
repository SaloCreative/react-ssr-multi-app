import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, intersection } from 'lodash';
import Cookies from 'universal-cookie';

// COMPONENTS
import { Provider } from './index';

// HELPERS
import { mapCookieToState } from '../helpers/tokens';

const cookies = new Cookies();
const cookieDomain = 'localhost';

export default class AuthProvider extends React.Component {
  constructor() {
    super();
    this.login = () => {
      const jwt = {
        i: 3,
        lng: 'en',
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
      const stateData = mapCookieToState({ jwt, user });
      this.setState({ user: stateData.user, jwt: stateData.jwt, loggedOut: false });
      cookies.set('jwt', JSON.stringify(jwt), { path: '/', domain: cookieDomain });
      cookies.set('user', JSON.stringify(user), { path: '/', domain: cookieDomain });
    };
    this.loggedIn = () => {
      return !isEmpty(this.state.jwt);
    };
    this.hasPermissions = (permissions) => {
      // First check the user is logged in
      if (!isEmpty(this.state.jwt)) {
        if (permissions && permissions.length) {
          const userPermissions = this.state.jwt.roles || [];
          const match = intersection(userPermissions, permissions);
          return match && !!match.length;
        }
        return true;
      }
      return false;
    };
    this.logout = () => {
      this.setState({ user: {}, jwt: {}, loggedOut: true });
      cookies.remove('jwt', { path: '/', domain: cookieDomain });
      cookies.remove('user', { path: '/', domain: cookieDomain });
    };
    this.state = {
      user: {},
      jwt: {},
      loggedOut: false,
      login: this.login,
      logout: this.logout,
      loggedIn: this.loggedIn,
      hasPermissions: this.hasPermissions
    };
  }

  // Set user into state from tokens
  static getDerivedStateFromProps(nextProps, prevState) {
    const { user, jwt, loggedOut } = prevState;
    const { tokens } = nextProps;
    if ((isEmpty(user) || isEmpty(jwt)) && tokens && !loggedOut) {
      const stateData = mapCookieToState({ jwt: tokens.jwt, user: tokens.user });
      return {
        user: stateData.user,
        jwt: stateData.jwt
      };
    }
    return null;
  }

  render() {
    const { children } = this.props;
    const {
      user, jwt, login, logout, loggedIn, hasPermissions
    } = this.state;
    return (
      <Provider
        value={ {
          user, jwt, login, logout, loggedIn, hasPermissions
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