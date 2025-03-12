

import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/dashboard">
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Photo Top
        </Typography>
        <Button color="inherit" component={Link} to="/login" sx={{ marginRight: 2 }}>
          Login
        </Button>
        <Button color="inherit" component={Link} to="/register" sx={{ marginRight: 2 }}>
          Register
        </Button>
        {/* <Button color="inherit" component={Link} to="/dashboard/uploadfile">
          Upload File
        </Button> */}
        <Button color="inherit" component={Link} to="/Gallery">
        Previous challenges
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;