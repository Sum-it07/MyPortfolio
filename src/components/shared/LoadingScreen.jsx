import { motion } from 'framer-motion'

/**
 * Loading Screen - Elegant initial page loader
 */
const LoadingScreen = ({ onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onAnimationComplete={onComplete}
    >
      <div className="text-center">
        {/* Animated logo */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-20 h-20 border-2 border-white/20 mx-auto flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <motion.span 
              className="text-2xl font-black text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              SS
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Loading bar */}
        <div className="w-48 h-px bg-white/10 mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#ff2d55] via-[#5e5ce6] to-[#30d158]"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: 'easeInOut'
            }}
          />
        </div>

        {/* Text */}
        <motion.p 
          className="mt-6 text-xs tracking-[0.3em] text-white/30 uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading
        </motion.p>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
