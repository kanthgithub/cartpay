# Approach for Solution and Assumptions:

Payment for the Cart-Items are made via Stripe-API
Stripe API's PaymentIntent is used to get idempotency rule
Payment is a 2 step process:
Step-1: Generate PaymentIntentId via CreatePaymentIntent API endpoint
Step-2: Confirm Payment with Card details, client-secret from PaymentIntent generated in Step-1

## Why do we need PaymentIntent and What does Idempotency has gotta do here?

<b>Idempotency</b>

1. Payment should be made only once
 - Even in case of repeated payment attempts by  the customer or merchant

2. Payment Idempotency can be achieved by IdempotentRequest API or PaymentIntent API

3. The improvement achieved by PaymentIntent is that :

    - PaymentIntent is creating charges in the background without the need of creating charge explicitly. 
    - PaymentIntent could only create one successful charge thus itself ensure there will be no double charge issue. 


## Create Payment Intent - Request JSON:

 - Request POST body

  ```js
  {
    "amount": "3456",
    "currency": "SGD",
    "payment_method_types": {
      "0": "card"
    }
  }
  ```

## Payment Intent Response - Sample:

```js
{
  "id": "pi_1GhFvIEW3J4f9S34tfPq3KN9",
  "object": "payment_intent",
  "amount": 544,
  "amount_capturable": 0,
  "amount_received": 0,
  "application": null,
  "application_fee_amount": null,
  "canceled_at": null,
  "cancellation_reason": null,
  "capture_method": "automatic",
  "charges": {
    "object": "list",
    "data": [
    ],
    "has_more": false,
    "total_count": 0,
    "url": "/v1/charges?payment_intent=pi_1GhFvIEW3J4f9S34tfPq3KN9"
  },
  "client_secret": "pi_1GhFvIEW3J4f9S34tfPq3KN9_secret_pn0ZgVQgPKqaGaQzZhoqtlGW7",
  "confirmation_method": "automatic",
  "created": 1589120072,
  "currency": "sgd",
  "customer": null,
  "description": null,
  "invoice": null,
  "last_payment_error": null,
  "livemode": false,
  "metadata": {
  },
  "next_action": null,
  "on_behalf_of": null,
  "payment_method": null,
  "payment_method_options": {
    "card": {
      "installments": null,
      "request_three_d_secure": "automatic"
    }
  },
  "payment_method_types": [
    "card"
  ],
  "receipt_email": null,
  "review": null,
  "setup_future_usage": null,
  "shipping": null,
  "source": null,
  "statement_descriptor": null,
  "statement_descriptor_suffix": null,
  "status": "requires_payment_method",
  "transfer_data": null,
  "transfer_group": null
}
```

## Confirm Card Payment - Request JSON:

 - Payment Confirmation - POST Request:

    ```js
      {
        "payment_method_data": {
          "type": "card",
          "billing_details": {
            "name": "lakshmi kanth",
            "address": {
              "postal_code": "11111"
            }
          },
          "card": {
            "number": "************4242",
            "cvc": "***",
            "exp_month": "04",
            "exp_year": "24"
          },
          "guid": "4f1ba959-0c19-42e0-8926-d16f0c8cc226",
          "muid": "9cdd3042-dd48-466b-b4f7-a44a74c34f2d",
          "sid": "af69dc12-5bc0-45c7-a9b7-61b7fab5d1cc",
          "payment_user_agent": "stripe.js/f3eb3f08; stripe-js-v3/f3eb3f08",
          "time_on_page": "14518",
          "referrer": "http://localhost:8015/"
        },
        "expected_payment_method_type": "card",
        "use_stripe_sdk": "true",
        "key": "pk_test_KA****************************VzAM",
        "client_secret": "************************************************************"
      }
    ```

  - Payment Confirmation Response:

    ```js
        {
        "id": "pi_1GhFvIEW3J4f9S34tfPq3KN9",
        "object": "payment_intent",
        "client_secret": "pi_1GhFvIEW3J4f9S34tfPq3KN9_secret_pn0ZgVQgPKqaGaQzZhoqtlGW7",
        "last_payment_error": null,
        "livemode": false,
        "next_action": null,
        "status": "succeeded",
        "amount": 544,
        "canceled_at": null,
        "cancellation_reason": null,
        "capture_method": "automatic",
        "confirmation_method": "automatic",
        "created": 1589120072,
        "currency": "sgd",
        "description": null,
        "payment_method": "pm_1GhFvTEW3J4f9S34SxbbEWOu",
        "payment_method_types": [
          "card"
        ],
        "receipt_email": null,
        "setup_future_usage": null,
        "shipping": null,
        "source": null
    }
    ```
