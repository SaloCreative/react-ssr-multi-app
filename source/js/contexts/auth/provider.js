import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, intersection } from 'lodash';
import Cookies from 'universal-cookie';

// COMPONENTS
import { Provider } from './context';

// HELPERS
import { mapCookieToState } from '../../helpers';

const cookies = new Cookies();
const cookieDomain = 'localhost';

export default class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    // MAP TOKENS TO PROPS IF AVAILABLE
    const { tokens } = props;
    let stateData = { user: {}, jwt: {} };
    if (tokens) {
      stateData = mapCookieToState({ jwt: tokens.jwt, user: tokens.user });
    }
    this.state = {
      user: stateData.user,
      jwt: stateData.jwt,
      loggedOut: false
    };
  }

  // Set user into state from tokens if we login during session
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

  login = (login) => {
    const jwt = {
      i: login.id,
      lng: login.language,
      t: login.token,
      ts: Date.now()
    };
    const user = {
      u: {
        fn: login.first_name,
        ln: login.last_name,
        avatar: ''
      },
      r: login.roles
    };
    const stateData = mapCookieToState({ jwt, user });
    this.setState({ user: stateData.user, jwt: stateData.jwt, loggedOut: false });
    cookies.set('jwt', JSON.stringify(jwt), { path: '/', domain: cookieDomain });
    cookies.set('user', JSON.stringify(user), { path: '/', domain: cookieDomain });
  }

  loggedIn = () => {
    return !isEmpty(this.state.jwt);
  }

  hasPermissions = (permissions) => {
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
  }
  
  logout = () => {
    cookies.remove('jwt', { path: '/', domain: cookieDomain });
    cookies.remove('user', { path: '/', domain: cookieDomain });
    window.location.reload();
  }

  render() {
    const { children } = this.props;
    const { user, jwt } = this.state;
    return (
      <Provider
        value={ {
          user,
          jwt,
          login: this.login,
          logout: this.logout,
          loggedIn: this.loggedIn,
          hasPermissions: this.hasPermissions
          } }
      >
        { children }
      </Provider>
    );
  }
}

AuthProvider.defaultProps = {
  tokens: null
};

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
  tokens: PropTypes.object
};