import axios from "axios";
import { useState } from "react";
import ImageStore from "../store/ImageStore";
import { useNavigate } from 'react-router-dom';


const UploadFile=()=>{
        const [file, setFile] = useState(null);
        const [uploading, setUploading] = useState(false);
        const [finished, setFinished] = useState(false);
        const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null); // במקום false
        const navigate = useNavigate();

        // פונקציה שתופסת את הקובץ שנבחר
        const handleFileChange = (e:any) => {
          const selectedFile = e.target.files[0];
          setFile(selectedFile);
        };
      
        // פונקציה שתשלח את הקובץ ל-API
        const handleUpload = async () => {
          if (!file) {
            alert("Please select a file.");
            return;
          }
      
          setUploading(true);
          const formData = new FormData();
          formData.append('file', file);  // מוסיף את הקובץ ל-formData
     
        try {
          const currentChallengeResponse = await axios.get('http://localhost:5131/api/Challenge/current');
          const challengeId = currentChallengeResponse.data;
          console.log(challengeId);
          

          const userId=localStorage.getItem('userId')
          console.log(userId);
          
            const response = await axios.post(`http://localhost:5131/api/Upload/upload-file/${userId}/${challengeId}`, formData

          );
      
            console.log("File uploaded successfully", response.data);
            setUploadSuccess(true);
            await ImageStore.getAllImages();
            setFinished(true);
            // navigate('/dashboard/');

          } catch (error) {
            console.error("Error uploading file", error);
            setUploadSuccess(false);
          } finally {
            setUploading(false);
          }
        };
      
        return (
          <div style= {{ position: 'fixed',top:'50%', left:'50%',    transform: 'translate(-50%, -50%)', 
            width: 'auto', zIndex: 99,display:'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button style={{border:'solid 1px black', width:'auto', marginTop:'15px'}} onClick={handleUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
      
            {uploadSuccess === true && <p>File uploaded successfully!</p>}
            {uploadSuccess === false && <p>Upload failed. Try again.</p>}


            {finished && <button style={{border:'solid 1px black', width:'auto', marginTop:'15px'}} onClick={()=>navigate('/dashboard/')}>Go to dashboard</button>}
          </div>
        );
      };
    
      
export default UploadFile;