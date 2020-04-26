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
        const { items } = request.body;
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = paymentIntentService.createPaymentIntent(items);
        
        response.send({
          clientSecret: paymentIntent.client_secret
        });
      },
};

module.exports = PaymentIntentController;
