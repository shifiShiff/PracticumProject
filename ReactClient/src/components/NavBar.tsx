

import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // בדיקת טוקן ראשונית

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token")); // עדכון המצב כאשר הטוקן משתנה
    };

    // האזנה לשינויים ב-localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange); // ניקוי האזנה
    };
  }, []);
  return (
    <AppBar position="fixed" sx={{ background: 'linear-gradient(45deg,rgb(6, 6, 6) 30%,rgb(66, 71, 70) 90%)', padding: '5px 0' }}>
      <Toolbar>
        {/* Home Button */}
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/dashboard" sx={{ marginRight: 2, color: 'rgb(234, 11, 11)' }}>
          <HomeIcon sx={{ fontSize: 30 }} />
        </IconButton>

        {/* Title */}
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
          Photo Top
        </Typography>


        <Button
          color="inherit"
          component={Link}
          to="/auth"
          startIcon={<LoginIcon />}
          sx={{
            marginRight: 2,
            backgroundColor: '#FF8E53',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#FF7043',
              color: 'rgb(0, 0, 0)'
            },
          }}
        >
          Sign in
        </Button>

        {/* Login Button */}
        {/* <Button
          color="inherit"
          component={Link}
          to="/login"
          startIcon={<LoginIcon />}
          sx={{
            marginRight: 2,
            backgroundColor: '#FF8E53',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#FF7043',
              color: 'rgb(0, 0, 0)'
            },
          }}
        >
          Login
        </Button> */}

        {/* Register Button */}
        {/* <Button
          color="inherit"
          component={Link}
          to="/register"
          startIcon={<AppRegistrationIcon />}
          sx={{
            marginRight: 2,
            backgroundColor: '#66BB6A',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#43A047',
              color: 'rgb(0, 0, 0)'

            },
          }}
        >
          Register
        </Button> */}

        {/* Upload File Button */}
        {isLoggedIn &&
        <Button
          color="inherit"
          component={Link}
          to="/uploadfile"
          startIcon={<UploadFileIcon />}
          sx={{
            marginRight: 2,
            backgroundColor: 'rgb(195, 7, 98)',
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgb(244, 109, 174)',
              color: 'rgb(0, 0, 0)'
            },
          }}
        >
          Upload File
        </Button>
}
        {/* Previous Challenges Button */}
        <Button
          color="inherit"
          component={Link}
          to="/Gallery"
          startIcon={<PhotoLibraryIcon />}
          sx={{
            backgroundColor: '#AB47BC',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#8E24AA',
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



