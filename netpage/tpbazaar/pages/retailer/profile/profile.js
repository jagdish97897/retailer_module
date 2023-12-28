import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar/sidebar';

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  
  const [error, setError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add state for authentication status

  useEffect(() => {
    // Fetch profile data on component mount
    const storedRegNo = localStorage.getItem('Reg_no');
    if (storedRegNo) {
      setIsLoggedIn(true); // If registered number is available, set the user as logged in
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/retailer/viewshop/${storedRegNo}`);
          setProfileData(response.data[0]);
        } catch (error) { 
          console.error('Error fetching profile data:', error);
          setError(true);
        }
      };
      fetchProfileData();
    } else {
      setIsLoggedIn(false); // If not authenticated, set the status to false
      setProfileData({}); // Clear profile data
    }
  }, []);

  return (
    <Sidebar clearProfileData={() => setProfileData({})}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{ border: '2px solid black', padding: '10px', textAlign: 'center' }}>
          {isLoggedIn && Object.keys(profileData).length > 0 && profileData.Owner_name ? (
            <>
              {/* Render profile data */}
              <div style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '8px' }}>
              <h1>Owner Name: {profileData.Owner_name}</h1>
              <p>Registration Number: {profileData.Reg_no}</p>
              <p>GST Number: {profileData.Gst_no}</p>
              <p>TIN: {profileData.Tin}</p>
              <p>PAN: {profileData.Pan}</p>
              <p>Mobile: {profileData.Mobile}</p>
              <p>Email: {profileData.Email}</p>
              <p>Shop Name: {profileData.Shop_name}</p>
              <p>Address: {profileData.Address}</p>
              <p>Shop Pin: {profileData.Pin}</p>
              <p>Shop Registration_doc: {profileData.Registration_doc}</p>
              <p>Shop Pan_doc: {profileData.Pan_doc}</p>
              <p>Shop_doc: {profileData.Shop_doc}</p>
              {/* Add other profile fields as needed */}
              </div>
            </>
          ) : (
            <p>{isLoggedIn ? 'No profile data available' : 'Not logged in'}</p>
          )}
        </div>
      </div>
    </Sidebar>
  );
};
export default Profile;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from '../sidebar/sidebar';

// const Profile = () => {
//   const [profileData, setProfileData] = useState({});
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const storedRegNo = localStorage.getItem('Reg_no');
//     if (storedRegNo) {
//       const fetchProfileData = async () => {
//         try {
//           const response = await axios.get(`http://localhost:5000/api/retailer/viewshop/${storedRegNo}`);
//           setProfileData(response.data[0]);
//         } catch (error) { 
//           console.error('Error fetching profile data:', error);
//           setError('Error fetching profile data');
//         }
//       };
//       fetchProfileData();
//     } else {
//       console.error('Registration Number not found');
//       setError('Registration Number not found');
//     }
//   }, []);

//   return (
//     <Sidebar>
//      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//   <div style={{ border: '2px solid black', padding: '10px', textAlign: 'center' }}>
//     {error ? (
//       <p>{error}</p>
//     ) : (
//       <>
//         <h1>Owner Name: {profileData.Owner_name}</h1>
//         <p>Registration Number: {profileData.Reg_no}</p>
//         <p>GST Number: {profileData.Gst_no}</p>
//         <p>TIN: {profileData.Tin}</p>
//         <p>PAN: {profileData.Pan}</p>
//         <p>Mobile: {profileData.Mobile}</p>
//         <p>Email: {profileData.Email}</p>
//         <p>Shop Name: {profileData.Shop_name}</p>
//         <p>Address: {profileData.Address}</p>
//         <p>Shop Pin: {profileData.Pin}</p>
//         <p>Shop Registration_doc: {profileData.Registration_doc}</p>
//         <p>Shop Pan_doc: {profileData.Pan_doc}</p>
//         <p>Shop_doc: {profileData.Shop_doc}</p>
//         {/* Add other profile fields as needed */}
//       </>
//     )}
//   </div>
// </div>

//     </Sidebar>
//   );
// };

// export default Profile;






// // pages/profile.js

// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Profile = () => {
//   const [profileData, setProfileData] = useState({});

//   useEffect(() => {
//     const fetchProfileData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/retailer/viewshop/Reg_no');
//         setProfileData(response.data[0]);
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         // Handle error (show error message, etc.)
//       }
//     };

//     fetchProfileData();
//   }, []);

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       <div>
//         <p>Registration Number: {profileData.Reg_no}</p>
//         <p>GST Number: {profileData.Gst_no}</p>
//         <p>TIN: {profileData.Tin}</p>
//         <p>PAN: {profileData.Pan}</p>
//         <p>Mobile: {profileData.Mobile}</p>
//         <p>Email: {profileData.Email}</p>
//         <p>Shop Name: {profileData.Shop_name}</p>
//         <p>Owner Name: {profileData.Owner_name}</p>
//         {/* Add other profile fields as needed */}
//       </div>
//     </div>
//   );
// };

// export default Profile;


// import React, { useState } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Sidebar from '../sidebar/sidebar';
// import axios from 'axios';
// import { useRouter } from 'next/router';
// import Head from 'next/head';
// import css from '../../../styles/product.module.css';

// export default function Banking() {
//   const [value, setValue] = useState('one');
//   const [formData, setFormData] = useState({
//     Reg_no: '',
//     Gst_no: '',
//     Tin: '',
//     Pan: '',
//     Shop_name: '',
//     Owner_name: '',
//     Password: '',
//     Mobile: '',
//     Email: '',
//     Address: '',
//     State: '',
//     Region: '',
//     City: '',
//     Pin: '',
//     Terms_and_Conditions: '',
//     Registration_doc: null,
//     Pan_doc: null,
//     Shop_doc: null,
//   });
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formDataToSend = new FormData();

//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/retailer/newshopregister', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         router.push('/users');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleFileChange = (e, fieldName) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, [fieldName]: file });
//   };

//   const handleInputChange = (e, fieldName) => {
//     setFormData({ ...formData, [fieldName]: e.target.value });
//   };

//   return (
//     <Sidebar>
//     <div className={css.formContainer}>
//           <h2 className={css.formHeader}>ADD RETAILER</h2>
//           <form className={css.form} onSubmit={handleSubmit}>
//             <div className={css.formGroup}>
//               <label htmlFor="inputReg_no" className={css.formLabel}>Registration Number</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputReg_no"
//                 value={formData.Reg_no}
//                 onChange={(e) => handleInputChange(e, 'Reg_no')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputGst_no" className={css.formLabel}>GST Number</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputGst_no"
//                 value={formData.Gst_no}
//                 onChange={(e) => handleInputChange(e, 'Gst_no')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputTin" className={css.formLabel}>TIN</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputTin"
//                 value={formData.Tin}
//                 onChange={(e) => handleInputChange(e, 'Tin')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputPan" className={css.formLabel}>PAN</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputPan"
//                 value={formData.Pan}
//                 onChange={(e) => handleInputChange(e, 'Pan')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputShop_name" className={css.formLabel}>Shop Name</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputShop_name"
//                 value={formData.Shop_name}
//                 onChange={(e) => handleInputChange(e, 'Shop_name')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputOwner_name" className={css.formLabel}>Owner Name</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputOwner_name"
//                 value={formData.Owner_name}
//                 onChange={(e) => handleInputChange(e, 'Owner_name')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputPassword" className={css.formLabel}>Password</label>
//               <input
//                 type="password"
//                 className={css.formControl}
//                 id="inputPassword"
//                 value={formData.Password}
//                 onChange={(e) => handleInputChange(e, 'Password')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputMobile" className={css.formLabel}>Mobile</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputMobile"
//                 value={formData.Mobile}
//                 onChange={(e) => handleInputChange(e, 'Mobile')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputEmail" className={css.formLabel}>Email</label>
//               <input
//                 type="email"
//                 className={css.formControl}
//                 id="inputEmail"
//                 value={formData.Email}
//                 onChange={(e) => handleInputChange(e, 'Email')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputAddress" className={css.formLabel}>Address</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputAddress"
//                 value={formData.Address}
//                 onChange={(e) => handleInputChange(e, 'Address')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputState" className={css.formLabel}>State</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputState"
//                 value={formData.State}
//                 onChange={(e) => handleInputChange(e, 'State')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputRegion" className={css.formLabel}>Region</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputRegion"
//                 value={formData.Region}
//                 onChange={(e) => handleInputChange(e, 'Region')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputCity" className={css.formLabel}>City</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputCity"
//                 value={formData.City}
//                 onChange={(e) => handleInputChange(e, 'City')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputPin" className={css.formLabel}>PIN</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputPin"
//                 value={formData.Pin}
//                 onChange={(e) => handleInputChange(e, 'Pin')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputTerms_and_Conditions" className={css.formLabel}>Terms and Conditions</label>
//               <textarea
//                 className={css.formControl}
//                 id="inputTerms_and_Conditions"
//                 placeholder='Enter Terms and Conditions'
//                 value={formData.Terms_and_Conditions}
//                 onChange={(e) => handleInputChange(e, 'Terms_and_Conditions')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputRegistration_doc" className={css.formLabel}>Registration Document</label>
//               <input
//                 type="file"
//                 className={css.formControl}
//                 id="inputRegistration_doc"
//                 accept=".pdf,.doc,.docx"
//                 onChange={(e) => handleFileChange(e, 'Registration_doc')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputPan_doc" className={css.formLabel}>Pan Document</label>
//               <input
//                 type="file"
//                 className={css.formControl}
//                 id="inputPan_doc"
//                 accept=".pdf,.doc,.docx"
//                 onChange={(e) => handleFileChange(e, 'Pan_doc')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputShop_doc" className={css.formLabel}>Shop Document</label>
//               <input
//                 type="file"
//                 className={css.formControl}
//                 id="inputShop_doc"
//                 accept=".pdf,.doc,.docx"
//                 onChange={(e) => handleFileChange(e, 'Shop_doc')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <button type="submit" className={css.submitButton}>Submit</button>
//             </div>
//           </form>
//         </div>
//         </Sidebar>
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
// import css from '../../../styles/product.module.css';

// export default function Banking() {
//   const [value, setValue] = useState('one');
//   const [formData, setFormData] = useState({
//     Reg_no: '',
//     Gst_no: '',
//     Tin: '',
//     Pan: '',
//     Shop_name: '',
//     Owner_name: '',
//     Password: '',
//     Mobile: '',
//     Email: '',
//     Address: '',
//     State: '',
//     Region: '',
//     City: '',
//     Pin: '',
//     Terms_and_Conditions: '',
//     Registration_doc: null,
//     Pan_doc: null,
//     Shop_doc: null,
//   });
//   const router = useRouter();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formDataToSend = new FormData();

//     for (const key in formData) {
//       formDataToSend.append(key, formData[key]);
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/retailer/newshopregister', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         router.push('/users');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleFileChange = (e, fieldName) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, [fieldName]: file });
//   };

//   const handleInputChange = (e, fieldName) => {
//     setFormData({ ...formData, [fieldName]: e.target.value });
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
//         <div className={css.formContainer}>
//           <h2 className={css.formHeader}>ADD RETAILER</h2>
//           <form className={css.form} onSubmit={handleSubmit}>
//             <div className={css.formGroup}>
//               <label htmlFor="inputReg_no" className={css.formLabel}>Registration Number</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputReg_no"
//                 value={formData.Reg_no}
//                 onChange={(e) => handleInputChange(e, 'Reg_no')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputGst_no" className={css.formLabel}>GST Number</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputGst_no"
//                 value={formData.Gst_no}
//                 onChange={(e) => handleInputChange(e, 'Gst_no')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputTin" className={css.formLabel}>TIN</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputTin"
//                 value={formData.Tin}
//                 onChange={(e) => handleInputChange(e, 'Tin')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputPan" className={css.formLabel}>PAN</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputPan"
//                 value={formData.Pan}
//                 onChange={(e) => handleInputChange(e, 'Pan')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputShop_name" className={css.formLabel}>Shop Name</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputShop_name"
//                 value={formData.Shop_name}
//                 onChange={(e) => handleInputChange(e, 'Shop_name')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputOwner_name" className={css.formLabel}>Owner Name</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputOwner_name"
//                 value={formData.Owner_name}
//                 onChange={(e) => handleInputChange(e, 'Owner_name')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputPassword" className={css.formLabel}>Password</label>
//               <input
//                 type="password"
//                 className={css.formControl}
//                 id="inputPassword"
//                 value={formData.Password}
//                 onChange={(e) => handleInputChange(e, 'Password')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputMobile" className={css.formLabel}>Mobile</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputMobile"
//                 value={formData.Mobile}
//                 onChange={(e) => handleInputChange(e, 'Mobile')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputEmail" className={css.formLabel}>Email</label>
//               <input
//                 type="email"
//                 className={css.formControl}
//                 id="inputEmail"
//                 value={formData.Email}
//                 onChange={(e) => handleInputChange(e, 'Email')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputAddress" className={css.formLabel}>Address</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputAddress"
//                 value={formData.Address}
//                 onChange={(e) => handleInputChange(e, 'Address')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputState" className={css.formLabel}>State</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputState"
//                 value={formData.State}
//                 onChange={(e) => handleInputChange(e, 'State')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputRegion" className={css.formLabel}>Region</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputRegion"
//                 value={formData.Region}
//                 onChange={(e) => handleInputChange(e, 'Region')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputCity" className={css.formLabel}>City</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputCity"
//                 value={formData.City}
//                 onChange={(e) => handleInputChange(e, 'City')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputPin" className={css.formLabel}>PIN</label>
//               <input
//                 type="text"
//                 className={css.formControl}
//                 id="inputPin"
//                 value={formData.Pin}
//                 onChange={(e) => handleInputChange(e, 'Pin')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputTerms_and_Conditions" className={css.formLabel}>Terms and Conditions</label>
//               <textarea
//                 className={css.formControl}
//                 id="inputTerms_and_Conditions"
//                 placeholder='Enter Terms and Conditions'
//                 value={formData.Terms_and_Conditions}
//                 onChange={(e) => handleInputChange(e, 'Terms_and_Conditions')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputRegistration_doc" className={css.formLabel}>Registration Document</label>
//               <input
//                 type="file"
//                 className={css.formControl}
//                 id="inputRegistration_doc"
//                 accept=".pdf,.doc,.docx"
//                 onChange={(e) => handleFileChange(e, 'Registration_doc')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputPan_doc" className={css.formLabel}>Pan Document</label>
//               <input
//                 type="file"
//                 className={css.formControl}
//                 id="inputPan_doc"
//                 accept=".pdf,.doc,.docx"
//                 onChange={(e) => handleFileChange(e, 'Pan_doc')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <label htmlFor="inputShop_doc" className={css.formLabel}>Shop Document</label>
//               <input
//                 type="file"
//                 className={css.formControl}
//                 id="inputShop_doc"
//                 accept=".pdf,.doc,.docx"
//                 onChange={(e) => handleFileChange(e, 'Shop_doc')}
//               />
//             </div>
//             <div className={css.formGroup}>
//               <button type="submit" className={css.submitButton}>Submit</button>
//             </div>
//           </form>
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

