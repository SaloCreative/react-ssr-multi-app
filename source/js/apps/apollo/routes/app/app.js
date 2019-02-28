import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

// COMPONENTS
import Normalise from '../../../../components/app/normalise';
import GlobalStyles from '../../../../components/app/globals';

// HELPERS
import renderRoutes from '../../../../components/app/renderRoutes';
import routesConfig from '../index';

const AppWrapper = styled.div`
  font-size: 1.8rem;
  padding: 0 0 0 24rem;
`;

class App extends React.Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return (
      <AppWrapper>
        <Normalise />
        <GlobalStyles />
        <Helmet titleTemplate='%s | Salo Creative' />
        { renderRoutes(this.props, routesConfig, 'en') }
      </AppWrapper>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default App;