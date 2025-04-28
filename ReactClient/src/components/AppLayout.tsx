import { Outlet } from "react-router-dom"
import NavBar from "./navBar"

const AppLayout = () => {




    return (<>
  
            <NavBar />
            <div></div>
            <Outlet />
            <div></div>


    </>)
}

export default AppLayout