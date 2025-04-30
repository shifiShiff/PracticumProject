import { Box, IconButton, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';


const Footer = () => {
    return (
      <Box
        component="footer"
        sx={{
        
          position: 'fixed',
          // position: 'relative',
          bottom: 0,
            left: 0,
          // width: '100%',
          width: '20%',
        backgroundColor: 'rgb(255, 255, 255)',
          color: 'black',
          textAlign: 'center',
          borderRadius: '0 15px 0 0 ',
          padding: 0,
          zIndex: 2,
          marginTop: '150px',
        }}
      >
        <IconButton
          href="https://github.com/shifiShiff"
          target="_blank"
          sx={{
            color: 'rgb(3, 3, 3)',
            '&:hover': {
              color: 'rgb(3, 3, 3)',
              transform: 'scale(1.2)',
              transition: '0.3s'
            }
          }}
        >
          <GitHubIcon />
        </IconButton>
        <Typography variant="body2">
            Shifi Shif 2025. © All rights reserved.
        </Typography>
      </Box>
    );
  };
  
export default Footer;


