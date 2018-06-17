import { ADD_ALERT } from '@salocreative/react-redux-alerts';

function setAlert(alert) {
  return {
    type: ADD_ALERT,
    payload: {
      message: alert
    }
  };
}

export function addAlert(alert) {
  return (dispatch) => {
    dispatch(setAlert(alert));
  };
}