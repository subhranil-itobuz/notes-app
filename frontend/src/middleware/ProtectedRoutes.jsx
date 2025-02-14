import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {

  const { isLoggedIn } = useContext(AuthContext)
  if (!isLoggedIn || isLoggedIn === undefined) {
    return <Navigate to='/login' />
  }

  return children
}

export default ProtectedRoutes