const responseDataUtil = require('../util/ResponseDataUtil');

// This is a sample test API key. Sign in to see examples pre-filled with your key.
//const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
// This is a sample test API key. Sign in to see examples pre-filled with your key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PaymentIntentService = {

    /**
     * Create a new paymentIntent.
     * @param request
     * @param response
     * @returns {PaymentIntentResponse}
     */
    createPaymentIntent: async (items) => {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount: calculateOrderAmount(items),
          currency: "usd"
        });

        return paymentIntent;
      },


    calculateOrderAmount : items => {
      // Replace this constant with a calculation of the order's amount
      // Calculate the order total on the server to prevent
      // people from directly manipulating the amount on the client
      return 1400;
    }

}