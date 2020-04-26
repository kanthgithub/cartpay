const express = require("express");
const app = express();
const { resolve } = require("path");

// This is a sample test API key. Sign in to see examples pre-filled with your key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.use(express.static("."));
app.use(express.json());

app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.listen(4242, () => console.log('Node server listening on port 4242!'));
