import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { loadStripe } from '@stripe/stripe-js';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cart: this.props.cartItems,
      mobileSearch: false
    };
  }

 createPaymentIntent = async e => {
    e.preventDefault();
    const response = await fetch('http://localhost:4244/api/v1/paymentIntent', {
        method: "post",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
        },
        body: JSON.stringify(this.props.cartItems)
    });

    const messageData = await response.json();

    // the API frequently returns 201
    if ((response.status !== 200) && (response.status !== 201)) {
        console.error(`Invalid response status ${ response.status }.`);
        throw messageData;
    }

    return messageData;
 }

 confirmPayment = async e => {
    e.preventDefault(); // Stops the page from reloading!
  
    try {
      const {
        error,
        paymentIntent: { status }
      } = await stripe.confirmCardPayment(paymentIntent.client_secret);
  
      if (error) throw new Error(error.message);
  
      if (status === "succeeded") {
        alert('Payment made!')
      }
    } catch (err) {
      alert(err.message);
    }
  }
}

export default Checkout;
