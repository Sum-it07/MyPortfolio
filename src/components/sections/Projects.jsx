import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

/**
 * Projects Section - Immersive horizontal gallery experience
 */
const Projects = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [hoveredProject, setHoveredProject] = useState(null)
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  const projects = [
    {
      id: 1,
      title: 'NEURAL CANVAS',
      category: 'AI / CREATIVE',
      year: '2024',
      description: 'Real-time artistic style transfer that transforms ordinary images into masterpieces. Built with custom neural architecture.',
      tech: ['PyTorch', 'CUDA', 'FastAPI'],
      color: '#ff2d55',
    },
    {
      id: 2,
      title: 'ECHO AI',
      category: 'NLP / PLATFORM',
      year: '2024',
      description: 'Enterprise conversational platform handling 100K+ daily interactions with 95% autonomous resolution.',
      tech: ['TypeScript', 'OpenAI', 'Redis'],
      color: '#5e5ce6',
    },
    {
      id: 3,
      title: 'PREDICT.IO',
      category: 'ML / ANALYTICS',
      year: '2023',
      description: 'Predictive analytics engine that forecasts market trends with unprecedented accuracy.',
      tech: ['TensorFlow', 'D3.js', 'AWS'],
      color: '#30d158',
    },
    {
      id: 4,
      title: 'CODE SAGE',
      category: 'DEVTOOLS / AI',
      year: '2023',
      description: 'Autonomous code reviewer that catches bugs, vulnerabilities, and suggests optimizations.',
      tech: ['Rust', 'GraphQL', 'ML'],
      color: '#ff9500',
    },
  ]

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative min-h-screen py-32 overflow-hidden bg-[#030303]"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div 
          className="flex items-center gap-6 mb-20"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#5e5ce6] text-sm tracking-[0.3em] uppercase">Work</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#5e5ce6]/50 to-transparent" />
        </motion.div>

        {/* Main heading */}
        <motion.h2 
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-20 leading-none"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          SELECTED
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d55] via-[#5e5ce6] to-[#30d158]">
            PROJECTS
          </span>
        </motion.h2>

        {/* Projects list - unconventional layout */}
        <div className="space-y-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative cursor-pointer"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => {
                setActiveProject(index)
                setHoveredProject(index)
              }}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Main row */}
              <motion.div 
                className="relative flex items-center justify-between py-8 border-b border-white/10"
                whileHover={{ x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Left side */}
                <div className="flex items-center gap-8">
                  {/* Number */}
                  <span 
                    className="text-sm font-mono transition-colors duration-300"
                    style={{ color: hoveredProject === index ? project.color : 'rgba(255,255,255,0.3)' }}
                  >
                    0{index + 1}
                  </span>

                  {/* Title */}
                  <h3 
                    className="text-3xl md:text-5xl lg:text-6xl font-black transition-colors duration-300"
                    style={{ color: hoveredProject === index ? project.color : 'white' }}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Right side */}
                <div className="hidden md:flex items-center gap-12">
                  <span className="text-sm text-white/30 tracking-wider">{project.category}</span>
                  <span className="text-sm text-white/30">{project.year}</span>
                  
                  {/* Arrow */}
                  <motion.div
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center"
                    animate={{ 
                      backgroundColor: hoveredProject === index ? project.color : 'transparent',
                      borderColor: hoveredProject === index ? project.color : 'rgba(255,255,255,0.2)'
                    }}
                  >
                    <motion.svg 
                      className="w-5 h-5 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      animate={{ x: hoveredProject === index ? 4 : 0 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </motion.div>
                </div>
              </motion.div>

              {/* Expandable content */}
              <AnimatePresence>
                {hoveredProject === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="py-8 pl-16 grid md:grid-cols-2 gap-8">
                      <p className="text-white/50 text-lg leading-relaxed max-w-md">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {project.tech.map((t, i) => (
                          <span 
                            key={i}
                            className="px-4 py-2 text-sm border rounded-full"
                            style={{ 
                              borderColor: `${project.color}50`,
                              color: project.color
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#"
            className="group relative inline-flex items-center gap-4 text-white/50 hover:text-white transition-colors"
            whileHover={{ x: 10 }}
          >
            <span className="text-lg tracking-wider">VIEW ALL PROJECTS</span>
            <motion.div
              className="w-16 h-px bg-white/30 group-hover:bg-white transition-colors"
              whileHover={{ width: 80 }}
            />
          </motion.a>
        </motion.div>

        {/* Large decorative text */}
        <motion.div 
          className="mt-32 overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center">
            <motion.span 
              className="text-[15vw] font-black text-transparent leading-none select-none"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.05)'
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              CRAFT
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
