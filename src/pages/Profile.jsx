import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { currentUser, logout } = useAuth()
  
  useEffect(() => {
    document.title = 'My Profile | StepInCafe'
  }, [])
  
  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        <motion.div 
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-card p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-6">My Profile</h1>
          
          <div className="flex items-center mb-8">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-3xl text-primary-500 font-medium mr-4">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-medium">{currentUser.name}</h2>
              <p className="text-neutral-600">{currentUser.email}</p>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-500">Name</p>
                <p>{currentUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Email</p>
                <p>{currentUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-500">Member Since</p>
                <p>June 2023</p>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Preferences</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="emailNotifications" className="mr-2" checked />
                <label htmlFor="emailNotifications">Email Notifications</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="savePaymentInfo" className="mr-2" />
                <label htmlFor="savePaymentInfo">Save Payment Information</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="newsletter" className="mr-2" checked />
                <label htmlFor="newsletter">Subscribe to Newsletter</label>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/carts" className="btn btn-primary">
              Manage Carts
            </Link>
            <button 
              className="btn btn-outline" 
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile