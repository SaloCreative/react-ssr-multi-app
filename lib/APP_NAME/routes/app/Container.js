import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../../routes/app';

function mapStateToProps(state) {
  return {
    systemAlerts: state.systemAlerts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;