import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredientName: name,
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredientName: name,
});

export const setIngredient = ingredient => ({
  type: actionTypes.SET_INGREDEINTS,
  ingredients: ingredient,
});

export const fetchIngredientsFailed = () => ({
  type: actionTypes.FETCH_INGREDINTS_FAILED,
});

export const initIngredient = () => dispatch => {
  axios.get('https://burger-builder-6833f-default-rtdb.firebaseio.com/ingredients.json')
    .then(response => {
      dispatch(setIngredient(response.data));
    })
    .catch(error => {
      dispatch(fetchIngredientsFailed());
    });
};
