import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  orderId: id,
  orderData,
});

export const purchaseBurgerFail = error => ({
  type: actionTypes.PURCHASE_BURGER_FAIL,
  error,
});

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START,
});

export const purchaseBurger = orderData => dispatch => {
  dispatch(purchaseBurgerStart());
  axios.post('/orders.json', orderData)
    .then(response => {
      console.log(response.data);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch(error => {
      dispatch(purchaseBurgerFail(error));
    });
};

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT,
});

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetchOrdersFail = error => ({
  type: actionTypes.FETCH_ORDERS_FAIL,
  error,
});

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START,
});

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrdersStart());
  axios.get('/orders.json')
    .then(res => {
      const fetchedOrders = [];
      for (const key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key,
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch(err => {
      dispatch(fetchOrdersFail(err));
    });
};
