import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useAnimations'

/**
 * SectionWrapper Component
 * Provides consistent section styling and scroll-triggered animations
 */
const SectionWrapper = ({ 
  children, 
  className = '', 
  id,
  fullHeight = false,
  noPadding = false,
}) => {
  const prefersReducedMotion = useReducedMotion()

  const sectionVariants = {
    hidden: { 
      opacity: prefersReducedMotion ? 1 : 0,
    },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <motion.section
      id={id}
      className={`
        ${fullHeight ? 'min-h-screen' : ''} 
        ${noPadding ? '' : 'py-24 md:py-32'}
        ${className}
      `}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={sectionVariants}
    >
      <div className="section-container">
        {children}
      </div>
    </motion.section>
  )
}

/**
 * AnimatedText Component
 * Text that fades and slides in on scroll
 */
const AnimatedText = ({ 
  children, 
  as: Component = 'p', 
  className = '',
  delay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion()

  const textVariants = {
    hidden: { 
      opacity: prefersReducedMotion ? 1 : 0, 
      y: prefersReducedMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay,
      },
    },
  }

  return (
    <motion.div variants={textVariants}>
      <Component className={className}>
        {children}
      </Component>
    </motion.div>
  )
}

/**
 * SectionHeading Component
 * Consistent section headings with gradient accent
 */
const SectionHeading = ({ 
  title, 
  subtitle,
  align = 'left',
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }

  return (
    <div className={`mb-16 max-w-2xl ${alignmentClasses[align]}`}>
      <AnimatedText 
        as="h2" 
        className="font-display text-display-md font-bold text-text-primary mb-4"
      >
        {title}
      </AnimatedText>
      {subtitle && (
        <AnimatedText 
          as="p" 
          className="text-lg text-text-secondary"
          delay={0.1}
        >
          {subtitle}
        </AnimatedText>
      )}
      <motion.div 
        className="h-1 w-16 bg-gradient-to-r from-accent to-accent-light rounded-full mt-6"
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ marginLeft: align === 'center' ? 'auto' : undefined, marginRight: align === 'center' ? 'auto' : undefined }}
      />
    </div>
  )
}

/**
 * GlassCard Component
 * Reusable glassmorphism card with hover effects
 */
const GlassCard = ({ 
  children, 
  className = '',
  hover = true,
  glow = false,
  as: Component = 'div',
  ...props 
}) => {
  const prefersReducedMotion = useReducedMotion()

  const cardVariants = {
    hidden: { 
      opacity: prefersReducedMotion ? 1 : 0, 
      y: prefersReducedMotion ? 0 : 30,
      scale: prefersReducedMotion ? 1 : 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={hover && !prefersReducedMotion ? { 
        y: -8,
        transition: { duration: 0.3 }
      } : undefined}
      className={`
        glass-card p-6 md:p-8
        ${glow ? 'hover:shadow-glow-md' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * Button Component
 * Animated button with multiple variants
 */
const Button = ({ 
  children, 
  variant = 'primary',
  href,
  onClick,
  className = '',
  icon,
  ...props 
}) => {
  const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary'
  const Component = href ? 'a' : 'button'

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Component
        href={href}
        onClick={onClick}
        className={`${baseClasses} inline-flex items-center gap-2 ${className}`}
        {...props}
      >
        {children}
        {icon && <span className="text-lg">{icon}</span>}
      </Component>
    </motion.div>
  )
}

export { SectionWrapper, AnimatedText, SectionHeading, GlassCard, Button }
