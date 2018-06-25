import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { translate, I18n } from 'react-i18next';
import styled from 'styled-components';
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

  render() {
    return (
      <AppWrapper>
        <Helmet titleTemplate='%s | Salo Creative' />
        <I18n ns={ ['common'] }>
          { (t, { i18n }) => (
            <React.Fragment>
              <Menu
                routes={ {
                  HOME,
                  AUTHENTICATED_ROUTE,
                  WHOOPS
                } }
                language={ i18n.language }
              />
              <Container>
                <AlertProvider>
                  <AlertConsumer topOffset={ 0 } />
                  { renderRoutes(this.props, routesConfig, i18n.language) }
                </AlertProvider>
              </Container>
            </React.Fragment>
        ) }
        </I18n>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  location: PropTypes.object.isRequired
};

export default translate(['common'])(App);