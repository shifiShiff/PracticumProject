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
import Login from './components/login'
import UploadFile from './components/uploadFile' // ייבוא הקומפוננטה

function App() {
  return (
    <>
   
      <h1>Upload Your Image</h1>
      <UploadFile /> {/* הוספת הקומפוננטה להצגת טופס ההעלאה */}
      <div> <Login/></div>
    </>
  )
}

export default App

