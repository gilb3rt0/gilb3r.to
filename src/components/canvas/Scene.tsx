'use client'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

export default function Scene({ children }) {
  return (
    <div className='w-screen h-screen'>
      <Canvas>
        {children}
        <Preload all />
      </Canvas>
    </div>
  )
}
