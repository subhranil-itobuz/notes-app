import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext)
    console.log(isLoggedIn)

    if (!isLoggedIn) {
        <Navigate to="/login" />;
    }

    return children
}

export default ProtectedRoutes