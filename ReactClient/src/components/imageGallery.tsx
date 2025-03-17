

// import { useEffect, useState } from 'react';
// import { observer } from "mobx-react-lite";
// import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ImageStore, { ImageType } from '../store/ImageStore';
// import axios from 'axios';

// interface Challenge {
//   id: number;
//   title: string;
//   description: string;
// }

// const ImageGallery = observer(() => {
//   const [images, setImages] = useState<ImageType[]>([]);
//   const [challenges, setChallenges] = useState<{ [key: number]: Challenge }>({});

//   const fetchImages = async () => {
//     await ImageStore.getAllImages();
//     console.log("Fetch images");
//     setImages(ImageStore.imageList);
//   };

//   const fetchChallengeDetails = async (challengeId: number) => {
//     try {
//       const response = await axios.get<Challenge>(`http://localhost:5131/api/Challenge/${challengeId}`);
//       setChallenges(prevChallenges => ({
//         ...prevChallenges,
//         [challengeId]: response.data
//       }));
//     } catch (error) {
//       console.error(`Error fetching challenge details for ID ${challengeId}:`, error);
//     }
//   };

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   useEffect(() => {
//     const fetchAllChallengeDetails = async () => {
//       const uniqueChallengeIds = Array.from(new Set(images.map(image => image.challengeId)));
//       await Promise.all(uniqueChallengeIds.map(challengeId => fetchChallengeDetails(challengeId)));
//     };
//     if (images.length > 0) {
//       fetchAllChallengeDetails();
//     }
//   }, [images]);

//   const groupImagesByChallengeId = (images: ImageType[]) => {
//     return images.reduce((groups, image) => {
//       const { challengeId } = image;
//       if (!groups[challengeId]) {
//         groups[challengeId] = [];
//       }
//       groups[challengeId].push(image);
//       return groups;
//     }, {} as { [key: number]: ImageType[] });
//   };

//   const groupedImages = groupImagesByChallengeId(images);

//   const getMaxVotesImage = (images: ImageType[]) => {
//     return images.reduce((maxImage, image) => image.votes > maxImage.votes ? image : maxImage, images[0]);
//   };

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
//       {Object.keys(groupedImages).map(challengeIdStr => {
//         const challengeId = Number(challengeIdStr);
//         const challenge = challenges[challengeId];
//         const maxVotesImage = getMaxVotesImage(groupedImages[challengeId]);
//         return (
//           <Accordion key={challengeId} style={{ width: '100%', marginBottom: '20px' }}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel${challengeId}-content`}
//               id={`panel${challengeId}-header`}
//             >
//               <Typography>
//                 {challenge ? `${challenge.title}: ${challenge.description}` : `Challenge ID: ${challengeId}`}
//               </Typography>
//             </AccordionSummary>
//             <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//               {groupedImages[challengeId].map(image => (
//                 <Box
//                   key={image.id}
//                   sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     marginBottom: '15px',
//                     boxShadow: image.id === maxVotesImage.id ? '0 10px 15px rgba(0, 0, 0, 0.2)' : 'none',
//                     position: 'relative',
//                     borderRadius: '10px',
//                     overflow: 'hidden'
//                   }}
//                 >
//                   {image.id === maxVotesImage.id && (
//                     <Typography
//                       variant="h6"
//                       component="div"
//                       sx={{
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         width: '100%',
//                         backgroundColor: 'rgba(255, 215, 0, 0.8)',
//                         color: '#fff',
//                         textAlign: 'center',
//                         padding: '5px 0',
//                         zIndex: 1
//                       }}
//                     >
//                       WINNER
//                     </Typography>
//                   )}
//                   <img
//                     src={image.imageUrl}
//                     alt={image.imageName}
//                     style={{ maxWidth: "600px", width: "100%", height: "auto" }}
//                   />
//                   <Box
//                     sx={{
//                       width: '50px',
//                       alignSelf: 'stretch',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       backgroundColor: '#f0f0f0',
//                       border: '1px solid #ccc',
//                       marginLeft: '10px'
//                     }}
//                   >
//                     <span>{image.votes}</span>
//                   </Box>
//                 </Box>
//               ))}
//             </AccordionDetails>
//           </Accordion>
//         );
//       })}
//     </div>
//   );
// });

// export default ImageGallery;


import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageStore, { ImageType } from '../store/ImageStore';
import axios from 'axios';

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
      const response = await axios.get<Challenge>(`http://localhost:5131/api/Challenge/${challengeId}`);
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
      const response = await axios.get<number>('http://localhost:5131/api/Challenge/current');
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
      {Object.keys(groupedImages).map(challengeIdStr => {
        const challengeId = Number(challengeIdStr);
        if (challengeId === currentChallengeId) {
          return null; // דלג על האתגר הנוכחי
        }
        const challenge = challenges[challengeId];
        const maxVotesImage = getMaxVotesImage(groupedImages[challengeId]);
        return (
          <Accordion key={challengeId} style={{ width: '100%', marginBottom: '20px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${challengeId}-content`}
              id={`panel${challengeId}-header`}
            >
              <Typography>
                {challenge ? `${challenge.title}: ${challenge.description}` : `Challenge ID: ${challengeId}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {groupedImages[challengeId].map(image => (
                <Box
                  key={image.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px',
                    boxShadow: image.id === maxVotesImage.id ? '0 10px 15px rgba(0, 0, 0, 0.2)' : 'none',
                    position: 'relative',
                    borderRadius: '10px',
                    overflow: 'hidden'
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
                        backgroundColor: 'rgba(255, 215, 0, 0.8)',
                        color: '#fff',
                        textAlign: 'center',
                        padding: '5px 0',
                        zIndex: 1
                      }}
                    >
                      WINNER
                    </Typography>
                  )}
                  <img
                    src={image.imageUrl}
                    alt={image.imageName}
                    style={{ maxWidth: "600px", width: "100%", height: "auto" }}
                  />
                  <Box
                    sx={{
                      width: '50px',
                      alignSelf: 'stretch',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f0f0f0',
                      border: '1px solid #ccc',
                      marginLeft: '10px'
                    }}
                  >
                    <span>{image.votes}</span>
                  </Box>
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