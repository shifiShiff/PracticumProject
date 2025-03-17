

// import { useEffect, useState } from 'react';
// // import axios from 'axios';
// import ImageStore, { ImageType } from '../store/ImageStore';
// import { Box, Typography } from '@mui/material';
// // import { useNavigate } from 'react-router-dom';
// import { observer } from 'mobx-react-lite';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import IconButton from '@mui/material/IconButton';
// import apiClient from './interceptor';

// const Dashboard = observer(() => {
//   const [images, setImages] = useState<ImageType[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [challenge, setChallenge] = useState<{ id:number, title: string; description: string } | null>(null);
//   // const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem('token'); // בדיקת טוקן


//   useEffect(() => {
//     const fetchCurrentChallengeImages = async () => {
//       try {
//         const currentChallengeResponse = await apiClient.get('http://localhost:5131/api/Challenge/current');
//         const challengeId = currentChallengeResponse.data;
//         console.log(challengeId);

//         const challengeResponse = await apiClient.get(`http://localhost:5131/api/Challenge/${challengeId}`);
//         setChallenge(challengeResponse.data);

//         await fetchImages(challengeId);

//       } catch (err) {
//         setError('Failed to fetch images');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCurrentChallengeImages();
//   }, [ImageStore.imageList]);

//   const fetchImages = async (challengeId: number) => {
//     const imagesResponse = await ImageStore.getImageByChallengeId(challengeId);
//     setImages(imagesResponse);
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   // const AddImage = () => {
//   //   console.log("Add image");
//   //   navigate('/uploadfile/');
//   // }

//   return (
//     <div style={{ marginTop: '50px', width: "100%", height: "auto" }}>
//       {challenge && (
//         <Box sx={{
//           textAlign: 'center',
//           marginBottom: '20px',
//           padding: '20px',
//           border: '2px solid #333',
//           borderRadius: '10px',
//           backgroundColor: '#f9f9f9'
//         }}>
//           <Typography variant="h4" component="h1" sx={{ color: '#333' }}>
//             {challenge.title}
//           </Typography>
//           <Typography variant="h6" component="p" sx={{ color: '#666' }}>
//             {challenge.description}
//           </Typography>
//         </Box>
//       )}

//       {/* <div style={{ position: 'fixed', top: '50%', left: '10px', transform: 'translateY(-50%)', width: 'auto', zIndex: 99, border: 'solid 1px black' }}>
//         <button onClick={AddImage}>Upload image</button>
//       </div> */}



//       {images.map(image => (
//         <div key={image.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>  
//           <img
//             src={image.imageUrl}
//             alt={image.imageName}
//             style={{ maxWidth: "600px", width: "100%", height: "auto" }}
//           />
//           <div style={{
//             width: '50px',
//             alignSelf: 'stretch',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: '#f0f0f0',
//             border: '1px solid #ccc',
//             borderRadius: '10px',
//             marginLeft: '10px'
//           }}>
         
//             <span>{image.votes}</span>
//           </div>
//           {isLoggedIn &&
//           <IconButton style={{ marginLeft: '10px' }} onClick={() => ImageStore.vote(challenge?.id ?? null, image.id, localStorage.getItem('userId'))}>
//           <ThumbUpIcon />
//           </IconButton>
// }
//         </div>
//       ))}
//     </div>
//   );
// });

// export default Dashboard;











// import { useEffect, useState } from 'react';
// import ImageStore, { ImageType } from '../store/ImageStore';
// import { Box, Typography, Card, CardContent, CardMedia, IconButton } from '@mui/material';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import apiClient from './interceptor';
// import { observer } from 'mobx-react-lite';

// const Dashboard = observer(() => {
//   const [images, setImages] = useState<ImageType[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [challenge, setChallenge] = useState<{ id: number, title: string; description: string } | null>(null);
//   const isLoggedIn = !!localStorage.getItem('token'); // בדיקת טוקן

//   useEffect(() => {
//     const fetchCurrentChallengeImages = async () => {
//       try {
//         const currentChallengeResponse = await apiClient.get('http://localhost:5131/api/Challenge/current');
//         const challengeId = currentChallengeResponse.data;

//         const challengeResponse = await apiClient.get(`http://localhost:5131/api/Challenge/${challengeId}`);
//         setChallenge(challengeResponse.data);

//         await fetchImages(challengeId);
//       } catch (err) {
//         setError('Failed to fetch images');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCurrentChallengeImages();
//   }, [ImageStore.imageList]);

//   const fetchImages = async (challengeId: number) => {
//     const imagesResponse = await ImageStore.getImageByChallengeId(challengeId);
//     setImages(imagesResponse);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div style={{ marginTop: '50px', width: "100%", height: "auto", padding: '20px' }}>
//       {challenge && (
//         <Box sx={{
//           textAlign: 'center',
//           marginBottom: '20px',
//           padding: '20px',
//           border: '2px solid #333',
//           borderRadius: '10px',
//           backgroundColor: '#f9f9f9',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
//         }}>
//           <Typography variant="h3" component="h1" sx={{ color: '#333', fontWeight: 'bold' }}>
//             {challenge.title}
//           </Typography>
//           <Typography variant="h5" component="p" sx={{ color: '#666', marginTop: '10px' }}>
//             {challenge.description}
//           </Typography>
//         </Box>
//       )}

