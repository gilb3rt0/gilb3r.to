'use client'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { Perf } from 'r3f-perf'

export default function Scene({ children }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100lvh',
      }}
    >
      <Canvas>
        <Perf />
        {children}
        <Preload all />
      </Canvas>
    </div>
  )
}
