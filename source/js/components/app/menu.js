import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';
import styled from 'styled-components';

// COMPONENTS
import { Sidebar, Logo } from '../index';

const NavItem = styled(NavLink)`
  text-decoration: none;
  display: block;
  padding: 10px 0;
  &.active {
    color: #000
  }
`;

class Menu extends React.Component {
  render() {
    const { t, routes, language } = this.props;
    return (
      <Sidebar width={ 240 } padding='4rem'>
        <Logo
          width={ 140 }
          padding='0 0 20px'
          link={ { url: routes.HOME.path.replace(':language', language), target: '_self' } }
        />
        <NavItem
          activeClassName='active'
          exact
          className='header-font'
          to={ routes.HOME.path.replace(':language', language) }
        >
          { t(routes.HOME.title) }
        </NavItem>
        <NavItem
          activeClassName='active'
          exact
          className='header-font'
          to={ routes.AUTHENTICATED_ROUTE.path.replace(':language', language) }
        >
          { t(routes.AUTHENTICATED_ROUTE.title) }
        </NavItem>
        <NavItem
          activeClassName='active'
          exact
          className='header-font'
          to={ routes.WHOOPS.path.replace(':language', language) }
        >
          { t(routes.WHOOPS.title) }
        </NavItem>
        <NavItem
          activeClassName='active'
          exact
          className='header-font'
          to={ `${ routes.HOME.path.replace(':language', language) }/404` }
        >
          { t('404') }
        </NavItem>
      </Sidebar>
    );
  }
}

Menu.propTypes = {
  routes: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces(['common'])(Menu);