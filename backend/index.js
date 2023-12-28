const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());



const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};


app.use(cors(corsOptions));
const port = 5000;

app.use(bodyParser.json()) 
app.use(cookieParser())


// //    SWAGGER REQUIRE
// const swaggerui = require('swagger-ui-express')
// const swaggerJSDoc = require('swagger-jsdoc');


// const option = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: "NODE API documentation  BY Jagdish Singh",
//       version: "1.0.0"
//     },
//     servers: [
//       {
//         url: "http://localhost:5000"
//       }
//     ]
//   },
//   apis: ["./Routes/tbl_admin_user.js"]
// }


// const swaggerSpec = swaggerJSDoc(option)
// app.use('/api-docs', swaggerui.serve, swaggerui.setup(swaggerSpec))

// // app.use('/testing', swaggerui.serve, swaggerui.setup(swaggerJSDoc(option)));


// For making static folder for image
app.use(express.static('public'))

const {AdminUser} = require("./Routes/tbl_admin_user")
app.use("/", AdminUser);


const {AdminRole} = require("./Routes/tbl_admin_role") 
app.use("/", AdminRole);

const {AdminRoleAssign} = require("./Routes/tbl_admin_role_assign") 
app.use("/", AdminRoleAssign);



const {Product} = require("./Routes/tbl_admin_product_category") 
app.use("/", Product);

const {Subcategory} = require("./Routes/tbl_admin_sub_category") 
app.use("/", Subcategory);

const {adminoffer} = require("./Routes/tbl_admin_offer") 
app.use("/", adminoffer);


const { Retailer} = require("./Routes/tbl_retailer_register") 
app.use("/",  Retailer);

const {product} = require("./Routes/tbl_retailer_products")
app.use("/",product); 

const {bankingdetail} = require("./Routes/tbl_retailer_banking")
app.use("/",bankingdetail); 

const {productdescription} = require("./Routes/tbl_retailer_product_description")
app.use("/",productdescription); 

const {retailerProductsImages} = require("./Routes/tbl_retailer_product_images")
app.use("/",retailerProductsImages); 


app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
});