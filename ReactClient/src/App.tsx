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

import { RouterProvider } from 'react-router-dom'
import './App.css'

import { myRouter } from './Router'

function App() {
  return (
    <>
      <RouterProvider router={myRouter} />

    </>
  )
}

export default App

