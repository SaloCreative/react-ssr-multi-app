import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// COMPONENTS
import Page from '../../containers/hoc/page';
import { H1, H2, Button } from '../../../../components';

// ACTIONS
import * as testActions from '../../actions/test';
import * as usersActions from '../../actions/users';
import * as alertActions from '../../actions/alerts';

class Home extends React.Component {
  componentDidMount() {
    if (!this.loadedPost()) {
      this.props.testFetch();
    }
    if (!this.loadedUsers()) {
      this.props.usersFetch();
    }
  }

  /**
   * @static getInitialProps
   * @param { object } token - passes back authtoken if present as a cookie  for use in actions;
   * @param { object } match - passes any matched params from the router back (e.g. language);
   * @param store - passes in an instance of the redux store for dispatch & reducers
   * @returns Promise - returns a promise for server render
   */
  static getInitialProps(store, match, token) {
    return Promise.all([
      store.dispatch(testActions.testFetch()),
      store.dispatch(usersActions.usersFetch())
    ]);
  }

  loadedPost() {
    const { test } = this.props;
    return !test.fetching && !test.error && Object.keys(test.data).length;
  }

  loadedUsers() {
    const { users } = this.props;
    return !users.fetching && !users.error && users.data.length;
  }

  addAlert() {
    const { addAlert } = this.props;
    const message = {
      type: 'success',
      message: 'My alert message was added',
      time: 20
    };
    addAlert(message);
  }

  renderContent() {
    const { test } = this.props;
    if (this.loadedPost()) {
      return (
        <React.Fragment>
          <H2>{ test.data.title }</H2>
          <p>{ test.data.body }</p>
        </React.Fragment>
      );
    }
    return <p>Fetching</p>;
  }

  renderUsers() {
    const { users } = this.props;
    if (this.loadedUsers()) {
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
            { users.data.map((user) => {
              return (
                <tr key={ user.id }>
                  <td>{ user.id }</td>
                  <td>{ user.name }</td>
                  <td>{ user.email }</td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      );
    }
    return <p>Fetching</p>;
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
          <Button onClick={ () => this.addAlert() } fullWidth >Add an alert</Button>
          { this.renderContent() }
          { this.renderUsers() }
        </div>
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  t: PropTypes.func.isRequired,
  testFetch: PropTypes.func.isRequired,
  usersFetch: PropTypes.func.isRequired,
  test: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  addAlert: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    test: state.test,
    users: state.users,
    systemAlerts: state.systemAlerts
  };
}

// ACTION MAP
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign(
    {},
    testActions,
    usersActions,
    alertActions
  ), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Page(translate(['common'])(Home)));