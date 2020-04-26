const router = require('express').Router();
const paymentIntentController = require('../controllers/PaymentIntentController');
const stripeWebhookHandler = require('../handlers/StripeWebhookHandler');

// Create Payment Intent api path
router.route('/create-payment-intent').post(paymentIntentController.createPaymentIntent);

// Webhook handler for asynchronous events.
router.route('/webhook').post(stripeWebhookHandler.handleEvents);

module.exports = router;