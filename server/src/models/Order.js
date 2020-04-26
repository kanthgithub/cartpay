const mongoose = require('mongoose');
const Product = require('./Product');

const {Schema} = mongoose;

const OrderSchema = new Schema(
    {
        userId: {type: String},
        orderId: {type: String},
        orderDate: {type: Date, required: true},
        orderAmount: {type: Number, required: true},
        currency: {type: String},
        items: { type: [Product], default: void 0 }, // <-- override the array default to be undefined
    },
    {
        timestamps: true,
    },
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;