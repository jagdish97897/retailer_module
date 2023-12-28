// login.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../../../styles/profile.module.css';

function Login() {
  const router = useRouter();

  const [values, setValues] = useState({
    Reg_no: '',
    Password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/retailer/login', values);

      if (res.data.data.length > 0) {
        localStorage.setItem('Reg_no', values.Reg_no);
        router.push('/retailer/dashboard/dashboard');
      } else {
        alert(res.data.Error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`${styles.custom1bg} d-flex justify-content-center align-items-center vh-100`}>
      <div className="col-md-4">
        <div className="bg-primary p-4 rounded">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><strong>Enter Reg_no</strong></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Reg_no"
                name="Reg_no"
                value={values.Reg_no}
                onChange={(e) => setValues({ ...values, Reg_no: e.target.value })}
                autoComplete="username"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><strong>Password</strong></Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={values.Password}
                onChange={(e) => setValues({ ...values, Password: e.target.value })}
                autoComplete="current-password"
              />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">
              Log in
            </Button>
            <p>You agree to our terms and policies</p>
            <Link href="/retailer/profile/profile">
              <Button variant="light" className="border w-100 rounded-0 text-decoration-none">
                Create Account
              </Button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;


// // login.js

// import React from 'react';
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import Form from 'react-bootstrap/Form';
// import Link from 'next/link';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from '../../../styles/profile.module.css';
// import Modal from 'react-bootstrap/Modal';

// function Login() {
//   const router = useRouter();

//   const [values, setValues] = useState({
//     Reg_no: '',
//     Password: '',
//   });

//   axios.defaults.withCredentials = true;
//   const [lgShowadd, setLgShowadd] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//      console.log(values)
//     try {
      
//       const res = await axios.post('http://localhost:5000/api/retailer/login', values);

//        console.log(res)
//             if (res.data.data.length>0 ) {
                
//                  // On successful login, store Reg_no in localStorage or session storage
//                 localStorage.setItem('Reg_no', values.Reg_no); // Change this according to your preference
//                 router.push('/retailer/dashboard/dashboard');
//             } else {
//                 alert(res.data.Error);
//             }
  
//         } catch (err) {
//             console.error(err);
//         }
//     }; 

//   return (
//     <div className={styles.custom1bg}>
//       <div
//         className="custom-container"
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100vh',
//         }}
//       >
        

//         <Form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="Reg_no">
//               <strong>Email Reg_no</strong>
//             </label>
//             <input
//               type="text"
//               placeholder="Enter Reg_no"
//               name="Reg_no"
//               onChange={(e) => setValues({ ...values, Reg_no: e.target.value })}
//               className="form-control rounded"
//               autoComplete="username"
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password">
//               <strong>Password</strong>
//             </label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               name="password"
//               onChange={(e) => setValues({ ...values, Password: e.target.value })}
//               className="form-control rounded"
//               autoComplete="current-password"
//             />
//           </div>
//           <button type="submit" className="btn btn-success w-100 rounded-0">
//             Log in
//           </button>
//           <p>You agree to our terms and policies</p>
//           <Link href="/retailer/profile/profile">
//             <div className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
//               Create Account
//             </div>
//           </Link>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default Login;



















// import React from 'react'
// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import Form from 'react-bootstrap/Form';
// import Link from 'next/link';

// import 'bootstrap/dist/css/bootstrap.min.css';

// import styles from '../../../styles/profile.module.css'

// function login() {

//     const router = useRouter();

//     const [values, setValues] = useState({
//         email: '',
//         password: '',
//     });

//     axios.defaults.withCredentials = true;

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const res = await axios.post('http://localhost:50000/login', values);

//             if (res.data.status === 'Success') {
//                 router.push('/');
//             } else {
//                 alert(res.data.Error);
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };
//     return (
//         <div>
//             <div className={styles.custom1bg} style={{
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 height: '100vh'
//             }}  >
//                 <div className={styles['custom-container']}>

//                     <h2>Sign-In</h2>

//                     <Form onSubmit={handleSubmit}>

//                         <div className="mb-3">
//                             <label htmlFor='email'><strong>Email address</strong></label>
//                             <input
//                                 type="email"
//                                 placeholder="Enter email"
//                                 name="email"
//                                 onChange={(e) => setValues({ ...values, email: e.target.value })}
//                                 className="form-control rounded"
//                                 autoComplete="username" />
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor='password'><strong>Password</strong></label>
//                             <input
//                                 type="password"
//                                 placeholder="Enter password"
//                                 name="password"
//                                 onChange={(e) => setValues({ ...values, password: e.target.value })}
//                                 className="form-control rounded"
//                                 autoComplete="current-password"
//                             />
//                         </div>
//                         <button type='submit' className='btn btn-success w-100 rounded-0'>
//                             Log in
//                         </button>
//                         <p>You agree to our terms and policies</p>
//                         <Link href='/register'>
//                            <div className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</div>
//                         </Link>

//                     </Form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default login