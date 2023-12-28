// pages/retailer/dashboard/Dashboard.js
import React from 'react';
import style from '../../../styles/dashboard.module.css'; // Import the external CSS file

import Card from 'react-bootstrap/Card';
import Sidebar from '../sidebar/sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from 'react-icons/bs';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Dashboard() {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const orderHistoryData = [
    // Random order history data...
    { id: 1, date: '2023-01-01', customer: 'Order 1', total: 2 },
    { id: 2, date: '2023-01-02', customer: 'Order 2', total: 6 },
    { id: 3, date: '2023-01-03', customer: 'Order 3', total: 1 },
    { id: 4, date: '2023-01-04', customer: 'Order 4', total: 4 },
    
    // Add more rows as needed...
  ];

  return (
    <Sidebar>
    <div className={style['dashboard-container']}>
    <main className={style['main-container']}>
      <div className={style['main-title']}>
        {/* <h3>DASHBOARD</h3> */}
      </div>

      <div className={style['main-cards']}>
        <div className={style['card']}>
          <div className={style['card-inner']}>
            <BsPeopleFill size={90} color='#007bff' />
            <h3>RETAILERS</h3>
          </div>
          <h1>180</h1>
        </div>
        <div className={style['card']}>
          <div className={style['card-inner']}>
            <BsFillGrid3X3GapFill size={40} color='#007bff' />
            <h3>SHOPS</h3>
          </div>
          <h1>280</h1>
        </div>
        <div className={style['card']}>
          <div className={style['card-inner']}>
            <BsFillBellFill size={40} color='#007bff' />
            <h3>USERS</h3>
          </div>
          <h1>68</h1>
        </div>
        <div className={style['card']}>
          <div className={style['card-inner']}>
            <BsFillArchiveFill size={40} color='#007bff' />
            <h3>REVENUE</h3>
          </div>
          <h1>4cr</h1>
        </div>
      </div>

      <div className={style['charts']}>
      <ResponsiveContainer width='100%' height={300}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='pv' fill='#8884d8' /> {/* Adjust the color of the bars */}
            <Bar dataKey='uv' fill='#82ca9d' /> {/* Adjust the color of the bars */}
          </BarChart>
        </ResponsiveContainer>

        <div className={style['order-history']} style={{ color: '#000', transition: 'color 0.3s ease' }}>
  <h3 style={{ backgroundColor: '#74a1cf', color: '#fff', padding: '10px', borderRadius: '5px' }}>Shipping History</h3>
  <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
    <thead>
      <tr>
        <th style={{ backgroundColor: '#f2f2f2', padding: '10px', borderBottom: '1px solid #ddd' }}>Date</th>
        <th style={{ backgroundColor: '#f2f2f2', padding: '10px', borderBottom: '1px solid #ddd' }}>Order Book</th>
        <th style={{ backgroundColor: '#f2f2f2', padding: '10px', borderBottom: '1px solid #ddd' }}>Product Status</th>
      </tr>
    </thead>
    <tbody>
      {orderHistoryData.map((order) => (
        <tr key={order.id}>
          <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{order.date}</td>
          <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{order.customer}</td>
          <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{order.total}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>




      </div>
    </main>
    </div>
    </Sidebar>
  );
}

export default Dashboard;






// import React from 'react';
// import style from '../../../styles/dashboard.module.css'; // Import the external CSS file

// import Card from 'react-bootstrap/Card';
// import Sidebar from '../sidebar/sidebar';
// import 'bootstrap/dist/css/bootstrap.min.css';

// import {
//   BsFillArchiveFill,
//   BsFillGrid3X3GapFill,
//   BsPeopleFill,
//   BsFillBellFill,
// } from 'react-icons/bs';
// import {
//   BarChart,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// function dashboard() {
//   const data = [
//     {
//       name: 'Page A',
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
//     },
//     {
//       name: 'Page C',
//       uv: 2000,
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: 'Page D',
//       uv: 2780,
//       pv: 3908,
//       amt: 2000,
//     },
//     {
//       name: 'Page E',
//       uv: 1890,
//       pv: 4800,
//       amt: 2181,
//     },
//     {
//       name: 'Page F',
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: 'Page G',
//       uv: 3490,
//       pv: 4300,
//       amt: 2100,
//     },
//   ];

//   const orderHistoryData = [
//     // Random order history data...
//     { id: 1, date: '2023-01-01', customer: 'Customer 1', total: 100 },
//     { id: 2, date: '2023-01-02', customer: 'Customer 2', total: 200 },
//     { id: 3, date: '2023-01-03', customer: 'Customer 3', total: 150 },
//     { id: 4, date: '2023-01-04', customer: 'Customer 4', total: 100 },
//     { id: 5, date: '2023-01-05', customer: 'Customer 5', total: 200 }
    
//     // Add more rows as needed...
//   ];

//   return (
//     <main className='style.main-container'>
//       <div className='main-title'>
//         <h3>DASHBOARD</h3>
//       </div>

//       <div className='main-cards'>
//         <div className='card'>
//           <div className='card-inner'>
//             <BsPeopleFill size={40} color='#007bff' />
//             <h3>EMPLOYEES</h3>
//           </div>
//           <h1>33</h1>
//         </div>
//         <div className='card'>
//           <div className='card-inner'>
//             <BsFillGrid3X3GapFill size={40} color='#007bff' />
//             <h3>SHOPS</h3>
//           </div>
//           <h1>300</h1>
//         </div>
//         <div className='card'>
//           <div className='card-inner'>
//             <BsFillBellFill size={40} color='#007bff' />
//             <h3>USERS</h3>
//           </div>
//           <h1>68</h1>
//         </div>
//         <div className='card'>
//           <div className='card-inner'>
//             <BsFillArchiveFill size={40} color='#007bff' />
//             <h3>REVENUE</h3>
//           </div>
//           <h1>42</h1>
//         </div>
//       </div>

//       <div className='charts'>
//         <ResponsiveContainer width='100%' height={300}>
//           <BarChart
//             width={500}
//             height={300}
//             data={data}
//             margin={{
//               top: 5,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//           >
//             <CartesianGrid strokeDasharray='3 3' />
//             <XAxis dataKey='name' />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey='pv' fill='#8884d8' />
//             <Bar dataKey='uv' fill='#82ca9d' />
//           </BarChart>
//         </ResponsiveContainer>

//         <div className='order-history'>
//     <h3>Order History</h3>
//     <table className='order-history-table'>
//       <thead>
//         <tr>
//           <th>Date</th>
//           <th>Customer</th>
//           <th>Total</th>
//         </tr>
//       </thead>
//       <tbody>
//         {orderHistoryData.map((order) => (
//           <tr key={order.id}>
//             <td>{order.date}</td>
//             <td>{order.customer}</td>
//             <td>${order.total}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
//       </div>
//     </main>
//   );
// }

// export default dashboard;




// import React from 'react'
// import Card from 'react-bootstrap/Card';
// import Sidebar from '../sidebar/sidebar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import dashboard from './dashboard.module.css'
// function Dashboard() {
//     return (
//         <Sidebar>
//             <div>
//                 <div className='custom1-bg'>
//                     <div>
//                         <div className='carts marginforcard mt-5 mr-2' style={{ display: "flex" }}>
//                             <div>
//                                 <Card style={{ width: '15rem', backgroundColor: "#50C7C7" }}>
//                                     <Card.Body>
//                                         <Card.Title>Total Retailer&nbsp;:&nbsp;&nbsp;300</Card.Title>
//                                         <div style={{ display: "flex" }}>
//                                             <h6>Active: 200</h6>&nbsp;&nbsp;&nbsp;
//                                             <h6>Inactive: 100</h6>
//                                         </div>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                             <div>
//                                 <Card style={{ width: '15rem', marginLeft: "15px", backgroundColor: "#50C7C7" }}>
//                                     <Card.Body>
//                                         <Card.Title>Total Shops</Card.Title>
//                                         <Card.Text>110</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                             <div>
//                                 <Card style={{ width: '15rem', marginLeft: "15px", backgroundColor: "#50C7C7" }}>
//                                     <Card.Body>
//                                         <Card.Title>Total Users</Card.Title>
//                                         <Card.Text>800</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                             <div>
//                                 <Card style={{ width: '15rem', marginLeft: "15px", backgroundColor: "#50C7C7" }}>
//                                     <Card.Body>
//                                         <Card.Title>Total Revenue</Card.Title>
//                                         <Card.Text>275800</Card.Text>
//                                     </Card.Body>
//                                 </Card>
//                             </div>
//                         </div>
//                         <br />
//                         <br />
//                         <br />
//                         <div className='flex'>
//                             <div className='col-6 mt-3'>
//                                 <table class="table">
//                                     <thead class="table-info">
//                                         <tr>
//                                             <th scope="col">S.No</th>
//                                             <th scope="col">First</th>
//                                             <th scope="col">Last</th>
//                                             <th scope="col">Handle</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <th scope="row">1</th>
//                                             <td>Santosh</td>
//                                             <td>Das</td>
//                                             <td>Das@mdo</td>
//                                         </tr>
//                                         <tr>
//                                             <th scope="row">2</th>
//                                             <td>Mohan</td>
//                                             <td>chohan</td>
//                                             <td>Mohan@fat</td>
//                                         </tr>
//                                         <tr>
//                                             <th scope="row">3</th>
//                                             <td>Ganesh</td>
//                                             <td>Gatkari</td>
//                                             <td>Gatkr@twitter</td>
//                                         </tr>
//                                         <tr>
//                                             <th scope="row">5</th>
//                                             <td>Gulami</td>
//                                             <td>Murti</td>
//                                             <td>ami@twitter</td>
//                                         </tr>
//                                         <tr>
//                                             <th scope="row">6</th>
//                                             <td>Mahindra</td>
//                                             <td>Rai</td>
//                                             <td>Mahindra@twitter</td>
//                                         </tr>
                                        
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Sidebar>
//     )
// }

// export default Dashboard;




// import React from 'react'
// import axios from 'axios'
// import  { useEffect, useState } from 'react'
// import Card from 'react-bootstrap/Card';
// import{ PureComponent } from 'react';
// import Sidebar from '../sidebar/sidebar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   Brush,
//   AreaChart,
//   Area,
//   ResponsiveContainer,
// } from 'recharts';
// function Dashboard() {
//     const data = [
//         {
//           name: 'Page A',
//           uv: 4000,
//           pv: 2400,
//           amt: 2400,
//         },
//         {
//           name: 'Page B',
//           uv: 3000,
//           pv: 1398,
//           amt: 2210,
//         },
//         {
//           name: 'Page C',
//           uv: 2000,
//           pv: 9800,
//           amt: 2290,
//         },
//         {
//           name: 'Page D',
//           uv: 2780,
//           pv: 3908,
//           amt: 2000,
//         },
//         {
//           name: 'Page E',
//           uv: 1890,
//           pv: 4800,
//           amt: 2181,
//         },
//         {
//           name: 'Page F',
//           uv: 2390,
//           pv: 3800,
//           amt: 2500,
//         },
//         {
//           name: 'Page G',
//           uv: 3490,
//           pv: 4300,
//           amt: 2100,
//         },
//       ];
      
//   return (

// <Sidebar>
// <sidebar>
//         <div>

//         <div className='custom1-bg'>
//         <div >
//           <div className='carts marginforcard mt-5 mr-2' style={{ display: "flex" }}>
//             <div >
//               <Card style={{ width: '15rem', backgroundColor: "#F29F67" }}>
//                 <Card.Body>
//                   <Card.Title>Total Retailer&nbsp;:&nbsp;&nbsp;300
//                   {/* <Card.Text className='mx-5'>
//                     300
//                   </Card.Text> */}
//                   </Card.Title>
//              <div style={{ display: "flex" }}>                  
//                <h6>Active:200</h6>&nbsp;&nbsp;&nbsp;
//                   <h6>Inactive:100</h6>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </div>
//             <div>
//               <Card style={{ width: '15rem', marginLeft: "15px", backgroundColor: "#F29F67" }}>
//                 <Card.Body>
//                   <Card.Title>Total Shops</Card.Title>
//                   <Card.Text>
//                     110
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </div>
//             <div>
//               <Card style={{ width: '15rem', marginLeft: "15px", backgroundColor: "#F29F67" }}>
//                 <Card.Body>
//                   <Card.Title>Total Users</Card.Title>
//                   <Card.Text>
//                     800
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </div>
//             <div>
//               <Card style={{ width: '15rem', marginLeft: "15px", backgroundColor: "#F29F67" }}>
//                 <Card.Body>
//                   <Card.Title>Total Revenue</Card.Title>
//                   <Card.Text>
//                     275800
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </div>
//           </div>
//           <br />
//           <br />
//           <br />
//           <div className='flex'>
//             <div className='col-5'>
//        <ResponsiveContainer width="100%" height={200}>
//           <AreaChart
//             width={500}
//             height={200}
//             data={data}
//             syncId="anyId"
//             margin={{
//               top: 10,
//               right: 30,
//               left: 0,
//               bottom: 0,
//             }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
//           </AreaChart>
//         </ResponsiveContainer>
//             </div>
//           {/* <div className='p-3 d-flex justify-content-around'>
//             <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
//               <div className='text-center pb-1'>
//                 <h4>Employee</h4>
//               </div>
//               <hr />
//               <div className=''>
//                 <h5>Total: </h5>
//               </div>
//             </div>
//             <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
//               <div className='text-center pb-1'>
//                 <h4>Shops</h4>
//               </div>
//               <hr />
//               <div className=''>
//                 <h5>Total:</h5>
//               </div>
//             </div>
//             <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
//               <div className='text-center pb-1'>
//                 <h4>Users</h4>
//               </div>
//               <hr />
//               <div className=''>
//                 <h5>Total:</h5>
//               </div>
//             </div>
//             <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
//               <div className='text-center pb-1'>
//                 <h4>Revenue </h4>
//               </div>
//               <hr />
//               <div className=''>
//                 <h5>Total:</h5>
//               </div>
//             </div>
//           </div> */}

//           {/* <div> */}
//           {/* <LineChart
//               width={500}
//               height={300}
//               data={data}
//               margin={{
//                 top: 5,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
//               <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//             </LineChart> */}
//           {/* </div> */}
//           <div className='col-6 mt-3'>
//             <table class="table">
//               <thead class="table-info">
//                 <tr>
//                   <th scope="col">S.No</th>
//                   <th scope="col">First</th>
//                   <th scope="col">Last</th>
//                   <th scope="col">Handle</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <th scope="row">1</th>
//                   <td>Mark</td>
//                   <td>Otto</td>
//                   <td>@mdo</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">2</th>
//                   <td>Jacob</td>
//                   <td>Thornton</td>
//                   <td>@fat</td>
//                 </tr>
//                 <tr>
//                   <th scope="row">3</th>
//                   <td>Larry</td>
//                   <td>the Bird</td>
//                   <td>@twitter</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//           </div>
//         </div>
//       </div>

//         </div>
//      </sidebar>
// </Sidebar>

//   )
// }

// export default Dashboard
