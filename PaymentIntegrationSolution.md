# Approach for Solution and Assumptions:

Payment for the Cart-Items are made via Stripe-API
Stripe API's PaymentIntent is used to get idempotency rule
Payment is a 2 step process:
Step-1: Generate PaymentIntentId via CreatePaymentIntent API endpoint
Step-2: Confirm Payment with Card details, client-secret from PaymentIntent generated in Step-1

## Why do we need PaymentIntent and What does Idempotency has gotta do here?

<b>Idempotency</b> as per wikipedia:

1. Payment should be made only once
 - Even in case of repeated payment attempts by  the customer or merchant

2. 

## Create Payment Intent - Request JSON:

```js

```

## Payment Intent Response - Sample:

```js
{
  "id": "pi_1GgyxcEW3J4f9S340KMTuMhC",
  "object": "payment_intent",
  "amount": 3456,
  "canceled_at": null,
  "cancellation_reason": null,
  "capture_method": "automatic",
  "client_secret": "pi_1GgyxcEW3J4f9S340KMTuMhC_secret_EXp1ar76RAjcl9xv0XmXnU6wy",
  "confirmation_method": "automatic",
  "created": 1589054868,
  "currency": "sgd",
  "description": null,
  "last_payment_error": null,
  "livemode": false,
  "next_action": null,
  "payment_method": "pm_1GgyyTEW3J4f9S34UEwpDNmJ",
  "payment_method_types": [
    "card"
  ],
  "receipt_email": null,
  "setup_future_usage": null,
  "shipping": null,
  "source": null,
  "status": "succeeded"
}
```