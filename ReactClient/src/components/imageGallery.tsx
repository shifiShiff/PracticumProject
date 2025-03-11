// ImageGallery.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Image {
  id: number; // עדכן את הסוג בהתאם לשדה המזהה בבסיס הנתונים שלך (יכול להיות גם string)
  imageUrl: string;
  imageName: string;    
  challengeId:number;
  // אפשר להוסיף שדות נוספים אם יש צורך
}

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get<Image[]>("http://localhost:5131/api/Image");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      {images.map(image => (
        <img
          key={image.id}
          src={image.imageUrl}
          alt="Uploaded"
          style={{ maxWidth: "200px", margin: "10px" }}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
