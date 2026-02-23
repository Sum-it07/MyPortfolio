import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere, Torus, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Elegant Glass Sphere - premium feel
 */
const GlassSphere = ({ position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <Sphere ref={meshRef} args={[1, 128, 128]} position={position} scale={scale}>
      <meshPhysicalMaterial
        color="#ffffff"
        metalness={0.1}
        roughness={0}
        transmission={0.95}
        thickness={0.5}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        ior={1.5}
      />
    </Sphere>
  )
}

/**
 * Elegant Gradient Orb
 */
const GradientOrb = ({ position = [0, 0, 0], scale = 1 }) => {
  const meshRef = useRef()
  const innerRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.05
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.1
    }
  })

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef} position={position} scale={scale}>
        {/* Outer glow shell */}
        <Sphere args={[1.15, 64, 64]}>
          <meshBasicMaterial color="#ff2d55" transparent opacity={0.03} />
        </Sphere>
        
        {/* Main sphere with distortion */}
        <Sphere args={[1, 128, 128]}>
          <MeshDistortMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.1}
            distort={0.2}
            speed={0.8}
          />
        </Sphere>
        
        {/* Inner core */}
        <Sphere ref={innerRef} args={[0.7, 64, 64]}>
          <meshPhysicalMaterial
            color="#ff2d55"
            emissive="#ff2d55"
            emissiveIntensity={0.3}
            metalness={1}
            roughness={0.3}
          />
        </Sphere>
      </group>
    </Float>
  )
}

/**
 * Luxury Ring System
 */
const LuxuryRings = ({ position = [0, 0, 0], scale = 1 }) => {
  const group1Ref = useRef()
  const group2Ref = useRef()
  const group3Ref = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (group1Ref.current) {
      group1Ref.current.rotation.x = t * 0.1
      group1Ref.current.rotation.z = t * 0.05
    }
    if (group2Ref.current) {
      group2Ref.current.rotation.y = t * 0.08
      group2Ref.current.rotation.x = Math.PI / 3
    }
    if (group3Ref.current) {
      group3Ref.current.rotation.z = -t * 0.06
      group3Ref.current.rotation.y = Math.PI / 4
    }
  })

  const ringMaterial = (color, opacity = 0.6) => (
    <meshPhysicalMaterial
      color={color}
      metalness={0.95}
      roughness={0.05}
      transparent
      opacity={opacity}
    />
  )

  return (
    <group position={position} scale={scale}>
      <group ref={group1Ref}>
        <Torus args={[2, 0.008, 16, 128]}>
          {ringMaterial('#ff2d55', 0.8)}
        </Torus>
      </group>
      <group ref={group2Ref}>
        <Torus args={[2.3, 0.005, 16, 128]}>
          {ringMaterial('#5e5ce6', 0.6)}
        </Torus>
      </group>
      <group ref={group3Ref}>
        <Torus args={[2.6, 0.003, 16, 128]}>
          {ringMaterial('#30d158', 0.4)}
        </Torus>
      </group>
    </group>
  )
}

/**
 * Subtle Floating Particles - refined dust
 */
const FloatingDust = ({ count = 100 }) => {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 3 + Math.random() * 4
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)
      sizes[i] = Math.random() * 0.5 + 0.5
    }
    return { positions, sizes }
  }, [count])

  const pointsRef = useRef()
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={points.positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

/**
 * Main 3D Scene for Hero - Elegant & Refined
 */
export const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      {/* Sophisticated lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[3, 2, 4]} intensity={0.8} color="#ff2d55" distance={10} decay={2} />
      <pointLight position={[-3, -2, 3]} intensity={0.5} color="#5e5ce6" distance={8} decay={2} />
      
      {/* Central elegant orb */}
      <GradientOrb position={[1.5, 0, 0]} scale={0.8} />
      
      {/* Luxury rotating rings */}
      <LuxuryRings position={[1.5, 0, 0]} scale={0.6} />
      
      {/* Subtle floating dust */}
      <FloatingDust count={80} />
      
      {/* Environment for reflections */}
      <Environment preset="night" />
    </Canvas>
  )
}

/**
 * Skills Section 3D - Minimal elegant sphere
 */
export const SkillsOrb = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ background: 'transparent' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[0, 5, 5]} intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={0.6} color="#5e5ce6" distance={8} />
      <pointLight position={[-3, -3, 3]} intensity={0.4} color="#ff2d55" distance={8} />
      
      {/* Glass sphere */}
      <GlassSphere position={[0, 0, 0]} scale={1.2} />
      
      {/* Elegant rings around it */}
      <LuxuryRings position={[0, 0, 0]} scale={0.7} />
      
      {/* Minimal dust */}
      <FloatingDust count={40} />
      
      <Environment preset="night" />
    </Canvas>
  )
}

export default HeroScene
