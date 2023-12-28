const express = require('express');
const productdescription = express.Router();

const { addProductDescription,updateProductDescription,viewProductDescription} = require("../Controllers/tbl_retailer_product_description");


productdescription.post('/add/product/description', addProductDescription);
productdescription.put('/update-product-description/:pid', updateProductDescription);
productdescription.get('/view-product-description/:pid', viewProductDescription);





module.exports = { productdescription };