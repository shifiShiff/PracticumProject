import AppLayout from "./components/AppLayout";
import { createBrowserRouter } from "react-router-dom";
import ImageGallery from "./components/imageGallery";
import Register from "./components/register";
import Login from "./components/login"; 
import UploadFile from "./components/uploadFile";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Auth from "./components/auth";



export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [ 
            {
                index: true, // נתיב ברירת מחדל
                element: <Dashboard />
            },          
            {
                path: 'dashboard', element: <Dashboard />

            },
            {
                path: 'uploadfile', 
                // element: <UploadFile />
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
