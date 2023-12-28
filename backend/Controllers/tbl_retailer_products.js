const connection = require("../Model/model");


const addProduct = async (req, res) => {
    try {
      let sqlQuery = "INSERT INTO tbl_retailer_products SET ?";
      let data = {
        pid: req.body.pid,
        pname: req.body.pname,
        subcategoryid: req.body.subcategoryid,
        Reg_no: req.body.Reg_no,
        price: req.body.price,
        discount: req.body.discount,
        brand_name: req.body.brand_name,
        quantity: req.body.quantity,
        photo: req.file ? req.file.filename : null,
      };
  
      await connection.query(sqlQuery, data, function (error, result) {
        if (error) {
          console.log("error", error.sqlMessage);
          return res.status(500).json({ error: "Error inserting data" });
        } else {
          return res.status(201).json({ message: "Product added successfully." });
        }
      });
    } catch (error) {
      console.log("error found...");
      return res.status(500).json({ error: "Error processing request" });
    }
  };


  const getProductByRegNo = (req, res) => {
    const { Reg_no } = req.params; // Assuming you are passing Reg_no as a URL parameter
  
    const selectQuery = `
      SELECT *
      FROM tbl_retailer_products
      WHERE Reg_no = ?`;
    
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
  
  const updateProductPrice = (req, res) => {
    const { pid } = req.params; 
    const { price } = req.body; 
  
    const updatedData = {
      price,
    };
  
    const updateQuery = `
      UPDATE tbl_retailer_products
      SET ?
      WHERE pid = ?`;
  
    connection.query(updateQuery, [updatedData, pid], (err, result) => {
      if (err) {
        console.error('Error updating product price:', err);
        return res.status(500).json({ error: 'An error occurred while updating product price.' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found for the provided pid.' });
      }
  
      return res.status(200).json({ message: 'Product price updated successfully.' });
    });
  };
  
  const updateProductDiscount = (req, res) => {
    const { pid } = req.params; // Assuming you are passing pid as a URL parameter
    const { discount } = req.body; // Extract 'discount' field from the request body
  
    const updatedData = {
      discount,
    };
  
    const updateQuery = `
      UPDATE tbl_retailer_products
      SET ?
      WHERE pid = ?`;
  
    connection.query(updateQuery, [updatedData, pid], (err, result) => {
      if (err) {
        console.error('Error updating product discount:', err);
        return res.status(500).json({ error: 'An error occurred while updating product discount.' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found for the provided pid.' });
      }
  
      return res.status(200).json({ message: 'Product discount updated successfully.' });
    });
  };
  
 
  const updateProductQuantity = (req, res) => {
    const { pid } = req.params; // Assuming you are passing pid as a URL parameter
    const { quantity } = req.body; // Extract 'quantity' field from the request body
  
    const updatedData = {
      quantity,
    };
  
    const updateQuery = `
      UPDATE tbl_retailer_products
      SET ?
      WHERE pid = ?`;
  
    connection.query(updateQuery, [updatedData, pid], (err, result) => {
      if (err) {
        console.error('Error updating product quantity:', err);
        return res.status(500).json({ error: 'An error occurred while updating product quantity.' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found for the provided pid.' });
      }
  
      return res.status(200).json({ message: 'Product quantity updated successfully.' });
    });
  };
  
  const viewProductDetails = (req, res) => {
  const selectQuery = `SELECT * FROM tbl_retailer_products`;

  connection.query(selectQuery, (err, results) => {
    if (err) {
      console.error('Error fetching product details:', err);
      return res.status(500).json({ error: 'An error occurred while fetching product details.' });
    }

    return res.status(200).json(results);
  });
};

module.exports = { addProduct,getProductByRegNo, updateProductPrice,updateProductDiscount,updateProductQuantity,viewProductDetails};