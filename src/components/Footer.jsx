import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiTwitter, FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-display font-bold text-primary-500 mb-4 inline-block">
              StepInCafe
            </Link>
            <p className="text-neutral-400 mb-4">
              Authentic Indian cuisine made with love and tradition. Experience the rich flavors of India in every bite.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary-500 transition-colors">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-primary-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/menu" className="text-neutral-400 hover:text-primary-300 transition-colors">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/carts" className="text-neutral-400 hover:text-primary-300 transition-colors">
                  My Carts
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-neutral-400 hover:text-primary-300 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FiMapPin className="text-primary-500 mt-1 mr-2 flex-shrink-0" />
                <span className="text-neutral-400">
                  12 Sai Complex, Opposite BBD University, Lucknow, India
                </span>
              </li>
              <li className="flex items-center">
                <FiPhone className="text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-neutral-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <FiMail className="text-primary-500 mr-2 flex-shrink-0" />
                <span className="text-neutral-400">info@stepincafe.com</span>
              </li>
            </ul>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-medium mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-neutral-400">Monday - Friday</span>
                <span className="text-neutral-300">11:00 - 22:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-400">Saturday</span>
                <span className="text-neutral-300">10:00 - 23:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-400">Sunday</span>
                <span className="text-neutral-300">10:00 - 22:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 pt-8 mt-8 text-center">
          <p className="text-neutral-500">
            &copy; {currentYear} StepInCafe(Yash srivastava). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer