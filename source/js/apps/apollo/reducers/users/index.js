import {
  TEST_USERS_FETCH,
  TEST_USERS_SUCCESS,
  TEST_USERS_FAILED
} from '../../actions/users/types';

const initialState = {
  data: [],
  fetching: false,
  error: false,
  last_updated: ''
};

function users(state = initialState, action) {
  switch (action.type) {
    case TEST_USERS_FETCH:
      return {
        ...state,
        fetching: true,
        error: false,
        last_updated: ''
      };

    case TEST_USERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: false,
        data: action.payload,
        last_updated: action.meta.last_updated
      };
      
    case TEST_USERS_FAILED:
      return {
        ...state,
        fetching: false,
        error: true,
        last_updated: ''
      };

    default:
      return state;
  }
}

export default users;