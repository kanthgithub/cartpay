const router = require('express').Router();
const paymentIntentController = require('../controllers/PaymentIntentController');
const productController = require('../controllers/ProductController');
const stripeWebhookHandler = require('../handlers/StripeWebhookHandler');

// Create Payment Intent api path
router.route('/create-payment-intent').post(paymentIntentController.createPaymentIntent);
router.route('/products').get(productController.products);

// Webhook handler for asynchronous events.
router.route('/webhook').post(stripeWebhookHandler.handleEvents);

module.exports = router;