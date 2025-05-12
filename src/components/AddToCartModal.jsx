import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const AddToCartModal = ({ item, isOpen, onClose, carts, activeCartId, createCart }) => {
  const { addItemToCart, switchCart } = useCart()
  
  const [quantity, setQuantity] = useState(1)
  const [selectedCartId, setSelectedCartId] = useState(activeCartId || '')
  const [isCreatingNewCart, setIsCreatingNewCart] = useState(false)
  const [newCartName, setNewCartName] = useState('')
  const [isAdded, setIsAdded] = useState(false)
  
  // Handle case where there are no carts
  useEffect(() => {
    if (Object.keys(carts).length === 0) {
      setIsCreatingNewCart(true)
    } else if (!selectedCartId && activeCartId) {
      setSelectedCartId(activeCartId)
    }
  }, [carts, activeCartId, selectedCartId])
  
  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }
  
  const handleCreateCart = () => {
    const cartName = newCartName.trim() ? newCartName.trim() : 'New Cart'
    const newCartId = createCart(cartName)
    setSelectedCartId(newCartId)
    setIsCreatingNewCart(false)
    setNewCartName('')
    switchCart(newCartId)
  }
  
  const handleAddToCart = () => {
    // If creating a new cart, create it first
    if (isCreatingNewCart) {
      const cartName = newCartName.trim() ? newCartName.trim() : 'New Cart'
      const newCartId = createCart(cartName)
      addItemToCart(newCartId, item, quantity)
      switchCart(newCartId)
    } else {
      // Otherwise add to selected cart
      addItemToCart(selectedCartId, item, quantity)
    }
    
    // Show success message
    setIsAdded(true)
    
    // Close after delay
    setTimeout(() => {
      onClose()
      setIsAdded(false)
    }, 1500)
  }
  
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  
  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div 
            className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
          >
            {isAdded ? (
              <div className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <FiShoppingCart className="text-green-500 text-2xl" />
                </div>
                <h3 className="text-xl font-medium mb-2">Added to Cart!</h3>
                <p className="text-neutral-600">
                  {item.name} has been added to your cart
                </p>
              </div>
            ) : (
              <>
                <div className="relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <button 
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                    onClick={onClose}
                  >
                    <FiX className="text-xl" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium">{item.name}</h3>
                    <div className="flex space-x-1">
                      {item.isVegetarian ? (
                        <span className="flex items-center justify-center w-5 h-5 bg-green-100 rounded-sm">
                          <span className="block w-3 h-3 rounded-full bg-green-600"></span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center w-5 h-5 bg-red-100 rounded-sm">
                          <span className="block w-3 h-3 rounded-full bg-red-600"></span>
                        </span>
                      )}
                      
                      {item.isSpicy && (
                        <span className="text-xl">🌶️</span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 mb-4">{item.description}</p>
                  
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-bold text-xl">₹{item.price}</span>
                    
                    <div className="flex items-center border rounded-md overflow-hidden">
                      <button 
                        className="p-2 hover:bg-neutral-100"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <FiMinus />
                      </button>
                      <span className="px-4">{quantity}</span>
                      <button 
                        className="p-2 hover:bg-neutral-100"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= 10}
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Add to Cart</label>
                    
                    {isCreatingNewCart ? (
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          className="form-input"
                          placeholder="Enter cart name"
                          value={newCartName}
                          onChange={(e) => setNewCartName(e.target.value)}
                        />
                        <button 
                          className="btn btn-outline"
                          onClick={() => setIsCreatingNewCart(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <select 
                          className="form-input"
                          value={selectedCartId}
                          onChange={(e) => setSelectedCartId(e.target.value)}
                        >
                          <option value="" disabled>Select a cart</option>
                          {Object.keys(carts).map(cartId => (
                            <option key={cartId} value={cartId}>
                              {carts[cartId].name}
                            </option>
                          ))}
                        </select>
                        <button 
                          className="btn btn-outline"
                          onClick={() => setIsCreatingNewCart(true)}
                        >
                          New
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <button 
                      className="btn btn-primary w-full py-3"
                      onClick={handleAddToCart}
                      disabled={isCreatingNewCart && !newCartName.trim() && Object.keys(carts).length > 0}
                    >
                      Add to Cart - ₹{(item.price * quantity).toFixed(2)}
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AddToCartModal