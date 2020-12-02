import React from 'react';
import PropTypes from 'prop-types';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredients';

const Burger = props => {
  const { ingredients } = props;

  const transformedIngredients = Object.keys(ingredients)
    .map(ingKey => [...Array(ingredients[ingKey])]
      .map((_, i) => <BurgerIngredient key={ingKey + i} type={ingKey} />));

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

Burger.propTypes = {
  ingredients: PropTypes.shape({ root: PropTypes.string.isRequired }).isRequired,
};

export default Burger;
