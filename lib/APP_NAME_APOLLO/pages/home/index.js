import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';

// COMPONENTS
import Page from '../../containers/hoc/page';
import { H1 } from '../../../../components';

class Home extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{ t('HOME') }</title>
        </Helmet>
        <div>
          <H1>{ t('HOME') }</H1>
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  t: PropTypes.func.isRequired
};

export default Page(translate(['common'])(Home));