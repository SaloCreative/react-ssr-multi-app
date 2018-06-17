import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';
import { Query } from 'react-apollo';
import { Consumer as AlertsConsumer } from '@salocreative/alerts';

// COMPONENTS
import Page from '../../containers/hoc/page';
import { H1, H2, Button } from '../../../../components';

// QUERIES
import GET_POST from '../../queries/demo/getPost';
import GET_USERS from '../../queries/demo/getUsers';

class Home extends React.Component {
  renderContent() {
    return (
      <Query
        query={ GET_POST }
        variables={ { id: 1 } }
      >
        { ({ loading, error, data }) => {
              if (loading) return <p>Fetching</p>;
              if (error) return `${ error }`;
              return (
                <React.Fragment>
                  <H2>{ data.post.title }</H2>
                  <p>{ data.post.body }</p>
                </React.Fragment>
              );
            } }
      </Query>
    );
  }

  renderUsers() {
    return (
      <table width='100%'>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <Query
            query={ GET_USERS }
          >
            { ({ loading, error, data }) => {
            if (loading) return <tr><td colSpan={ 3 }>Fetching</td></tr>;
            if (error) return `${ error }`;
            return data.users.map((user) => (
              <tr key={ user.id }>
                <td>{ user.id }</td>
                <td>{ user.name }</td>
                <td>{ user.email }</td>
              </tr>
              ));
            } }
          </Query>
        </tbody>
      </table>
    );
  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>{ t('HOME') }</title>
        </Helmet>
        <div>
          <H1>{ t('HOME') }</H1>
          <AlertsConsumer>
            { ({ insertAlert }) => {
              return (
                <Button
                  onClick={ () => insertAlert({
                    type: 'succes',
                    message: 'My alert message was added',
                    time: 20
                  }) }
                  fullWidth
                >Add an alert
                </Button>
              );
            } }
          </AlertsConsumer>
          { this.renderContent() }
          { this.renderUsers() }
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  t: PropTypes.func.isRequired
};

export default Page(translate(['common'])(Home));