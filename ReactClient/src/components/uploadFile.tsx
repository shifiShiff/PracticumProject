import { useState } from "react";
import ImageStore from "../store/ImageStore";
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import '../App.css';
import apiClient from "./interceptor";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const UploadFile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [challengeDescription, setChallengeDescription] = useState<string | null>(null);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    formData.append('file', file);

    try {
      const currentChallengeResponse = await apiClient.get('/Challenge/current');
      const challengeId = currentChallengeResponse.data;
      const challengeDescriptionResponse = await apiClient.get(`/Challenge/${challengeId}`);

      setChallengeDescription(challengeDescriptionResponse.data);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Unauthorized");
      }
      const decoded: any = jwtDecode(token);
      const userId = decoded.userId;

      const response = await apiClient.post(`/Upload/upload-file/${userId}/${challengeId}`, formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUploadSuccess(true);
      setImageUrl(response.data.imageUrl);
      await ImageStore.getAllImages();
      setFinished(true);

    } catch (error) {
      setUploadSuccess(false);
    } finally {
      setUploading(false);
    }
  };

  const askAI = async () => {
    if (!imageUrl || !challengeDescription) {
      alert("Missing image URL or challenge description.");
      return;
    }
    setIsLoading(true);

    try {
      // const response = await axios.post(`http://127.0.0.1:5000/analyze`, {
        const response = await axios.post(`https://practicumproject-r2h7.onrender.com/analyze`, {
        image_url: imageUrl,
        challenge_description: challengeDescription
      }, {
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.data;
      setAiResponse(data.result);
    } catch (error) {
      console.error("Error asking AI", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container" style={{
      position: 'relative',
      maxWidth: '500px',
      width: '90%',
      overflowX: 'hidden',
      overflowY: 'auto',
      margin: '100px auto',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '25px',
      boxShadow: '0 10px 25px rgba(255, 0, 98, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      textAlign: 'center',
      zIndex: 99,
      marginTop: '150px',
      border: '1px solid rgba(255, 0, 98, 0.3)',
      backdropFilter: 'blur(5px)',
    }}>
      <h2 style={{
        color: 'rgb(255, 0, 98)',
        margin: '0 0 10px 0',
        fontWeight: '600',
      }}>
        {finished ? 'Image Upload Complete' : 'Upload Your Challenge Image'}
      </h2>

      {!finished && (
        <div style={{
          background: 'linear-gradient(120deg, rgba(255,0,98,0.05), rgba(255,0,98,0.1))',
          padding: '30px',
          borderRadius: '12px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: '1px dashed rgba(255, 0, 98, 0.3)',
        }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden-file-input"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="custom-file-upload"
            style={{
              background: 'white',
              color: 'rgb(255, 0, 98)',
              padding: '12px 24px',
              borderRadius: '30px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 10px rgba(255, 0, 98, 0.2)',
              border: '2px solid rgb(255, 0, 98)',
              display: 'inline-block',
              textTransform: 'uppercase',
              fontSize: '14px',
              letterSpacing: '1px',
            }}
          >
            {file ? 'Change File' : 'Choose Image'}
          </label>

          {file && (
            <div style={{
              marginTop: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: 'rgba(255, 0, 98, 0.08)',
              padding: '10px 15px',
              borderRadius: '8px',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                backgroundColor: 'rgba(255, 0, 98, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'rgb(255, 0, 98)',
              }}>
              </div>
              <p style={{
                margin: '0',
                fontWeight: '500',
                color: '#555',
                fontSize: '14px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '200px',
              }}>{file.name}</p>
            </div>
          )}
        </div>
      )}

      {!finished && (
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          style={{
            background: uploading ? '#f5f5f5' : 'rgb(255, 0, 98)',
            color: uploading ? '#888' : 'white',
            padding: '14px 28px',
            borderRadius: '30px',
            fontWeight: 'bold',
            cursor: uploading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: uploading ? 'none' : '0 5px 15px rgba(255, 0, 98, 0.3)',
            border: 'none',
            width: '80%',
            fontSize: '16px',
            position: 'relative',
            overflow: 'hidden',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginTop: '10px',
          }}
        >
          {uploading ? (
            <LinearProgress
              style={{
                width: '100%',
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '4px',
                backgroundColor: 'rgba(255, 0, 98, 0.2)',
              }}
              color="secondary"
            />
          ) : "Upload Image"}
        </button>
      )}

      {uploadSuccess === true && (
        <div style={{
          backgroundColor: 'rgba(237, 40, 80, 0.1)',
          padding: '15px',
          borderRadius: '10px',
          border: '1px solid rgba(246, 75, 189, 0.3)',
          color: 'rgba(11, 11, 11)',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '80%',
        }}>
          <span style={{ fontSize: '20px' }}>✓</span>
          <p style={{ margin: 0 }}>Image uploaded successfully!</p>
        </div>
      )}

      {uploadSuccess === false && (
        <div style={{
          backgroundColor: 'rgba(237, 40, 80, 0.1)',
          padding: '15px',
          borderRadius: '10px',
          border: '1px solid rgba(246, 75, 189, 0.3)',
          color: 'rgba(11, 11, 11)',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '80%',
        }}>
          <span style={{ fontSize: '20px' }}>✕</span>
          <p style={{ margin: 0 }}>Upload failed. Please try again.</p>
        </div>
      )}

      {uploadSuccess === true && (
        <button
          onClick={askAI}
          disabled={isLoading}
          style={{
            background: isLoading ? '#f5f5f5' : 'linear-gradient(135deg, rgb(255, 0, 98), rgb(237, 69, 134))',
            color: isLoading ? '#888' : 'white',
            padding: '14px 28px',
            borderRadius: '30px',
            fontWeight: 'bold',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isLoading ? 'none' : '0 5px 15px rgba(255, 0, 98, 0.3)',
            border: 'none',
            width: '80%',
            fontSize: '16px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          {isLoading ? (
            <>
              <span>Analyzing</span>
              <LinearProgress
                style={{
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  height: '4px',
                  backgroundColor: 'rgba(255, 0, 98, 0.2)',
                }}
                color="secondary"
              />
            </>
          ) : (
            <>
              <span style={{ fontSize: '18px' }}>✨</span>
              <span>Ask AI for Analysis</span>
            </>
          )}
        </button>
      )}

      {aiResponse && (
        <div style={{
          marginTop: '15px',
          color: '#333',
          maxHeight: '200px',
          overflowY: 'auto',
          padding: '20px',
          border: '1px solid rgba(255, 0, 98, 0.3)',
          borderRadius: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          whiteSpace: 'pre-wrap',
          width: '90%',
          boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.05)',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          lineHeight: '1.6',
          position: 'relative',
        }}>
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '20px',
            backgroundColor: 'rgb(255, 0, 98)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}>
            AI ANALYSIS
          </div>
          <div style={{ marginTop: '10px' }}>
            {aiResponse}
          </div>
        </div>
      )}

      {finished && (
        <button
          onClick={() => navigate('/dashboard/')}
          style={{
            background: 'white',
            color: 'rgb(255, 0, 98)',
            padding: '14px 28px',
            borderRadius: '30px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 10px rgba(255, 0, 98, 0.15)',
            border: '2px solid rgb(255, 0, 98)',
            width: '80%',
            fontSize: '16px',
            marginTop: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
          }}
        >
          <span style={{ fontSize: '18px' }}></span>
          <span>Return to Dashboard</span>
        </button>
      )}
    </div>
  );
};

export default UploadFile;