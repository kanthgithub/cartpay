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
        let totalAmount = PaymentIntentService.calculateOrderAmount(cart.items).toFixed(2);
        let totalAmountRounded = Math.round((totalAmount) * 100) ;
        console.log(`totalAmountRounded: ${totalAmountRounded}`);
        const paymentIntent = await stripe.paymentIntents.create({
          amount: totalAmountRounded,
          currency: cart.currency,
          payment_method_types: ['card'],
        });
        console.log("paymentIntent response =",paymentIntent);
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