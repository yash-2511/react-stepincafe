import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiShoppingCart, FiUser, FiLogIn, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth()
  const { getTotalItemCount } = useCart()
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  
  useEffect(() => {
    // Update cart count
    setCartCount(getTotalItemCount())
    
    // Close mobile menu on route change
    setIsMenuOpen(false)
    
    // Add scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname, getTotalItemCount])
  
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  
  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    ...(isLoggedIn ? [{ label: 'My Carts', path: '/carts' }] : []),
  ]
  
  return (
    <motion.header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-display font-bold text-primary-500">StepInCafe</span>
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`font-medium transition-colors ${
                  location.pathname === item.path 
                    ? 'text-primary-500' 
                    : 'text-neutral-700 hover:text-primary-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/carts" 
                  className="relative p-2 text-neutral-700 hover:text-primary-500 transition-colors"
                >
                  <FiShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="cart-counter">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </Link>
                
                <div className="relative group">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 p-2 text-neutral-700 hover:text-primary-500 transition-colors"
                  >
                    <FiUser size={24} />
                  </Link>
                  
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-2">
                      <Link 
                        to="/profile"
                        className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                      >
                        My Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                      >
                        <FiLogOut className="mr-2" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link 
                to="/login" 
                className="flex items-center space-x-2 btn btn-primary"
              >
                <FiLogIn />
                <span>Sign In</span>
              </Link>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            {isLoggedIn && (
              <Link 
                to="/carts" 
                className="relative p-2 text-neutral-700 hover:text-primary-500 transition-colors"
              >
                <FiShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="cart-counter">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>
            )}
            
            <button 
              className="p-2 text-neutral-700 hover:text-primary-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white border-t"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container-custom py-4">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`py-2 font-medium transition-colors ${
                      location.pathname === item.path 
                        ? 'text-primary-500' 
                        : 'text-neutral-700 hover:text-primary-500'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {isLoggedIn ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="py-2 flex items-center font-medium text-neutral-700 hover:text-primary-500"
                    >
                      <FiUser className="mr-2" />
                      <span>My Profile</span>
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="py-2 flex items-center font-medium text-neutral-700 hover:text-primary-500"
                    >
                      <FiLogOut className="mr-2" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="py-2 flex items-center font-medium text-neutral-700 hover:text-primary-500"
                  >
                    <FiLogIn className="mr-2" />
                    <span>Sign In</span>
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header