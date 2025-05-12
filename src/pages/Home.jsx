import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { menuCategories } from '../data/menuData'

const Home = () => {
  useEffect(() => {
    document.title = 'StepInCafe - Authentic Indian Cuisine'
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <motion.section 
        className="relative h-[90vh] bg-cover bg-center flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg')`,
        }}
      >
        <div className="container-custom text-white">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Experience Authentic Indian Cuisine
            </h1>
            <p className="text-xl mb-8">
              Indulge in a culinary journey through the rich flavors of India
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu" className="btn btn-primary text-lg px-6 py-3">
                Explore Menu
              </Link>
              <Link to="/login" className="btn btn-outline border-white text-white text-lg px-6 py-3">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </motion.section>

      {/* Feature Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">Why Choose StepInCafe</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              We're not just a restaurant, we're a culinary experience that brings the authentic flavors of India to your table.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Authentic Flavors",
                description: "Our recipes have been passed down through generations, preserving the authentic taste of India.",
                icon: "🌶️"
              },
              {
                title: "Multiple Ordering Options",
                description: "Create separate carts for different preferences and checkout all at once or separately.",
                icon: "🛒"
              },
              {
                title: "Fresh Ingredients",
                description: "We use only the freshest, locally-sourced ingredients to ensure quality and flavor.",
                icon: "🌱"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-display font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Categories Preview */}
      <section className="py-16 bg-neutral-100">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">Explore Our Menu</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Discover our wide variety of traditional Indian dishes crafted with love and authentic spices.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuCategories.map((category, index) => (
              <motion.div 
                key={category.id}
                className="relative overflow-hidden rounded-lg shadow-lg h-64"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80 mb-3">{category.description}</p>
                  <Link 
                    to={`/menu?category=${category.id}`} 
                    className="text-white font-medium underline decoration-2 underline-offset-4 hover:text-primary-300"
                  >
                    View Items
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/menu" className="btn btn-primary px-8 py-3">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-display font-bold text-neutral-900 mb-4">What Our Customers Say</h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                quote: "The Butter Chicken here reminds me of my grandmother's recipe. Absolutely authentic and delicious!",
                rating: 5
              },
              {
                name: "Raj Patel",
                quote: "Love the multiple cart feature! Makes ordering for my family with different preferences so much easier.",
                rating: 5
              },
              {
                name: "Ananya Singh",
                quote: "The Paneer Tikka was grilled to perfection, and the Masala Chai was the perfect finish to my meal.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="flex items-center mb-2">
                  {Array(testimonial.rating).fill(0).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <p className="text-neutral-600 mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-bold text-neutral-900">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        className="py-20 bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg')`,
        }}
      >
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-display font-bold mb-4">Ready to Experience the Flavors of India?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Sign up now to create your first cart and start your culinary journey with StepInCafe.
            </p>
            <Link to="/login" className="btn btn-primary text-lg px-8 py-3">
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home