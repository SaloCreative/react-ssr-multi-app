import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

// COMPONENTS
import { Consumer as AuthConsumer } from '../../auth';

// HELPERS

class AuthRoute extends React.Component {
  evaluateCanAccess(loggedIn, hasPermissions) {
    const isLoggedIn = loggedIn();
    const { notAuthenticated, authenticated, permissions } = this.props;
    // .Deal with public routes or routes requiring users to not be logged in first
    if ((notAuthenticated && !isLoggedIn) || (!notAuthenticated && !authenticated)) {
      return true;
    }
    // At this stage we know we are dealing with a route that needs login
    if (!isLoggedIn) return false; // bail if not a logged in user
    if (permissions.length) {
      return hasPermissions(permissions); // Do they have permission
    }
    return true;
  }
  render() {
    const {
      component: ComposedComponent, path, pageTitle, componentProps, exact, ignoreScrollBehavior
    } = this.props;
    return (
      <AuthConsumer>
        { ({ loggedIn, hasPermissions }) => {
          const isLoggedIn = loggedIn();
          const canAccess = this.evaluateCanAccess(isLoggedIn, hasPermissions);
          console.log(canAccess);
          return (
            <Route
              exact={ exact }
              path={ path }
              ignoreScrollBehavior={ ignoreScrollBehavior }
              render={ (props) =>
                (<ComposedComponent
                  pageTitle={ pageTitle }
                  { ...componentProps }
                  match={ props.match } // Makes sure context of THIS route is passed in
                />) }
            />
          );
      } }
      </AuthConsumer>
    );
  }
}

AuthRoute.defaultProps = {
  permissions: [],
  authenticated: true, // If false the route will allow all users to access
  notAuthenticated: false, // If true the route requires user to be not logged in
  redirect: '/404-error',
  exact: false,
  ignoreScrollBehavior: false
};

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  componentProps: PropTypes.object.isRequired,
  authenticated: PropTypes.bool,
  notAuthenticated: PropTypes.bool,
  permissions: PropTypes.array,
  redirect: PropTypes.string,
  exact: PropTypes.bool,
  ignoreScrollBehavior: PropTypes.bool
};

export default AuthRoute;