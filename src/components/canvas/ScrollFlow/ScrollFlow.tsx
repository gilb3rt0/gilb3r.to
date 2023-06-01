'use client'
import { Environment, PerspectiveCamera, Scroll, ScrollControls } from '@react-three/drei'
import dynamic from 'next/dynamic'
import { View } from '@/components/canvas/View'
import styles from './ScrollFlow.module.scss'

import { Suspense } from 'react'
import Loading3D from '@/components/canvas/Loading/Loading3D'
import InfoScene from '@/components/canvas/InfoSection/InfoScene'
import Expose from '@/components/canvas/Expose/Expose'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import Contact from '@/components/canvas/Contact/Contact'
import Background from '@/components/canvas/Background'

const ScrollFlow = ({ projects }) => {
  return (
    <Canvas>
      <Suspense fallback={<Loading3D />}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
        <Background colorA='#6446DB' colorB='#B0A6DA' />
        <Environment preset='warehouse' />
        <ScrollControls damping={0.3} pages={3}>
          <InfoScene />
          <Expose projects={projects} />
          <Contact />
        </ScrollControls>
      </Suspense>
    </Canvas>
  )
}

export default ScrollFlow
