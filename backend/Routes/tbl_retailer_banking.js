const express = require('express');
const bankingdetail = express.Router();

const { addbankingdetail,viewbankingdetail,viewBankingDetail,updateBankingDetail,updateUPI} = require("../Controllers/tbl_retailer_banking");


bankingdetail.post("/api/retail/banking", addbankingdetail);
bankingdetail.get("/api/admin/banking", viewbankingdetail);
bankingdetail.get('/api/viewbankingdetail/:Reg_no', viewBankingDetail);

bankingdetail.patch('/api/updatebankingdetail/:Reg_no', updateBankingDetail);

bankingdetail.patch('/api/banking/updateupi/:Reg_no', updateUPI);

module.exports = { bankingdetail };