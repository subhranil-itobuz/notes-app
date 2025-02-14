import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminProtectedRoute = ({ children }) => {
  const { isLoggedIn, role } = useContext(AuthContext)

  if (!isLoggedIn || isLoggedIn === undefined || role !== 'admin') {
    return <Navigate to='/login' />
  }

  return children
}

export default AdminProtectedRoute