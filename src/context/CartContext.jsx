import { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  // Structure: { cartId: { id, name, items: [{...menuItem, quantity}], created } }
  const [carts, setCarts] = useState({})
  const [activeCartId, setActiveCartId] = useState(null)
  
  // Load carts from localStorage on initialization
  useEffect(() => {
    const storedCarts = localStorage.getItem('carts')
    const storedActiveCartId = localStorage.getItem('activeCartId')
    
    if (storedCarts) {
      setCarts(JSON.parse(storedCarts))
    }
    
    if (storedActiveCartId) {
      setActiveCartId(storedActiveCartId)
    } else if (storedCarts && Object.keys(JSON.parse(storedCarts)).length > 0) {
      // Set the first cart as active if there's no active cart but carts exist
      setActiveCartId(Object.keys(JSON.parse(storedCarts))[0])
    }
  }, [])
  
  // Save carts to localStorage whenever they change
  useEffect(() => {
    if (Object.keys(carts).length > 0) {
      localStorage.setItem('carts', JSON.stringify(carts))
    }
    
    if (activeCartId) {
      localStorage.setItem('activeCartId', activeCartId)
    }
  }, [carts, activeCartId])
  
  // Create a new cart
  const createCart = (name = 'New Cart') => {
    const cartId = uuidv4()
    const newCart = {
      id: cartId,
      name,
      items: [],
      created: new Date().toISOString()
    }
    
    setCarts(prevCarts => ({
      ...prevCarts,
      [cartId]: newCart
    }))
    
    // Set as active cart if it's the first one
    if (Object.keys(carts).length === 0) {
      setActiveCartId(cartId)
    }
    
    return cartId
  }
  
  // Switch the active cart
  const switchCart = (cartId) => {
    if (carts[cartId]) {
      setActiveCartId(cartId)
      return true
    }
    return false
  }
  
  // Rename a cart
  const renameCart = (cartId, newName) => {
    if (carts[cartId]) {
      setCarts(prevCarts => ({
        ...prevCarts,
        [cartId]: {
          ...prevCarts[cartId],
          name: newName
        }
      }))
      return true
    }
    return false
  }
  
  // Delete a cart
  const deleteCart = (cartId) => {
    if (carts[cartId]) {
      const newCarts = { ...carts }
      delete newCarts[cartId]
      
      setCarts(newCarts)
      
      // If we deleted the active cart, switch to another one
      if (activeCartId === cartId) {
        const remainingCartIds = Object.keys(newCarts)
        if (remainingCartIds.length > 0) {
          setActiveCartId(remainingCartIds[0])
        } else {
          setActiveCartId(null)
          localStorage.removeItem('activeCartId')
        }
      }
      
      return true
    }
    return false
  }
  
  // Add item to a cart
  const addItemToCart = (cartId, item, quantity = 1) => {
    if (!carts[cartId]) return false
    
    setCarts(prevCarts => {
      const cart = prevCarts[cartId]
      const existingItemIndex = cart.items.findIndex(i => i.id === item.id)
      
      if (existingItemIndex >= 0) {
        // Item already exists, update quantity
        const updatedItems = [...cart.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        }
        
        return {
          ...prevCarts,
          [cartId]: {
            ...cart,
            items: updatedItems
          }
        }
      } else {
        // Add new item
        return {
          ...prevCarts,
          [cartId]: {
            ...cart,
            items: [...cart.items, { ...item, quantity }]
          }
        }
      }
    })
    
    return true
  }
  
  // Update item quantity in a cart
  const updateItemQuantity = (cartId, itemId, quantity) => {
    if (!carts[cartId]) return false
    
    setCarts(prevCarts => {
      const cart = prevCarts[cartId]
      const existingItemIndex = cart.items.findIndex(i => i.id === itemId)
      
      if (existingItemIndex < 0) return prevCarts
      
      const updatedItems = [...cart.items]
      
      if (quantity <= 0) {
        // Remove item if quantity is zero or negative
        updatedItems.splice(existingItemIndex, 1)
      } else {
        // Update quantity
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity
        }
      }
      
      return {
        ...prevCarts,
        [cartId]: {
          ...cart,
          items: updatedItems
        }
      }
    })
    
    return true
  }
  
  // Remove item from a cart
  const removeItemFromCart = (cartId, itemId) => {
    if (!carts[cartId]) return false
    
    setCarts(prevCarts => {
      const cart = prevCarts[cartId]
      return {
        ...prevCarts,
        [cartId]: {
          ...cart,
          items: cart.items.filter(item => item.id !== itemId)
        }
      }
    })
    
    return true
  }
  
  // Clear all items from a cart
  const clearCart = (cartId) => {
    if (!carts[cartId]) return false
    
    setCarts(prevCarts => ({
      ...prevCarts,
      [cartId]: {
        ...prevCarts[cartId],
        items: []
      }
    }))
    
    return true
  }
  
  // Get cart totals
  const getCartTotal = (cartId) => {
    if (!carts[cartId]) return 0
    
    return carts[cartId].items.reduce(
      (total, item) => total + (item.price * item.quantity),
      0
    )
  }
  
  // Get cart item count
  const getCartItemCount = (cartId) => {
    if (!carts[cartId]) return 0
    
    return carts[cartId].items.reduce(
      (count, item) => count + item.quantity,
      0
    )
  }
  
  // Get total count of items across all carts
  const getTotalItemCount = () => {
    return Object.values(carts).reduce(
      (count, cart) => count + cart.items.reduce((c, item) => c + item.quantity, 0),
      0
    )
  }
  
  // Checkout - in a real app, this would process the order
  const checkout = (cartIds) => {
    // Simulate order processing
    const orders = cartIds.map(cartId => ({
      cartId,
      items: carts[cartId].items,
      total: getCartTotal(cartId),
      timestamp: new Date().toISOString()
    }))
    
    // Clear the checked out carts
    cartIds.forEach(cartId => {
      clearCart(cartId)
    })
    
    return orders
  }
  
  const value = {
    carts,
    activeCartId,
    createCart,
    switchCart,
    renameCart,
    deleteCart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    getTotalItemCount,
    checkout
  }
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}