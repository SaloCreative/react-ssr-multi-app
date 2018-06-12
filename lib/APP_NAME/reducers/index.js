import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { systemAlerts } from '@salocreative/react-redux-alerts';

export default combineReducers({
  systemAlerts,
  routing: routerReducer
});