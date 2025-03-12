import AppLayout from "./components/AppLayout";
import { createBrowserRouter } from "react-router-dom";
import ImageGallery from "./components/imageGallery";
import Register from "./components/register";
import Login from "./components/login"; 
import UploadFile from "./components/uploadFile";
import Dashboard from "./components/dashboard";



export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [           
            {
                path: 'dashboard', element: <Dashboard />
                // ,children: [ {

                //     path: 'uploadfile', element: <UploadFile />
                // }]

            },
            {
                path: 'uploadfile', element: <UploadFile />
            },
            {
                path: 'Gallery', element: <ImageGallery />
            },
            {
                path: 'login', element: <Login />
            },
            {
                path: 'register', element: <Register/>
                
            }
            
        ]
    }
])
