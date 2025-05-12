import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import CartItems from '../components/CartItems'
import { FiPlus, FiCheck, FiX, FiEdit, FiTrash2 } from 'react-icons/fi'

const CartManagement = () => {
  const { 
    carts, 
    activeCartId, 
    createCart, 
    switchCart, 
    renameCart, 
    deleteCart, 
    getCartTotal, 
    getCartItemCount 
  } = useCart()
  
  const [isNewCartFormVisible, setIsNewCartFormVisible] = useState(false)
  const [newCartName, setNewCartName] = useState('')
  const [editingCartId, setEditingCartId] = useState(null)
  const [editedCartName, setEditedCartName] = useState('')
  const [selectedCarts, setSelectedCarts] = useState({})
  
  useEffect(() => {
    document.title = 'Manage Carts | StepInCafe'
  }, [])
  
  // Create a cart if none exists
  useEffect(() => {
    if (Object.keys(carts).length === 0) {
      createCart('My Cart')
    }
  }, [carts, createCart])
  
  const handleCreateCart = () => {
    if (newCartName.trim()) {
      createCart(newCartName.trim())
      setNewCartName('')
      setIsNewCartFormVisible(false)
    } else {
      createCart('New Cart')
      setIsNewCartFormVisible(false)
    }
  }
  
  const handleEditCartName = (cartId) => {
    setEditingCartId(cartId)
    setEditedCartName(carts[cartId].name)
  }
  
  const handleSaveCartName = () => {
    if (editedCartName.trim() && editingCartId) {
      renameCart(editingCartId, editedCartName.trim())
      setEditingCartId(null)
      setEditedCartName('')
    }
  }
  
  const handleToggleCartSelection = (cartId) => {
    setSelectedCarts(prev => ({
      ...prev,
      [cartId]: !prev[cartId]
    }))
  }
  
  const handleSelectAllCarts = () => {
    const allSelected = Object.keys(carts).every(cartId => selectedCarts[cartId])
    
    if (allSelected) {
      // Deselect all
      setSelectedCarts({})
    } else {
      // Select all
      const newSelection = {}
      Object.keys(carts).forEach(cartId => {
        newSelection[cartId] = true
      })
      setSelectedCarts(newSelection)
    }
  }
  
  const countSelectedCarts = () => {
    return Object.values(selectedCarts).filter(Boolean).length
  }
  
  const getSelectedCartIds = () => {
    return Object.keys(selectedCarts).filter(cartId => selectedCarts[cartId])
  }
  
  const getTotalForSelectedCarts = () => {
    return getSelectedCartIds().reduce(
      (total, cartId) => total + getCartTotal(cartId),
      0
    )
  }
  
  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="container-custom">
        <motion.div 
          className="bg-white rounded-lg shadow-card p-6 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <h1 className="text-3xl font-display font-bold text-neutral-900">Your Carts</h1>
            
            <div className="mt-4 sm:mt-0">
              <button 
                className="btn btn-outline flex items-center"
                onClick={() => setIsNewCartFormVisible(true)}
              >
                <FiPlus className="mr-1" />
                New Cart
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {isNewCartFormVisible && (
              <motion.div 
                className="mb-4 flex gap-2 items-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="text"
                  value={newCartName}
                  onChange={(e) => setNewCartName(e.target.value)}
                  placeholder="Enter cart name"
                  className="form-input"
                  autoFocus
                />
                <button 
                  className="btn btn-primary p-2"
                  onClick={handleCreateCart}
                >
                  <FiCheck className="text-lg" />
                </button>
                <button 
                  className="btn btn-outline p-2"
                  onClick={() => setIsNewCartFormVisible(false)}
                >
                  <FiX className="text-lg" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {Object.keys(carts).length > 0 && (
            <div className="mb-4 flex items-center">
              <label className="flex items-center">
                <input 
                  type="checkbox"
                  checked={Object.keys(carts).length > 0 && Object.keys(carts).every(cartId => selectedCarts[cartId])}
                  onChange={handleSelectAllCarts}
                  className="w-4 h-4 text-primary-500"
                />
                <span className="ml-2">Select All Carts</span>
              </label>
              
              {countSelectedCarts() > 0 && (
                <div className="ml-4 text-sm text-neutral-600">
                  {countSelectedCarts()} cart{countSelectedCarts() !== 1 ? 's' : ''} selected
                </div>
              )}
            </div>
          )}
          
          {/* Cart List */}
          <div className="space-y-4">
            {Object.keys(carts).length === 0 ? (
              <div className="text-center py-8 text-neutral-500">
                <p className="mb-4">You don't have any carts yet</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setIsNewCartFormVisible(true)}
                >
                  Create Your First Cart
                </button>
              </div>
            ) : (
              Object.keys(carts).map(cartId => (
                <motion.div 
                  key={cartId}
                  className={`border rounded-lg overflow-hidden ${
                    cartId === activeCartId 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <input 
                          type="checkbox"
                          checked={!!selectedCarts[cartId]}
                          onChange={() => handleToggleCartSelection(cartId)}
                          className="w-4 h-4 text-primary-500 mr-3"
                        />
                        
                        {editingCartId === cartId ? (
                          <div className="flex items-center space-x-2">
                            <input
                              type="text"
                              value={editedCartName}
                              onChange={(e) => setEditedCartName(e.target.value)}
                              className="form-input py-1"
                              autoFocus
                            />
                            <button 
                              className="text-green-500 p-1"
                              onClick={handleSaveCartName}
                            >
                              <FiCheck />
                            </button>
                            <button 
                              className="text-red-500 p-1"
                              onClick={() => setEditingCartId(null)}
                            >
                              <FiX />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <h3 className="font-medium text-lg">{carts[cartId].name}</h3>
                            <button 
                              className="ml-2 text-neutral-500 hover:text-primary-500"
                              onClick={() => handleEditCartName(cartId)}
                            >
                              <FiEdit size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-neutral-500">
                          {getCartItemCount(cartId)} item{getCartItemCount(cartId) !== 1 ? 's' : ''}
                        </span>
                        <span className="font-medium">₹{getCartTotal(cartId).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      {cartId !== activeCartId && (
                        <button 
                          className="text-sm text-primary-600 hover:text-primary-800"
                          onClick={() => switchCart(cartId)}
                        >
                          Set as active
                        </button>
                      )}
                      
                      <button 
                        className="text-sm text-red-600 hover:text-red-800"
                        onClick={() => deleteCart(cartId)}
                      >
                        <FiTrash2 className="inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  {getCartItemCount(cartId) > 0 && (
                    <div className="border-t border-neutral-200 p-4">
                      <CartItems cartId={cartId} isCollapsible={true} />
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
        
        {/* Checkout Section */}
        {countSelectedCarts() > 0 && (
          <motion.div 
            className="bg-white rounded-lg shadow-card p-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h2 className="text-2xl font-display font-bold mb-4">Checkout Selected Carts</h2>
            
            <div className="mb-4">
              <p className="font-medium">Selected Carts: {countSelectedCarts()}</p>
              <p className="text-lg font-medium">Total: ₹{getTotalForSelectedCarts().toFixed(2)}</p>
            </div>
            
            <div className="flex space-x-4">
              <Link 
                to="/checkout" 
                state={{ cartIds: getSelectedCartIds() }}
                className="btn btn-primary"
              >
                Proceed to Checkout
              </Link>
              
              <button 
                className="btn btn-outline"
                onClick={() => setSelectedCarts({})}
              >
                Clear Selection
              </button>
            </div>
          </motion.div>
        )}
        
        {/* Navigation Links */}
        <div className="mt-8 text-center">
          <Link to="/menu" className="text-primary-500 hover:underline">
            &larr; Back to Menu
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartManagement