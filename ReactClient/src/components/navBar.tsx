
import { AppBar, Toolbar, Typography, Button, IconButton, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import logo from "../assets/logo.png";
import { isTokenValid } from "../components/protectedRoute";
import UserAvatar from './avatar';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); 

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token")); 
      console.log(isLoggedIn);
      
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange); 
    };
  }, []);

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        background: 'linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(76,5,58,0.95) 50%, rgba(165, 10, 101, 0.85) 100%)',
        padding: '8px 0',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            edge="start" 
            aria-label="home" 
            component={Link} 
            to="/dashboard" 
            sx={{ 
              color: 'rgb(253, 7, 151)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                color: 'rgb(255, 255, 255)',
                transform: 'scale(1.15) rotate(5deg)'
              }
            }}
          >
            <HomeIcon sx={{ fontSize: 40 }} />
          </IconButton>
          
            <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#fff', 
              display: 'flex', 
              alignItems: 'center',
              ml: 1
            }}
            >
            <img 
              src={logo} 
              alt="Logo" 
              style={{ 
              height: '80px', 
              filter: 'drop-shadow(0 0 10px rgba(253,7,151,0.5))',
              transition: 'all 0.3s ease'
              }} 
            />
            </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {isTokenValid(localStorage.getItem("token") || "") && (
            <Button
              component={Link}
              to="/uploadfile"
              startIcon={<UploadFileIcon />}
              sx={{
                backgroundColor: 'rgba(244, 0, 106, 0.9)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: '0 4px 20px rgba(244, 0, 106, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgb(244, 0, 106)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 7px 30px rgba(244, 0, 106, 0.5)'
                },
                '&:active': {
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Upload File
            </Button>
          )}

          <Button
            component={Link}
            to="/Gallery"
            startIcon={<PhotoLibraryIcon />}
            sx={{
              backgroundColor: 'rgba(250, 83, 159, 0.9)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '50px',
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: '0 4px 20px rgba(250, 83, 159, 0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                color: '#fff',
                backgroundColor: 'rgb(250, 83, 159)',
                transform: 'translateY(-3px)',
                boxShadow: '0 7px 30px rgba(250, 83, 159, 0.5)'
              },
              '&:active': {
                transform: 'translateY(-1px)'
              }
            }}
          >
            Previous Challenges
          </Button>

          {!isTokenValid(localStorage.getItem("token") || "") ? (
            <Button
              component={Link}
              to="/auth"
              startIcon={<LoginIcon />}
              sx={{
                backgroundColor: 'rgba(244, 0, 171, 0.9)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '50px',
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: '0 4px 20px rgba(244, 0, 171, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgb(244, 0, 171)',
                  transform: 'translateY(-3px)',
                  boxShadow: '0 7px 30px rgba(244, 0, 171, 0.5)'
                },
                '&:active': {
                  transform: 'translateY(-1px)'
                }
              }}
            >
              Sign in
            </Button>
          ) : (
            <Box sx={{ 
              marginLeft: 1,
              transition: 'transform 0.3s ease',
              '&:hover': {
                color: '#fff',
                transform: 'scale(1.05)'
              }
            }}>
              <UserAvatar onLogout={() => setIsLoggedIn(false)} />
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;