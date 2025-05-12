import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { menuCategories, menuItems } from '../data/menuData'
import MenuItem from '../components/MenuItem'
import AddToCartModal from '../components/AddToCartModal'

const Menu = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { carts, activeCartId, createCart } = useCart()
  
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    vegetarian: false,
    nonVegetarian: false,
    spicy: false,
    priceRange: [0, 1000]
  })
  
  // Parse category from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const categoryParam = params.get('category')
    
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
    
    document.title = 'Menu | StepInCafe'
  }, [location.search])
  
  // Filter menu items based on category and search query
  useEffect(() => {
    let filtered = [...menuItems]
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim()
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      )
    }
    
    // Apply additional filters
    if (filters.vegetarian && !filters.nonVegetarian) {
      filtered = filtered.filter(item => item.isVegetarian)
    } else if (filters.nonVegetarian && !filters.vegetarian) {
      filtered = filtered.filter(item => !item.isVegetarian)
    }
    
    if (filters.spicy) {
      filtered = filtered.filter(item => item.isSpicy)
    }
    
    filtered = filtered.filter(item => 
      item.price >= filters.priceRange[0] && 
      item.price <= filters.priceRange[1]
    )
    
    setFilteredItems(filtered)
  }, [selectedCategory, searchQuery, filters])
  
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
    
    // Update URL without reloading the page
    const params = new URLSearchParams(location.search)
    if (categoryId) {
      params.set('category', categoryId)
    } else {
      params.delete('category')
    }
    navigate({ search: params.toString() }, { replace: true })
  }
  
  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedItem(null), 300) // Clear after animation
  }
  
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }))
  }
  
  return (
    <div className="bg-neutral-50 min-h-screen pb-16">
      {/* Hero Banner */}
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">Our Menu</h1>
            <p className="text-xl">Explore our delicious offerings</p>
          </div>
        </div>
      </div>
      
      <div className="container-custom py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input 
                type="text"
                placeholder="Search for dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
              />
            </div>
            
            <div className="flex flex-wrap gap-3">
              <label className="inline-flex items-center">
                <input 
                  type="checkbox"
                  checked={filters.vegetarian}
                  onChange={(e) => handleFilterChange('vegetarian', e.target.checked)}
                  className="w-4 h-4 text-primary-500"
                />
                <span className="ml-2 text-sm">Vegetarian</span>
              </label>
              
              <label className="inline-flex items-center">
                <input 
                  type="checkbox"
                  checked={filters.nonVegetarian}
                  onChange={(e) => handleFilterChange('nonVegetarian', e.target.checked)}
                  className="w-4 h-4 text-primary-500"
                />
                <span className="ml-2 text-sm">Non-Veg</span>
              </label>
              
              <label className="inline-flex items-center">
                <input 
                  type="checkbox"
                  checked={filters.spicy}
                  onChange={(e) => handleFilterChange('spicy', e.target.checked)}
                  className="w-4 h-4 text-primary-500"
                />
                <span className="ml-2 text-sm">Spicy</span>
              </label>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
            </label>
            <input 
              type="range"
              min="0"
              max="1000"
              step="50"
              value={filters.priceRange[1]}
              onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
          </div>
        </div>
        
        {/* Category Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2">
          <button
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              selectedCategory === null 
                ? 'bg-primary-500 text-white' 
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            }`}
            onClick={() => handleCategorySelect(null)}
          >
            All Items
          </button>
          
          {menuCategories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                selectedCategory === category.id 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Menu Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <MenuItem 
                  item={item} 
                  onClick={() => handleItemClick(item)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-neutral-500">No items found matching your criteria</p>
            <button 
              className="mt-4 btn btn-outline"
              onClick={() => {
                setSearchQuery('')
                setFilters({
                  vegetarian: false,
                  nonVegetarian: false,
                  spicy: false,
                  priceRange: [0, 1000]
                })
                setSelectedCategory(null)
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Add to Cart Modal */}
      <AnimatePresence>
        {isModalOpen && selectedItem && (
          <AddToCartModal 
            item={selectedItem}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            carts={carts}
            activeCartId={activeCartId}
            createCart={createCart}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Menu