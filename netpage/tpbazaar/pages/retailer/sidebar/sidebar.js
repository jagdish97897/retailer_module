
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from 'axios';
import { useRouter } from 'next/router';


const drawerWidth = 240;

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

function Sidebar({ children }) {
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get('http://localhost:5000/api/retailer/logout');
      router.push('/');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" style={{ backgroundColor: 'lightgray' }}>
        <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
  <Image
    src="/logo.png"
    alt="Logo"
    width={50}
    height={50}
  />
</Typography>
          <Box sx={{ ml: 'auto' }}>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={logout}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'lightgray', 
          },
        }}
        variant="permanent"
        open
      >
        <DrawerHeader />
        <List>
          {[
            { text: 'Dashboard', href: '/retailer/dashboard/dashboard', icon: <HomeIcon /> },
            { text: 'Profile', href: '/retailer/profile/profile', icon: <AccountCircleIcon /> },
            { text: 'Product', href: '/retailer/product/product', icon: <ShoppingCartIcon /> },
            { text: 'Banking', href: '/retailer/banking/banking', icon: <AccountBalanceIcon /> },
            
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component="a" href={item.href}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}

export default Sidebar;



// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Image from 'next/image';
// import IconButton from '@mui/material/IconButton';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';

// import HomeIcon from '@mui/icons-material/Home';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import axios from 'axios';
// import { useRouter } from 'next/router';


// const drawerWidth = 240;

// const Main = styled('main')(({ theme }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
// }));

// const AppBar = styled(MuiAppBar)(({ theme }) => ({
//   zIndex: theme.zIndex.drawer + 1,
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// function Sidebar({ children }) {
//   const router = useRouter();

//   const logout = async () => {
//     try {
//       await axios.get('http://localhost:5000/api/retailer/logout');
//       router.push('/');
//     } catch (error) {
//       console.error('Error logging out', error);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" style={{ backgroundColor: 'lightgray' }}>
//         <Toolbar>
//         <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//   <Image
//     src="/logo.png"
//     alt="Logo"
//     width={50}
//     height={50}
//   />
// </Typography>
//           <Box sx={{ ml: 'auto' }}>
//             <List>
//               <ListItem disablePadding>
//                 <ListItemButton onClick={logout}>
//                   <ListItemIcon>
//                     <ExitToAppIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Logout" />
//                 </ListItemButton>
//               </ListItem>
//             </List>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             background: 'lightgray', 
//           },
//         }}
//         variant="permanent"
//         open
//       >
//         <DrawerHeader />
//         <List>
//           {[
//             { text: 'Dashboard', href: '/retailer/dashboard/dashboard', icon: <HomeIcon /> },
//             { text: 'Profile', href: '/retailer/profile/profile', icon: <AccountCircleIcon /> },
//             { text: 'Product', href: '/retailer/product/product', icon: <ShoppingCartIcon /> },
//             { text: 'Banking', href: '/retailer/banking/banking', icon: <AccountBalanceIcon /> },
            
//           ].map((item) => (
//             <ListItem key={item.text} disablePadding>
//               <ListItemButton component="a" href={item.href}>
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Main>
//         <DrawerHeader />
//         {children}
//       </Main>
//     </Box>
//   );
// }

// export default Sidebar;





// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ListItem from '@mui/material/ListItem';

// import HomeIcon from '@mui/icons-material/Home';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';

// import axios from 'axios';
// import { useRouter } from 'next/router';

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create('margin', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: `${drawerWidth}px`,
//   ...(open && {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'flex-end',
//   ...theme.mixins.toolbar,
// }));

// function Sidebar({ children }) {
//   const theme = useTheme();
//   const router = useRouter();
//   const [open, setOpen] = React.useState(false);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const logout = async () => {
//     try {
//       await axios.get('http://localhost:5000/api/retailer/logout');
//       router.push('/');
//     } catch (error) {
//       console.error('Error logging out', error);
//     }
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: 'none' }) }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             E-commerce
//           </Typography>
//           <Box sx={{ ml: 'auto' }}>
//             <List>
//               <ListItem disablePadding>
//                 <ListItemButton onClick={logout}>
//                   <ListItemIcon>
//                     <ExitToAppIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Logout" />
//                 </ListItemButton>
//               </ListItem>
//             </List>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             <ChevronLeftIcon />
//           </IconButton>
//         </DrawerHeader>
//         <List>
//           {[
//             { text: 'Dashboard', href: '/', icon: <HomeIcon /> },
//             { text: 'Profile', href: '/retailer/profile/profile', icon: <AccountCircleIcon /> },
//             { text: 'Product', href: '/retailer/product/product', icon: <ShoppingCartIcon /> },
//             { text: 'Banking', href: '/retailer/banking/banking', icon: <AccountBalanceIcon /> },
//             { text: 'Customer', href: '/customer/customer', icon: <AccountBalanceIcon /> },
//           ].map((item, index) => (
//             <ListItem key={item.text} disablePadding>
//               <ListItemButton component="a" href={item.href}>
//                 <ListItemIcon>{item.icon}</ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//         {children}
//       </Main>
//     </Box>
//   );
// }

