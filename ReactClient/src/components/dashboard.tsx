

import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageStore, { ImageType } from '../store/ImageStore';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

const Dashboard = observer(() => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<{ id:number, title: string; description: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentChallengeImages = async () => {
      try {
        const currentChallengeResponse = await axios.get('http://localhost:5131/api/Challenge/current');
        const challengeId = currentChallengeResponse.data;
        console.log(challengeId);

        const challengeResponse = await axios.get(`http://localhost:5131/api/Challenge/${challengeId}`);
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
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const AddImage = () => {
    console.log("Add image");
    navigate('/uploadfile/');
  }

  return (
    <div style={{ marginTop: '50px', width: "100%", height: "auto" }}>
      {challenge && (
        <Box sx={{
          textAlign: 'center',
          marginBottom: '20px',
          padding: '20px',
          border: '2px solid #333',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9'
        }}>
          <Typography variant="h4" component="h1" sx={{ color: '#333' }}>
            {challenge.title}
          </Typography>
          <Typography variant="h6" component="p" sx={{ color: '#666' }}>
            {challenge.description}
          </Typography>
        </Box>
      )}

      {/* <div style={{ position: 'fixed', top: '50%', left: '10px', transform: 'translateY(-50%)', width: 'auto', zIndex: 99, border: 'solid 1px black' }}>
        <button onClick={AddImage}>Upload image</button>
      </div> */}


{/* <div style={{ position: 'fixed', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: 99 }}>
      <Button
        variant="contained"
        onClick={AddImage}
        sx={{
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '30px',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          fontWeight: 'bold',
          textTransform: 'none',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
            boxShadow: '0 5px 7px 3px rgba(255, 105, 135, .5)',
          },
        }}
      >
        Upload Image
        </Button>
        </div> */}
        

      {images.map(image => (
        <div key={image.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>  
          <img
            src={image.imageUrl}
            alt={image.imageName}
            style={{ maxWidth: "600px", width: "100%", height: "auto" }}
          />
          <div style={{
            width: '50px',
            alignSelf: 'stretch',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '10px',
            marginLeft: '10px'
          }}>
         
            <span>{image.votes}</span>
          </div>
          <IconButton style={{ marginLeft: '10px' }} onClick={() => ImageStore.vote(challenge?.id ?? null, image.id, localStorage.getItem('userId'))}>
          <ThumbUpIcon />
          </IconButton>
        </div>
      ))}
    </div>
  );
});

export default Dashboard;
































// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../redux/store';
// import { fetchImages } from '../redux/slices/imageSlice';
// import axios from 'axios';
// // import { Box, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const images = useSelector((state: RootState) => state.images.images);
//   const loading = useSelector((state: RootState) => state.images.loading);
//   const error = useSelector((state: RootState) => state.images.error);

//   const [challengeId, setChallengeId] = useState<number | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchChallengeId = async () => {
//       try {
//         const response = await axios.get('http://localhost:5131/api/Challenge/current');
//         const id = response.data;
//         setChallengeId(id);
//         dispatch(fetchImages(id)); // שימוש ישיר ב-ID בלי למשוך את ה-Challenge
//       } catch (err) {
//         console.error("Failed to fetch challenge ID");
//       }
//     };

//     fetchChallengeId();
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div style={{ marginTop: '50px', width: "100%", height: "auto" }}>
//       <div style={{ position: 'fixed', top: '50%', left: '10px', transform: 'translateY(-50%)', zIndex: 99, border: 'solid 1px black' }}>
//         <button onClick={() => navigate('/uploadfile/')}>Upload image</button>
//       </div>

//       {images.map(image => (
//         <img key={image.id} src={image.imageUrl} alt={image.imageName} style={{ maxWidth: "600px", margin: "15px", width: "100%", height: "auto" }} />
//       ))}
//     </div>
//   );
// };

// export default Dashboard;
