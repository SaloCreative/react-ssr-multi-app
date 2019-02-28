import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

// COMPONENTS
import Page from '../../containers/hoc/page';
import { H1, Button, AuthWrapper } from '../../../../components';
import { AuthConsumer } from '../../../../contexts/auth';

const mockUser = {
  id: '1234',
  first_name: 'Rich',
  last_name: 'Comber',
  language: 'en',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  roles: [1, 2, 3, 4]
};

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>{ 'T => HOME' }</title>
        </Helmet>
        <div>
          <H1>{ 'T => HOME' }</H1>
          <AuthConsumer>
            { ({ login, logout }) => {
            return (
              <React.Fragment>
                <AuthWrapper authenticated={ false }>
                  <Button
                    onClick={ () => login(mockUser) }
                    fullWidth
                  >Login
                  </Button>
                </AuthWrapper>
                <AuthWrapper>
                  <Button
                    onClick={ () => logout() }
                    fullWidth
                  >Logout
                  </Button>
                </AuthWrapper>
              </React.Fragment>
            );
          } }
          </AuthConsumer>
        </div>
      </React.Fragment>
    );
  }
}

export default Page(Home);