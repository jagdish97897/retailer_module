

// banking.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Sidebar from '../sidebar/sidebar';
import style from '../../../styles/banking.module.css';

export default function Banking() {
  const [value, setValue] = useState('one');
  const [formData, setFormData] = useState({
    Reg_no: '',
    Bankaccountno: '',
    Bankaccountname: '',
    Ifsc: '',
    Bankname: '',
    Branch: '',
    upi: '',
  });
  const [bankingDetails, setBankingDetails] = useState(null);
  const router = useRouter();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/addbankingdetail', formData);

      if (response.status === 200) {
        console.log('Banking details added successfully');
        setFormData({
          Reg_no: '',
          Bankaccountno: '',
          Bankaccountname: '',
          Ifsc: '',
          Bankname: '',
          Branch: '',
          upi: '',
        });
        fetchBankingDetails(); // Fetch updated details after submission
      } else {
        console.error('Failed to add banking details');
      }
    } catch (error) {
      console.error('Error adding banking details:', error);
    }
  };

  const fetchBankingDetails = async () => {
    try {
      const regNoFromLocalStorage = localStorage.getItem('Reg_no');
      if (regNoFromLocalStorage) {
        setFormData({ ...formData, Reg_no: regNoFromLocalStorage });

        const response = await axios.get(`http://localhost:5000/api/viewbankingdetail/${regNoFromLocalStorage}`);

        if (response.status === 200) {
          setBankingDetails(response.data);
        } else {
          setBankingDetails(null);
        }
      }
    } catch (error) {
      console.error(error);
      setBankingDetails(null);
    }
  };

  useEffect(() => {
    fetchBankingDetails();
  }, []); // Fetch banking details on component mount

  return (
    <Sidebar>
      <div className={style.tabsContainer}>
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

        {value === 'one' && (
  <div  >
    <h2>ADD Banking</h2>
    <form  className={style.form}  onSubmit={handleSubmit}>
    <div>
        <label htmlFor="Registation no">Regastation no:</label>
        <input
          type="text"
          id="Reg_no"
          name="Reg_no"
          value={formData.Reg_no}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="Bankaccountno">Bank Account Number:</label>
        <input
          type="text"
          id="Bankaccountno"
          name="Bankaccountno"
          value={formData.Bankaccountno}
          onChange={handleInputChange}
        />
      </div>
      
      <div>
        <label htmlFor="Bankaccountname">Bank Account Name:</label>
        <input
          type="text"
          id="Bankaccountname"
          name="Bankaccountname"
          value={formData.Bankaccountname}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="Ifsc">IFSC Code:</label>
        <input
          type="text"
          id="Ifsc"
          name="Ifsc"
          value={formData.Ifsc}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="Bankname">Bank Name:</label>
        <input
          type="text"
          id="Bankname"
          name="Bankname"
          value={formData.Bankname}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="Branch">Branch:</label>
        <input
          type="text"
          id="Branch"
          name="Branch"
          value={formData.Branch}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="upi">UPI:</label>
        <input
          type="text"
          id="upi"
          name="upi"
          value={formData.upi}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
)}

        {value === 'two' && (
          <div>
            <h2>View Banking Details</h2>
            {bankingDetails && bankingDetails.length > 0 ? (
              <div className={style.tableContainer}>
                <table className={style.table}>
                  <thead>
                    <tr>
                      <th>Registration No</th>
                      <th>Bank Account Number</th>
                      <th>Bank Account Name</th>
                      <th>IFSC Code</th>
                      <th>Bank Name</th>
                      <th>Branch</th>
                      <th>UPI</th>
                      {/* Add additional headers if needed */}
                    </tr>
                  </thead>
                  <tbody>
                    {bankingDetails.map((detail, index) => (
                      <tr key={index}>
                        <td>{detail.Reg_no}</td>
                        <td>{detail.Bankaccountno}</td>
                        <td>{detail.Bankaccountname}</td>
                        <td>{detail.Ifsc}</td>
                        <td>{detail.Bankname}</td>
                        <td>{detail.Branch}</td>
                        <td>{detail.upi}</td>
                        {/* Display additional banking details in respective cells */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No banking details found for this retailer.</p>
            )}
          </div>
        )}
      </div>
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
// import style from '../../../styles/banking.module.css';
// export default function Banking() {
//   const [value, setValue] = useState('one');
//   const [formData, setFormData] = useState({
//     Reg_no: '',
//     Bankaccountno: '',
//     Bankaccountname: '',
//     Ifsc: '',
//     Bankname: '',
//     Branch: '',
//     upi: '',
//   });
//   const [bankingDetails, setBankingDetails] = useState(null);
//   const router = useRouter();

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

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/addbankingdetail', formData);

//       if (response.status === 200) {
//         console.log('Banking details added successfully');
//         setFormData({
//           Reg_no: '',
//           Bankaccountno: '',
//           Bankaccountname: '',
//           Ifsc: '',
//           Bankname: '',
//           Branch: '',
//           upi: '',
//         });
//         fetchBankingDetails(); // Fetch updated details after submission
//       } else {
//         console.error('Failed to add banking details');
//       }
//     } catch (error) {
//       console.error('Error adding banking details:', error);
//     }
//   };

//   const fetchBankingDetails = async () => {
//     try {
//       const regNoFromLocalStorage = localStorage.getItem('Reg_no');
//       if (regNoFromLocalStorage) {
//         setFormData({ ...formData, Reg_no: regNoFromLocalStorage });

//         const response = await axios.get(`http://localhost:5000/api/viewbankingdetail/${regNoFromLocalStorage}`);

//         if (response.status === 200) {
//           setBankingDetails(response.data);
//         } else {
//           setBankingDetails(null);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       setBankingDetails(null);
//     }
//   };

//   useEffect(() => {
//     fetchBankingDetails();
//   }, []); // Fetch banking details on component mount


//   return (
//     <Sidebar>
//       <div>
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

//         {value === 'one' && (
//   <div>
//     <h2>ADD Banking</h2>
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="Bankaccountno">Bank Account Number:</label>
//         <input
//           type="text"
//           id="Bankaccountno"
//           name="Bankaccountno"
//           value={formData.Bankaccountno}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="Bankaccountname">Bank Account Name:</label>
//         <input
//           type="text"
//           id="Bankaccountname"
//           name="Bankaccountname"
//           value={formData.Bankaccountname}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="Ifsc">IFSC Code:</label>
//         <input
//           type="text"
//           id="Ifsc"
//           name="Ifsc"
//           value={formData.Ifsc}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="Bankname">Bank Name:</label>
//         <input
//           type="text"
//           id="Bankname"
//           name="Bankname"
//           value={formData.Bankname}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="Branch">Branch:</label>
//         <input
//           type="text"
//           id="Branch"
//           name="Branch"
//           value={formData.Branch}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <label htmlFor="upi">UPI:</label>
//         <input
//           type="text"
//           id="upi"
//           name="upi"
//           value={formData.upi}
//           onChange={handleInputChange}
//         />
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   </div>
// )}

// {value === 'two' && (
//           <div>
//             <h2>View Banking Details</h2>
//             {bankingDetails && bankingDetails.length > 0 ? (
//               <div className="tableContainer">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>Registration No</th>
//                       <th>Bank Account Number</th>
//                       <th>Bank Account Name</th>
//                       <th>IFSC Code</th>
//                       <th>Bank Name</th>
//                       <th>Branch</th>
//                       <th>UPI</th>
//                       {/* Add additional headers if needed */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {bankingDetails.map((detail, index) => (
//                       <tr key={index}>
//                         <td>{detail.Reg_no}</td>
//                         <td>{detail.Bankaccountno}</td>
//                         <td>{detail.Bankaccountname}</td>
//                         <td>{detail.Ifsc}</td>
//                         <td>{detail.Bankname}</td>
//                         <td>{detail.Branch}</td>
//                         <td>{detail.upi}</td>
//                         {/* Display additional banking details in respective cells */}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             ) : (
//               <p>No banking details found for this retailer.</p>
//             )}
//           </div>
//         )}
//       </div>
//     </Sidebar>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar'; 

// export default function Banking() {
//   const [value, setValue] = useState('one');
//   const [formData, setFormData] = useState({
//     Reg_no: '',
//     Bankaccountno: '',
//     Bankaccountname: '',
//     Ifsc: '',
//     Bankname: '',
//     Branch: '',
//     upi: '',
//   });
//   const [bankingDetails, setBankingDetails] = useState(null); // State to store fetched banking details
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     // Your existing form submission logic
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

//   // Function to fetch banking details based on provided Reg_no
//   const fetchBankingDetails = async (regNo) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/viewbankingdetail/${regNo}`);
//       if (response.status === 200) {
//         setBankingDetails(response.data); // Set the retrieved banking details in state
//       } else {
//         setBankingDetails(null); // Clear banking details state
//       }
//     } catch (error) {
//       console.error(error);
//       setBankingDetails(null); // Clear banking details state in case of an error
//     }
//   };

//   useEffect(() => {
//     // Fetch banking details for the provided Reg_no on component mount
//     const regNoFromLocalStorage = localStorage.getItem('Reg_no');
//     if (regNoFromLocalStorage) {
//       setFormData({ ...formData, Reg_no: regNoFromLocalStorage }); // Set Reg_no from localStorage
//       fetchBankingDetails(regNoFromLocalStorage);
//     }
//   }, []); // Empty dependency array to run this effect only once on mount

//   return (
//     <Sidebar> {/* Replace Sidebar with your Sidebar component */}
//       <div>
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

//         {value === 'one' && (
//           <div>
//             <h2>ADD Banking</h2>
//             <form onSubmit={handleSubmit}>
//               {/* Your form fields go here */}
//             </form>
//           </div>
//         )}

//         {value === 'two' && (
//           <div>
//             <h2>View Banking Details</h2>
//             {bankingDetails ? (
//               <div>
//                 {/* Display fetched banking details */}
//                 <p>Bank Name: {bankingDetails.bank_name}</p>
//                 <p>Account Number: {bankingDetails.account_number}</p>
//                 {/* Display other banking details similarly */}
//               </div>
//             ) : (
//               <p>No banking details found for this retailer.</p>
//             )}
//           </div>
//         )}
//       </div>
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
// import css from '../../../styles/banking.module.css';

// export default function Banking() {
//   const [value, setValue] = useState('one');
//   const [formData, setFormData] = useState({
//     Reg_no: '',
//     Bankaccountno: '',
//     Bankaccountname: '',
//     Ifsc: '',
//     Bankname: '',
//     Branch: '',
//     upi: '',
   
//   });
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/viewbankingdetail/Reg_no', formData);

//       if (response.status === 200) {
//         alert("Banking information added successfully");
//         router.push('/banking');
//       } else {
//         alert("Failed to add banking information");
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

//   return (
//     <Sidebar>
//       <div>
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
//         <div>
//           <div className={css.formContainer}>
//             <h2 className={css.formHeader}>ADD Banking</h2>
//             <form className={css.form} onSubmit={handleSubmit}>
//               <div className={css.formGroup}>
//                 <label htmlFor="Reg_no" className={css.formLabel}>Reg_no</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="Reg_no"
//                   name="Reg_no"
//                   placeholder="Enter Reg_no"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="Bankaccountno" className={css.formLabel}>Bank Account Number</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="Bankaccountno"
//                   name="Bankaccountno"
//                   placeholder="Enter Account Number"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="Bankaccountname" className={css.formLabel}>Bank Account Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="Bankaccountname"
//                   name="Bankaccountname"
//                   placeholder="Enter Account Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="Ifsc" className={css.formLabel}>IFSC Code</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="Ifsc"
//                   name="Ifsc"
//                   placeholder="Enter IFSC Code"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="Bankname" className={css.formLabel}>Bank Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="Bankname"
//                   name="Bankname"
//                   placeholder="Enter Bank Name"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="Branch" className={css.formLabel}>Branch</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="Branch"
//                   name="Branch"
//                   placeholder="Enter Branch"
//                   autoComplete="off"
//                   onChange={handleInputChange}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="upi" className={css.formLabel}>UPI</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="upi"
//                   name="upi"
//                   placeholder="Enter UPI"
//                   autoComplete="off"
//                   onChange={handleInputChange}
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









// import React, { useState } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import css from '../../../styles/banking.module.css'; // Import your external CSS module

// export default function Banking() {
//   const [value, setValue] = useState('one');
//   const [data, setData] = useState({
//     Reg_no: '',
//     Bankaccountno: '',
//     Bankaccountname: '',
//     Ifsc: '',
//     Bankname: '',
//     Branch: '',
//     upi: '',
//     Status: 'inactive',
//   });

//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:5000/api/retail/banking', data);

//       if (response.status === 200) {
//         router.push('/banking');
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
//           <div className={css.formContainer}> {/* Use the CSS module class */}
//             <h2 className={css.formHeader}>ADD USER</h2>
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
//                 <label htmlFor="inputBankaccountno" className={css.formLabel}>Bank Account Number</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputBankaccountno"
//                   placeholder='Enter Account Number'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, Bankaccountno: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputBankaccountname" className={css.formLabel}>Bank Account Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputBankaccountname"
//                   placeholder='Enter Account Name'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, Bankaccountname: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputIfsc" className={css.formLabel}>IFSC Code</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputIfsc"
//                   placeholder='Enter IFSC Code'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, Ifsc: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputBankname" className={css.formLabel}>Bank Name</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputBankname"
//                   placeholder='Enter Bank Name'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, Bankname: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputBranch" className={css.formLabel}>Branch</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputBranch"
//                   placeholder='Enter Branch'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, Branch: e.target.value })}
//                 />
//               </div>
//               <div className={css.formGroup}>
//                 <label htmlFor="inputUpi" className={css.formLabel}>UPI</label>
//                 <input
//                   type="text"
//                   className={css.formControl}
//                   id="inputUpi"
//                   placeholder='Enter UPI'
//                   autoComplete='off'
//                   onChange={(e) => setData({ ...data, upi: e.target.value })}
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









// import * as React from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar';

// export default function Banking() {
//   const [value, setValue] = React.useState('one');

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Sidebar>
//       <div>
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

//       {/* "ADD" tab */}
//       {value === 'one' && (
//         <div>
//           {/* Add your content for the "ADD" tab here */}
//           <h1>ADD Tab Content</h1>
//           <p>This is the content for the ADD tab.</p>
//         </div>
//       )}

//       {/*  "View" tab */}
//       {value === 'two' && (
//         <div>
//           {/* Add your content for the "View" tab here */}
//           <h1>View Tab Content</h1>
//           <p>This is the content for the View tab.</p>
//         </div>
//       )}
//     </Sidebar>
//   );
// }


// import React from 'react'
// import Sidebar from '../sidebar/sidebar'

//   return (

//   )
// }




