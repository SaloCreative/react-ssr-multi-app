import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { alertActionCreators } from '@salocreative/react-redux-alerts';

import App from './app';

function mapStateToProps(state) {
  return {
    systemAlerts: state.systemAlerts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...alertActionCreators }, dispatch);
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;