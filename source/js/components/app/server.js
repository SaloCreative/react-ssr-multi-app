import React from 'react';
import PropTypes from 'prop-types';
import { StaticRouter, Route } from 'react-router-dom';

const Server = ({ location, context, AppContainer }) => (
  <StaticRouter location={ location } context={ context }>
    <Route component={ AppContainer } />
  </StaticRouter>
);

Server.propTypes = {
  location: PropTypes.string,
  context: PropTypes.object,
  AppContainer: PropTypes.func
};

export default Server;