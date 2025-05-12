import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp, FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'
import { useCart } from '../context/CartContext'

const CartItems = ({ cartId, isCollapsible = false }) => {
  const { carts, updateItemQuantity, removeItemFromCart } = useCart()
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  if (!carts[cartId]) return null
  
  const { items } = carts[cartId]
  
  if (items.length === 0) {
    return <p className="text-sm text-neutral-500">No items in this cart</p>
  }
  
  return (
    <div>
      {isCollapsible && (
        <button 
          className="flex items-center justify-between w-full text-left font-medium mb-3"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <span>{items.length} item{items.length !== 1 ? 's' : ''}</span>
          {isCollapsed ? <FiChevronDown /> : <FiChevronUp />}
        </button>
      )}
      
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-3">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-neutral-100 rounded overflow-hidden mr-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-neutral-500">₹{item.price} each</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center border rounded-md overflow-hidden mr-3">
                      <button 
                        className="p-1 hover:bg-neutral-100"
                        onClick={() => updateItemQuantity(cartId, item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus size={16} />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button 
                        className="p-1 hover:bg-neutral-100"
                        onClick={() => updateItemQuantity(cartId, item.id, item.quantity + 1)}
                      >
                        <FiPlus size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="font-medium mr-3">₹{(item.price * item.quantity).toFixed(2)}</span>
                      <button
                        className="text-red-500 hover:text-red-700 p-1"
                        onClick={() => removeItemFromCart(cartId, item.id)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CartItems