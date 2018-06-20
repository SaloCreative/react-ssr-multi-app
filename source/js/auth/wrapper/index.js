import React from 'react';
import PropTypes from 'prop-types';

// COMPONENT
import { Consumer as AuthConsumer } from '../context';

class AuthWrapper extends React.Component {
  render() {
    const { children, authenticated } = this.props;
    return (
      <AuthConsumer>
        { ({ loggedIn }) => {
          const isLoggedIn = loggedIn();
          if ((isLoggedIn && authenticated) || (!isLoggedIn && !authenticated)) {
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
  authenticated: true
};

AuthWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  authenticated: PropTypes.bool
};

export default AuthWrapper;