const paymentIntentService = require('../services/PaymentIntentService');
const responseDataUtil = require('../util/ResponseDataUtil');

const PaymentIntentController = {

    /**
     * Create a new paymentIntent.
     * @param request
     * @param response
     * @returns {Promise<PaymentIntentResponse>}
     */
    createPaymentIntent: async (request, response) => {
        const cart = request.body;
        console.log('paymentIntent Request Body: ',cart);
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await paymentIntentService.createPaymentIntent(cart);
        console.log('paymentIntent: '+JSON.stringify(paymentIntent));
        /*response.send({
          clientSecret: paymentIntent.client_secret
        });*/
        response.send(paymentIntent);
      },
};

module.exports = PaymentIntentController;
