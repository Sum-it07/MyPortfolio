import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

/**
 * Navbar Component - Minimal artistic navigation
 */
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [time, setTime] = useState(new Date())

  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const navLinks = [
    { name: 'ABOUT', href: '#about', num: '01' },
    { name: 'WORK', href: '#projects', num: '02' },
    { name: 'SKILLS', href: '#skills', num: '03' },
    { name: 'CONTACT', href: '#contact', num: '04' },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between py-6">
            {/* Logo */}
            <motion.a
              href="#"
              className="group flex items-center gap-4"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              whileHover={{ x: 5 }}
            >
              <div className="relative">
                <motion.div
                  className="w-10 h-10 border border-white flex items-center justify-center"
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-black text-sm">SS</span>
                </motion.div>
              </div>
              <span className="hidden md:block text-white text-xs tracking-[0.3em]">
                SUMIT
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="group relative text-white text-xs tracking-[0.2em]"
                  onClick={(e) => handleNavClick(e, link.href)}
                  whileHover={{ y: -2 }}
                >
                  <span className="opacity-30 mr-1">{link.num}</span>
                  <span className="group-hover:opacity-50 transition-opacity">{link.name}</span>
                  <motion.div 
                    className="absolute -bottom-1 left-0 h-px bg-white"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Right side - Time & Menu */}
            <div className="flex items-center gap-6">
              <span className="hidden lg:block text-white text-xs font-mono opacity-50">
                {time.toLocaleTimeString('en-US', { hour12: false })}
              </span>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden relative w-10 h-10 flex items-center justify-center text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                <span className="text-xs tracking-wider">
                  {isMobileMenuOpen ? 'CLOSE' : 'MENU'}
                </span>
              </motion.button>

              {/* Status indicator */}
              <div className="hidden md:flex items-center gap-2">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-[#30d158]"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-white text-xs opacity-50">AVAILABLE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <motion.div 
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#ff2d55] via-[#5e5ce6] to-[#30d158]"
          style={{ width: progressWidth }}
        />
      </motion.nav>

      {/* Mobile Menu - Full screen takeover */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050505] md:hidden"
            initial={{ clipPath: 'circle(0% at top right)' }}
            animate={{ clipPath: 'circle(150% at top right)' }}
            exit={{ clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.8, ease: [0.6, 0.01, -0.05, 0.95] }}
          >
            <div className="flex flex-col justify-center h-full px-12">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-5xl font-black text-white py-4 border-b border-white/10"
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-white/30 text-lg mr-4">{link.num}</span>
                  {link.name}
                </motion.a>
              ))}

              <motion.div 
                className="mt-12 text-white/30 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p>hello@alexchen.dev</p>
                <p className="mt-2">San Francisco, CA</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
