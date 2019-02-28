import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// COMPONENTS
import Page from '../../containers/hoc/page';

class NotFound extends React.Component {
  render() {
    return ([
      <Helmet key='helmet'>
        <title>{ 'T => WHOOPS' }</title>
      </Helmet>,
      <div key='page' className='error-message'>
        <div className='error-message__container'>
          <h2 className='error-message__title'>{ 'T => WHOOPS_TITLE' }</h2>
          <p className='error-message__text'>{ 'T => WHOOPS_TEXT' }</p>
        </div>
      </div>
    ]);
  }
}

NotFound.propTypes = {
};

export default Page(NotFound);