
// // import { useEffect, useState } from 'react';
// // import { observer } from "mobx-react-lite";
// // import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
// // import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// // import ImageStore from '../store/ImageStore';
// // import { Outlet } from 'react-router-dom';

// // interface Image {
// //   id: number;
// //   imageUrl: string;
// //   imageName: string;    
// //   challengeId: number;
// // }

// // const ImageGallery= observer(() => {
// //   const [images, setImages] = useState<Image[]>([]);

// //   const fetchImages = async () => {
// //     // קריאה לפונקציה המוגדרת ב ImageStore
// //      await ImageStore.getAllImages();
// //      console.log("Fetch images");
// //      setImages(ImageStore.imageList);
     
// //   };

// //   useEffect(() => {
// //     fetchImages();
// //   }, []);

// //   // פונקציה למיון התמונות לפי challengeId
// //   const groupImagesByChallengeId = (images: Image[]) => {
// //     return images.reduce((groups, image) => {
// //       const { challengeId } = image;
// //       if (!groups[challengeId]) {
// //         groups[challengeId] = [];
// //       }
// //       groups[challengeId].push(image);
// //       return groups;
// //     }, {} as { [key: number]: Image[] });
// //   };

// //   const groupedImages = groupImagesByChallengeId(images);

// //   return (
// //     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// //       {Object.keys(groupedImages).map(challengeIdStr => {
// //         const challengeId = Number(challengeIdStr);
// //         return (
// //           <Accordion key={challengeId} style={{ width: '100%', marginBottom: '20px' }}>
// //             <AccordionSummary
// //               expandIcon={<ExpandMoreIcon />}
// //               aria-controls={`panel${challengeId}-content`}
// //               id={`panel${challengeId}-header`}
// //             >
// //               <Typography>Challenge ID: {challengeId}</Typography>
// //             </AccordionSummary>
// //             <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// //               {groupedImages[challengeId].map(image => (
// //                 <img
// //                   key={image.id}
// //                   src={image.imageUrl}
// //                   alt={image.imageName}
// //                   style={{ maxWidth: "600px", margin: "20px", width: "100%", height: "auto" }}
// //                 />
// //               ))}
// //             </AccordionDetails>
// //           </Accordion>
// //         );
// //       })}
// //       <Outlet/>
// //     </div>
    
// //   );
// // });

// // export default ImageGallery;


// import { useEffect, useState } from 'react';
// import { observer } from "mobx-react-lite";
// import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ImageStore, { ImageType } from '../store/ImageStore';



// const ImageGallery = observer(() => {
//   const [images, setImages] = useState<ImageType[]>([]);

//   const fetchImages = async () => {
//     // קריאה לפונקציה המוגדרת ב ImageStore
//     await ImageStore.getAllImages();
//     console.log("Fetch images");
//     setImages(ImageStore.imageList);
//   };

  

//   useEffect(() => {
//     fetchImages();
//   }, []);



//   // פונקציה למיון התמונות לפי challengeId
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

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
//       {Object.keys(groupedImages).map(challengeIdStr => {
//         const challengeId = Number(challengeIdStr);
//         return (
//           <Accordion key={challengeId} style={{ width: '100%', marginBottom: '20px' }}>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls={`panel${challengeId}-content`}
//               id={`panel${challengeId}-header`}
//             >
//               <Typography>Challenge ID: {challengeId}</Typography>
             
//             </AccordionSummary>
//             <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//               {groupedImages[challengeId].map(image => (
//                 <img
//                   key={image.id}
//                   src={image.imageUrl}
//                   alt={image.imageName}
//                   style={{ maxWidth: "600px", margin: "20px", width: "100%", height: "auto" }}
//                 />
//               ))}
//             </AccordionDetails>
//           </Accordion>
//         );
//       })}
//       {/* <Outlet /> */}
//     </div>
//   );
// });

// export default ImageGallery;


import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
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

  const fetchImages = async () => {
    // קריאה לפונקציה המוגדרת ב ImageStore
    await ImageStore.getAllImages();
    console.log("Fetch images");
    setImages(ImageStore.imageList);
    // images.map(image => async ()=> {
    //   console.log(image.challengeId);
    //    await fetchChallengeDetails(image.challengeId);
    // });
   
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

  useEffect(() => {
     fetchImages();
  }, []);

  // useEffect(() => {
  //   const uniqueChallengeIds = Array.from(new Set(images.map(image => image.challengeId)));
  //   uniqueChallengeIds.forEach(challengeId => {
  //     fetchChallengeDetails(challengeId);
  //   });
  // }, [images]);

  useEffect(() => {
    const fetchAllChallengeDetails = async () => {
      const uniqueChallengeIds = Array.from(new Set(images.map(image => image.challengeId)));
      await Promise.all(uniqueChallengeIds.map(challengeId => fetchChallengeDetails(challengeId)));
    };
    if (images.length > 0) {
      fetchAllChallengeDetails();
    }
  }, [images]);


  // פונקציה למיון התמונות לפי challengeId
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>
      {Object.keys(groupedImages).map(challengeIdStr => {
        const challengeId = Number(challengeIdStr);
        const challenge = challenges[challengeId];
        return (
          <Accordion key={challengeId} style={{ width: '100%', marginBottom: '20px' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${challengeId}-content`}
              id={`panel${challengeId}-header`}
            >
              <Typography>
                {/* {`${challenge.title}: ${challenge.description}`} */}
                {challenge ? `${challenge.title}: ${challenge.description}` : `Challenge ID: ${challengeId}`}
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {groupedImages[challengeId].map(image => (
                <img
                  key={image.id}
                  src={image.imageUrl}
                  alt={image.imageName}
                  style={{ maxWidth: "600px", margin: "20px", width: "100%", height: "auto" }}
                />
              ))}
            </AccordionDetails>
          </Accordion>
        );
      })}
      {/* <Outlet /> */}
    </div>
  );
});

export default ImageGallery;