

import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageStore, { ImageType } from '../store/ImageStore';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const Dashboard= observer(() => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [challenge, setChallenge] = useState<{ title: string; description: string } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentChallengeImages = async () => {
            try {
                const currentChallengeResponse = await axios.get('http://localhost:5131/api/Challenge/current');
                const challengeId = currentChallengeResponse.data;
                console.log(challengeId);

                const challengeResponse = await axios.get(`http://localhost:5131/api/Challenge/${challengeId}`);
                setChallenge(challengeResponse.data);

                // const imagesResponse = await axios.get(`http://localhost:5131/api/Image/${challengeId}`);
                
                // const imagesResponse = await ImageStore.getImageByChallengeId(challengeId);
                // setImages(imagesResponse);
                await fetchImages(challengeId);

            } catch (err) {
                setError('Failed to fetch images');
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentChallengeImages();
    }, [ImageStore.imageList]);

    const fetchImages=async (challengeId:number)=>{
        const imagesResponse = await ImageStore.getImageByChallengeId(challengeId);
        setImages(imagesResponse);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const AddImage=()=>{
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


            <div style={{ position: 'fixed', top: '50%', left: '10px', transform: 'translateY(-50%)', width: 'auto', zIndex: 99, border: 'solid 1px black' }}>

                <button onClick={AddImage}>Upload image</button>
            </div>

            {images.map(image => (
                <img
                    key={image.id}
                    src={image.imageUrl}
                    alt={image.imageName}
                    style={{ maxWidth: "600px", margin: "15px", width: "100%", height: "auto" }}
                />
            ))}
        </div>
    );
});

export default Dashboard;