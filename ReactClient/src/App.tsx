





import { RouterProvider } from 'react-router-dom';
import './App.css';
import { myRouter } from './Router';

function App() {
  return (
    // <Provider store={store}>
      <RouterProvider router={myRouter} />
    // </Provider>
  );
}

export default App;