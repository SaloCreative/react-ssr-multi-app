import React from 'react';
import PropTypes from 'prop-types';

// COMPONENT
import { Consumer as AuthConsumer } from '../context';

class AuthWrapper extends React.Component {
  render() {
    const { children, authenticated, permissions } = this.props;
    return (
      <AuthConsumer>
        { ({ loggedIn, hasPermissions }) => {
          const isLoggedIn = loggedIn(); // Is the user logged in
          let allowedAccess = (isLoggedIn && authenticated) || (!isLoggedIn && !authenticated); // Can they access
          if (allowedAccess && authenticated && permissions.length) {
            allowedAccess = hasPermissions(permissions); // Do they have permission
          }
          if (allowedAccess) {
            return (
              <React.Fragment>
                { children }
              </React.Fragment>
            );
          }
          return null;
      } }
      </AuthConsumer>
    );
  }
}

AuthWrapper.defaultProps = {
  authenticated: true,
  permissions: []
};

AuthWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  permissions: PropTypes.any.isRequired,
  authenticated: PropTypes.bool
};

export default AuthWrapper;