
import { useEffect, useState } from 'react';
import ImageStore, { ImageType } from '../store/ImageStore';
import { Box, Typography, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import apiClient from './interceptor';
import { observer } from 'mobx-react-lite';
import { jwtDecode } from 'jwt-decode';

const Dashboard = observer(() => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<{ id: number, title: string; description: string } | null>(null);
  const isLoggedIn = !!localStorage.getItem('token'); // בדיקת טוקן

  useEffect(() => {
    const fetchCurrentChallengeImages = async () => {
      try {
        const currentChallengeResponse = await apiClient.get('Challenge/current');
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


  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error("Token is null or undefined");
    }
    const decoded: any = jwtDecode(token); // פענוח ה-JWT
    return decoded.userId;
  }

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
              // textTransform: 'uppercase', // אותיות גדולות
              letterSpacing: '2px', // ריווח בין אותיות
            }}
          >
            {challenge.title}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ color: '#666', marginTop: '10px', fontStyle: 'italic', }}>
            {challenge.description}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px',
          justifyContent: 'center', // מרכז את הכרטיסים
          width: '100%',
        }}>
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
              marginRight: '0px'
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
                    ImageStore.vote(challenge?.id ?? null, image.id, getUserId())}
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