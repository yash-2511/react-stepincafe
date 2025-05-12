import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useAuth } from './context/AuthContext'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Menu from './pages/Menu'
import CartManagement from './pages/CartManagement'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'

// Components
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const location = useLocation()
  const { isLoggedIn } = useAuth()
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/menu" element={<Menu />} />
            
            {/* Protected routes */}
            <Route path="/carts" element={
              <PrivateRoute>
                <CartManagement />
              </PrivateRoute>
            } />
            <Route path="/checkout" element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  )
}

export default App