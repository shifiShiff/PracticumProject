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
  const isLoggedIn = !!localStorage.getItem('token'); 

  useEffect(() => {
    const fetchCurrentChallengeImages = async () => {
      try {
        const currentChallengeResponse = await apiClient.get('Challenge/current');
        const challengeId = currentChallengeResponse.data;

        const challengeResponse = await apiClient.get(`/Challenge/${challengeId}`);
        setChallenge(challengeResponse.data);

        await fetchImages(challengeId);
      } catch (err) {
        setError('No Open Challenge');
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
    const decoded: any = jwtDecode(token); 
    return decoded.userId;
  }

  const fetchImages = async (challengeId: number) => {
    const imagesResponse = await ImageStore.getImageByChallengeId(challengeId);
    setImages(imagesResponse);
  };

  if (loading) {
    return (
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: 'linear-gradient(120deg, rgba(255,255,255,0.8), rgba(255,0,98,0.05))',
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px'
          }}
        >
          <div className="loading-spinner" style={{
            width: '60px',
            height: '60px',
            border: '5px solid rgba(255, 0, 98, 0.2)',
            borderTop: '5px solid rgb(255, 0, 98)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }}></div>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgb(255, 0, 98)', 
              fontWeight: '500',
              letterSpacing: '1px'
            }}
          >
            Loading Images...
          </Typography>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          background: 'linear-gradient(120deg, rgba(255,255,255,0.8), rgba(255,0,98,0.05))',
        }}
      >
        <Card 
          sx={{
            maxWidth: '500px',
            borderRadius: '15px',
            boxShadow: '0 8px 20px rgba(255, 0, 98, 0.15)',
            padding: '40px',
            textAlign: 'center',
            border: '1px solid rgba(255, 0, 98, 0.2)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              color: 'rgb(255, 0, 98)', 
              fontWeight: 'bold',
              marginBottom: '15px'
            }}
          >
            Oops!
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              fontSize: '18px',
              color: '#555',
              marginBottom: '20px'
            }}
          >
            {error}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: '16px',
              color: '#777',
              fontStyle: 'italic'
            }}
          >
            Please check back later for new challenges.
          </Typography>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(120deg, rgba(255,255,255,0.8), rgba(255,0,98,0.05))',
        minHeight: '100vh',
        paddingBottom: '50px',
      }}
    >
      <Box
        sx={{
          marginTop: '100px',
          width: '100%',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {challenge && (
          <Box
            sx={{
              textAlign: 'center',
              marginBottom: '40px',
              padding: '30px',
              borderRadius: '15px',
              backgroundColor: 'rgb(255, 255, 255)',
              boxShadow: '0 10px 25px rgba(255, 0, 98, 0.15)',
              maxWidth: '800px',
              width: '80%',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255, 0, 98, 0.2)',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '5px',
              width: '100%',
              background: 'linear-gradient(90deg, rgb(255, 0, 98), rgb(255, 180, 204))'
            }}></div>
            
            <Typography
              variant="h3"
              component="h1"
              sx={{ 
                color: '#333', 
                fontWeight: 'bold', 
                letterSpacing: '1px'
              }}
            >
              {challenge.title}
            </Typography>
            
            <Typography
              variant="h5"
              component="p"
              sx={{ 
                color: 'rgb(255, 0, 98)', 
                marginTop: '10px', 
                fontStyle: 'italic'
              }}
            >
              {challenge.description}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginTop: '20px',
              gap: '10px'
            }}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '5px',
                backgroundColor: 'rgba(255, 0, 98, 0.08)',
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '0.9rem'
              }}>
                <span style={{ fontSize: '18px' }}></span>
                <Typography variant="body2">
                  {images.length} Photos
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '20px',
            justifyContent: 'center',
          }}
        >
          {images.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                padding: '40px',
                backgroundColor: 'white',
                borderRadius: '15px',
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              <Typography variant="h5" sx={{ color: '#555' }}>
                No images submitted yet for this challenge
              </Typography>
              <Typography variant="body1" sx={{ color: '#777', marginTop: '10px' }}>
                Be the first to share your creative work!
              </Typography>
            </Box>
          ) : (
            images.map((image) => (
              <Card
                key={image.id}
                sx={{
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(255, 0, 98, 0.2)',
                  },
                  border: '1px solid rgba(255, 0, 98, 0.1)',
                }}
              >
                <CardMedia
                  component="img"
                  image={image.imageUrl}
                  alt={image.imageName}
                  sx={{
                    width: '520px',
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ 
                  padding: '25px 20px',
                  backgroundColor: 'white'
                }}>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ 
                      fontWeight: 'bold', 
                      textAlign: 'center', 
                      marginBottom: '2px',
                      color: '#333',
                    }}
                  >
                    {image.imageName}
                  </Typography>
                  
                  <Typography
                    variant="h4"
                    sx={{ 
                      textAlign: 'center', 
                      marginBottom: '10px', 
                      fontWeight: 'bold', 
                      color: 'rgb(255, 0, 98)' 
                    }}
                  >
                    Votes: {image.votes}
                  </Typography>
                  
                  {isLoggedIn && (
                    <IconButton
                      color="primary"
                      onClick={() => ImageStore.vote(challenge?.id ?? null, image.id, getUserId())}
                      sx={{
                        display: 'block',
                        margin: '0 auto',
                        color: 'white',
                        backgroundColor: 'rgb(255, 0, 98)',
                        boxShadow: '0 4px 10px rgba(255, 0, 98, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgb(225, 0, 88)',
                          transform: 'scale(1.05)',
                          boxShadow: '0 6px 15px rgba(255, 0, 98, 0.4)',
                        },
                        padding: '15px',
                        borderRadius: '50%',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <ThumbUpIcon sx={{ fontSize: 40 }} />
                    </IconButton>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Box>
    </Box>

    
  );
});

export default Dashboard;