
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Sidebar from '../sidebar/sidebar';
import Head from 'next/head';
import css from '../../../styles/product.module.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

export default function Product() {
  const [value, setValue] = useState('one');
  const [formData, setFormData] = useState({
    Reg_no: '',
    pid: '',
    pname: '',
    subcategoryid: '',
    price: '',
    discount: '',
    brand_name: '',
    quantity: '',
    photo: null,
    lastupdate: '',
  });
  const [productDetails, setProductDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [subcategoryNames, setSubcategoryNames] = useState([]);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formDataWithFile = new FormData();
      for (const key in formData) {
        formDataWithFile.append(key, formData[key]);
      }

      const response = await axios.post('http://localhost:5000/api/addproduct', formDataWithFile);

      if (response.status === 200) {
        alert('product information added successfully');
        router.push('/');
      } else {
        alert('Failed to add product information');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const fetchSubcategoryNames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/subcategory/viewsabcategory');
      if (response.status === 200) {
        setSubcategoryNames(response.data);
      } else {
        setSubcategoryNames([]);
      }
    } catch (error) {
      console.error(error);
      setSubcategoryNames([]);
    }
  };

  useEffect(() => {
    fetchSubcategoryNames();
  }, []);

  const handlePriceUpdate = async () => {
    try {
      if (selectedProductId && newPrice) {
        const response = await axios.patch(
          `http://localhost:5000/api/updateproductprice/${selectedProductId}`,
          { price: newPrice }
        );

        if (response.status === 200) {
          handleCloseModal();
        } else {
          console.error('Failed to update product price');
        }
      } else {
        console.error('Selected product ID or new price is missing');
      }
    } catch (error) {
      console.error('An error occurred while updating product price:', error);
    }
  };

  const handleOpenModal = (productId, currentPrice) => {
    setOpenModal(true);
    setSelectedProductId(productId);
    setNewPrice(currentPrice);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const regNoFromLocalStorage = localStorage.getItem('Reg_no');
    if (regNoFromLocalStorage) {
      setFormData({ ...formData, Reg_no: regNoFromLocalStorage });

      const fetchProductDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/getproductsbyregno/${regNoFromLocalStorage}`);
          if (response.status === 200) {
            setProductDetails(response.data);
          } else {
            setProductDetails(null);
          }
        } catch (error) {
          console.error(error);
          setProductDetails(null);
        }
      };

      fetchProductDetails();
    }
  }, []);


  const [openQuantityModal, setOpenQuantityModal] = useState(false);

  const [newQuantity, setNewQuantity] = useState('');

  const handleQuantityUpdate = async () => {
    try {
      if (selectedProductId && newQuantity !== '') {
        const response = await axios.patch(
          `http://localhost:5000/api/updateproductquantity/${selectedProductId}`,
          { quantity: newQuantity }
        );

        if (response.status === 200) {
          setOpenQuantityModal(false); // Close the modal after successful update
        } else {
          console.error('Failed to update product quantity');
        }
      } else {
        console.error('Selected product ID or new quantity is missing');
      }
    } catch (error) {
      console.error('An error occurred while updating product quantity:', error);
    }
  };
  const handleOpenQuantityModal = (productId, currentQuantity) => {
    setSelectedProductId(productId);
    setNewQuantity(currentQuantity);
    setOpenQuantityModal(true);
  };

  // State variables for the first modal (Add Description)
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [descriptionData, setDescriptionData] = useState({
    pid: '',
    description: '',
    size: '',
    weight: '',
    ram: '',
    screen: '',
    rom: '',
    processor: '',
    mfd: '',
    exp: '',
    material: '',
    origincountry: '',
  });

  const handleOpenDescriptionModal = () => {
    setOpenDescriptionModal(true);
  };

  const handleCloseDescriptionModal = () => {
    setOpenDescriptionModal(false);
  };

  const handleDescriptionChange = (event, field) => {
    setDescriptionData({
      ...descriptionData,
      [field]: event.target.value,
    });
  };

  const handleAddDescription = async () => {
    try {
      const response = await axios.post('http://localhost:5000/add/product/description', descriptionData);

      if (response.status === 200) {
        // Optionally, perform actions after successfully adding the description
        console.log('Description added successfully:', response.data);

        // Close the description modal
        handleCloseDescriptionModal();
      } else {
        console.error('Failed to add description');
        // Handle failure scenarios if needed
      }
    } catch (error) {
      console.error('Error adding description:', error);
      // Handle error scenarios if needed
    }
  };

  // State variables for the second modal (Product Description)
  const [openProductDescriptionModal, setOpenProductDescriptionModal] = useState(false);
  const [productDescription, setProductDescription] = useState('');

  const fetchProductDescription = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:5000/view-product-description/${productId}`);

      if (response.status === 200) {
        setProductDescription(response.data);
        setOpenProductDescriptionModal(true); // Open the modal after fetching the description
      } else {
        console.error('Failed to fetch product description');
      }
    } catch (error) {
      console.error('Error fetching product description:', error);
    }
  };
  const handleCloseProductDescriptionModal = () => {
    setOpenProductDescriptionModal(false);
  };



  return (
    <Sidebar>
      <div className={css.fullHeight}>
        <Head>
          <link rel="stylesheet" href="/banking.css" />
        </Head>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="ADD" />
            <Tab value="two" label="View" />
          </Tabs>
        </Box>
      </div>

      {value === 'one' && (

        <div className={css.formContainer}>
          <h2 className={css.formHeader}>ADD Product Details</h2>
          <form className={css.form} onSubmit={handleSubmit}>
            <div className={css.formGroup}>
              <label htmlFor="Reg_no" className={css.formLabel}>Registration Number</label>
              <input
                type="text"
                className={css.formControl}
                id="Reg_no"
                name="Reg_no"
                placeholder="Enter Registration Number"
                autoComplete="off"
                onChange={handleInputChange}
                value={formData.Reg_no}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="pid" className={css.formLabel}>Product ID</label>
              <input
                type="text"
                className={css.formControl}
                id="pid"
                name="pid"
                placeholder="Enter Product ID"
                autoComplete="off"
                onChange={handleInputChange}
                value={formData.pid}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="pname" className={css.formLabel}>Product Name</label>
              <input
                type="text"
                className={css.formControl}
                id="pname"
                name="pname"
                placeholder="Enter Product Name"
                autoComplete="off"
                onChange={handleInputChange}
                value={formData.pname}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="subcategoryid" className={css.formLabel}>Subcategory ID</label>
              <select
                className={css.formControl}
                id="subcategoryid"
                name="subcategoryid"
                onChange={handleInputChange}
                value={formData.subcategoryid}
              >
                <option value="">Select Subcategory</option>
                {subcategoryNames.map((subcategory) => (
                  <option key={subcategory.subcategoryid} value={subcategory.subcategoryid}>
                    {subcategory.subcategoryname}
                  </option>
                ))}
              </select>
            </div>

            <div className={css.formGroup}>
              <label htmlFor="price" className={css.formLabel}>Price</label>
              <input
                type="text"
                className={css.formControl}
                id="price"
                name="price"
                placeholder="Enter Price"
                autoComplete="off"
                onChange={handleInputChange}
                value={formData.price}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="discount" className={css.formLabel}>Discount</label>
              <input
                type="text"
                className={css.formControl}
                id="discount"
                name="discount"
                placeholder="Enter Discount"
                autoComplete="off"
                onChange={handleInputChange}
                value={formData.discount}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="brand_name" className={css.formLabel}>Brand Name</label>
              <input
                type="text"
                className={css.formControl}
                id="brand_name"
                name="brand_name"
                placeholder="Enter Brand Name"
                autoComplete="off"
                onChange={handleInputChange}
                value={formData.brand_name}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="quantity" className={css.formLabel}>Quantity</label>
              <input
                type="text"
                className={css.formControl}
                id="quantity"
                name="quantity"
                placeholder="Enter Quantity"
                autoComplete="off"
                onChange={handleInputChange}
                value={formData.quantity}
              />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="lastupdate" className={css.formLabel}>Last Update</label>
              <input
                type="date" // Change the type to "date"
                className={css.formControl}
                id="lastupdate"
                name="lastupdate"
                autoComplete="off"
                onChange={handleInputChange}
                value={formData.lastupdate}
              />
            </div>




            <div className={css.formGroup}>
              <label htmlFor="photo" className={css.formLabel}>Photo</label>
              <input
                type="file"
                accept="image/*"
                className={css.formControl}
                id="photo"
                name="photo"
                onChange={handleFileChange}
              />
            </div>


            <div className={css.formGroup}>
              <button type="submit" className={css.submitButton}>Submit</button>
            </div>
          </form>
        </div>

      )}



      {value === 'two' && (
        <div className={css.tableContainer}>
          <h2>View Product Details</h2>
          {productDetails && productDetails.length > 0 ? (
            <div className={css.table}>
              <table className={css.table}>
                <thead>
                  <tr>

                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Subcategory ID</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Brand Name</th>
                    <th>Quantity</th>
                    <th>Photo</th>
                    <th>description</th>
                    <th>image</th>

                  </tr>
                </thead>
                <tbody>
                  {productDetails.map((detail, index) => (
                    <tr key={index}>

                      <td>{detail.pid}</td>
                      <td>{detail.pname}</td>
                      <td>{detail.subcategoryid}</td>
                      <td>
                        {detail.price}

                        <Button
                          startIcon={<EditIcon />} onClick={() => handleOpenModal(detail.pid, detail.price)}>

                        </Button>
                      </td>
                      <td>{detail.discount}

                      </td>
                      <td>{detail.brand_name}</td>
                      <td>{detail.quantity}    <Button
                        startIcon={<EditIcon />} onClick={() => handleOpenQuantityModal(detail.pid, detail.quantity)}>

                      </Button>
                      </td>
                      {/* <td>{

                        <img src={`http://localhost:5000/images/` + detail.photo} alt='' className='employee_image' />

                      }</td> */}
{/* 
                      <td>
                        <img
                          src={`http://localhost:5000/images/${detail.photo}`} 
                        
                          style={{ width: '40px', height: '50px' }}
                        />
                      </td> */}

                 <td>
                   {detail.photo ? (
                     <img
                       src={`http://localhost:5000/images/${detail.photo}`} // Replace with your actual image URL or path
                       alt={`Product ${detail.pid}`}
                      style={{ maxWidth: '100px', maxHeight: '100px' }} // Adjust the style as needed
                     />
                   ) : (
                     <span>No photo available</span>
                   )}
                 </td>

                      <td>
                        {/* <button onClick={handleOpenDescriptionModal}>Add Description</button> */}

                        <Button
                          variant="contained"

                          onClick={handleOpenDescriptionModal}
                        >
                          Add
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => fetchProductDescription(detail.pid)}
                        >
                          View
                        </Button>
                      </td>
                      {/* Add similar cells for other product details */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No product details found for this retailer.</p>
          )}

          {/* Price Update Modal */}
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Update Product Price</DialogTitle>
            <DialogContent>
              <TextField
                label="New Price"
                variant="outlined"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button onClick={handlePriceUpdate} variant="contained" color="primary">
                Update Price
              </Button>
            </DialogActions>
          </Dialog>



          {/* Quantity Update Modal */}
          <Dialog open={openQuantityModal} onClose={() => setOpenQuantityModal(false)}>
            <DialogTitle>Update Product Quantity</DialogTitle>
            <DialogContent>
              <TextField
                label="New Quantity"
                variant="outlined"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenQuantityModal(false)}>Cancel</Button>
              <Button onClick={handleQuantityUpdate} variant="contained" color="primary">
                Update Quantity
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openDescriptionModal} onClose={handleCloseDescriptionModal}>
            <DialogTitle>Add Product Description</DialogTitle>
            <DialogContent>
              <TextField
                label="Product ID"
                variant="outlined"
                value={descriptionData.pid}
                onChange={(e) => handleDescriptionChange(e, 'pid')}
                fullWidth
              />

              <TextField
                label="Size"
                variant="outlined"
                value={descriptionData.size}
                onChange={(e) => handleDescriptionChange(e, 'size')}
                fullWidth
              />
              <TextField
                label="Weight"
                variant="outlined"
                value={descriptionData.weight}
                onChange={(e) => handleDescriptionChange(e, 'weight')}
                fullWidth
              />
              <TextField
                label="RAM"
                variant="outlined"
                value={descriptionData.ram}
                onChange={(e) => handleDescriptionChange(e, 'ram')}
                fullWidth
              />
              <TextField
                label="Screen"
                variant="outlined"
                value={descriptionData.screen}
                onChange={(e) => handleDescriptionChange(e, 'screen')}
                fullWidth
              />
              <TextField
                label="ROM"
                variant="outlined"
                value={descriptionData.rom}
                onChange={(e) => handleDescriptionChange(e, 'rom')}
                fullWidth
              />
              <TextField
                label="Processor"
                variant="outlined"
                value={descriptionData.processor}
                onChange={(e) => handleDescriptionChange(e, 'processor')}
                fullWidth
              />
              <TextField
                label="Manufacturing Date"
                variant="outlined"
                value={descriptionData.mfd}
                onChange={(e) => handleDescriptionChange(e, 'mfd')}
                fullWidth
              />
              <TextField
                label="Expiry Date"
                variant="outlined"
                value={descriptionData.exp}
                onChange={(e) => handleDescriptionChange(e, 'exp')}
                fullWidth
              />
              <TextField
                label="Material"
                variant="outlined"
                value={descriptionData.material}
                onChange={(e) => handleDescriptionChange(e, 'material')}
                fullWidth
              />
              <TextField
                label="Origin Country"
                variant="outlined"
                value={descriptionData.origincountry}
                onChange={(e) => handleDescriptionChange(e, 'origincountry')}
                fullWidth
              />
              <TextField
                label="Description"
                variant="outlined"
                value={descriptionData.description}
                onChange={(e) => handleDescriptionChange(e, 'description')}
                fullWidth
                multiline
                rows={4}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDescriptionModal}>Cancel</Button>
              <Button onClick={handleAddDescription} variant="contained" color="primary">
                Add Description
              </Button>
            </DialogActions>
          </Dialog>


          <Dialog open={openProductDescriptionModal} onClose={handleCloseProductDescriptionModal}>
            <DialogTitle>Product Description</DialogTitle>
            <DialogContent>
              <p>Product ID: {productDescription.pid}</p>
              <p>Size: {productDescription.size}</p>
              <p>Weight: {productDescription.weight}</p>
              <p>ram: {productDescription.ram}</p>
              <p>Screen: {productDescription.screen}</p>
              <p>Rom: {productDescription.rom}</p>
              <p>Processor: {productDescription.processor}</p>
              <p>Mfd: {productDescription.mfd}</p>
              <p>Exp: {productDescription.exp}</p>
              <p>Material: {productDescription.material}</p>
              <p>Origincountry: {productDescription.origincountry}</p>
              <p>Description: {productDescription.description}</p>

              {/* Display other fields similarly */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseProductDescriptionModal}>Close</Button>
            </DialogActions>
          </Dialog>



        </div>
      )}
    </Sidebar>
  );
}


// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar';
// import Head from 'next/head';
// import css from '../../../styles/product.module.css';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import EditIcon from '@mui/icons-material/Edit';

// export default function Product() {
//   const [value, setValue] = useState('one');
//   const [formData, setFormData] = useState({
//     Reg_no: '',
//     pid: '',
//     pname: '',
//     subcategoryid: '',
//     price: '',
//     discount: '',
//     brand_name: '',
//     quantity: '',
//     photo: null,
//   });
//   const [productDetails, setProductDetails] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [newPrice, setNewPrice] = useState('');
//   const [subcategoryNames, setSubcategoryNames] = useState([]);
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const formDataWithFile = new FormData();
//       for (const key in formData) {
//         formDataWithFile.append(key, formData[key]);
//       }

//       const response = await axios.post('http://localhost:5000/api/addproduct', formDataWithFile);

//       if (response.status === 200) {
//         alert('product information added successfully');
//         router.push('/');
//       } else {
//         alert('Failed to add product information');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       photo: file,
//     });
//   };

//   const fetchSubcategoryNames = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/subcategory/viewsabcategory');
//       if (response.status === 200) {
//         setSubcategoryNames(response.data);
//       } else {
//         setSubcategoryNames([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setSubcategoryNames([]);
//     }
//   };
  
//   useEffect(() => {
//     fetchSubcategoryNames();
//   }, []);

//   const handlePriceUpdate = async () => {
//     try {
//       if (selectedProductId && newPrice) {
//         const response = await axios.patch(
//           `http://localhost:5000/api/updateproductprice/${selectedProductId}`,
//           { price: newPrice }
//         );

//         if (response.status === 200) {
//           handleCloseModal();
//         } else {
//           console.error('Failed to update product price');
//         }
//       } else {
//         console.error('Selected product ID or new price is missing');
//       }
//     } catch (error) {
//       console.error('An error occurred while updating product price:', error);
//     }
//   };

//   const handleOpenModal = (productId, currentPrice) => {
//     setOpenModal(true);
//     setSelectedProductId(productId);
//     setNewPrice(currentPrice);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   useEffect(() => {
//     const regNoFromLocalStorage = localStorage.getItem('Reg_no');
//     if (regNoFromLocalStorage) {
//       setFormData({ ...formData, Reg_no: regNoFromLocalStorage });

