




// import { RouterProvider } from 'react-router-dom'
// import './App.css'

// import { myRouter } from './Router'

// function App() {
//   return (
//     <>
//       <RouterProvider router={myRouter} />

//     </>
//   )
// }

// export default App

import { RouterProvider } from 'react-router-dom';
import './App.css';
import { myRouter } from './Router';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    // <Provider store={store}>
      <RouterProvider router={myRouter} />
    // </Provider>
  );
}

export default App;