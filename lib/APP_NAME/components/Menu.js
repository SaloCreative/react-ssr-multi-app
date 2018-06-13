import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-i18next';

// COMPONENTS
import Logo from '../../../../assets/img/logo-full.png';

// HELPERS
import { HOME, WHOOPS } from '../config/pages';
import Appconfig from '../config';

class Menu extends Component {
  render() {
    const { match, t } = this.props;
    const language = match.params.language ? match.params.language : 'en';
    return (
      <div className='Menu'>
        <div className='Menu-logo'>
          <img
            src={ Logo }
            alt='Salo Creative logo'
          />
        </div>
        <div className='Menu-links'>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            exact
            to={ HOME.path.replace(':language', language) }
          >
            { t('HOME') }
          </NavLink>
          <NavLink
            activeClassName='Menu-link--active'
            className='Menu-link'
            to={ WHOOPS.path.replace(':language', language) }
          >
            { t('404') }
          </NavLink>
        </div>
      </div>
    );
  }
}

Menu.propTypes = {
  match: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default translate([Appconfig.name])(Menu);