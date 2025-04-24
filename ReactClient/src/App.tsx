





// // import { RouterProvider } from 'react-router-dom';
// // import './App.css';
// // import { myRouter } from './Router';

// // function App() {
// //   return (
// //     // <Provider store={store}>
// //       <RouterProvider router={myRouter} />
// //     // </Provider>
// //   );
// // }

// // export default App;




import { RouterProvider } from 'react-router-dom';
import './App.css';
import { myRouter } from './Router';
import Footer from './components/footer';

// function App() {
//   return (
//     <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      
//       {/* שכבת רקע */}
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundImage: "url('/src/assets/background.jpg')", // שימי לב לנתיב
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           opacity: 0.5,
//           filter: 'brightness(1.9)',
//           zIndex: 0
//         }}
//       />

//       {/* שכבת תוכן */}
//       <div style={{ position: 'relative', zIndex: 1, paddingBottom:'60px' }}>
//         <RouterProvider router={myRouter} />
//       </div>


//       <Footer />

//     </div>
    
//   );
// }

// export default App;




// function App() {
//   return (<>
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         minHeight: '100vh',
//         // position: 'relative',
//       }}
//     >
//       {/* רקע קבוע מאחורה */}
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundImage: "url('/src/assets/background.jpg')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           opacity: 0.5,
//           filter: 'brightness(1.9)',
//           zIndex: 0,
//         }}
//       />

//       {/* תוכן */}
//       <div style={{ flex: 1,position: 'relative',  zIndex: 1 }}>
//         <RouterProvider router={myRouter} />
//       </div>

//       {/* פוטר */}
//           <Footer />

//     </div>

//              {/* <Footer /> */}

    
//     </>
//   );
// }

// export default App;





// function App() {
//   return (
//     <div
//       style={{
//         position: 'relative',
//       }}
//     >
//       {/* רקע */}
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundImage: "url('/src/assets/background.jpg')",
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           opacity: 0.5,
//           filter: 'brightness(1.9)',
//           zIndex: 0,
//         }}
//       />

//       {/* תוכן + פוטר */}
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           minHeight: '100vh',
//           position: 'relative',
//           zIndex: 1,
//         }}
//       >
//         <div style={{ flex: 1 }}>
//           <RouterProvider router={myRouter} />
          
//         </div>
//         <Footer />
//       </div>
//     </div>
//   );
// }




function App() {
  return (<>
     <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* רקע */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url('/src/assets/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
          filter: 'brightness(1.9)',
          zIndex: 0,
        }}
      />

      {/* תוכן */}
      <div style={{ flex: 1, zIndex: 1, position: 'relative', marginBottom:'50px' }}>
        <RouterProvider router={myRouter} />

      </div>

   
    </div>

       {/* פוטר */}
       {/* <div style={{ zIndex: 1 }}> */}
       <Footer />

     {/* </div> */}

     </>
  );
}


export default App;
