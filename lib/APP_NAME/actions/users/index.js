import { CALL_API, getJSON } from '@aftonbladet/redux-api-middleware';
import { API } from '../../api';

import {
  TEST_USERS_FETCH,
  TEST_USERS_SUCCESS,
  TEST_USERS_FAILED
} from './types';

export const usersFetch = () => ({
  [CALL_API]: {
    endpoint: API.TEST.USERS,
    method: 'GET',
    types: [
      {
        type: TEST_USERS_FETCH
      },
      {
        type: TEST_USERS_SUCCESS,
        payload: (action, state, res) => {
          return getJSON(res).then((json) => {
            return json;
          });
        },
        meta: {
          last_updated: Date.now()
        }
      },
      {
        type: TEST_USERS_FAILED
      }
    ]
  }
});