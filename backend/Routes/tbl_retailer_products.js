// const express = require('express')
// const product= express.Router();
// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//       callback(null, './uploads');
//     },
//     filename: (req, file, callback) => {
//       const filename = `image-${Date.now()}.${file.originalname}`;
//       callback(null, filename);
//     },
//   });
  
  
//   const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, callback) => {
//       if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
//         callback(null, true);
//       } else {
//         callback(null, false);
//         return callback(new Error('Only .png, .jpg, .jpeg files are allowed'));
//       }
//     },
//   });


// const { addProduct,getProductByRegNo,updateProductPrice,updateProductDiscount,updateProductQuantity,viewProductDetails } = require("../Controllers/tbl_retailer_products")





// product.post('/api/addproduct',upload.single('photo'), addProduct);
// product.get('/api/getproductsbyregno/:Reg_no', getProductByRegNo);
// product.patch('/api/updateproductprice/:pid', updateProductPrice);
// product.patch('/api/updateproductdiscount/:pid', updateProductDiscount);
// product.patch('/api/updateproductquantity/:pid', updateProductQuantity);
// product.get('/api/viewproductdetails', viewProductDetails);
   

 
// module.exports = { product }


const express = require('express');
const product = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/Images'); // Set the destination to 'public/Images'
  },
  filename: (req, file, callback) => {
    const filename = `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`;
    callback(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error('Only .png, .jpg, .jpeg files are allowed'));
    }
  },
});

const {
  addProduct,
  getProductByRegNo,
  updateProductPrice,
  updateProductDiscount,
  updateProductQuantity,
  viewProductDetails
} = require("../Controllers/tbl_retailer_products");

product.post('/api/addproduct', upload.single('photo'), addProduct);
product.get('/api/getproductsbyregno/:Reg_no', getProductByRegNo);
product.patch('/api/updateproductprice/:pid', updateProductPrice);
product.patch('/api/updateproductdiscount/:pid', updateProductDiscount);
product.patch('/api/updateproductquantity/:pid', updateProductQuantity);
product.get('/api/viewproductdetails', viewProductDetails);

module.exports = { product };


