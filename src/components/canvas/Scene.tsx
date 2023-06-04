'use client'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

export default function Scene({ children }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas>
      {children}
      <Preload all />
    </Canvas>
  )
}
