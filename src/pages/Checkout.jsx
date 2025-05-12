import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import CartItems from '../components/CartItems'
import { FiCreditCard, FiCheck } from 'react-icons/fi'

const Checkout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { carts, getCartTotal, checkout } = useCart()
  
  const [cartIds, setCartIds] = useState([])
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  
  useEffect(() => {
    document.title = 'Checkout | StepInCafe'
    
    // Get cart IDs from location state or use active cart
    if (location.state && location.state.cartIds && location.state.cartIds.length > 0) {
      setCartIds(location.state.cartIds)
    } else {
      // Redirect back to cart management if no carts specified
      navigate('/carts')
    }
  }, [location.state, navigate])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }
  
  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) errors.name = 'Name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid'
    
    if (!formData.address.trim()) errors.address = 'Address is required'
    if (!formData.phone.trim()) errors.phone = 'Phone is required'
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) 
      errors.phone = 'Phone number should be 10 digits'
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) errors.cardNumber = 'Card number is required'
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\D/g, ''))) 
        errors.cardNumber = 'Card number should be 16 digits'
      
      if (!formData.cardExpiry.trim()) errors.cardExpiry = 'Expiry date is required'
      else if (!/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) 
        errors.cardExpiry = 'Format should be MM/YY'
      
      if (!formData.cardCvv.trim()) errors.cardCvv = 'CVV is required'
      else if (!/^\d{3}$/.test(formData.cardCvv)) 
        errors.cardCvv = 'CVV should be 3 digits'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Process the order - in a real app, this would send data to a server
      checkout(cartIds)
      
      // Generate random order number
      const randomOrderNumber = Math.floor(100000 + Math.random() * 900000).toString()
      setOrderNumber(randomOrderNumber)
      
      // Show success state
      setOrderComplete(true)
    }
  }
  
  const getTotalAmount = () => {
    return cartIds.reduce((total, cartId) => total + getCartTotal(cartId), 0)
  }
  
  // If carts don't exist, redirect or show error
  const missingCarts = cartIds.filter(id => !carts[id])
  if (missingCarts.length > 0) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-display font-bold mb-4">Cart Not Found</h2>
        <p className="mb-8">One or more carts you're trying to checkout can't be found.</p>
        <Link to="/carts" className="btn btn-primary">
          Return to Carts
        </Link>
      </div>
    )
  }
  
  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        {orderComplete ? (
          <motion.div 
            className="bg-white rounded-lg shadow-card p-8 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="text-green-500 text-4xl" />
              </div>
              <h2 className="text-3xl font-display font-bold text-neutral-900 mb-2">
                Order Confirmed!
              </h2>
              <p className="text-neutral-600 mb-4">
                Thank you for your order. We've received your payment and will start preparing your meal.
              </p>
              <p className="font-medium">Order Number: <span className="text-primary-500">{orderNumber}</span></p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-medium mb-3">Order Details</h3>
              <p>Total Amount: ₹{getTotalAmount().toFixed(2)}</p>
              <p>Payment Method: {paymentMethod === 'card' ? 'Credit/Debit Card' : 'Cash on Delivery'}</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Link to="/menu" className="btn btn-primary">
                Order More Food
              </Link>
              <Link to="/" className="text-primary-500 hover:underline">
                Return to Home
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div 
                className="bg-white rounded-lg shadow-card p-6 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h1 className="text-3xl font-display font-bold text-neutral-900 mb-6">Checkout</h1>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <h2 className="text-xl font-medium mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`form-input ${formErrors.name ? 'border-red-500' : ''}`}
                        />
                        {formErrors.name && <p className="form-error">{formErrors.name}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`form-input ${formErrors.email ? 'border-red-500' : ''}`}
                        />
                        {formErrors.email && <p className="form-error">{formErrors.email}</p>}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`form-input ${formErrors.phone ? 'border-red-500' : ''}`}
                          placeholder="10-digit number"
                        />
                        {formErrors.phone && <p className="form-error">{formErrors.phone}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-medium mb-4">Delivery Address</h2>
                    <div>
                      <label htmlFor="address" className="form-label">Full Address</label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows="3"
                        className={`form-input ${formErrors.address ? 'border-red-500' : ''}`}
                      ></textarea>
                      {formErrors.address && <p className="form-error">{formErrors.address}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-medium mb-4">Payment Method</h2>
                    
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer border-neutral-200 hover:border-primary-300">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                          className="mr-2"
                        />
                        <FiCreditCard className="text-xl mr-2" />
                        <span>Credit / Debit Card</span>
                      </label>
                      
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer border-neutral-200 hover:border-primary-300">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={paymentMethod === 'cod'}
                          onChange={() => setPaymentMethod('cod')}
                          className="mr-2"
                        />
                        <span>Cash on Delivery</span>
                      </label>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="mt-4 p-4 border border-neutral-200 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label htmlFor="cardNumber" className="form-label">Card Number</label>
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className={`form-input ${formErrors.cardNumber ? 'border-red-500' : ''}`}
                              placeholder="XXXX XXXX XXXX XXXX"
                            />
                            {formErrors.cardNumber && <p className="form-error">{formErrors.cardNumber}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="cardExpiry" className="form-label">Expiry Date</label>
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleInputChange}
                              className={`form-input ${formErrors.cardExpiry ? 'border-red-500' : ''}`}
                              placeholder="MM/YY"
                            />
                            {formErrors.cardExpiry && <p className="form-error">{formErrors.cardExpiry}</p>}
                          </div>
                          
                          <div>
                            <label htmlFor="cardCvv" className="form-label">CVV</label>
                            <input
                              type="text"
                              id="cardCvv"
                              name="cardCvv"
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                              className={`form-input ${formErrors.cardCvv ? 'border-red-500' : ''}`}
                              placeholder="XXX"
                            />
                            {formErrors.cardCvv && <p className="form-error">{formErrors.cardCvv}</p>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 text-right">
                    <button 
                      type="submit"
                      className="btn btn-primary text-lg px-8 py-3"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
            
            <div className="lg:col-span-1">
              <motion.div 
                className="bg-white rounded-lg shadow-card p-6 sticky top-24"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="mb-6">
                  {cartIds.map((cartId, index) => (
                    <div key={cartId} className="mb-4">
                      <h3 className="font-medium mb-2">{carts[cartId].name}</h3>
                      <CartItems cartId={cartId} isCollapsible={true} />
                      {index < cartIds.length - 1 && <hr className="my-4" />}
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal:</span>
                    <span>₹{getTotalAmount().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Delivery Fee:</span>
                    <span>₹40.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Tax:</span>
                    <span>₹{(getTotalAmount() * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-neutral-200">
                    <span>Total:</span>
                    <span>₹{(getTotalAmount() + 40 + (getTotalAmount() * 0.05)).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Link to="/carts" className="text-primary-500 hover:underline block text-center">
                    Back to Carts
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Checkout