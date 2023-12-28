const express = require('express')
const Retailer= express.Router();



const { addRetailer, getRetailerByRegNo, updateRetailer, updateRetailerStatus, updatePassword, updateDocuments, viewAllShops, updateShopStatus, loginRetailer,logoutRetailer  } = require("../Controllers/Tbl_retailer_register")

Retailer.post("/api/retailer/login", loginRetailer);  
Retailer.get("/api/retailer/logout", logoutRetailer);  
Retailer.post("/api/retailer/newshopregister", addRetailer);  
Retailer.get("/api/retailer/viewshop/:Reg_no", getRetailerByRegNo);
Retailer.put("/api/retailer/updateshop/:Reg_no", updateRetailer );               
Retailer.put("/api/retailer/updatestatus/:Reg_no", updateRetailerStatus );               
Retailer.patch("/api/retailer/updatepwd/:Reg_no", updatePassword );               
Retailer.patch("/api/retailer/updatedocuments/:Reg_no", updateDocuments );               
Retailer.get("/api/admin/viewshops", viewAllShops );               
Retailer.put("/api/retaier/updateshopstatus/:Reg_no", updateShopStatus);
 
module.exports = { Retailer }