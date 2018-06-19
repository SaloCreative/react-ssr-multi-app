import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

// COMPONENT
import { Consumer as AuthConsumer } from '../context';

class AuthWrapper extends React.Component {
  render() {
    const { children, isLoggedIn } = this.props;
    return (
      <AuthConsumer>
        { ({ jwt }) => {
          if ((!isEmpty(jwt) && isLoggedIn) || (isEmpty(jwt) && !isLoggedIn)) {
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
  isLoggedIn: true
};

AuthWrapper.propTypes = {
  children: PropTypes.any.isRequired,
  isLoggedIn: PropTypes.bool
};

export default AuthWrapper;