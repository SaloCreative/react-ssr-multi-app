import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import { map } from 'lodash';
import { AlertProvider, AlertConsumer } from '@salocreative/alerts';

// COMPONENTS
import { Container } from '../../../../components';
import Menu from '../../../../components/app/menu';

// HELPERS
import renderRoutes from '../../../../components/app/renderRoutes';
import routesConfig from '../index';
import { HOME, WHOOPS, AUTHENTICATED_ROUTE } from '../../config/pages';

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

  removeOriginalAlerts(alerts) {
    const { clearAlert } = this.props;
    alerts.forEach(alert => {
      clearAlert(alert);
    });
  }

  transformAlerts() {
    const { systemAlerts } = this.props;
    return map(systemAlerts, alert => {
      return {
        id: alert.id,
        ...alert.alert
      };
    });
  }

  render() {
    const { match } = this.props;
    const language = match.params.language ? match.params.language : 'en';
    return (
      <AppWrapper>
        <Helmet titleTemplate='%s | Salo Creative' />
        <Menu
          routes={ {
              HOME,
              AUTHENTICATED_ROUTE,
              WHOOPS
            } }
          language={ language }
        />
        <Container>
          <AlertProvider alerts={ this.transformAlerts() } alertsMerged={ (alerts) => this.removeOriginalAlerts(alerts) }>
            <AlertConsumer />
            { renderRoutes(this.props, routesConfig) }
          </AlertProvider>
        </Container>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  systemAlerts: PropTypes.array.isRequired,
  clearAlert: PropTypes.func.isRequired
};

export default translate(['common'])(App);