import { useState } from "react";
import ImageStore from "../store/ImageStore";
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import '../App.css';
import apiClient from "./interceptor";
import { jwtDecode } from 'jwt-decode';

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null); // במקום false
  const navigate = useNavigate();


  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    const maxSizeInMB = 10;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

    if (selectedFile.size > maxSizeInBytes) {
      alert(`File size exceeds ${maxSizeInMB} MB. Please select a smaller file.`);
      setFile(null);
      e.target.value = null;
    } else {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);  // מוסיף את הקובץ ל-formData

    try {
      const currentChallengeResponse = await apiClient.get('http://localhost:5131/api/Challenge/current');
      const challengeId = currentChallengeResponse.data;
      console.log(challengeId);

const token = localStorage.getItem('token');
if (!token) {
  throw new Error("Token is null or undefined");
}
const decoded: any = jwtDecode(token); // פענוח ה-JWT
const userId= decoded.userId;


      const response = await apiClient.post(`http://localhost:5131/api/Upload/upload-file/${userId}/${challengeId}`, formData,
        { headers: { "Content-Type": "multipart/form-data" } }

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
    <div style={{
      position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      width: 'auto', zIndex: 99, display: 'flex', flexDirection: 'column', gap: '10px'
    }}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden-file-input"
        id="file-input"
      />
      <label htmlFor="file-input" className="custom-file-upload">
        Choose File
      </label>
      {file && <p style={{ marginTop: '10px' }}>{file.name}</p>}

      <button style={{ border: 'solid 1px black', width: 'auto', marginTop: '15px' }} onClick={handleUpload} disabled={uploading}>
        {uploading ? <LinearProgress style={{ width: '100%' }} /> : "Upload Image"}
      </button>

      {uploadSuccess === true && <p>File uploaded successfully!</p>}
      {uploadSuccess === false && <p>Upload failed. Try again.</p>}


      {finished && <button style={{ border: 'solid 1px black', width: 'auto', marginTop: '15px' }} onClick={() => navigate('/dashboard/')}>Go to dashboard</button>}
    </div>
  );
};


export default UploadFile;


