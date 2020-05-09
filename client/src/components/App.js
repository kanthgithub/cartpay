import React, { Component } from 'react';
import axios from "axios";
import Header from "./Header";
import Products from "./Products";
import Footer from "./Footer";
import QuickView from "./QuickView";
import CheckoutForm from './CheckoutForm';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import "../scss/style.scss";

const stripePromise = loadStripe('pk_test_KA5vtIPIYAKz0udyqvKcscJ000tu4LVzAM');

class App extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 1,
      quickViewProduct: {},
      modalActive: false,
      readyToPay: false,
      checkoutPayload: {
        amount: 0,
        currency: '',
        clientSecret: ''
      },
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.checkout = this.checkout.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  // Fetch Initial Set of Products from external API
  getProducts() {
    let url =
      "http://localhost:4244/api/v1/products";
    axios.get(url).then(response => {
      this.setState({
        products: response.data
      });
    });
  }
  componentWillMount() {
    this.getProducts();
  }

  // Search by Keyword
  handleSearch(event) {
    this.setState({ term: event.target.value });
  }
  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({ term: "" });
  }
  // Filter by Category
  handleCategory(event) {
    this.setState({ category: event.target.value });
    console.log(this.state.category);
  }
  // Add to Cart
  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      console.log("hi");
      let index = cartItem.findIndex(x => x.id == productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function () {
        this.setState({
          cartBounce: false,
          quantity: 1
        });
        console.log(this.state.quantity);
        console.log(this.state.cart);
      }.bind(this),
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }
  handleRemoveProduct(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id == id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }
  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function (item) {
      return item.id === productID;
    });
  }

  handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      items: this.state.cart,
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };


  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    });
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    });
  }

  //Reset Quantity
  updateQuantity(qty) {
    console.log("quantity added...");
    this.setState({
      quantity: qty
    });
  }

  //checkout cart
  checkout() {
    console.log("cart items: " + this.state.cart);
    alert("cart items: " + this.state.cart);
  }

  // Open Modal
  openModal(product) {
    this.setState({
      quickViewProduct: product,
      modalActive: true
    });
  }
  // Close Modal
  closeModal() {
    this.setState({
      modalActive: false
    });
  }


  
  render() {
    const  processPayload = (payload) => {
      if(payload.clientSecret != '' && payload.currency !== '') {
      this.setState({checkoutPayload:payload, readyToPay: true})     
      }
    }
    return (
      <Elements stripe={stripePromise}>
      <div className="container">
        {this.state.readyToPay ? <CheckoutForm amount={this.state.checkoutPayload.amount} currency={this.state.checkoutPayload.currency} clientSecret={this.state.checkoutPayload.clientSecret}/> :
          <div>
            <Header
              cartBounce={this.state.cartBounce}
              total={this.state.totalAmount}
              totalItems={this.state.totalItems}
              cartItems={this.state.cart}
              removeProduct={this.handleRemoveProduct}
              handleSearch={this.handleSearch}
              handleMobileSearch={this.handleMobileSearch}
              handleCategory={this.handleCategory}
              categoryTerm={this.state.category}
              updateQuantity={this.updateQuantity}
              productQuantity={this.state.moq}
              returnPayload={processPayload}
            />
            <Products
              productsList={this.state.products}
              searchTerm={this.state.term}
              addToCart={this.handleAddToCart}
              productQuantity={this.state.quantity}
              updateQuantity={this.updateQuantity}
              openModal={this.openModal}
            />
            <Footer />
            <QuickView
              product={this.state.quickViewProduct}
              openModal={this.state.modalActive}
              closeModal={this.closeModal}
            />
          </div>}


      </div>
      </Elements>
    );
  }
}

export default App