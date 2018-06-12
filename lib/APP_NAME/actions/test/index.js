import { CALL_API, getJSON } from '@aftonbladet/redux-api-middleware';
import { API } from '../../api';

import {
  TEST_API_FETCH,
  TEST_API_SUCCESS,
  TEST_API_FAILED
} from './types';

export const testFetch = () => ({
  [CALL_API]: {
    endpoint: API.TEST.POST,
    method: 'GET',
    types: [
      {
        type: TEST_API_FETCH
      },
      {
        type: TEST_API_SUCCESS,
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
        type: TEST_API_FAILED
      }
    ]
  }
});