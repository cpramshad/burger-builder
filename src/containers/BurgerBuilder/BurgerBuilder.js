import React, { Component } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
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

    updatePurchaseState(ingredients) {
      const sum = Object.keys(ingredients)
        .map(igKey => ingredients[igKey])
        .reduce((sum, el) => sum + el, 0);
      return sum > 0;
    }

    purchaseHandler = () => {
      if (this.props.isAuthenticated) {
        this.setState({ purchasing: true });
      } else {
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
      }
    }

    purchaseCancelHandler = () => {
      this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
      this.props.onInitPurchase();
      this.props.history.push('/checkout');
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
              isAuth={this.props.isAuthenticated}
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
  ings: state.burgerBuilder.ingredients,
  price: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
  onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
  onInitIngredients: () => dispatch(actions.initIngredients()),
  onInitPurchase: () => dispatch(actions.purchaseInit()),
  onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
