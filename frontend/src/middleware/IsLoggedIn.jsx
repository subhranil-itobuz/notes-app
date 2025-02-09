import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const IsLoggedIn = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext)
    console.log(isLoggedIn)
    isLoggedIn && <Navigate to='/' />

    return children
}

export default IsLoggedIn