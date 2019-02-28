import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// COMPONENTS
import Page from '../../containers/hoc/page';

class AuthenticatedRoute extends React.Component {
  render() {
    return ([
      <Helmet key='helmet'>
        <title>{ 'T => AUTHENTICATED_ROUTE' }</title>
      </Helmet>,
      <div key='page' className='error-message'>
        <div className='error-message__container'>
          <h2 className='error-message__title'>{ 'T => AUTHENTICATED_TITLE' }</h2>
          <p className='error-message__text'>{ 'T => AUTHENTICATED_TEXT' }</p>
        </div>
      </div>
    ]);
  }
}

export default Page(AuthenticatedRoute);