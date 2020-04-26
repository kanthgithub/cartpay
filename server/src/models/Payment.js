const mongoose = require('mongoose');
const Product = require('./Product');

const {Schema} = mongoose;

const PaymentSchema = new Schema(
    {
        userId: {type: String},
        paymentId: {type: String},
        orderId: {type: String},
        paymentDate: {type: Date, required: true},
        paymentAmount: {type: Number, required: true},
        paymentCurrency: {type: String},
        items: { type: [Product], default: void 0 }, // <-- override the array default to be undefined
    },
    {
        timestamps: true,
    },
);

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;