//       const fetchProductDetails = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/api/getproductsbyregno/${regNoFromLocalStorage}`);
//           if (response.status === 200) {
//             setProductDetails(response.data);
//           } else {
//             setProductDetails(null);
//           }
//         } catch (error) {
//           console.error(error);
//           setProductDetails(null);
//         }
//       };

//       fetchProductDetails();
//     }
//   }, [formData]);


//   const [openQuantityModal, setOpenQuantityModal] = useState(false);

// const [newQuantity, setNewQuantity] = useState('');

// const handleQuantityUpdate = async () => {
//   try {
//     if (selectedProductId && newQuantity !== '') {
//       const response = await axios.patch(
//         `http://localhost:5000/api/updateproductquantity/${selectedProductId}`,
//         { quantity: newQuantity }
//       );

//       if (response.status === 200) {
//         setOpenQuantityModal(false); // Close the modal after successful update
//       } else {
//         console.error('Failed to update product quantity');
//       }
//     } else {
//       console.error('Selected product ID or new quantity is missing');
//     }
//   } catch (error) {
//     console.error('An error occurred while updating product quantity:', error);
//   }
// };
// const handleOpenQuantityModal = (productId, currentQuantity) => {
//   setSelectedProductId(productId);
//   setNewQuantity(currentQuantity);
//   setOpenQuantityModal(true);
// };

// const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
// const [descriptionData, setDescriptionData] = useState({
//   pid: '',
//   description: '',
//   size: '',
//   weight: '',
//   ram: '',
//   screen: '',
//   rom: '',
//   processor: '',
//   mfd: '',
//   exp: '',
//   material: '',
//   origincountry: '',
// });

// const handleOpenDescriptionModal = () => {
//   setOpenDescriptionModal(true);
// };

// const handleCloseDescriptionModal = () => {
//   setOpenDescriptionModal(false);
// };

// const handleDescriptionChange = (event, field) => {
//   setDescriptionData({
//     ...descriptionData,
//     [field]: event.target.value,
//   });
// };

// const handleAddDescription = async () => {
//   try {
//     const response = await axios.post('http://localhost:5000/add/product/description', descriptionData);

//     if (response.status === 200) {
//       // Optionally, perform actions after successfully adding the description
//       console.log('Description added successfully:', response.data);

//       // Close the description modal
//       handleCloseDescriptionModal();
//     } else {
//       console.error('Failed to add description');
//       // Handle failure scenarios if needed
//     }
//   } catch (error) {
//     console.error('Error adding description:', error);
//     // Handle error scenarios if needed
//   }
// };


// const [productDescription, setProductDescription] = useState('');
// const fetchProductDescription = async (productId) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/view-product-description/${productId}`);

//     if (response.status === 200) {
//       setProductDescription(response.data);
//       setOpenDescriptionModal(true); // Open the modal after fetching the description
//     } else {
//       console.error('Failed to fetch product description');
//     }
//   } catch (error) {
//     console.error('Error fetching product description:', error);
//   }
// };



//   return (
//     <Sidebar>
//         <div className={css.fullHeight}>
//         <Head>
//           <link rel="stylesheet" href="/banking.css" />
//         </Head>
//         <Box sx={{ width: '100%' }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             textColor="secondary"
//             indicatorColor="secondary"
//             aria-label="secondary tabs example"
//           >
//             <Tab value="one" label="ADD" />
//             <Tab value="two" label="View" />
//           </Tabs>
//         </Box>
//       </div>

//       {value === 'one' && (
       
//           <div className={css.formContainer}>
//             <h2 className={css.formHeader}>ADD Product Details</h2>
//             <form className={css.form} onSubmit={handleSubmit}>
//               <div className={css.formGroup}>
//                 <label htmlFor="Reg_no" className={css.formLabel}>Registration Number</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="Reg_no"
//                   name="Reg_no"
//                   placeholder="Enter Registration Number"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.Reg_no}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="pid" className={css.formLabel}>Product ID</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="pid"
//                   name="pid"
//                   placeholder="Enter Product ID"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.pid}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="pname" className={css.formLabel}>Product Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="pname"
//                   name="pname"
//                   placeholder="Enter Product Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.pname}
//                 />
//               </div>

//             <div className={css.formGroup}>
//               <label htmlFor="subcategoryid" className={css.formLabel}>Subcategory ID</label>
//               <select
//                 className={css.formControl}
//                 id="subcategoryid"
//                 name="subcategoryid"
//                 onChange={handleInputChange}
//                 value={formData.subcategoryid}
//               >
//                 <option value="">Select Subcategory</option>
//                 {subcategoryNames.map((subcategory) => (
//                   <option key={subcategory.subcategoryid} value={subcategory.subcategoryid}>
//                     {subcategory.subcategoryname}
//                   </option>
//                 ))}
//               </select>
//             </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="price" className={css.formLabel}>Price</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="price"
//                   name="price"
//                   placeholder="Enter Price"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.price}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="discount" className={css.formLabel}>Discount</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="discount"
//                   name="discount"
//                   placeholder="Enter Discount"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.discount}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="brand_name" className={css.formLabel}>Brand Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="brand_name"
//                   name="brand_name"
//                   placeholder="Enter Brand Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.brand_name}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="quantity" className={css.formLabel}>Quantity</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="quantity"
//                   name="quantity"
//                   placeholder="Enter Quantity"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.quantity}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="photo" className={css.formLabel}>Photo</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className={css.formControl}
//                   id="photo"
//                   name="photo"
//                   onChange={handleFileChange}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <button type="submit" className={css.submitButton}>Submit</button>
//               </div>
//             </form>
//           </div>
       
//       )}



// {value === 'two' && (
//   <div className={css.tableContainer}>
//     <h2>View Product Details</h2>
//     {productDetails && productDetails.length > 0 ? (
//       <div className={css.table}>
//         <table className={css.table}>
//           <thead>
//             <tr>
              
//               <th>Product ID</th>
//               <th>Product Name</th>
//               <th>Subcategory ID</th>
//               <th>Price</th>
              
//               <th>Discount</th>
//               <th>Brand Name</th>
//               <th>Quantity</th>
//               <th>Photo</th>
//               <th>description</th>
//               <th>image</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {productDetails.map((detail, index) => (
//               <tr key={index}>
                
//                 <td>{detail.pid}</td>
//                 <td>{detail.pname}</td>
//                 <td>{detail.subcategoryid}</td>
//                 <td>
//                   {detail.price}

//                   <Button   variant="contained"
//         startIcon={<EditIcon />} onClick={() => handleOpenModal(detail.pid, detail.price)}>
                   
//                   </Button>
//                 </td>
//                 <td>{detail.discount}
               
//                 </td>
//                 <td>{detail.brand_name}</td>
//                 <td>{detail.quantity}    <Button   variant="contained"
//         startIcon={<EditIcon />} onClick={() => handleOpenQuantityModal(detail.pid, detail.quantity)}>
      
//     </Button>
// </td>
//                 <td>
//                   {detail.photo ? (
//                     <img
//                       src={`http://localhost:5000/uploads/${detail.photo}`} // Replace with your actual image URL or path
//                       alt={`Product ${detail.pid}`}
//                       style={{ maxWidth: '100px', maxHeight: '100px' }} // Adjust the style as needed
//                     />
//                   ) : (
//                     <span>No photo available</span>
//                   )}
//                 </td>
//                 <td>
//                 {/* <button onClick={handleOpenDescriptionModal}>Add Description</button> */}

//                 <Button
//         variant="contained"
       
//         onClick={handleOpenDescriptionModal}
//       >
//        Add
//       </Button>
//       <Button
//     variant="contained"
//     onClick={() => fetchProductDescription(detail.pid)}
//   >
//     View
//   </Button>
//                 </td>
//                 {/* Add similar cells for other product details */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     ) : (
//       <p>No product details found for this retailer.</p>
//     )}

//     {/* Price Update Modal */}
//     <Dialog open={openModal} onClose={handleCloseModal}>
//       <DialogTitle>Update Product Price</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="New Price"
//           variant="outlined"
//           value={newPrice}
//           onChange={(e) => setNewPrice(e.target.value)}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCloseModal}>Cancel</Button>
//         <Button onClick={handlePriceUpdate} variant="contained" color="primary">
//           Update Price
//         </Button>
//       </DialogActions>
//     </Dialog>


    
//    {/* Quantity Update Modal */}
// <Dialog open={openQuantityModal} onClose={() => setOpenQuantityModal(false)}>
//   <DialogTitle>Update Product Quantity</DialogTitle>
//   <DialogContent>
//     <TextField
//       label="New Quantity"
//       variant="outlined"
//       value={newQuantity}
//       onChange={(e) => setNewQuantity(e.target.value)}
//     />
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={() => setOpenQuantityModal(false)}>Cancel</Button>
//     <Button onClick={handleQuantityUpdate} variant="contained" color="primary">
//       Update Quantity
//     </Button>
//   </DialogActions>
// </Dialog>

