import {
  TEST_API_FETCH,
  TEST_API_SUCCESS,
  TEST_API_FAILED
} from '../../actions/test/types';

const initialState = {
  data: {},
  fetching: false,
  error: false,
  last_updated: ''
};

function test(state = initialState, action) {
  switch (action.type) {
    case TEST_API_FETCH:
      return {
        ...state,
        fetching: true,
        error: false,
        last_updated: ''
      };

    case TEST_API_SUCCESS:
      return {
        ...state,
        fetching: false,
        error: false,
        data: action.payload,
        last_updated: action.meta.last_updated
      };
      
    case TEST_API_FAILED:
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

export default test;