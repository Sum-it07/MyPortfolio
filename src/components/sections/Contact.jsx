import { useState, useRef, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ContactScene } from '../3d/InteractiveScenes'

/**
 * Contact Section - Dramatic full-width with split design + 3D
 */
const Contact = () => {
  const containerRef = useRef(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormState({ name: '', email: '', message: '' })
  }

  const socials = [
    { name: 'GITHUB', url: 'https://github.com/Sum-it07' },
    { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/sumit-shrestha-700b652a3/' },
  ]

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative min-h-screen py-32 overflow-hidden bg-[#030303]"
    >
      {/* 3D Scene */}
      <div className="absolute left-0 top-0 w-1/2 h-full z-0 opacity-25">
        <Suspense fallback={null}>
          <ContactScene />
        </Suspense>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div 
          className="flex items-center gap-6 mb-12"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#ff9500] text-sm tracking-[0.3em] uppercase">Contact</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#ff9500]/50 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left - Giant headline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-12">
              LET'S
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff9500] via-[#ff2d55] to-[#5e5ce6]">
                BUILD
              </span>
              <br />
              SOMETHING
              <br />
              <span className="text-white/30">GREAT.</span>
            </h2>

            {/* Contact links */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <div className="text-xs tracking-[0.2em] text-white/30 mb-2">EMAIL</div>
                <motion.a 
                  href="mailto:sumitstha2060@gmail.com"
                  className="text-2xl md:text-3xl font-light text-white hover:text-[#ff9500] transition-colors"
                  whileHover={{ x: 10 }}
                >
                  sumitstha2060@gmail.com
                </motion.a>
              </div>

              <div>
                <div className="text-xs tracking-[0.2em] text-white/30 mb-2">LOCATION</div>
                <p className="text-2xl md:text-3xl font-light text-white/50">
                  Greater Noida, India
                </p>
              </div>

              <div className="pt-8">
                <div className="text-xs tracking-[0.2em] text-white/30 mb-4">CONNECT</div>
                <div className="flex gap-4">
                  {socials.map((social, i) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <span className="text-sm tracking-wider text-white/30 group-hover:text-white transition-colors">
                        {social.name}
                      </span>
                      <motion.div 
                        className="absolute -bottom-1 left-0 h-px bg-[#ff9500]"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative">
              {/* Form border decoration */}
              <div className="absolute -inset-px bg-gradient-to-br from-[#ff9500]/30 via-transparent to-[#5e5ce6]/30 rounded-sm" />
              
              <div className="relative bg-[#0a0a0a] p-8 md:p-12">
                {submitted ? (
                  <motion.div 
                    className="text-center py-20"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div
                      className="w-20 h-20 mx-auto mb-8 rounded-full bg-[#30d158]/20 flex items-center justify-center"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg className="w-10 h-10 text-[#30d158]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-3xl font-black mb-4">MESSAGE SENT</h3>
                    <p className="text-white/50">I'll get back to you within 24 hours.</p>
                    <motion.button
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-sm tracking-wider text-[#ff9500] hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      SEND ANOTHER →
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <label className="block text-xs tracking-[0.2em] text-white/30 mb-3">YOUR NAME</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                        required
                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-white/20 focus:outline-none focus:border-[#ff9500] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-xs tracking-[0.2em] text-white/30 mb-3">EMAIL</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                        required
                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-white/20 focus:outline-none focus:border-[#ff9500] transition-colors"
                        placeholder="john@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs tracking-[0.2em] text-white/30 mb-3">MESSAGE</label>
                      <textarea
                        name="message"
                        value={formState.message}
                        onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                        required
                        rows={4}
                        className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-white/20 focus:outline-none focus:border-[#ff9500] transition-colors resize-none"
                        placeholder="Your message..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative w-full py-6 mt-4 overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Button background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#ff9500] via-[#ff2d55] to-[#5e5ce6]" />
                      <motion.div 
                        className="absolute inset-0 bg-white"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      <span className="relative z-10 flex items-center justify-center gap-3 text-white font-bold tracking-wider">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            />
                            SENDING...
                          </>
                        ) : (
                          <>
                            SEND MESSAGE
                            <motion.svg 
                              className="w-5 h-5" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                              whileHover={{ x: 5 }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Large decorative quote */}
        <motion.div 
          className="mt-32 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-4xl md:text-6xl font-black text-white/[0.03] leading-tight max-w-4xl mx-auto">
            "THE BEST WAY TO PREDICT THE FUTURE IS TO CREATE IT"
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