// <Dialog open={openDescriptionModal} onClose={handleCloseDescriptionModal}>
//   <DialogTitle>Add Product Description</DialogTitle>
//   <DialogContent>
//     <TextField
//       label="Product ID"
//       variant="outlined"
//       value={descriptionData.pid}
//       onChange={(e) => handleDescriptionChange(e, 'pid')}
//       fullWidth
//     />
   
//     <TextField
//       label="Size"
//       variant="outlined"
//       value={descriptionData.size}
//       onChange={(e) => handleDescriptionChange(e, 'size')}
//       fullWidth
//     />
//     <TextField
//       label="Weight"
//       variant="outlined"
//       value={descriptionData.weight}
//       onChange={(e) => handleDescriptionChange(e, 'weight')}
//       fullWidth
//     />
//     <TextField
//       label="RAM"
//       variant="outlined"
//       value={descriptionData.ram}
//       onChange={(e) => handleDescriptionChange(e, 'ram')}
//       fullWidth
//     />
//     <TextField
//       label="Screen"
//       variant="outlined"
//       value={descriptionData.screen}
//       onChange={(e) => handleDescriptionChange(e, 'screen')}
//       fullWidth
//     />
//     <TextField
//       label="ROM"
//       variant="outlined"
//       value={descriptionData.rom}
//       onChange={(e) => handleDescriptionChange(e, 'rom')}
//       fullWidth
//     />
//     <TextField
//       label="Processor"
//       variant="outlined"
//       value={descriptionData.processor}
//       onChange={(e) => handleDescriptionChange(e, 'processor')}
//       fullWidth
//     />
//     <TextField
//       label="Manufacturing Date"
//       variant="outlined"
//       value={descriptionData.mfd}
//       onChange={(e) => handleDescriptionChange(e, 'mfd')}
//       fullWidth
//     />
//     <TextField
//       label="Expiry Date"
//       variant="outlined"
//       value={descriptionData.exp}
//       onChange={(e) => handleDescriptionChange(e, 'exp')}
//       fullWidth
//     />
//     <TextField
//       label="Material"
//       variant="outlined"
//       value={descriptionData.material}
//       onChange={(e) => handleDescriptionChange(e, 'material')}
//       fullWidth
//     />
//     <TextField
//       label="Origin Country"
//       variant="outlined"
//       value={descriptionData.origincountry}
//       onChange={(e) => handleDescriptionChange(e, 'origincountry')}
//       fullWidth
//     />
//      <TextField
//       label="Description"
//       variant="outlined"
//       value={descriptionData.description}
//       onChange={(e) => handleDescriptionChange(e, 'description')}
//       fullWidth
//       multiline
//       rows={4}
//     />
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={handleCloseDescriptionModal}>Cancel</Button>
//     <Button onClick={handleAddDescription} variant="contained" color="primary">
//       Add Description
//     </Button>
//   </DialogActions>
// </Dialog>


// <Dialog open={openDescriptionModal} onClose={handleCloseDescriptionModal}>
//   <DialogTitle>Product Description</DialogTitle>
//   <DialogContent>
//     <p>Product ID: {productDescription.pid}</p>
//     <p>Description: {productDescription.description}</p>
//     <p>Size: {productDescription.size}</p>
//     {/* Display other fields similarly */}
//   </DialogContent>
//   <DialogActions>
//     <Button onClick={handleCloseDescriptionModal}>Close</Button>
//   </DialogActions>
// </Dialog>



//   </div>
// )}
// </Sidebar>
// );
//     }


// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar';
// import Head from 'next/head';
// import css from '../../../styles/product.module.css';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// export default function Product() {
//   const [value, setValue] = useState('one');
//   const [formData, setFormData] = useState({
//     Reg_no: '',
//     pid: '',
//     pname: '',
//     subcategoryid: '',
//     price: '',
//     discount: '',
//     brand_name: '',
//     quantity: '',
//     photo: null,
//   });
//   const [productDetails, setProductDetails] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [newPrice, setNewPrice] = useState('');
//   const [subcategoryNames, setSubcategoryNames] = useState([]);
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const formDataWithFile = new FormData();
//       for (const key in formData) {
//         formDataWithFile.append(key, formData[key]);
//       }

//       const response = await axios.post('http://localhost:5000/api/addproduct', formDataWithFile);

//       if (response.status === 200) {
//         alert('product information added successfully');
//         router.push('/');
//       } else {
//         alert('Failed to add product information');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       photo: file,
//     });
//   };

//   const fetchSubcategoryNames = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/subcategory/viewsabcategory');
//       if (response.status === 200) {
//         setSubcategoryNames(response.data);
//       } else {
//         setSubcategoryNames([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setSubcategoryNames([]);
//     }
//   };
  
//   useEffect(() => {
//     fetchSubcategoryNames();
//   }, []);

//   const handlePriceUpdate = async () => {
//     try {
//       if (selectedProductId && newPrice) {
//         const response = await axios.patch(
//           `http://localhost:5000/api/updateproductprice/${selectedProductId}`,
//           { price: newPrice }
//         );

//         if (response.status === 200) {
//           handleCloseModal();
//         } else {
//           console.error('Failed to update product price');
//         }
//       } else {
//         console.error('Selected product ID or new price is missing');
//       }
//     } catch (error) {
//       console.error('An error occurred while updating product price:', error);
//     }
//   };

//   const handleOpenModal = (productId, currentPrice) => {
//     setOpenModal(true);
//     setSelectedProductId(productId);
//     setNewPrice(currentPrice);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };

//   useEffect(() => {
//     const regNoFromLocalStorage = localStorage.getItem('Reg_no');
//     if (regNoFromLocalStorage) {
//       setFormData({ ...formData, Reg_no: regNoFromLocalStorage });

//       const fetchProductDetails = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/api/getproductsbyregno/${regNoFromLocalStorage}`);
//           if (response.status === 200) {
//             setProductDetails(response.data);
//           } else {
//             setProductDetails(null);
//           }
//         } catch (error) {
//           console.error(error);
//           setProductDetails(null);
//         }
//       };

//       fetchProductDetails();
//     }
//   }, [formData]);

//   const [newDiscount, setNewDiscount] = useState('');
//   const handleDiscountUpdate = async () => {
//     try {
//       if (selectedProductId && newDiscount !== '') {
//         const response = await axios.patch(
//           `http://localhost:5000/api/updateproductdiscount/${selectedProductId}`,
//           { discount: newDiscount }
//         );

//         if (response.status === 200) {
//           handleCloseModal();
//         } else {
//           console.error('Failed to update product discount');
//         }
//       } else {
//         console.error('Selected product ID or new discount is missing');
//       }
//     } catch (error) {
//       console.error('An error occurred while updating product discount:', error);
//     }
//   };

//   const handleOpenDiscountModal = (productId, currentDiscount) => {
//     setOpenModal(true);
//     setSelectedProductId(productId);
//     setNewDiscount(currentDiscount);
//   };



//   const [newQuantity, setNewQuantity] = useState('');

//   const handleQuantityUpdate = async () => {
//     try {
//       if (selectedProductId && newQuantity !== '') {
//         const response = await axios.patch(
//           `http://localhost:5000/api/updateproductquantity/${selectedProductId}`,
//           { quantity: newQuantity }
//         );

//         if (response.status === 200) {
//           handleCloseModal();
//         } else {
//           console.error('Failed to update product quantity');
//         }
//       } else {
//         console.error('Selected product ID or new quantity is missing');
//       }
//     } catch (error) {
//       console.error('An error occurred while updating product quantity:', error);
//     }
//   };

//   const handleOpenQuantityModal = (productId, currentQuantity) => {
//     setOpenModal(true);
//     setSelectedProductId(productId);
//     setNewQuantity(currentQuantity);
//   };

//   return (
//     <Sidebar>
//         <div className={css.fullHeight}>
//         <Head>
//           <link rel="stylesheet" href="/banking.css" />
//         </Head>
//         <Box sx={{ width: '100%' }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             textColor="secondary"
//             indicatorColor="secondary"
//             aria-label="secondary tabs example"
//           >
//             <Tab value="one" label="ADD" />
//             <Tab value="two" label="View" />
//           </Tabs>
//         </Box>
//       </div>

//       {value === 'one' && (
       
