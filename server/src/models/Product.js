const mongoose = require('mongoose');

const {Schema} = mongoose;

const ProductSchema = new Schema(
    {
        productId: {type: String},
        productDescription: {type: String},
        price: {type: Number, required: true},
    },
    {
        timestamps: true,
    },
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;