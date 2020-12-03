import React from 'react';
import PropTypes from 'prop-types';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const Burger = props => {
  const { ingredients } = props;

  let transformedIngredients = Object.keys(ingredients)
    .map(ingKey => [...Array(ingredients[ingKey])]
      .map((_, i) => <BurgerIngredient key={ingKey + i} type={ingKey} />))
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Burger;
