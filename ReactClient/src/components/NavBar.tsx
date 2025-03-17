

// import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import { Link } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
//       <Toolbar>
//         <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/dashboard">
//           <HomeIcon />
//         </IconButton>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Photo Top
//         </Typography>
//         <Button color="inherit" component={Link} to="/login" sx={{ marginRight: 2 }}>
//           Login
//         </Button>
//         <Button color="inherit" component={Link} to="/register" sx={{ marginRight: 2 }}>
//           Register
//         </Button>
//         <Button color="inherit" component={Link} to="/uploadfile">
//           Upload File
//         </Button>
//         <Button color="inherit" component={Link} to="/Gallery">
//         Previous challenges
//         </Button>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavBar;


import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ background: 'linear-gradient(45deg,rgb(7, 195, 120) 30%,rgb(53, 237, 209) 90%)', padding: '5px 0' }}>
      <Toolbar>
        {/* Home Button */}
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/dashboard" sx={{ marginRight: 2, color: 'rgb(0, 0, 0)' }}>
          <HomeIcon sx={{ fontSize: 30 }} />
        </IconButton>

        {/* Title */}
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold', color: '#fff' }}>
          Photo Top
        </Typography>

        {/* Login Button */}
        <Button
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
        </Button>

        {/* Register Button */}
        <Button
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
        </Button>

        {/* Upload File Button */}
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