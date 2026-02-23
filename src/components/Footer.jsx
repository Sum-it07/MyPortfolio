import { motion } from 'framer-motion'

/**
 * Footer Component - Dramatic minimal design
 */
const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GH', fullName: 'GitHub', href: 'https://github.com' },
    { name: 'LI', fullName: 'LinkedIn', href: 'https://linkedin.com' },
    { name: 'KG', fullName: 'Kaggle', href: 'https://kaggle.com' },
    { name: 'HF', fullName: 'Hugging Face', href: 'https://huggingface.co' },
  ]

  return (
    <footer className="relative py-20 bg-[#030303] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Left - Big text */}
          <div className="lg:col-span-2">
            <motion.h2 
              className="text-6xl md:text-8xl lg:text-9xl font-black leading-[0.85]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-white/10">LET'S</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d55] via-[#5e5ce6] to-[#30d158]">
                CONNECT
              </span>
            </motion.h2>
          </div>

          {/* Right - Links */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="text-xs tracking-[0.2em] text-white/30 mb-4">SOCIALS</div>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="group relative w-12 h-12 border border-white/20 flex items-center justify-center hover:border-white/50 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-white/50 text-xs font-bold group-hover:text-white transition-colors">
                      {social.name}
                    </span>
                    <motion.div 
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      {social.fullName}
                    </motion.div>
                  </motion.a>
                ))}
              </div>
            </div>

            <motion.a
              href="mailto:sumit@shrestha.dev"
              className="mt-8 text-xl text-white/50 hover:text-white transition-colors"
              whileHover={{ x: 10 }}
            >
              sumit@shrestha.dev
            </motion.a>
          </div>
        </div>

        {/* Horizontal rule with gradient */}
        <div className="relative h-px bg-white/10 mb-12">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#ff2d55] via-[#5e5ce6] to-[#30d158]"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left - Copyright */}
          <div className="flex items-center gap-8">
            <span className="text-white/20 text-sm">
              &copy; {currentYear}
            </span>
            <span className="text-white/20 text-sm">
              SUMIT SHRESTHA
            </span>
            <span className="text-white/20 text-sm hidden md:block">
              ALL RIGHTS RESERVED
            </span>
          </div>

          {/* Right - Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 text-white/30 hover:text-white transition-colors"
            whileHover={{ y: -3 }}
          >
            <span className="text-xs tracking-wider">BACK TO TOP</span>
            <motion.div
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </motion.div>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
