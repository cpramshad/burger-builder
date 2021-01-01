import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  idToken: idToken,
  userId: userId,
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const auth = (email, password, isSignup) => dispatch => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrvlAPT4JugPSTmd4HYkLkP9KmUR60MXU';
  if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrvlAPT4JugPSTmd4HYkLkP9KmUR60MXU';
  }
  axios.post(url, authData)
    .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
    })
    .catch(error => {
      console.log(error);
      dispatch(authFail(error));
    });
};
