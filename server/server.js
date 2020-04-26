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

const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}),)
    .use(bodyParser.json());

    const cors = require('cors');


app.use("/api/v1", paymentRoutes)
    .use(function (req, res) {
        return res.status(404).send({message: 'Route' + req.url + ' Not found.'});
    })
    .use(cors);

app.listen(PORT, () => console.log('Application listening in port ', PORT));

module.exports = app;
