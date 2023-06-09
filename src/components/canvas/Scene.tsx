'use client'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

export default function Scene({ children }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100lvh',
      }}
    >
      <Canvas>
        {children}
        <Preload all />
      </Canvas>
    </div>
  )
}