//           <div className={css.formContainer}>
//             <h2 className={css.formHeader}>ADD Product Details</h2>
//             <form className={css.form} onSubmit={handleSubmit}>
//               <div className={css.formGroup}>
//                 <label htmlFor="Reg_no" className={css.formLabel}>Registration Number</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="Reg_no"
//                   name="Reg_no"
//                   placeholder="Enter Registration Number"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.Reg_no}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="pid" className={css.formLabel}>Product ID</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="pid"
//                   name="pid"
//                   placeholder="Enter Product ID"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.pid}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="pname" className={css.formLabel}>Product Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="pname"
//                   name="pname"
//                   placeholder="Enter Product Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.pname}
//                 />
//               </div>

//               <div className={css.formGroup}>
//   <label htmlFor="subcategoryid" className={css.formLabel}>Subcategory ID</label>
//   <select
//     className={css.formControl}
//     id="subcategoryid"
//     name="subcategoryid"
//     onChange={handleInputChange}
//     value={formData.subcategoryid}
//   >
//     <option value="">Select Subcategory</option>
//     {subcategoryNames.map((subcategory) => (
//       <option key={subcategory.id} value={subcategory.id}>
//         {subcategory.subcategoryname}
//       </option>
//     ))}
//   </select>
// </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="price" className={css.formLabel}>Price</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="price"
//                   name="price"
//                   placeholder="Enter Price"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.price}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="discount" className={css.formLabel}>Discount</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="discount"
//                   name="discount"
//                   placeholder="Enter Discount"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.discount}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="brand_name" className={css.formLabel}>Brand Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="brand_name"
//                   name="brand_name"
//                   placeholder="Enter Brand Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.brand_name}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="quantity" className={css.formLabel}>Quantity</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="quantity"
//                   name="quantity"
//                   placeholder="Enter Quantity"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.quantity}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="photo" className={css.formLabel}>Photo</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className={css.formControl}
//                   id="photo"
//                   name="photo"
//                   onChange={handleFileChange}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <button type="submit" className={css.submitButton}>Submit</button>
//               </div>
//             </form>
//           </div>
       
//       )}



// {value === 'two' && (
//   <div className={css.tableContainer}>
//     <h2>View Product Details</h2>
//     {productDetails && productDetails.length > 0 ? (
//       <div className={css.table}>
//         <table className={css.table}>
//           <thead>
//             <tr>
//               <th>Registration no</th>
//               <th>Product ID</th>
//               <th>Product Name</th>
//               <th>Subcategory ID</th>
//               <th>Price</th>
              
//               <th>Discount</th>
//               <th>Brand Name</th>
//               <th>Quantity</th>
//               <th>Photo</th>
              
//             </tr>
//           </thead>
//           <tbody>
//             {productDetails.map((detail, index) => (
//               <tr key={index}>
//                 <td>{detail.Reg_no}</td>
//                 <td>{detail.pid}</td>
//                 <td>{detail.pname}</td>
//                 <td>{detail.subcategoryid}</td>
//                 <td>
//                   {detail.price}
//                   <button onClick={() => handleOpenModal(detail.pid, detail.price)}>
//                     Update Price
//                   </button>
//                 </td>
//                 <td>{detail.discount}
//                 <button onClick={() => handleOpenDiscountModal(detail.pid, detail.discount)}>
//                 Update Discount
//                </button>
//                 </td>
//                 <td>{detail.brand_name}</td>
//                 <td>{detail.quantity}<button onClick={() => handleOpenQuantityModal(detail.pid, detail.quantity)}>
//             Update Quantity
//           </button></td>
//                 <td>
//                   {detail.photo ? (
//                     <img
//                       src={`http://localhost:5000/uploads/${detail.photo}`} // Replace with your actual image URL or path
//                       alt={`Product ${detail.pid}`}
//                       style={{ maxWidth: '100px', maxHeight: '100px' }} // Adjust the style as needed
//                     />
//                   ) : (
//                     <span>No photo available</span>
//                   )}
//                 </td>
//                 <td>

//                 </td>
//                 {/* Add similar cells for other product details */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     ) : (
//       <p>No product details found for this retailer.</p>
//     )}

//     {/* Price Update Modal */}
//     <Dialog open={openModal} onClose={handleCloseModal}>
//       <DialogTitle>Update Product Price</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="New Price"
//           variant="outlined"
//           value={newPrice}
//           onChange={(e) => setNewPrice(e.target.value)}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCloseModal}>Cancel</Button>
//         <Button onClick={handlePriceUpdate} variant="contained" color="primary">
//           Update Price
//         </Button>
//       </DialogActions>
//     </Dialog>


    
//     {/* Discount Update Modal */}
//     <Dialog open={openModal} onClose={handleCloseModal}>
//       <DialogTitle>Update Product Discount</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="New Discount"
//           variant="outlined"
//           value={newDiscount}
//           onChange={(e) => setNewDiscount(e.target.value)}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCloseModal}>Cancel</Button>
//         <Button onClick={handleDiscountUpdate} variant="contained" color="primary">
//           Update Discount
//         </Button>
//       </DialogActions>
//     </Dialog>

//       {/* Quantity Update Modal */}
//       <Dialog open={openModal} onClose={handleCloseModal}>
//       <DialogTitle>Update Product Quantity</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="New Quantity"
//           variant="outlined"
//           value={newQuantity}
//           onChange={(e) => setNewQuantity(e.target.value)}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCloseModal}>Cancel</Button>
//         <Button onClick={handleQuantityUpdate} variant="contained" color="primary">
//           Update Quantity
//         </Button>
//       </DialogActions>
//     </Dialog>
//   </div>
// )}
// </Sidebar>
// );
//     }



// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar';
// import Head from 'next/head';
// import css from '../../../styles/product.module.css';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';

// export default function Product() {
//   const [value, setValue] = useState('one');
//   const [formData, setFormData] = useState({
//     Reg_no: '',
//     pid: '',
//     pname: '',
//     subcategoryid: '',
//     price: '',
//     discount: '',
//     brand_name: '',
//     quantity: '',
//     photo: null,
//   });
//   const [productDetails, setProductDetails] = useState(null);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);

//   const [subcategoryNames, setSubcategoryNames] = useState([]);
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const formDataWithFile = new FormData();
//       for (const key in formData) {
//         formDataWithFile.append(key, formData[key]);
//       }

//       const response = await axios.post('http://localhost:5000/api/addproduct', formDataWithFile);

//       if (response.status === 200) {
//         alert('product information added successfully');
//         router.push('/');
//       } else {
//         alert('Failed to add product information');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       photo: file,
//     });
//   };

//   const fetchSubcategoryNames = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/subcategory/viewsabcategory');
//       if (response.status === 200) {
//         setSubcategoryNames(response.data);
//       } else {
//         setSubcategoryNames([]);
//       }
//     } catch (error) {
//       console.error(error);
//       setSubcategoryNames([]);
//     }
//   };
  
//   useEffect(() => {
//     fetchSubcategoryNames();
//   }, []);


//   useEffect(() => {
//     const regNoFromLocalStorage = localStorage.getItem('Reg_no');
//     if (regNoFromLocalStorage) {
//       setFormData({ ...formData, Reg_no: regNoFromLocalStorage });

//       const fetchProductDetails = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/api/getproductsbyregno/${regNoFromLocalStorage}`);
//           if (response.status === 200) {
//             setProductDetails(response.data);
//           } else {
//             setProductDetails(null);
//           }
//         } catch (error) {
//           console.error(error);
//           setProductDetails(null);
//         }
//       };

//       fetchProductDetails();
//     }
//   }, [formData]);


  
//   const [newPrice, setNewPrice] = useState('');
//   const handlePriceUpdate = async () => {
//     try {
//       if (selectedProductId && newPrice) {
//         const response = await axios.patch(
//           `http://localhost:5000/api/updateproductprice/${selectedProductId}`,
//           { price: newPrice }
//         );

//         if (response.status === 200) {
//           handleCloseModal();
//         } else {
//           console.error('Failed to update product price');
//         }
//       } else {
//         console.error('Selected product ID or new price is missing');
//       }
//     } catch (error) {
//       console.error('An error occurred while updating product price:', error);
//     }
//   };

//   const handleOpenModal = (productId, currentPrice) => {
//     setOpenModal(true);
//     setSelectedProductId(productId);
//     setNewPrice(currentPrice);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };



//   return (
//     <Sidebar>
//         <div className={css.fullHeight}>
//         <Head>
//           <link rel="stylesheet" href="/banking.css" />
//         </Head>
//         <Box sx={{ width: '100%' }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             textColor="secondary"
//             indicatorColor="secondary"
//             aria-label="secondary tabs example"
//           >
//             <Tab value="one" label="ADD" />
//             <Tab value="two" label="View" />
//           </Tabs>
//         </Box>
//       </div>

//       {value === 'one' && (
       
