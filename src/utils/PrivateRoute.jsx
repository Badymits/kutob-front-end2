import { Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

// authenticated users will have access to the website, otherwise, 
// they will be redirected to login page
const PrivateRoute = () => {

    const { user }  = useContext(UserContext)
    
    return user ? <Outlet /> : <Navigate to='/register'/> 
}

export default PrivateRoute