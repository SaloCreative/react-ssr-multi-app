import React from 'react';
import { translate } from 'react-i18next';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// COMPONENTS
import Page from '../../containers/hoc/page';

class AuthenticatedRoute extends React.Component {
  render() {
    const { t } = this.props;

    return ([
      <Helmet key='helmet'>
        <title>{ t('AUTHENTICATED_ROUTE') }</title>
      </Helmet>,
      <div key='page' className='error-message'>
        <div className='error-message__container'>
          <h2 className='error-message__title'>{ t('AUTHENTICATED_TITLE') }</h2>
          <p className='error-message__text'>{ t('AUTHENTICATED_TEXT') }</p>
        </div>
      </div>
    ]);
  }
}

AuthenticatedRoute.propTypes = {
  t: PropTypes.func.isRequired
};

export default Page(translate(['common'])(AuthenticatedRoute));