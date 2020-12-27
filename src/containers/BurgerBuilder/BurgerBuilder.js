import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
      purchasing: false,
    }

    componentDidMount() {
      this.props.onInitIngredients();
    }

    purchaseHandler = () => {
      this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => { this.props.history.push('/checkout'); }

    updatePurchaseState(ingredients) {
      const sum = Object.keys(ingredients)
        .map(igKey => ingredients[igKey])
        .reduce((sum, el) => sum + el, 0);
      return sum > 0;
    }

    render() {
      const disabledInfo = {
        ...this.props.ings,
      };
      for (const key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
      let orderSummary = null;
      let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

      if (this.props.ings) {
        burger = (
          <>
            <Burger ingredients={this.props.ings} />
            <BuildControls
              ingredientAdded={this.props.onIngredientAdded}
              ingredientRemoved={this.props.onIngredientRemoved}
              disabled={disabledInfo}
              purchasable={this.updatePurchaseState(this.props.ings)}
              ordered={this.purchaseHandler}
              price={this.props.price}
            />
          </>
        );
        orderSummary = (
          <OrderSummary
            ingredients={this.props.ings}
            price={this.props.price}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
          />
        );
      }
      // {salad: true, meat: false, ...}
      return (
        <>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
        </>
      );
    }
}

const mapStateToProps = state => ({
  ings: state.ingredients,
  price: state.totalPrice,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch(burgerBuilderActions.addIngredient(ingName)),
  onIngredientRemoved: ingName => dispatch(burgerBuilderActions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(burgerBuilderActions.initIngredient()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
