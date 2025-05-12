import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../context/AuthContext'

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
})

const Login = () => {
  const navigate = useNavigate()
  const { login, isLoggedIn } = useAuth()
  const [isLoginMode, setIsLoginMode] = useState(true)
  
  useEffect(() => {
    document.title = isLoginMode ? 'Login | StepInCafe' : 'Sign Up | StepInCafe'
    
    // Redirect if already logged in
    if (isLoggedIn) {
      navigate('/menu')
    }
  }, [isLoginMode, isLoggedIn, navigate])
  
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
  }
  
  const handleLogin = (values, { setSubmitting, setStatus }) => {
    // For demo purposes, accept any valid input format
    setTimeout(() => {
      const userData = {
        name: values.name || 'User',
        email: values.email,
      }
      
      const success = login(userData)
      
      if (success) {
        navigate('/menu')
      } else {
        setStatus({ error: 'Login failed. Please try again.' })
      }
      
      setSubmitting(false)
    }, 1000)
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-md w-full bg-white rounded-xl shadow-card p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-display font-bold text-neutral-900">
            {isLoginMode ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="mt-2 text-neutral-600">
            {isLoginMode 
              ? 'Sign in to access your account' 
              : 'Join us for a delightful culinary experience'}
          </p>
        </div>
        
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={isLoginMode ? LoginSchema : SignupSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              {/* Name field - only shown in signup mode */}
              {!isLoginMode && (
                <div>
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage name="name" component="div" className="form-error" />
                </div>
              )}
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="form-error" />
              </div>
              
              {/* Password field */}
              <div>
                <label htmlFor="password" className="form-label">Password</label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="form-error" />
              </div>
              
              {/* Confirm Password field - only shown in signup mode */}
              {!isLoginMode && (
                <div>
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <Field
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className="form-input"
                    placeholder="Confirm your password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="form-error" />
                </div>
              )}
              
              {/* Error message */}
              {status && status.error && (
                <div className="text-red-500 text-center">{status.error}</div>
              )}
              
              {/* Login/Signup button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full py-3"
                >
                  {isSubmitting ? (
                    <span>Processing...</span>
                  ) : isLoginMode ? (
                    'Sign In'
                  ) : (
                    'Create Account'
                  )}
                </button>
              </div>
              
              {/* Toggle mode */}
              <div className="text-center mt-4">
                <p className="text-neutral-600">
                  {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-primary-500 font-medium hover:underline"
                  >
                    {isLoginMode ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
              
              {/* Back to home */}
              <div className="text-center mt-6">
                <Link to="/" className="text-neutral-500 hover:text-primary-500">
                  &larr; Back to home
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </motion.div>
    </div>
  )
}

export default Login