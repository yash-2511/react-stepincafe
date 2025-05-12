import { motion } from 'framer-motion'

const MenuItem = ({ item, onClick }) => {
  return (
    <motion.div 
      className="menu-item flex flex-col h-full"
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="menu-item-img">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium">{item.name}</h3>
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
        
        <p className="text-sm text-neutral-600 mb-3 line-clamp-2">{item.description}</p>
      </div>
      
      <div className="flex justify-between items-center mt-auto">
        <span className="font-bold text-lg">₹{item.price}</span>
        <button className="btn btn-primary text-sm py-1 px-3">
          Add to Cart
        </button>
      </div>
    </motion.div>
  )
}

export default MenuItem