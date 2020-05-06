import React, { Component } from "react";
import CartScrollBar from "./CartScrollBar";
import Counter from "./Counter";
import EmptyCart from "../empty-states/EmptyCart";
import Checkout from "./Checkout"
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { findDOMNode } from "react-dom";
import { loadStripe } from '@stripe/stripe-js';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cart: this.props.cartItems,
      mobileSearch: false
    };
  }
  handleCart(e) {
    e.preventDefault();
    this.setState({
      showCart: !this.state.showCart
    });
  }
  handleCheckout(e){
    e.preventDefault();
    alert(JSON.stringify(this.props.cartItems)+'-'+this.props.total+'-'+this.props.totalItems);
    
  }

  handleSubmit(e) {
    e.preventDefault();
  }
  handleMobileSearch(e) {
    e.preventDefault();
    this.setState({
      mobileSearch: true
    });
  }
  handleSearchNav(e) {
    e.preventDefault();
    this.setState(
      {
        mobileSearch: false
      },
      function() {
        this.refs.searchBox.value = "";
        this.props.handleMobileSearch();
      }
    );
  }
  handleClickOutside(event) {
    const cartNode = findDOMNode(this.refs.cartPreview);
    const buttonNode = findDOMNode(this.refs.cartButton);
    if (cartNode.classList.contains("active")) {
      if (!cartNode || !cartNode.contains(event.target)) {
        this.setState({
          showCart: false
        });
        event.stopPropagation();
      }
    }
  }
  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
  stripePromise = loadStripe('pk_test_KA5vtIPIYAKz0udyqvKcscJ000tu4LVzAM');

  handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      items: this.props.cartItems,
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
    });

    console.log('test');
    alert('test');
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };


 createPaymentIntent = async () => {

  console.log(JSON.stringify(this.props.cartItems));
  alert(JSON.stringify(this.props.cartItems));

  const response = await fetch('http://localhost:4244/api/v1/create-payment-intent', {
      method: "post",
      headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Accept-Charset": "utf-8"
      },
      body: `{"items": ${JSON.stringify(this.props.cartItems)}`
  });

  const messageData = await response.json();

  // the API frequently returns 201
  if ((response.status !== 200) && (response.status !== 201)) {
      console.error(`Invalid response status ${ response.status }.`);
      throw messageData;
  }

  return messageData;
}


  handleCheckout =async (event) => {
    console.log(this.createPaymentIntent());
  };
  render() {
    let cartItems;
    cartItems = this.state.cart.map(product => {
      return (
        <li className="cart-item" key={product.name}>
          <img className="product-image" src={product.image} />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">{product.quantity * product.price}</p>
          </div>
          <a
            className="product-remove"
            href="#"
            onClick={this.props.removeProduct.bind(this, product.id)}
          >
            ×
          </a>
        </li>
      );
    });
    let view;
    if (cartItems.length <= 0) {
      view = <EmptyCart />;
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="ul"
          className="cart-items"
        >
          {cartItems}
        </CSSTransitionGroup>
      );
    }
    return (
      <header>
        <div className="container">
          <div className="brand">
            <img
              className="logo"
              src="https://res.cloudinary.com/sivadass/image/upload/v1493547373/dummy-logo/Veggy.png"
              alt="Veggy Brand Logo"
            />
          </div>

          <div className="search">
            <a
              className="mobile-search"
              href="#"
              onClick={this.handleMobileSearch.bind(this)}
            >
              <img
                src="https://res.cloudinary.com/sivadass/image/upload/v1494756966/icons/search-green.png"
                alt="search"
              />
            </a>
            <form
              action="#"
              method="get"
              className={
                this.state.mobileSearch ? "search-form active" : "search-form"
              }
            >
              <a
                className="back-button"
                href="#"
                onClick={this.handleSearchNav.bind(this)}
              >
                <img
                  src="https://res.cloudinary.com/sivadass/image/upload/v1494756030/icons/back.png"
                  alt="back"
                />
              </a>
              <input
                type="search"
                ref="searchBox"
                placeholder="Search for Vegetables and Fruits"
                className="search-keyword"
                onChange={this.props.handleSearch}
              />
              <button
                className="search-button"
                type="submit"
                onClick={this.handleSubmit.bind(this)}
              />
            </form>
          </div>

          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No. of items</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalItems}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a
              className="cart-icon"
              href="#"
              onClick={this.handleCart.bind(this)}
              ref="cartButton"
            >
              <img
                className={this.props.cartBounce ? "tada" : " "}
                src="https://res.cloudinary.com/sivadass/image/upload/v1493548928/icons/bag.png"
                alt="Cart"
              />
              {this.props.totalItems ? (
                <span className="cart-count">{this.props.totalItems}</span>
              ) : (
                ""
              )}
            </a>
            <div
              className={
                this.state.showCart ? "cart-preview active" : "cart-preview"
              }
              ref="cartPreview"
            >
              <CartScrollBar>{view}</CartScrollBar>
              <div className="action-block">
                <button
                  type="button"
                  className={this.state.cart.length > 0 ? " " : "disabled"}
                  onClick={this.handleCheckout.bind(this)}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>

          <div className="card-payment" hidden>
            <form id="payment-form">
              <div id="card-element"></div>
              <button id="submit">
                <div class="spinner hidden" id="spinner"></div>
                <span id="button-text">Pay</span>
              </button>
              <p id="card-errors" role="alert"></p>
              <p class="result-message hidden">
                Payment succeeded, see the result in your
                <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to pay again.
              </p>
            </form>
          </div>
        </div>

      </header>
    );
  }
}

export default Header;
