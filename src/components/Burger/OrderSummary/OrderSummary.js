import React from 'react';

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingKey => (
      <li key={ingKey}>
        <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>
        :
        {' '}
        {props.ingredients[ingKey]}
      </li>
    ));

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the followint ingredents:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout</p>
    </>
  );
};

export default OrderSummary;