//           <div className={css.formContainer}>
//             <h2 className={css.formHeader}>ADD Product Details</h2>
//             <form className={css.form} onSubmit={handleSubmit}>
//               <div className={css.formGroup}>
//                 <label htmlFor="Reg_no" className={css.formLabel}>Registration Number</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="Reg_no"
//                   name="Reg_no"
//                   placeholder="Enter Registration Number"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.Reg_no}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="pid" className={css.formLabel}>Product ID</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="pid"
//                   name="pid"
//                   placeholder="Enter Product ID"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.pid}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="pname" className={css.formLabel}>Product Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="pname"
//                   name="pname"
//                   placeholder="Enter Product Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.pname}
//                 />
//               </div>

//               <div className={css.formGroup}>
//   <label htmlFor="subcategoryid" className={css.formLabel}>Subcategory ID</label>
//   <select
//     className={css.formControl}
//     id="subcategoryid"
//     name="subcategoryid"
//     onChange={handleInputChange}
//     value={formData.subcategoryid}
//   >
//     <option value="">Select Subcategory</option>
//     {subcategoryNames.map((subcategory) => (
//       <option key={subcategory.id} value={subcategory.id}>
//         {subcategory.subcategoryname}
//       </option>
//     ))}
//   </select>
// </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="price" className={css.formLabel}>Price</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="price"
//                   name="price"
//                   placeholder="Enter Price"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.price}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="discount" className={css.formLabel}>Discount</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="discount"
//                   name="discount"
//                   placeholder="Enter Discount"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.discount}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="brand_name" className={css.formLabel}>Brand Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="brand_name"
//                   name="brand_name"
//                   placeholder="Enter Brand Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.brand_name}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="quantity" className={css.formLabel}>Quantity</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="quantity"
//                   name="quantity"
//                   placeholder="Enter Quantity"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.quantity}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="photo" className={css.formLabel}>Photo</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className={css.formControl}
//                   id="photo"
//                   name="photo"
//                   onChange={handleFileChange}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <button type="submit" className={css.submitButton}>Submit</button>
//               </div>
//             </form>
//           </div>
       
//       )}



// {value === 'two' && (
//   <div className={css.tableContainer}>
//     <h2>View Product Details</h2>
//     {productDetails && productDetails.length > 0 ? (
//       <div className={css.table}>
//         <table className={css.table}>
//           <thead>
//             <tr>
             
//               <th>Product ID</th>
//               <th>Product Name</th>
//               <th>Subcategory ID</th>
//               <th>Price</th>
              
//               <th>Discount</th>
//               <th>Brand Name</th>
//               <th>Quantity</th>
//               <th>Photo</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productDetails.map((detail, index) => (
//               <tr key={index}>
              
//                 <td>{detail.pid}</td>
//                 <td>{detail.pname}</td>
//                 <td>{detail.subcategoryid}</td>
//                 <td>
//                   {detail.price}
//                   <button onClick={() => handleOpenModal(detail.pid, detail.price)}>
//                     Update Price
//                   </button>
//                 </td>
//                 <td>{detail.discount}</td>
//                 <td>{detail.brand_name}</td>
//                 <td>{detail.quantity}</td>
//                 <td>
//                   {detail.photo ? (
//                     <img
//                       src={`http://localhost:5000/uploads/${detail.photo}`} // Replace with your actual image URL or path
//                       alt={`Product ${detail.pid}`}
//                       style={{ maxWidth: '100px', maxHeight: '100px' }} // Adjust the style as needed
//                     />
//                   ) : (
//                     <span>No photo available</span>
//                   )}
//                 </td>
//                 {/* Add similar cells for other product details */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     ) : (
//       <p>No product details found for this retailer.</p>
//     )}

//     {/* Price Update Modal */}
//     <Dialog open={openModal} onClose={handleCloseModal}>
//       <DialogTitle>Update Product Price</DialogTitle>
//       <DialogContent>
//         <TextField
//           label="New Price"
//           variant="outlined"
//           value={newPrice}
//           onChange={(e) => setNewPrice(e.target.value)}
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleCloseModal}>Cancel</Button>
//         <Button onClick={handlePriceUpdate} variant="contained" color="primary">
//           Update Price
//         </Button>
//       </DialogActions>
//     </Dialog>
//   </div>
// )}
// </Sidebar>
// );
//     }


// import React, { useState, useEffect } from 'react';

// import { useRouter } from 'next/router';
// import axios from 'axios';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar';
// import Head from 'next/head';
// import css from '../../../styles/product.module.css';

// export default function Product() {
//   const [value, setValue] = useState('one');
//   const [formData, setFormData] = useState({
//     Reg_no: '',
//     pid: '',
//     pname: '',
//     subcategoryid: '',
//     price: '',
//     discount: '',
//     brand_name: '',
//     quantity: '',
//     photo: null,
//   });
//   const [productDetails, setProductDetails] = useState(null);
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const formDataWithFile = new FormData();
//       for (const key in formData) {
//         formDataWithFile.append(key, formData[key]);
//       }

//       const response = await axios.post('http://localhost:5000/api/addproduct', formDataWithFile);

//       if (response.status === 200) {
//         alert('product information added successfully');
//         router.push('/');
//       } else {
//         alert('Failed to add product information');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       photo: file,
//     });
//   };


//   useEffect(() => {
//     const regNoFromLocalStorage = localStorage.getItem('Reg_no');
//     if (regNoFromLocalStorage) {
//       setFormData({ ...formData, Reg_no: regNoFromLocalStorage });

//       const fetchProductDetails = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/api/getproductsbyregno/${regNoFromLocalStorage}`);
//           if (response.status === 200) {
//             setProductDetails(response.data);
//           } else {
//             setProductDetails(null);
//           }
//         } catch (error) {
//           console.error(error);
//           setProductDetails(null);
//         }
//       };

//       fetchProductDetails();
//     }
//   }, [formData]);

//   const [subcategoryNames, setSubcategoryNames] = useState([]);
//   // Assuming subcategoryid refers to the ID of the subcategory, and subcategoryname is its name
  
//   // Fetch subcategory names from your API
//   const fetchSubcategoryNames = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/subcategory/viewsabcategory');
//       if (response.status === 200) {
//         setSubcategoryNames(response.data); // Assuming response.data is an array of objects with subcategory IDs and names
//       } else {
//         setSubcategoryNames([]); // Set an empty array if no data is available
//       }
//     } catch (error) {
//       console.error(error);
//       setSubcategoryNames([]); // Set an empty array in case of an error
//     }
//   };
  
//   useEffect(() => {
//     fetchSubcategoryNames();
//   }, []);


//   return (
//     <Sidebar>
//         <div className={css.fullHeight}>
//         <Head>
//           <link rel="stylesheet" href="/banking.css" />
//         </Head>
//         <Box sx={{ width: '100%' }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             textColor="secondary"
//             indicatorColor="secondary"
//             aria-label="secondary tabs example"
//           >
//             <Tab value="one" label="ADD" />
//             <Tab value="two" label="View" />
//           </Tabs>
//         </Box>
//       </div>

//       {value === 'one' && (
       
//           <div className={css.formContainer}>
//             <h2 className={css.formHeader}>ADD Product Details</h2>
//             <form className={css.form} onSubmit={handleSubmit}>
//               <div className={css.formGroup}>
//                 <label htmlFor="Reg_no" className={css.formLabel}>Registration Number</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="Reg_no"
//                   name="Reg_no"
//                   placeholder="Enter Registration Number"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.Reg_no}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="pid" className={css.formLabel}>Product ID</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="pid"
//                   name="pid"
//                   placeholder="Enter Product ID"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.pid}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="pname" className={css.formLabel}>Product Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="pname"
//                   name="pname"
//                   placeholder="Enter Product Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.pname}
//                 />
//               </div>

//               <div className={css.formGroup}>
//   <label htmlFor="subcategoryid" className={css.formLabel}>Subcategory ID</label>
//   <select
//     className={css.formControl}
//     id="subcategoryid"
//     name="subcategoryid"
//     onChange={handleInputChange}
//     value={formData.subcategoryid}
//   >
//     <option value="">Select Subcategory</option>
//     {subcategoryNames.map((subcategory) => (
//       <option key={subcategory.id} value={subcategory.id}>
//         {subcategory.subcategoryname}
//       </option>
//     ))}
//   </select>
// </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="price" className={css.formLabel}>Price</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="price"
//                   name="price"
//                   placeholder="Enter Price"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.price}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="discount" className={css.formLabel}>Discount</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="discount"
//                   name="discount"
//                   placeholder="Enter Discount"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.discount}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="brand_name" className={css.formLabel}>Brand Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="brand_name"
//                   name="brand_name"
//                   placeholder="Enter Brand Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.brand_name}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="quantity" className={css.formLabel}>Quantity</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="quantity"
//                   name="quantity"
//                   placeholder="Enter Quantity"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.quantity}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="photo" className={css.formLabel}>Photo</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className={css.formControl}
//                   id="photo"
//                   name="photo"
//                   onChange={handleFileChange}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <button type="submit" className={css.submitButton}>Submit</button>
//               </div>
//             </form>
//           </div>
       
