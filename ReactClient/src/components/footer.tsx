// import { Box, IconButton, Typography } from '@mui/material';
// import GitHubIcon from '@mui/icons-material/GitHub';

// const Footer = () => {
//   return (
//     <Box
//       component="footer"
//       sx={{
//         // position: 'static',
//         // bottom: 0,
//         // left: 0,
//         // width: '100%',
//         // backgroundColor: 'rgba(0, 0, 0, 0.8)',
//         // // backgroundColor: '#000', // צבע שחור מלא ללא שקיפות
//         // color: 'white',
//         // textAlign: 'center',
//         // py: 1,
//         // zIndex: 9999
//         width: '100%',
//         backgroundColor: 'rgba(0, 0, 0, 0.85)',
//         color: 'white',
//         textAlign: 'center',
//         py: 2
//       }}
//     >

// <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
    
// Shifi Shiff 2025. © All rights reserved.
// </Typography>
      
//       <IconButton
//         href="https://github.com/shifiShiff"
//         target="_blank"
//         sx={{ color: '#fff', padding:'0', '&:hover': {
//             color: 'rgb(255, 0, 98)', // ורוד 💖
//           }}}
//       >
//         <GitHubIcon />
//       </IconButton>
//     </Box>
//   );
// };

// export default Footer;



import { Box, IconButton, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

// const Footer = () => {
//   return (
//     <Box
//       component="footer"
//       sx={{
//         // position: 'absolute',
//         // bottom: 0,
//         // left: 0,
//         // width: '100%',
//         // margin:'0',

//         // backgroundColor: '#000',
//         // color: 'white',
//         // textAlign: 'center',
//         // zIndex: 2,
//         // marginTop:'auto'


//         width: '100%',
//         backgroundColor: '#000',
//         color: 'white',
//         textAlign: 'center',
//         py: 2,
//         zIndex: 2,
//       }}
//     >
//       <IconButton
//         href="https://github.com/shifiShiff"
//         target="_blank"
//         sx={{
//           color: '#fff',
//           '&:hover': {
//             color: 'hotpink',
//             transform: 'scale(1.2)',
//             transition: '0.3s'
//           }
//         }}
//       >
//         <GitHubIcon />
//       </IconButton>
//       <Typography variant="body2">
//         © 2025 Shifi Shif. All rights reserved.
//       </Typography>
//     </Box>
//   );
// };



const Footer = () => {
    return (
      <Box
        component="footer"
        sx={{
        
          position: 'fixed',
          bottom: 0,
            left: 0,

          width: '20%',
        //   backgroundColor: '#000',
        backgroundColor: 'rgb(255, 0, 98)',
        // backgroundColor: 'rgba(0, 0, 0, 0.8)',

          color: 'white',
          textAlign: 'center',
          borderRadius: '0 15px 0 0 ',
        //   py: 2,
          padding: 0,
          zIndex: 2,
          marginTop: '150px',
        }}
      >
        <IconButton
          href="https://github.com/shifiShiff"
          target="_blank"
          sx={{
            color: '#fff',
            '&:hover': {
              color: 'rgb(255, 255, 255)',
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

