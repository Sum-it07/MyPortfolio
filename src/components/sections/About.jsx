import { useRef, Suspense } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { AboutScene } from '../3d/InteractiveScenes'

/**
 * About Section - Cinematic storytelling with parallax + 3D
 */
const About = () => {
  const containerRef = useRef(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative min-h-screen py-32 overflow-hidden"
    >
      {/* 3D Scene Background */}
      <div className="absolute right-0 top-0 w-1/2 h-full z-0 opacity-30">
        <Suspense fallback={null}>
          <AboutScene />
        </Suspense>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section label */}
        <motion.div 
          className="flex items-center gap-6 mb-20"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#ff2d55] text-sm tracking-[0.3em] uppercase">About</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#ff2d55]/50 to-transparent" />
        </motion.div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left - Big statement */}
          <div className="lg:col-span-7">
            <motion.h2 
              className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              A passionate CSE student exploring the frontiers of{' '}
              <span className="text-[#ff2d55]">Artificial Intelligence</span> and{' '}
              <span className="text-[#ff2d55]">Machine Learning.</span>
              <br />
              Turning curiosity into <span className="text-[#ff2d55]">code.</span>
            </motion.h2>

            {/* Philosophy text */}
            <motion.div 
              className="space-y-6 text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p>
                Currently pursuing B.Tech in Computer Science & Engineering at 
                <span className="text-white">Sharda University</span>, Greater Noida.
              </p>
              <p>
                Fascinated by how machines learn and think. From building ML models 
                to solving DSA problems in Java—I'm on a journey to become an AI engineer 
                who creates technology that <span className="text-white">makes a difference</span>.
              </p>
            </motion.div>
          </div>

          {/* Right - Visual element + skills */}
          <div className="lg:col-span-5">
            {/* Artistic image placeholder */}
            <motion.div 
              className="relative mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-[#ff2d55]/20 via-[#5e5ce6]/20 to-[#30d158]/20 rounded-sm overflow-hidden relative">
                {/* Profile Image */}
                <img 
                  src="/myimage.jpeg" 
                  alt="Sumit Shrestha" 
                  className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700"
                />
                {/* Decorative overlay elements */}
                <div className="absolute inset-4 border border-white/10" />
                <div className="absolute inset-8 border border-white/5" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs tracking-[0.2em] text-white/50 drop-shadow-lg">GREATER NOIDA, INDIA</div>
                  <div className="text-xs tracking-[0.2em] text-white/50 drop-shadow-lg">SHARDA UNIVERSITY</div>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div 
                className="absolute -right-4 -bottom-4 bg-[#ff2d55] text-white px-6 py-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-black">AI</div>
                <div className="text-xs tracking-wider">EXPLORER</div>
              </motion.div>
            </motion.div>

            {/* Core skills - unconventional display */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="text-xs tracking-[0.3em] text-white/30 uppercase mb-6">Core Expertise</div>
              <div className="space-y-3">
                {[
                  { skill: 'PYTHON & AI/ML', level: 85 },
                  { skill: 'JAVA & DSA', level: 80 },
                  { skill: 'MACHINE LEARNING', level: 75 },
                  { skill: 'WEB DEVELOPMENT', level: 70 },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="group cursor-default"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                        {item.skill}
                      </span>
                      <span className="text-xs text-white/30">{item.level}%</span>
                    </div>
                    <div className="h-px bg-white/10 relative overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ff2d55] to-[#5e5ce6]"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom marquee */}
        <motion.div 
          className="mt-32 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="flex whitespace-nowrap text-8xl md:text-[12rem] font-black text-white/[0.03] uppercase"
            animate={{ x: [0, -2000] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            BUILD • DREAM • CREATE • INNOVATE • BUILD • DREAM • CREATE • INNOVATE •
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