//       )}

//       {value === 'two' && (
//         <div className={css.tableContainer}>
//           <h2>View Product Details</h2>
//           {productDetails && productDetails.length > 0 ? (
//             <div className={css.table}>
//               <table className={css.table}>
//               <thead>
//             <tr>
//               <th>Registration no</th>
//               <th>Product ID</th>
//               <th>Product Name</th>
//               <th>Subcategory ID</th>
//               <th>Price</th>
//               <th>Discount</th>
//               <th>Brand Name</th>
//               <th>Quantity</th>
//               <th>Photo</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productDetails.map((detail, index) => (
//               <tr key={index}>
//                 <td>{detail.Reg_no}</td>
//                 <td>{detail.pid}</td>
//                 <td>{detail.pname}</td>
//                 <td>{detail.subcategoryid}</td>
//                 <td>{detail.price}</td>
//                 <td>{detail.discount}</td>
//                 <td>{detail.brand_name}</td>
//                 <td>{detail.quantity}</td>
//                 <td>
//                 {detail.photo ? (
//                     <img
//                       src={`http://localhost:5000/uploads/${detail.photo}`} // Replace with your actual image URL or path
//                       alt={`Product ${detail.pid}`}
//                       style={{ maxWidth: '100px', maxHeight: '100px' }} // Adjust the style as needed
//                     />
//                   ) : (
//                     <span>No photo available</span>
//                   )}
//                 </td>
//                 {/* Add similar cells for other product details */}
//               </tr>
//             ))}
//           </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>No product details found for this retailer.</p>
//           )}
//         </div>
//       )}
//     </Sidebar>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import Sidebar from '../sidebar/sidebar';
// import { Button, Tabs, Tab } from 'react-bootstrap';
// import axios from 'axios';

// function Product() {
//     const [data, setData] = useState([]);
//     const [values, setValues] = useState({
//         pid: '',
//         pname: '',
//         subCategoryid: '',
//         price: '',
//         discount: '',
//         brandname: '',
//         quantity: '',
//         regno: '',
//         photo: null,
//     });

//     useEffect(() => {
//         // Fetch subcategories from an API endpoint
//         axios.get('http://localhost:5000/api/admin/subcategory/viewsabcategory')
//             .then(res => {
//                 if (res.status === 200) {
//                     setData(res.data.result);
//                 } else {
//                     alert("Error");
//                 }
//             })
//             .catch(err => console.log(err));
//     }, []);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         // Add your form submission logic here using the values state
//         console.log(values);
//     };

//     return (
//         <>
//             <Sidebar>
//                 <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3" style={{ marginLeft: '20px', color: 'black' }} >
//                     <Tab eventKey="Add" title="Add">
//                         <div style={{ marginLeft: '50px', padding: '5px', width: '500px', height: '500px' }}>
//                             <div className="row">
//                                 <div className="col">
//                                     <label htmlFor="formGroupExampleInput" className="form-label">Product ID</label>
//                                     <input type="text" className="form-control" id="formGroupExampleInput" name="pid" onChange={e => setValues({ ...values, pid: e.target.value })} />
//                                 </div>
//                                 <div className="col">
//                                     <label htmlFor="formGroupExampleInput2" className="form-label">Product Name</label>
//                                     <input type="text" className="form-control" id="formGroupExampleInput2" name="pname" onChange={e => setValues({ ...values, pname: e.target.value })} />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col">
//                                     <h6 style={{ marginTop: '10px' }}>Add Sub Category</h6>
//                                     <select className="form-select" aria-label="Default select example" onChange={e => setValues({ ...values, subCategoryid: e.target.value })}>
//                                         <option defaultValue>Open this select menu</option>
//                                         {data.map((item, index) => (
//                                             <option key={index} value={item.subCategoryid}>{item.subCategoryname}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col">
//                                     <label htmlFor="price" className="form-label">Price</label>
//                                     <input type="text" className="form-control" id="price" name="price" onChange={e => setValues({ ...values, price: e.target.value })} />
//                                 </div>
//                                 <div className="col">
//                                     <label htmlFor="discount" className="form-label">Discount</label>
//                                     <input type="text" className="form-control" id="discount" name="discount" onChange={e => setValues({ ...values, discount: e.target.value })} />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col">
//                                     <label htmlFor="brandname" className="form-label">Brand Name</label>
//                                     <input type="text" className="form-control" id="brandname" name="brandname" onChange={e => setValues({ ...values, brandname: e.target.value })} />
//                                 </div>
//                                 <div className="col">
//                                     <label htmlFor="quantity" className="form-label">Quantity</label>
//                                     <input type="text" className="form-control" id="quantity" name="quantity" onChange={e => setValues({ ...values, quantity: e.target.value })} />
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col">
//                                     <label htmlFor="regno" className="form-label">Registration no</label>
//                                     <input type="text" className="form-control" id="regno" name="regno" onChange={e => setValues({ ...values, regno: e.target.value })} />
//                                 </div>
//                                 <div className="col">
//                                     <label htmlFor="photo" className="form-label">Photo</label>
//                                     <input type="file" className="form-control" id="photo" name="photo" onChange={e => setValues({ ...values, photo: e.target.files[0] })} />
//                                 </div>
//                             </div>
//                             <Button className="btn-success" onClick={handleSubmit} style={{ marginLeft: '270px', marginTop: '20px' }}>SAVE</Button>
//                         </div>
//                     </Tab>
//                 </Tabs>
//             </Sidebar>
//         </>
//     );
// }

// export default Product;




// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar';
// import Head from 'next/head';
// import css from '../../../styles/product.module.css';

// export default function Product() {
//   const [value, setValue] = useState('one');
//   const [formData, setFormData] = useState({
//     Reg_no: '',
//     pid: '',
//     pname: '',
//     subcategoryid: '',
//     price: '',
//     discount: '',
//     brand_name: '',
//     quantity: '',
//     photo: null,
//   });
//   const [productDetails, setProductDetails] = useState(null);
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const formDataWithFile = new FormData();
//       for (const key in formData) {
//         formDataWithFile.append(key, formData[key]);
//       }

//       const response = await axios.post('http://localhost:5000/api/addproduct', formDataWithFile);

//       if (response.status === 200) {
//         alert('product information added successfully');
//         router.push('/');
//       } else {
//         alert('Failed to add product information');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({
//       ...formData,
//       photo: file,
//     });
//   };


//   useEffect(() => {
//     const regNoFromLocalStorage = localStorage.getItem('Reg_no');
//     if (regNoFromLocalStorage) {
//       setFormData({ ...formData, Reg_no: regNoFromLocalStorage });

//       const fetchProductDetails = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/api/getproductsbyregno/${regNoFromLocalStorage}`);
//           if (response.status === 200) {
//             setProductDetails(response.data);
//           } else {
//             setProductDetails(null);
//           }
//         } catch (error) {
//           console.error(error);
//           setProductDetails(null);
//         }
//       };

//       fetchProductDetails();
//     }
//   }, [formData]);

//   return (
//     <Sidebar>
//         <div className={css.fullHeight}>
//         <Head>
//           <link rel="stylesheet" href="/banking.css" />
//         </Head>
//         <Box sx={{ width: '100%' }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             textColor="secondary"
//             indicatorColor="secondary"
//             aria-label="secondary tabs example"
//           >
//             <Tab value="one" label="ADD" />
//             <Tab value="two" label="View" />
//           </Tabs>
//         </Box>
//       </div>

//       {value === 'one' && (
       
//           <div className={css.formContainer}>
//             <h2 className={css.formHeader}>ADD Product Details</h2>
//             <form className={css.form} onSubmit={handleSubmit}>
//               <div className={css.formGroup}>
//                 <label htmlFor="Reg_no" className={css.formLabel}>Registration Number</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="Reg_no"
//                   name="Reg_no"
//                   placeholder="Enter Registration Number"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.Reg_no}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="pid" className={css.formLabel}>Product ID</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="pid"
//                   name="pid"
//                   placeholder="Enter Product ID"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.pid}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="pname" className={css.formLabel}>Product Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="pname"
//                   name="pname"
//                   placeholder="Enter Product Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.pname}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="subcategoryid" className={css.formLabel}>Subcategory ID</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="subcategoryid"
//                   name="subcategoryid"
//                   placeholder="Enter Subcategory ID"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.subcategoryid}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="price" className={css.formLabel}>Price</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="price"
//                   name="price"
//                   placeholder="Enter Price"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.price}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="discount" className={css.formLabel}>Discount</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="discount"
//                   name="discount"
//                   placeholder="Enter Discount"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.discount}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="brand_name" className={css.formLabel}>Brand Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="brand_name"
//                   name="brand_name"
//                   placeholder="Enter Brand Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.brand_name}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="quantity" className={css.formLabel}>Quantity</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="quantity"
//                   name="quantity"
//                   placeholder="Enter Quantity"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                   value={formData.quantity}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <label htmlFor="photo" className={css.formLabel}>Photo</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   className={css.formControl}
//                   id="photo"
//                   name="photo"
//                   onChange={handleFileChange}
//                 />
//               </div>

