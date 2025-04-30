import { CardContent, CardMedia } from '@mui/material';
import { useEffect, useState, useRef } from 'react';
import { observer } from "mobx-react-lite";
import { Typography, Box, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ImageStore, { ImageType } from '../store/ImageStore';
import apiClient from './interceptor';

interface Challenge {
  id: number;
  title: string;
  description: string;
}

const ImageGallery = observer(() => {
  const [images, setImages] = useState<ImageType[]>([]);
  const [challenges, setChallenges] = useState<{ [key: number]: Challenge }>({});
  const [currentChallengeId, setCurrentChallengeId] = useState<number | null>(null);
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const fetchImages = async () => {
    await ImageStore.getAllImages();
    setImages(ImageStore.imageList);
  };

  const fetchChallengeDetails = async (challengeId: number) => {
    try {
      const response = await apiClient.get<Challenge>(`/Challenge/${challengeId}`);
      setChallenges(prevChallenges => ({
        ...prevChallenges,
        [challengeId]: response.data
      }));
    } catch (error) {
      console.error(`Error fetching challenge details for ID ${challengeId}:`, error);
    }
  };

  const fetchCurrentChallengeId = async () => {
    try {
      const response = await apiClient.get<number>('/Challenge/current');
      setCurrentChallengeId(response.data);
    } catch (error) {
      console.error('Error fetching current challenge ID:', error);
    }
  };

  useEffect(() => {
    fetchImages();
    fetchCurrentChallengeId();
  }, []);

  useEffect(() => {
    const fetchAllChallengeDetails = async () => {
      const uniqueChallengeIds = Array.from(new Set(images.map(image => image.challengeId)));
      await Promise.all(uniqueChallengeIds.map(challengeId => fetchChallengeDetails(challengeId)));
      
      if (uniqueChallengeIds.length > 0 && activeChallenge === null) {
        const pastChallenges = uniqueChallengeIds.filter(id => id !== currentChallengeId);
        if (pastChallenges.length > 0) {
          setActiveChallenge(pastChallenges[0]);
        }
      }
    };
    if (images.length > 0) {
      fetchAllChallengeDetails();
    }
  }, [images, currentChallengeId, activeChallenge]);

  const groupImagesByChallengeId = (images: ImageType[]) => {
    return images.reduce((groups, image) => {
      const { challengeId } = image;
      if (!groups[challengeId]) {
        groups[challengeId] = [];
      }
      groups[challengeId].push(image);
      return groups;
    }, {} as { [key: number]: ImageType[] });
  };

  const groupedImages = groupImagesByChallengeId(images);

  const getMaxVotesImage = (images: ImageType[]) => {
    return images.reduce((maxImage, image) => image.votes > maxImage.votes ? image : maxImage, images[0]);
  };

  const handleChallengeClick = (challengeId: number) => {
    setExpandedChallenge(expandedChallenge === challengeId ? null : challengeId);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const navigateToChallenge = (challengeId: number) => {
    setActiveChallenge(challengeId);
    setExpandedChallenge(challengeId);
  };


  const pastChallenges = Object.keys(groupedImages)
    .map(Number)
    .filter(id => id !== currentChallengeId);

  return (
    <Box sx={{ 
      padding: '2rem',
      minHeight: '100vh',
      paddingTop: '150px',
      width: 'calc(80vw - 150px)',
    }}>
    
      <Box sx={{ position: 'relative', mb: 4 }}>
        <IconButton 
          onClick={() => scrollCarousel('left')} 
          sx={{ 
            position: 'absolute', 
            left: '15px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            zIndex: 2,
            backgroundColor: 'rgb(251, 0, 109)',
            '&:hover': { backgroundColor: 'rgba(254, 101, 231, 0.9)' }
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
        
        <Box 
          ref={carouselRef}
          sx={{ 
            display: 'flex', 
            overflowX: 'auto', 
            padding: '1rem 2rem',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            gap: '1rem'
          }}
        >
          {pastChallenges.map(challengeId => (
            <Box 
              key={`timeline-${challengeId}`}
              onClick={() => navigateToChallenge(challengeId)}
              sx={{
                minWidth: '200px',
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                borderRadius: '10px',
                backgroundColor: activeChallenge === challengeId ? 'rgb(255, 0, 98)' : 'white',
                color: activeChallenge === challengeId ? 'white' : '#333',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: activeChallenge === challengeId ? 'scale(1.05)' : 'scale(1)',
                '&:hover': {
                  boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {challenges[challengeId]?.title || `challenge ${challengeId}`}
              </Typography>
            </Box>
          ))}
        </Box>
        
        <IconButton 
          onClick={() => scrollCarousel('right')} 
          sx={{ 
            position: 'absolute', 
            right:'15px', 
            top: '50%', 
            transform: 'translateY(-50%)', 
            zIndex: 2,
            backgroundColor: 'rgb(251, 0, 109)',
            '&:hover': { backgroundColor: 'rgba(254, 101, 231, 0.9)' }
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {activeChallenge !== null && challenges[activeChallenge] && (
        <Box sx={{
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          maxWidth: '1200px',
          margin: '0 auto',
          transition: 'all 0.3s ease',
          marginTop:'50px'
        }}>
          <Box sx={{
            padding: '2rem',
            background: 'linear-gradient(to right,rgb(251, 0, 109),rgb(244, 110, 146))',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', direction: 'ltr' }}>
              {challenges[activeChallenge].title}
            </Typography>
            <IconButton 
              onClick={() => handleChallengeClick(activeChallenge)}
              sx={{ color: 'white' }}
            >
              <ExpandMoreIcon sx={{ 
                transform: expandedChallenge === activeChallenge ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.3s ease'
              }} />
            </IconButton>
          </Box>

          <Box sx={{
            padding: '1rem 2rem',
            backgroundColor: 'rgba(249, 249, 249, 0.8)',
          }}>
            <Typography variant="h6" sx={{ direction: 'rtl' }}>
              {challenges[activeChallenge].description}
            </Typography>
          </Box>

          {expandedChallenge === activeChallenge && (
            <Box sx={{ 
              padding: '2rem', 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {groupedImages[activeChallenge]?.map((image) => {
                const isWinner = image.id === getMaxVotesImage(groupedImages[activeChallenge])?.id;
                
                return (
                  <Box
                    key={image.id}
                    sx={{
                      borderRadius: '15px',
                      overflow: 'hidden',
                      boxShadow: isWinner 
                        ? '0 10px 20px rgba(255, 0, 98, 0.4)' 
                        : '0 8px 16px rgba(0, 0, 0, 0.1)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: isWinner 
                          ? '0 15px 30px rgba(255, 0, 98, 0.5)' 
                          : '0 12px 24px rgba(0, 0, 0, 0.15)',
                      }
                    }}
                  >
                    {isWinner && (
                      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        backgroundColor: 'rgb(255, 0, 98)',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderBottomLeftRadius: '10px',
                        zIndex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}>
                        <EmojiEventsIcon />
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Winner</Typography>
                      </Box>
                    )}
                    <CardMedia
                      component="img"
                      image={image.imageUrl}
                      alt={image.imageName}
                      sx={{
                        height: '250px',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    />
                    <CardContent sx={{
                      backgroundColor: isWinner ? 'rgba(255, 0, 98, 0.05)' : '#fff',
                      padding: '1.5rem',
                      borderTop: isWinner ? '3px solid rgb(255, 0, 98)' : 'none'
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        direction: 'rtl'
                      }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                          {image.imageName}
                        </Typography>
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          backgroundColor: 'rgba(255, 0, 98, 0.1)',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px'
                        }}>
                          <Typography variant="body1" sx={{ color: 'rgb(255, 0, 98)', fontWeight: 'bold' }}>
                            {image.votes}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#555' }}>Votes</Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
});

export default ImageGallery;