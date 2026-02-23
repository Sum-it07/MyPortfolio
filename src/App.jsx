import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedBackground from './components/shared/AnimatedBackground'
import LoadingScreen from './components/shared/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Skills from './components/sections/Skills'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import { useReducedMotion } from './hooks/useAnimations'

/**
 * Main App Component
 * Orchestrates all sections with smooth page transitions
 */
function App() {
  const prefersReducedMotion = useReducedMotion()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading time for assets
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Smooth scroll polyfill for Safari
  useEffect(() => {
    // Handle anchor links on initial load
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  // Page transition variants
  const pageVariants = {
    initial: {
      opacity: prefersReducedMotion ? 1 : 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loader" />
      ) : (
        <motion.div
          key="main"
          className="relative min-h-screen"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
        {/* Animated Background */}
        <AnimatedBackground />

        {/* Navigation */}
        <Navbar />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <Hero />

          {/* Section Divider */}
          <div className="section-container">
            <div className="h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
          </div>

          {/* About Section */}
          <About />

          {/* Section Divider */}
          <div className="section-container">
            <div className="h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
          </div>

          {/* Projects Section */}
          <Projects />

          {/* Section Divider */}
          <div className="section-container">
            <div className="h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
          </div>

          {/* Skills Section */}
          <Skills />

          {/* Section Divider */}
          <div className="section-container">
            <div className="h-px bg-gradient-to-r from-transparent via-glass-border to-transparent" />
          </div>

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Skip to main content link for accessibility */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
      </motion.div>
      )}
    </AnimatePresence>
  )
}

export default App
