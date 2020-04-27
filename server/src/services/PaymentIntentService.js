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
    createPaymentIntent: async (cart) => {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount: PaymentIntentService.calculateOrderAmount(cart.items),
          currency: cart.currency
        });

        return paymentIntent;
      },


    calculateOrderAmount : items => {
      console.log(JSON.stringify(items));
      return items.reduce((a, b) => a + (b.price || 0), 0);
    }
};

module.exports = PaymentIntentService;