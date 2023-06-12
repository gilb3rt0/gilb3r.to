'use client'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

export default function Scene({ children }) {
  return (
    <Canvas
    dpr={window.devicePixelRatio}
    >
      {children}
      <Preload all />
    </Canvas>
  )
}
