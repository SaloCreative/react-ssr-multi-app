import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Alerts } from '@salocreative/react-redux-alerts';
import { translate } from 'react-i18next';

// COMPONENTS
import Menu from '../../components/menu';

// HELPERS
import renderRoutes from '../../../../helpers/renderRoutes';
import routesConfig from '../index';
import Appconfig from '../../config';

class App extends React.Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { match, systemAlerts } = this.props;
    return (
      <div className='App'>
        <Helmet titleTemplate='%s | Salo Creative' />
        <Menu match={ match } />
        <div className='Page'>
          <Alerts alerts={ systemAlerts } />
          { renderRoutes(this.props, routesConfig) }
        </div>
      </div>
    );
  }
}

App.propTypes = {
  match: PropTypes.object.isRequired,
  systemAlerts: PropTypes.array.isRequired
};

export default translate([Appconfig.name])(App);