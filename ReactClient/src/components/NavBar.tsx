

import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import logo from "../assets/logo.png";


const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // בדיקת טוקן ראשונית

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token")); 
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange); // ניקוי האזנה
    };
  }, []);
  return (
    <AppBar position="fixed" sx={{ background: 'linear-gradient(45deg,rgb(6, 6, 6) 30%,rgb(66, 71, 70) 90%)', padding: '5px 0' }}>
      <Toolbar>

        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/dashboard" sx={{ marginRight: 2, color: 'rgb(253, 7, 151)' }}>
          <HomeIcon sx={{ fontSize: 50 ,'&:hover': {
              
              color: 'rgb(255, 255, 255)'
            },}} />
        </IconButton>

        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff', display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{height: '100px',  marginLeft: '10px' }} />
        </Typography>


        <Button
          color="inherit"
          component={Link}
          to="/auth"
          startIcon={<LoginIcon />}
          sx={{
            marginRight: 2,
            backgroundColor:  'rgb(244, 0, 171)',
            color: 'rgb(255, 255, 255)',
            '&:hover': {
              backgroundColor: 'rgb(236, 127, 203)',
              color: 'rgb(0, 0, 0)'
            },
          }}
        >
          Sign in
        </Button>

     
        {isLoggedIn &&
        <Button
          color="inherit"
          component={Link}
          to="/uploadfile"
          startIcon={<UploadFileIcon />}
          sx={{
            marginRight: 2,
            backgroundColor: 'rgb(244, 0, 106)',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgb(236, 127, 203)',
              color: 'rgb(0, 0, 0)'
            },
          }}
        >
          Upload File
        </Button>
}
        <Button
          color="inherit"
          component={Link}
          to="/Gallery"
          startIcon={<PhotoLibraryIcon />}
          sx={{
            backgroundColor: 'rgb(250, 83, 159)',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgb(236, 127, 203)',
              color: 'rgb(0, 0, 0)'

            },
          }}
        >
          Previous Challenges
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;



