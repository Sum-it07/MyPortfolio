import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sphere, Environment, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Elegant flowing lines - refined DNA-inspired structure
 */
const FlowingHelix = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef()
  const particleCount = 60
  
  const particles = useMemo(() => {
    const arr = []
    for (let i = 0; i < particleCount; i++) {
      const t = (i / particleCount) * Math.PI * 6
      const y = (i / particleCount - 0.5) * 6
      const radius = 0.6 + Math.sin(i * 0.2) * 0.15
      
      arr.push({
        x: Math.cos(t) * radius,
        y,
        z: Math.sin(t) * radius,
        scale: 0.02 + (1 - Math.abs(i / particleCount - 0.5) * 2) * 0.03,
        opacity: 0.3 + (1 - Math.abs(i / particleCount - 0.5) * 2) * 0.5
      })
    }
    return arr
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {particles.map((p, i) => (
        <Sphere key={i} args={[p.scale, 16, 16]} position={[p.x, p.y, p.z]}>
          <meshPhysicalMaterial 
            color={i % 2 === 0 ? '#ff2d55' : '#5e5ce6'} 
            emissive={i % 2 === 0 ? '#ff2d55' : '#5e5ce6'}
            emissiveIntensity={0.2}
            metalness={0.8}
            roughness={0.2}
            transparent 
            opacity={p.opacity} 
          />
        </Sphere>
      ))}
    </group>
  )
}

/**
 * Premium floating gem/crystal
 */
const PremiumGem = ({ position = [0, 0, 0] }) => {
  const meshRef = useRef()
  const glowRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.1
      meshRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.1
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = -t * 0.1
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
      <group position={position}>
        {/* Outer glow */}
        <Sphere ref={glowRef} args={[1.3, 32, 32]}>
          <meshBasicMaterial color="#5e5ce6" transparent opacity={0.02} />
        </Sphere>
        
        {/* Main crystal */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[0.8, 0]} />
          <meshPhysicalMaterial
            color="#0a0a15"
            metalness={0.95}
            roughness={0.05}
            transmission={0.3}
            thickness={1}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0}
          />
        </mesh>
        
        {/* Inner core */}
        <mesh>
          <octahedronGeometry args={[0.3, 0]} />
          <meshPhysicalMaterial
            color="#ff2d55"
            emissive="#ff2d55"
            emissiveIntensity={0.5}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>
    </Float>
  )
}

/**
 * Elegant ambient particles
 */
const AmbientParticles = ({ count = 60 }) => {
  const pointsRef = useRef()
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2 + Math.random() * 3
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.012} color="#ffffff" transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

/**
 * About Section 3D Scene - Elegant helix
 */
export const AboutScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 5, 4]} intensity={0.4} />
      <pointLight position={[2, 2, 3]} intensity={0.5} color="#ff2d55" distance={8} />
      <pointLight position={[-2, -2, 3]} intensity={0.4} color="#5e5ce6" distance={8} />
      
      <Suspense fallback={null}>
        <FlowingHelix position={[0.5, 0, 0]} />
        <AmbientParticles count={50} />
      </Suspense>
      
      <Environment preset="night" />
    </Canvas>
  )
}

/**
 * Contact Section 3D Scene - Premium gem
 */
export const ContactScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.1} />
      <directionalLight position={[2, 4, 3]} intensity={0.3} />
      <pointLight position={[2, 1, 2]} intensity={0.6} color="#ff9500" distance={6} />
      <pointLight position={[-2, -1, 2]} intensity={0.5} color="#ff2d55" distance={6} />
      
      <Suspense fallback={null}>
        <PremiumGem position={[0, 0, 0]} />
        <AmbientParticles count={35} />
      </Suspense>
      
      <Environment preset="night" />
    </Canvas>
  )
}

export { FlowingHelix, PremiumGem, AmbientParticles }
