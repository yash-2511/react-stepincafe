import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth()
  
  // Show nothing while checking authentication
  if (loading) {
    return null
  }
  
  // Redirect to login if not authenticated
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  
  // Render children if authenticated
  return children
}

export default PrivateRoute