const responseDataUtil = require('../util/ResponseDataUtil');
const fs = require('fs');
const path = require("path");

const ProductController = {

    /**
     * returns products to be listed in UI.
     * @param request
     * @param response
     * @returns {Promise<Products>}
     */
    products: async (request, response) => {
        const cart = request.body;        
        let products = fs.readFileSync(path.resolve(__dirname, "../config/products.json"));
        console.log('products: '+products);
        response.send(products);
      },
};

module.exports = ProductController;