//               <div className={css.formGroup}>
//                 <button type="submit" className={css.submitButton}>Submit</button>
//               </div>
//             </form>
//           </div>
       
//       )}

//       {value === 'two' && (
//         <div className={css.tableContainer}>
//           <h2>View Product Details</h2>
//           {productDetails && productDetails.length > 0 ? (
//             <div className={css.table}>
//               <table className={css.table}>
//               <thead>
//             <tr>
//               <th>Registration no</th>
//               <th>Product ID</th>
//               <th>Product Name</th>
//               <th>Subcategory ID</th>
//               <th>Price</th>
//               <th>Discount</th>
//               <th>Brand Name</th>
//               <th>Quantity</th>
//               <th>Photo</th>
//             </tr>
//           </thead>
//           <tbody>
//             {productDetails.map((detail, index) => (
//               <tr key={index}>
//                 <td>{detail.Reg_no}</td>
//                 <td>{detail.pid}</td>
//                 <td>{detail.pname}</td>
//                 <td>{detail.subcategoryid}</td>
//                 <td>{detail.price}</td>
//                 <td>{detail.discount}</td>
//                 <td>{detail.brand_name}</td>
//                 <td>{detail.quantity}</td>
//                 <td>
//                 {detail.photo ? (
//                     <img
//                       src={`http://localhost:5000/uploads/${detail.photo}`} // Replace with your actual image URL or path
//                       alt={`Product ${detail.pid}`}
//                       style={{ maxWidth: '100px', maxHeight: '100px' }} // Adjust the style as needed
//                     />
//                   ) : (
//                     <span>No photo available</span>
//                   )}
//                 </td>
//                 {/* Add similar cells for other product details */}
//               </tr>
//             ))}
//           </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>No product details found for this retailer.</p>
//           )}
//         </div>
//       )}
//     </Sidebar>
//   );
// }

// import React, { useState } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import css from '../../../styles/product.module.css'; // Import your external CSS module

// export default function Banking() {
//   const [value, setValue] = useState('one');
//   const [data, setData] = useState({
//     pid: '',
//     pname: '',
//     subcategoryid: '',
//     Reg_no: '',
//     price: '',
//     discount: '',
//     brand_name: '',
//     quantity: '',
//     photo: null,
//   });

//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
  
//     try {
//       const response = await axios.post('http://localhost:5000/api/addproduct', data);
//       console.log(data); // Log the data object
  
//       if (response.status === 200) {
//         router.push('/');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };
  

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Sidebar>
//       <div>
//         <Head>
//           <link rel="stylesheet" href="/banking.css" /> {/* Link to the external CSS */}
//         </Head>
//         <Box sx={{ width: '100%' }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             textColor="secondary"
//             indicatorColor="secondary"
//             aria-label="secondary tabs example"
//           >
//             <Tab value="one" label="ADD" />
//             <Tab value="two" label="View" />
//           </Tabs>
//         </Box>
//       </div>

//       {value === 'one' && (
//         <div>
//           <div className={css.formContainer} >
//             <h2 className={css.formHeader}>ADD PRODUCT</h2>
//             <form className={css.form} onSubmit={handleSubmit}>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputReg_no" className={css.formLabel}>Reg_no</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputReg_no"
//                   placeholder='Enter Reg_no'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, Reg_no: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputPid" className={css.formLabel}>Product ID</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputPid"
//                   placeholder='Enter Product ID'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, pid: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputPname" className={css.formLabel}>Product Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputPname"
//                   placeholder='Enter Product Name'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, pname: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputSubcategoryId" className={css.formLabel}>Subcategory ID</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputSubcategoryId"
//                   placeholder='Enter Subcategory ID'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, subcategoryid: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputPrice" className={css.formLabel}>Price</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputPrice"
//                   placeholder='Enter Price'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, price: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputDiscount" className={css.formLabel}>Discount</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputDiscount"
//                   placeholder='Enter Discount'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, discount: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputBrandName" className={css.formLabel}>Brand Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputBrandName"
//                   placeholder='Enter Brand Name'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, brand_name: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputQuantity" className={css.formLabel}>Quantity</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputQuantity"
//                   placeholder='Enter Quantity'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, quantity: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputQuantity" className={css.formLabel}>Select Photo</label>
//                 <input
//                   type="file"
//                   className={css.formControl}
//                   id="inputPhoto"
//                   placeholder='Select Photo'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, photo: e.target.files[0] })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <button type="submit" className={css.submitButton}>Submit</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {value === 'two' && (
//         <div>
//           <h1>View Tab Content</h1>
//           <p>This is the content for the View tab.</p>
//         </div>
//       )}
//     </Sidebar>
//   );
// }


//////////////////////////////////////////////////////////////


// import React, { useState } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import css from '../../../styles/product.module.css'; // Import your external CSS module

// export default function Banking() {
//   const [value, setValue] = useState('one');
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formdata = new FormData();
//     formdata.append('pid', event.target.pid.value);
//     formdata.append('pname', event.target.pname.value);
//     formdata.append('subcategoryid', event.target.subcategoryid.value);
//     formdata.append('price', event.target.price.value);
//     formdata.append('discount', event.target.discount.value);
//     formdata.append('brand_name', event.target.brand_name.value);
//     formdata.append('quantity', event.target.quantity.value);
//     formdata.append('Reg_no', event.target.Reg_no.value);
//     formdata.append('photo', event.target.photo.files[0]);

//     try {
//       const response = await axios.post('http://localhost:5000/api/addproduct', formdata);
//       console.log(response.data);

//       if (response.data.affectedRows === 1) {
//         alert('Product added successfully');
//         router.push('/');
//       } else {
//         alert('Failed to add the product');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Sidebar>
//       <div>
//         <Head>
//           <link rel="stylesheet" href="/banking.css" /> {/* Link to the external CSS */}
//         </Head>
//         <Box sx={{ width: '100%' }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             textColor="secondary"
//             indicatorColor="secondary"
//             aria-label="secondary tabs example"
//           >
//             <Tab value="one" label="ADD" />
//             <Tab value="two" label="View" />
//           </Tabs>
//         </Box>
//       </div>

//       {value === 'one' && (
//         <div>
//           <div className={css.formContainer}>
//             <h2 className={css.formHeader}>ADD PRODUCT</h2>
//             <form className={css.form} onSubmit={handleSubmit}>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputReg_no" className={css.formLabel}>Reg no</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputReg_no"
//                   name="Reg_no"
//                   placeholder='Enter Reg_no'
//                   autoComplete='off'
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputPid" className={css.formLabel}>Product ID</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputPid"
//                   name="pid"
//                   placeholder='Enter Product ID'
//                   autoComplete='off'
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputPname" className={css.formLabel}>Product Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputPname"
//                   name="pname"
//                   placeholder='Enter Product Name'
//                   autoComplete='off'
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputSubcategoryId" className={css.formLabel}>Subcategory ID</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputSubcategoryId"
//                   name="subcategoryid"
//                   placeholder='Enter Subcategory ID'
//                   autoComplete='off'
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputPrice" className={css.formLabel}>Price</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputPrice"
//                   name="price"
//                   placeholder='Enter Price'
//                   autoComplete='off'
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputDiscount" className={css.formLabel}>Discount</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputDiscount"
//                   name="discount"
//                   placeholder='Enter Discount'
//                   autoComplete='off'
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputBrandName" className={css.formLabel}>Brand Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputBrandName"
//                   name="brand_name"
//                   placeholder='Enter Brand Name'
//                   autoComplete='off'
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputQuantity" className={css.formLabel}>Quantity</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputQuantity"
//                   name="quantity"
//                   placeholder='Enter Quantity'
//                   autoComplete='off'
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputQuantity" className={css.formLabel}>Select Photo</label>
//                 <input
//                   type="file"
//                   className={css.formControl}
//                   id="inputPhoto"
//                   name="photo"
//                   placeholder='Select Photo'
//                   autoComplete='off'
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <button type="submit" className={css.submitButton}>Submit</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {value === 'two' && (
//         <div>
//           <h1>View Tab Content</h1>
//           <p>This is the content for the View tab.</p>
//         </div>
//       )}
//     </Sidebar>
//   );
// }
