import Login from './retailer/login/login'
import React from "react";
import axios from 'axios';
axios.defaults.withCredentials = true;

function Index() {
  return (
    <div>
<Login />  
    </div>
  );
}
export default Index;






































// import UserForm from '@/pages/Form'
// import Navbar from '@/pages/Navbar';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react'
// function index() {
//   return (
//     <div>
      
//       <UserForm />
//     </div>
//   )
// }

// export default index
