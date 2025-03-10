// import './App.css'

// function App() {

//   return (
//     <div>
//     <h1>Upload Your Image</h1>
//     <FileUpload />
//   </div>
    
//   )
// }

// export default App

import './App.css'
import ImageGallery from './components/imageGallery'
import Login from './components/login'
import Register from './components/register'
import UploadFile from './components/uploadFile' // ייבוא הקומפוננטה

function App() {
  return (
    <>
   
      {/* <UploadFile />  */}
      {/* <div> <Login/></div> */}
      {/* <div><Register/></div> */}
      <div><ImageGallery/></div>
    </>
  )
}

export default App

