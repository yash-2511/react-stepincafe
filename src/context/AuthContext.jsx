import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    // In a real app, you would validate credentials with an API
    // For this demo, we'll simulate a successful login
    setCurrentUser(userData)
    setIsLoggedIn(true)
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  const logout = () => {
    setCurrentUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem('user')
  }

  const value = {
    currentUser,
    isLoggedIn,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}