//       <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
//         {images.map(image => (
//           <Card key={image.id} sx={{ maxWidth: 600, width:'600px',height:'auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
//             <CardMedia
//               component="img"
//               // height="600"
//               image={image.imageUrl}
//               alt={image.imageName}
//             />
//             <CardContent>
//               <Typography variant="h5" component="div" 
//               sx={{ fontWeight: 'bold', textAlign: 'center' }}
//               >
//                 {image.imageName}
//               </Typography>
//               <Typography 
//               variant="h4" color="text.primary"
//                sx={{ textAlign: 'center', marginBottom: '10px', fontWeight: 'bold', color: '#1976d2' }}
//                >
//                 Votes: {image.votes}
//               </Typography>
//               {isLoggedIn && (
//                 <IconButton
//                   color="primary"
//                   onClick={() => ImageStore.vote(challenge?.id ?? null, image.id, localStorage.getItem('userId'))}
//                   sx={{
//                     display: 'block',
//                     margin: '0 auto',
//                     backgroundColor: '#1976d2',
//                     color: '#fff',
//                     '&:hover': {
//                       backgroundColor: '#1565c0',
//                     },
//                     padding: '10px',
//                     borderRadius: '50%',
//                   }}
//                 >
//                   <ThumbUpIcon sx={{ fontSize: 30 }} />
//                 </IconButton>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// });

// export default Dashboard;












import { useEffect, useState } from 'react';
import ImageStore, { ImageType } from '../store/ImageStore';
import { Box, Typography, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import apiClient from './interceptor';
import { observer } from 'mobx-react-lite';

const Dashboard = observer(() => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<{ id: number, title: string; description: string } | null>(null);
  const isLoggedIn = !!localStorage.getItem('token'); // בדיקת טוקן

  useEffect(() => {
    const fetchCurrentChallengeImages = async () => {
      try {
        const currentChallengeResponse = await apiClient.get('http://localhost:5131/api/Challenge/current');
        const challengeId = currentChallengeResponse.data;

        const challengeResponse = await apiClient.get(`http://localhost:5131/api/Challenge/${challengeId}`);
        setChallenge(challengeResponse.data);

        await fetchImages(challengeId);
      } catch (err) {
        setError('Failed to fetch images');
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentChallengeImages();
  }, [ImageStore.imageList]);

  const fetchImages = async (challengeId: number) => {
    const imagesResponse = await ImageStore.getImageByChallengeId(challengeId);
    setImages(imagesResponse);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Box
      sx={{
        marginTop: '50px',
        width: '100%',
        height: 'auto',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // מרכז את התוכן
      }}
    >
      {challenge && (
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: '40px',
            padding: '20px',
            border: '2px solid #333',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // יותר צל לכותרת
            maxWidth: '800px',
            width: '100%',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: '#333',
              fontWeight: 'bold',
              textTransform: 'uppercase', // אותיות גדולות
              letterSpacing: '2px', // ריווח בין אותיות
            }}
          >
            {challenge.title}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: '#666',
              marginTop: '10px',
              fontStyle: 'italic', // טקסט נטוי
            }}
          >
            {challenge.description}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '30px',
          justifyContent: 'center', // מרכז את הכרטיסים
          width: '100%',
        }}
      >
        {images.map((image) => (
          <Card
            key={image.id}
            sx={{
              maxWidth: 600,
              width: '600px',
              height: 'auto',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)', // יותר צל לכרטיסים
              borderRadius: '15px', // פינות מעוגלות
              overflow: 'hidden', // חיתוך תוכן חורג
              marginRight:'0px'
            }}
          >
            <CardMedia
              component="img"
              image={image.imageUrl}
              alt={image.imageName}
              sx={{
                height: '400px', // גובה התמונה
                objectFit: 'cover', // חיתוך התמונה
              }}
            />
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}
              >
                {image.imageName}
              </Typography>
              <Typography
                variant="h4"
                color="text.primary"
                sx={{
                  textAlign: 'center',
                  marginBottom: '20px',
                  fontWeight: 'bold',
                  color: '#1976d2',
                }}
              >
                Votes: {image.votes}
              </Typography>
              {isLoggedIn && (
                <IconButton
                  color="primary"
                  onClick={() =>
                    ImageStore.vote(
                      challenge?.id ?? null,
                      image.id,
                      localStorage.getItem('userId')
                    )
                  }
                  sx={{
                    display: 'block',
                    margin: '0 auto',
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#1565c0',
                    },
                    padding: '15px',
                    borderRadius: '50%',
                  }}
                >
                  <ThumbUpIcon sx={{ fontSize: 40 }} />
                </IconButton>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
});

export default Dashboard;