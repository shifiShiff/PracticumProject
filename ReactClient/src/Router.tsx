import AppLayout from "./components/appLayout";
import { createBrowserRouter } from "react-router-dom";
import ImageGallery from "./components/imageGallery";
import Register from "./components/register";
import Login from "./components/login"; 
import UploadFile from "./components/uploadFile";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/protectedRoute";
import Auth from "./components/auth";



export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [ 
            {
                index: true,
                element: <Dashboard />
            },          
            {
                path: 'dashboard', element: <Dashboard />

            },
            {
                path: 'uploadfile', 
                element: (
                    <ProtectedRoute>
                      <UploadFile />
                    </ProtectedRoute>
                  )
            },
            {
                path: 'Gallery', element: <ImageGallery />
            },
            {
                path: 'login', element: <Login />
            },
            {
                path: 'auth', element: <Auth />
            },
            {
                path: 'register', element: <Register/>
                
            }
            
        ]
    }
])
