import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';
import history from '../../config/browserHistory';

export default class Client extends React.Component {
  render() {
    const { AppContainer } = this.props;
    return (
      <Router history={ history }>
        <LastLocationProvider>
          <Route component={ AppContainer } />
        </LastLocationProvider>
      </Router>
    );
  }
}

Client.propTypes = {
  AppContainer: PropTypes.func.isRequired
};