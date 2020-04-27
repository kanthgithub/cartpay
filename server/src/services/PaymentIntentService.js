const responseDataUtil = require('../util/ResponseDataUtil');

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