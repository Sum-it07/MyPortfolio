import { useState, useEffect, useRef, Suspense } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { HeroScene } from '../3d/FloatingGeometry'

/**
 * Hero Section - Avant-garde cinematic intro with 3D elements
 * Unconventional typography, dramatic animations, artistic layout
 */
const Hero = () => {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Magnetic cursor effect
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 300 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    setIsLoaded(true)
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorX, cursorY])

  // Split text animation
  const name = "SUMIT SHRESTHA"
  const letters = name.split('')

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-[200vh] overflow-hidden"
    >
      <motion.div 
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ opacity, scale }}
      >
        {/* 3D Scene Background */}
        <div className="absolute inset-0 z-0 opacity-40">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>



        {/* Main content */}
        <div className="relative z-10 w-full max-w-[90vw] mx-auto px-4">
          {/* Top line */}
          <motion.div 
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, x: -100 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-xs tracking-[0.3em] text-white/40 uppercase">AI Engineer</span>
            <div className="h-px w-20 bg-white/20" />
          </motion.div>

          {/* Main name - Massive typography */}
          <div className="overflow-hidden">
            <motion.h1 
              className="text-[11vw] md:text-[9vw] font-black leading-[0.85] tracking-tighter whitespace-nowrap"
              style={{ y }}
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ y: 200, rotateX: -90 }}
                  animate={isLoaded ? { y: 0, rotateX: 0 } : {}}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.05,
                    ease: [0.6, 0.01, -0.05, 0.95],
                  }}
                  whileHover={{
                    scale: 1.2,
                    color: '#ff2d55',
                    transition: { duration: 0.2 }
                  }}
                  style={{
                    display: 'inline-block',
                    cursor: 'default',
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Subtitle with glitch effect */}
          <motion.div 
            className="mt-6 flex flex-wrap items-center gap-4 md:gap-8"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <span className="text-2xl md:text-4xl font-light text-white/60">—</span>
            {['ML', 'ENGINEER', '×', 'AI', 'BUILDER'].map((word, i) => (
              <motion.span
                key={i}
                className={`text-lg md:text-2xl tracking-widest ${
                  word === '×' ? 'text-[#ff2d55]' : 'text-white/70'
                } ${word === '×' ? '' : 'font-light'}`}
                whileHover={word !== '×' ? {
                  color: '#ffffff',
                  textShadow: '0 0 20px rgba(255,45,85,0.5)',
                } : {}}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          {/* Asymmetric description */}
          <motion.div 
            className="mt-16 md:mt-24 flex flex-col md:flex-row items-start gap-8 md:gap-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="md:w-1/2">
              <p className="text-xl md:text-2xl font-light leading-relaxed text-white/50">
                I don't just write code.
                <br />
                <span className="text-white">I architect experiences</span> that blur the line between 
                <span className="text-[#5e5ce6]"> human intuition</span> and 
                <span className="text-[#30d158]"> machine intelligence</span>.
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-12 md:gap-16">
              {[
                { num: '50+', label: 'PROJECTS' },
                { num: '5Y', label: 'EXPERIENCE' },
                { num: '∞', label: 'CURIOSITY' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1.8 + i * 0.1 }}
                >
                  <div className="text-3xl md:text-5xl font-black text-white">{stat.num}</div>
                  <div className="text-[10px] tracking-[0.2em] text-white/40 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom elements */}
          <motion.div 
            className="absolute bottom-12 left-4 right-4 flex items-end justify-between"
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 2 }}
          >
            {/* Scroll indicator */}
            <div className="flex items-center gap-4">
              <motion.div
                className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent origin-top"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs tracking-[0.3em] text-white/30 uppercase -rotate-90 origin-left translate-y-8">
                Scroll
              </span>
            </div>

            {/* Year */}
            <div className="text-right">
              <div className="text-6xl md:text-8xl font-black text-white/5">2026</div>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-4">
              {['GH', 'LI', 'TW'].map((s, i) => (
                <motion.a
                  key={s}
                  href="#"
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-xs text-white/40 hover:text-white hover:border-white/40 transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {s}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-20 h-20 border-l border-t border-white/10" />
        <div className="absolute top-8 right-8 w-20 h-20 border-r border-t border-white/10" />
        <div className="absolute bottom-8 left-8 w-20 h-20 border-l border-b border-white/10" />
        <div className="absolute bottom-8 right-8 w-20 h-20 border-r border-b border-white/10" />

        {/* Glowing orb following cursor */}
        <motion.div
          className="fixed w-4 h-4 rounded-full bg-[#ff2d55] pointer-events-none mix-blend-screen blur-sm"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      </motion.div>
    </section>
  )
}

export default Hero
