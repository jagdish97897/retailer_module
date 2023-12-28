const connection = require("../Model/model");

const addProductDescription = async (req, res) => { 
    try {
        let sqlQuery = "INSERT INTO tbl_retailer_product_description (pid, description, size, weight, ram, screen, rom, processor, mfd, exp, material, origincountry) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let values = [
            req.body.pid,
            req.body.description,
            req.body.size,
            req.body.weight,
            req.body.ram,
            req.body.screen,
            req.body.rom,
            req.body.processor,
            req.body.mfd,
            req.body.exp,
            req.body.material,
            req.body.origincountry,
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

const updateProductDescription = (req, res) => {
    const { pid } = req.params; // Assuming you are passing 'pid' as a URL parameter
    const updatedData = req.body; // Data to update

    const updateQuery = `
      UPDATE tbl_retailer_product_description
      SET ?
      WHERE pid = ?`;

    connection.query(updateQuery, [updatedData, pid], (err, result) => {
        if (err) {
            console.error('Error updating product description:', err);
            return res.status(500).json({ error: 'An error occurred while updating product description.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found for the provided pid.' });
        }

        return res.status(200).json({ message: 'Product description updated successfully.' });
    });
};





const viewProductDescription = (req, res) => {
    const { pid } = req.params; 

    const selectQuery = `SELECT * FROM tbl_retailer_product_description WHERE pid = ?`;

    connection.query(selectQuery, [pid], (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            return res.status(500).json({ error: 'An error occurred while fetching data.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Data not found for the provided pid.' });
        }

        return res.status(200).json(results[0]); 
    });
};





module.exports = { addProductDescription, updateProductDescription, viewProductDescription}