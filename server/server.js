const express = require("express");
const app = express();
const { resolve } = require("path");
require('dotenv').config()

// This is a sample test API key. Sign in to see examples pre-filled with your key.
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
app.use(express.static("."));
app.use(express.json());

const paymentRoutes = require('./src/routes/PaymentRoutes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}),)
    .use(bodyParser.json());
const cors = require('cors');
app
    .use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
}).use("/api/v1", paymentRoutes).use(cors);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Application listening in port ', PORT));

module.exports = app;
