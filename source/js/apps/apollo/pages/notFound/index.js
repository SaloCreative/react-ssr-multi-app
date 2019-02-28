import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// COMPONENTS
import Page from '../../containers/hoc/page';

class NotFound extends React.Component {
  render() {

    return ([
      <Helmet key='helmet'>
        <title>{ 'T => 404' }</title>
      </Helmet>,
      <div key='page' className='error-message'>
        <div className='error-message__container'>
          <h2 className='error-message__title'>{ 'T => ERROR_TITLE' }</h2>
          <p className='error-message__text'>{ 'T => ERROR_TEXT' }</p>
        </div>
      </div>
    ]);
  }
}

export default Page(NotFound);