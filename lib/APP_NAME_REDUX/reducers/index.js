import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { systemAlerts } from '@salocreative/react-redux-alerts';
import test from './test';
import users from './users';

const rootReducer = combineReducers({
  test,
  users,
  systemAlerts,
  routing: routerReducer
});

export default rootReducer;