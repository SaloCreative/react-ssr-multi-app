import React from 'react';
import { Helmet } from 'react-helmet';

// COMPONENTS
import Page from '../../containers/hoc/page';
import { H1 } from '../../../../components';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{ 'T => HOME' }</title>
        </Helmet>
        <div>
          <H1>{ 'T => HOME' }</H1>
          This is the homepage
        </div>
      </React.Fragment>
    );
  }
}

export default Page(Home);