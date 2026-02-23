import { useRef, useState, Suspense } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { SkillsOrb } from '../3d/FloatingGeometry'

/**
 * Skills Section - Orbiting constellation with 3D orb
 */
const Skills = () => {
  const containerRef = useRef(null)
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const y = useTransform(scrollYProgress, [0, 1], [0, -150])

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 20
    const y = (e.clientY - rect.top - rect.height / 2) / 20
    mouseX.set(x)
    mouseY.set(y)
  }

  const skills = [
    { name: 'PYTHON', level: 95, angle: 0, radius: 180, color: '#ff2d55' },
    { name: 'PYTORCH', level: 92, angle: 45, radius: 200, color: '#5e5ce6' },
    { name: 'TENSORFLOW', level: 90, angle: 90, radius: 160, color: '#30d158' },
    { name: 'SCIKIT-LEARN', level: 92, angle: 135, radius: 220, color: '#ff9500' },
    { name: 'LANGCHAIN', level: 88, angle: 180, radius: 190, color: '#ff2d55' },
    { name: 'HUGGINGFACE', level: 85, angle: 225, radius: 170, color: '#5e5ce6' },
    { name: 'OPENCV', level: 85, angle: 270, radius: 210, color: '#30d158' },
    { name: 'PANDAS', level: 95, angle: 315, radius: 185, color: '#ff9500' },
  ]

  const additionalSkills = [
    'NumPy', 'MLflow', 'FastAPI', 'Docker', 'AWS', 'GCP',
    'OpenAI API', 'RAG', 'Vector DBs', 'NLP', 'Computer Vision', 'Deep Learning'
  ]

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative min-h-screen py-32 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* 3D Orb */}
      <div className="absolute inset-0 z-0 opacity-35">
        <Suspense fallback={null}>
          <SkillsOrb />
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
          <span className="text-[#30d158] text-sm tracking-[0.3em] uppercase">Skills</span>
          <div className="h-px flex-1 bg-gradient-to-r from-[#30d158]/50 to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-[80vh]">
          {/* Left - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black leading-none mb-8">
              TOOLS OF
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#30d158] to-[#5e5ce6]">
                THE TRADE
              </span>
            </h2>

            <p className="text-xl text-white/40 leading-relaxed mb-12 max-w-lg">
              Every project demands the right tool. Years of experimentation 
              have forged a versatile arsenal—ready for any challenge.
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-3">
              {additionalSkills.map((skill, i) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 text-sm text-white/30 border border-white/10 rounded-full hover:border-white/30 hover:text-white/60 transition-all cursor-default"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Right - Orbital visualization */}
          <motion.div 
            className="relative h-[500px] hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {/* Central core */}
            <motion.div 
              className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#ff2d55] via-[#5e5ce6] to-[#30d158]"
              style={{ x: springX, y: springY }}
              animate={{ 
                boxShadow: [
                  '0 0 60px rgba(255, 45, 85, 0.3)',
                  '0 0 80px rgba(94, 92, 230, 0.3)',
                  '0 0 60px rgba(48, 209, 88, 0.3)',
                  '0 0 60px rgba(255, 45, 85, 0.3)',
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <div className="absolute inset-2 rounded-full bg-[#050505] flex items-center justify-center">
                <span className="text-2xl font-black">AI</span>
              </div>
            </motion.div>

            {/* Orbit rings */}
            {[160, 200, 240].map((radius, i) => (
              <motion.div
                key={radius}
                className="absolute rounded-full border border-white/5"
                style={{ 
                  width: radius * 2, 
                  height: radius * 2,
                  rotate
                }}
              />
            ))}

            {/* Orbiting skills */}
            {skills.map((skill, i) => {
              const radian = (skill.angle * Math.PI) / 180
              const x = Math.cos(radian) * skill.radius
              const y = Math.sin(radian) * skill.radius

              return (
                <motion.div
                  key={skill.name}
                  className="absolute cursor-pointer"
                  style={{ 
                    left: `calc(50% + ${x}px - 30px)`, 
                    top: `calc(50% + ${y}px - 30px)` 
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  whileHover={{ scale: 1.3, zIndex: 10 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-xs font-bold relative"
                    style={{ backgroundColor: `${skill.color}20`, color: skill.color }}
                    animate={{
                      boxShadow: hoveredSkill === skill.name 
                        ? `0 0 30px ${skill.color}50` 
                        : 'none'
                    }}
                  >
                    {/* Progress ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="32" cy="32" r="28"
                        fill="none"
                        stroke={`${skill.color}30`}
                        strokeWidth="2"
                      />
                      <motion.circle
                        cx="32" cy="32" r="28"
                        fill="none"
                        stroke={skill.color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={176}
                        initial={{ strokeDashoffset: 176 }}
                        whileInView={{ strokeDashoffset: 176 - (176 * skill.level / 100) }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.1 }}
                      />
                    </svg>
                    <span className="z-10">{skill.name.slice(0, 2)}</span>
                  </motion.div>

                  {/* Tooltip */}
                  {hoveredSkill === skill.name && (
                    <motion.div
                      className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs px-3 py-1 rounded-full"
                      style={{ backgroundColor: skill.color, color: '#050505' }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {skill.name} · {skill.level}%
                    </motion.div>
                  )}
                </motion.div>
              )
            })}

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom experience strip */}
        <motion.div 
          className="mt-20 pt-20 border-t border-white/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'LANGUAGES', value: '8+' },
              { label: 'FRAMEWORKS', value: '15+' },
              { label: 'TOOLS', value: '30+' },
              { label: 'CERTIFICATIONS', value: '5' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">
                  {stat.value}
                </div>
                <div className="text-xs tracking-[0.2em] text-white/30 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
