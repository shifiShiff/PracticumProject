import {  CardContent, CardMedia} from '@mui/material';
import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

  const fetchImages = async () => {
    await ImageStore.getAllImages();
    console.log("Fetch images");
    setImages(ImageStore.imageList);
  };

  const fetchChallengeDetails = async (challengeId: number) => {
    try {
      const response = await apiClient.get<Challenge>(`/Challenge/${challengeId}`);
      // const response = await axios.get<Challenge>(`http://localhost:5131/api/Challenge/${challengeId}`);
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
      // const response = await axios.get<number>('http://localhost:5131/api/Challenge/current');
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
    };
    if (images.length > 0) {
      fetchAllChallengeDetails();
    }
  }, [images]);

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

return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
    {Object.keys(groupedImages).map((challengeIdStr) => {
      const challengeId = Number(challengeIdStr);
      if (challengeId === currentChallengeId) {
        return null; // דלג על האתגר הנוכחי
      }
      const challenge = challenges[challengeId];
      const maxVotesImage = getMaxVotesImage(groupedImages[challengeId]);

      return (
        <Accordion key={challengeId} style={{ width: '100%', maxWidth: '800px', marginBottom: '20px' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${challengeId}-content`}
            id={`panel${challengeId}-header`}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                // textTransform: 'uppercase',
                color: '#333',
              }}
            >
              {challenge ? `${challenge.title}  ${challenge?.description}` : `Challenge ID: ${challengeId}`}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                marginBottom: '20px',
              }}
            >
              
            </Typography>
            {groupedImages[challengeId].map((image) => (
              <Box
                key={image.id}
                sx={{
                  width: '100%',
                  maxWidth: '600px',
                  marginBottom: '20px',
                  boxShadow:
                    image.id === maxVotesImage.id
                      ? '0 10px 20px rgba(255, 215, 0, 0.5)' // צל נוסף למנצח
                      : '0 4px 8px rgba(0, 0, 0, 0.1)',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {image.id === maxVotesImage.id && (
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      backgroundColor: 'rgba(255, 215, 0, 0.9)',
                      color: '#fff',
                      textAlign: 'center',
                      padding: '5px 0',
                      zIndex: 1,
                      fontWeight: 'bold',
                    }}
                  >
                    WINNER
                  </Typography>
                )}
                <CardMedia
                  component="img"
                  image={image.imageUrl}
                  alt={image.imageName}
                  sx={{
                    height: '300px',
                    objectFit: 'cover',
                  }}
                />
                <CardContent
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px',
                    backgroundColor: '#f0f0f0',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#333',
                    }}
                  >
                    {image.imageName}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      color: '#1976d2',
                    }}
                  >
                    Votes: {image.votes}
                  </Typography>
                </CardContent>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      );
    })}
  </div>

  );
});

export default ImageGallery;
