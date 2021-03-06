import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import "./Store.css";
// import api from "../api";

export default function CheckoutForm(props) {
  const [amount, setAmount] = useState(props.amount);
  const [currency, setCurrency] = useState(props.currency);
  const [clientSecret, setClientSecret] = useState(props.clientSecret);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // useEffect(() => {
  //   // Step 1: Fetch product details such as amount and currency from
  //   // API to make sure it can't be tampered with in the client.
  //   api.getProductDetails().then(productDetails => {
  //     setAmount(productDetails.amount / 100);
  //     setCurrency(productDetails.currency);
  //   });

  //   // Step 2: Create PaymentIntent over Stripe API
  //   api
  //     .createPaymentIntent({
  //       payment_method_types: ["card"]
  //     })
  //     .then(clientSecret => {
  //       setClientSecret(clientSecret);
  //     })
  //     .catch(err => {
  //       setError(err.message);
  //     });
  // }, []);


  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);

    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: ev.target.name.value
        }
      }
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
      console.log("[error]", payload.error);
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);
      setMetadata(payload.paymentIntent);
      console.log("[PaymentIntent]", payload.paymentIntent);
    }
  };

  const renderSuccess = (metadata) => {
    return (
      <div className="sr-field-success message">
        <pre className="sr-callout">
          <div class="status success">
            <h1>Thanks for your order!</h1>
            <h1>Payment Confirmed - Your package is on your way Home</h1>
            <p>Woot! You successfully made a payment with Stripe.</p>
            <p class="note">We just sent your receipt to your email address, 
                and your items will be on their way shortly. </p>

            </div>
          <code>{JSON.stringify(metadata, null, 2)}</code>
        </pre>
      </div>
    );
  };

  const renderForm = () => {
    const options = {
      style: {
        base: {
          color: "#32325d",
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <h1>
          {currency.toLocaleUpperCase()}{" "}
          {(amount/100).toLocaleString(navigator.language, {
            minimumFractionDigits: 2
          })}{" "}
        </h1>
        <h4>Pay Now to get the cart at your door-step by tomorrow!</h4>

        <div className="sr-combo-inputs">
          <div className="sr-combo-inputs-row">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="cardholder"
              className="sr-input"
            />
          </div>

          <div className="sr-combo-inputs-row">
            <CardElement
              className="sr-input sr-card-element"
              options={options}
            />
          </div>
        </div>

        {error && <div className="message sr-field-error">{error}</div>}

        <button
          className="btn"
          disabled={processing || !clientSecret || !stripe}
        >
          {processing ? "Processing…" : "Pay"}
        </button>
      </form>
    );
  };

  return (
    <div className="checkout-form">
      <div className="sr-payment-form">
        <div className="sr-form-row" />
        {succeeded ? renderSuccess(metadata) : renderForm()}
      </div>
    </div>
  );
}