// export default Sidebar;




/////////////////////////////////////////////////////////


// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';

// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';

// import HomeIcon from '@mui/icons-material/Home';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance'

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));
// function sidebar({children}) {
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(false);
  
//     const handleDrawerOpen = () => {
//       setOpen(true);
//     };
  
//     const handleDrawerClose = () => {
//       setOpen(false);
//     };
//   return (
//     <div>
//        <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} style={{ backgroundColor: 'black' }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: 'none' }) }}
//           >
//             <MenuIcon />      
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             E-commerce
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </DrawerHeader>
       
//         <List>
       
//   {[
//     { text: 'Dashboard', href: '/',  icon: <HomeIcon /> },
//     { text: 'Profile', href: '/profile/profile', icon: <AccountCircleIcon /> },
//     { text: 'Product',href: '/product/product', icon: <ShoppingCartIcon /> },
//     { text: 'Banking', href: '/banking/banking', icon: <AccountBalanceIcon /> },
//      { text: 'Customer', icon: <AccountBalanceIcon /> }, 
//   ].map((item, index) => (
//     <ListItem key={item.text} disablePadding>
//       <ListItemButton>
//         <ListItemIcon>
//           {item.icon}
//         </ListItemIcon>
//         <ListItemText primary={item.text} />
//       </ListItemButton>
//     </ListItem> 
//   ))}

//         </List>
       

//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//       {children}
//       </Main>
//     </Box>
//       {/* <UserForm /> */}
//     </div>
//   ) 
// }

// export default sidebar







// // import React from 'react'
// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import Link from 'next/link';
// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),
//   }),
// );

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));
// function sidebar({children}) {
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(false);
  
//     const handleDrawerOpen = () => {
//       setOpen(true);
//     };
  
//     const handleDrawerClose = () => {
//       setOpen(false);
//     };
//   return (
//     <div>
//        <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} style={{ backgroundColor: 'bl' }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{ mr: 2, ...(open && { display: 'none' }) }}
//           >
//             <MenuIcon />      
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             E-commerce
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {[
//           <Link href="/retailer/dashboard/dashboard">Dashboard</Link>, 
//           <Link href="/retailer/profile/profile">Profile</Link>, 
//           <Link href="/product">Product</Link>,  
//           <Link href="/banking">Banking</Link>,  
//           <Link href="/banking">Customer</Link>,  
         
//         ].map((text, index) => (
//             <ListItem key={text} disablePadding>
//               <ListItemButton>
//                 <ListItemIcon>
//                   {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                 </ListItemIcon>
//                 <ListItemText primary={text} />
//               </ListItemButton>
//             </ListItem> 
//           ))}
//         </List>
//         <Divider />

//       </Drawer>
//       <Main open={open}>
//         <DrawerHeader />
//       {children}
//       </Main>
//     </Box>
//       {/* <UserForm /> */}
//     </div>
//   ) 
// }

// export default sidebar
