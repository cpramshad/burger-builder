import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = authData => ({
  type: actionTypes.AUTH_SUCCESS,
  authData,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (email, password) => dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrvlAPT4JugPSTmd4HYkLkP9KmUR60MXU', authData)
    .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data));
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error));
    });
};
