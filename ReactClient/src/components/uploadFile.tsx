import axios from "axios";
import { useState } from "react";


const UploadFile=()=>{
        const [file, setFile] = useState(null);
        const [uploading, setUploading] = useState(false);
        // const [uploadSuccess, setUploadSuccess] = useState(false);
        const [uploadSuccess, setUploadSuccess] = useState<boolean | null>(null); // במקום false

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
      
        //   try {
        //     const response = await axios('http://localhost:5131/api/Upload/upload-file', {
        //       method: 'POST',
        //       body: formData,
        //     });
      
        //     if (response.ok) {
        //       const data = await response.json();
        //       console.log("File uploaded successfully", data);
        //       setUploadSuccess(true);
        //     } else {
        //       console.error("Error uploading file");
        //       setUploadSuccess(false);
        //     }
        //   } catch (error) {
        //     console.error("Error:", error);
        //     setUploadSuccess(false);
        //   } finally {
        //     setUploading(false);
        //   }
        // };

        try {
            const response = await axios.post("http://localhost:5131/api/Upload/upload-file", formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
      
            console.log("File uploaded successfully", response.data);
            setUploadSuccess(true);
          } catch (error) {
            console.error("Error uploading file", error);
            setUploadSuccess(false);
          } finally {
            setUploading(false);
          }
        };
      
        return (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button onClick={handleUpload} disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
      
            {/* {uploadSuccess && <p>File uploaded successfully!</p>}
            {!uploadSuccess && !uploading && <p>Upload failed. Try again.</p>} */}
            {uploadSuccess === true && <p>File uploaded successfully!</p>}
            {uploadSuccess === false && <p>Upload failed. Try again.</p>}
          </div>
        );
      };
    
      
export default UploadFile;