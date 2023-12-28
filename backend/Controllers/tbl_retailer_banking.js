const connection = require("../Model/model");


const addbankingdetail = async (req, res) => { 
    try {
        let sqlQuery = "INSERT INTO tbl_retailer_banking (Reg_no, Bankaccountno, Bankaccountname, Ifsc, Bankname, Branch, upi) VALUES (?, ?, ?, ?, ?, ?, ?)";
        let values = [
            req.body.Reg_no,
            req.body.Bankaccountno,
            req.body.Bankaccountname,
            req.body.Ifsc,
            req.body.Bankname,
            req.body.Branch,
            req.body.upi,
            
        ];

        await connection.query(sqlQuery, values, function (error, result) {
            if (error) {
                console.log("Error:", error.sqlMessage);
                res.status(500).json({ error: error.sqlMessage });
            } else {
                res.json(result);
            }
        });
    } catch (error) {
        console.log("Error found:", error);
        res.status(500).json({ error: "An error occurred" });
    }
};


const viewbankingdetail = (req, res) => {
    const selectQuery = `SELECT * FROM tbl_retailer_banking`;
  
    connection.query(selectQuery, (err, results) => {
      if (err) {
        console.error('Error fetching :', err);
        return res.status(500).json({ error: 'An error occurred while fetching .' });
      }
  
      return res.status(200).json(results);
    });
  };

  const viewBankingDetail = (req, res) => {
    const { Reg_no } = req.params; 
  
    const selectQuery = `SELECT * FROM tbl_retailer_banking WHERE Reg_no = ?`;
    
    connection.query(selectQuery, [Reg_no], (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        return res.status(500).json({ error: 'An error occurred while fetching data.' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Data not found for the provided Reg_no.' });
      }
    
      return res.status(200).json(results);
    }); 
  };
  

  
  const updateBankingDetail = (req, res) => {
    const { Reg_no } = req.params; 
    const { Bankaccountno, Bankaccountname, Ifsc, Bankname, Branch } = req.body; 
  
    const updatedData = {
      Bankaccountno,
      Bankaccountname,
      Ifsc,
      Bankname,
      Branch,
    };
  
    const updateQuery = `
      UPDATE tbl_retailer_banking
      SET ?
      WHERE Reg_no = ?`;
  
    connection.query(updateQuery, [updatedData, Reg_no], (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).json({ error: 'An error occurred while updating data.' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Data not found for the provided Reg_no.' });
      }
  
      return res.status(200).json({ message: 'Data updated successfully.' });
    });
  };
  
 
  const updateUPI = (req, res) => {
    const { Reg_no } = req.params; 
    const { upi } = req.body; 
  
    const updatedData = {
      upi,
    };
  
    const updateQuery = `
      UPDATE tbl_retailer_banking
      SET ?
      WHERE Reg_no = ?`;
  
    connection.query(updateQuery, [updatedData, Reg_no], (err, result) => {
      if (err) {
        console.error('Error updating UPI:', err);
        return res.status(500).json({ error: 'An error occurred while updating UPI.' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Data not found for the provided Reg_no.' });
      }
  
      return res.status(200).json({ message: 'UPI updated successfully.' });
    });
  };
  
  
  
  
  
  
  
module.exports = { addbankingdetail,viewbankingdetail,viewBankingDetail,updateBankingDetail,updateUPI}