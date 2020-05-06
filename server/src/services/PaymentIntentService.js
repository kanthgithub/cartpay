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
        console.log(JSON.stringify(paymentIntent));
        return paymentIntent;
      },


    calculateOrderAmount : items => {
      console.log(`items for reduce: ${items}`)
      return items.reduce((a, item) => {
        return a + (item.price || 0) * (item.quantity || 0);
      }, 0);      
    }
};

module.exports = PaymentIntentService;