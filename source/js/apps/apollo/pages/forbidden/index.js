import React from 'react';
import { withNamespaces } from 'react-i18next';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

// COMPONENTS
import Page from '../../containers/hoc/page';

class ForbiddenRoute extends React.Component {
  render() {
    const { t } = this.props;

    return ([
      <Helmet key='helmet'>
        <title>{ t('403') }</title>
      </Helmet>,
      <div key='page' className='error-message'>
        <div className='error-message__container'>
          <h2 className='error-message__title'>{ t('FORBIDDEN_TITLE') }</h2>
          <p className='error-message__text'>{ t('FORBIDDEN_TEXT') }</p>
        </div>
      </div>
    ]);
  }
}

ForbiddenRoute.propTypes = {
  t: PropTypes.func.isRequired
};

export default Page(withNamespaces(['common'])(ForbiddenRoute));