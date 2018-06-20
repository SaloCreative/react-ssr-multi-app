import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-i18next';
import styled from 'styled-components';
import { map } from 'lodash';
import { AlertProvider, AlertConsumer } from '@salocreative/alerts';

// COMPONENTS
import { Container, Sidebar, Logo } from '../../../../components';

// HELPERS
import renderRoutes from '../../../../components/app/renderRoutes';
import routesConfig from '../index';
import { HOME, WHOOPS, AUTHENTICATED_ROUTE } from '../../config/pages';

const AppWrapper = styled.div`
  font-size: 1.8rem;
  padding: 0 0 0 24rem;
`;

const NavItem = styled(NavLink)`
  text-decoration: none;
  display: block;
  padding: 10px 0;
  &.active {
    color: #000
  }
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
    const { match, t } = this.props;
    const language = match.params.language ? match.params.language : 'en';
    return (
      <AppWrapper>
        <Helmet titleTemplate='%s | Salo Creative' />
        <Sidebar width={ 240 } padding='4rem'>
          <Logo
            width={ 140 }
            padding='0 0 20px'
            link={ { url: HOME.path.replace(':language', language), target: '_self' } }
          />
          <NavItem
            activeClassName='active'
            exact
            className='header-font'
            to={ HOME.path.replace(':language', language) }
          >
            { t(HOME.title) }
          </NavItem>
          <NavItem
            activeClassName='active'
            exact
            className='header-font'
            to={ AUTHENTICATED_ROUTE.path.replace(':language', language) }
          >
            { t(AUTHENTICATED_ROUTE.title) }
          </NavItem>
          <NavItem
            activeClassName='active'
            exact
            className='header-font'
            to={ WHOOPS.path.replace(':language', language) }
          >
            { t(WHOOPS.title) }
          </NavItem>
          <NavItem
            activeClassName='active'
            exact
            className='header-font'
            to={ `${ HOME.path.replace(':language', language) }/404` }
          >
            { t('404') }
          </NavItem>
        </Sidebar>
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
  clearAlert: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default translate(['common'])(App);