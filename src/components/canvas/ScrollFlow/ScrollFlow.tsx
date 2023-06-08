'use client'
import { Environment, PerspectiveCamera, OrbitControls, ScrollControls } from '@react-three/drei'
import { Suspense } from 'react'
import Loading3D from '@/components/canvas/Loading/Loading3D'
import { useThree } from '@react-three/fiber'
import Background from '@/components/canvas/Background'
import Expose from './Expose/Expose'
import InfoScene from './InfoSection/InfoScene'
import Contact from './Contact/Contact'
import FloatingG from '../FloatingG'
import Stack from './Stack/Stack'
import Mouse from '../Mouse/Mouse'

const ScrollFlow = ({ projects, technologies }) => {
  return (
    <>
      <Background colorA='#6446DB' colorB='#B0A6DA' />
      <Suspense fallback={<Loading3D />}>
        <PerspectiveCamera makeDefault fov={45} position={[-200, -200, -200]} />
        <Environment preset='warehouse' />
        <FloatingG />

        <ScrollControls pages={4}>
          <Mouse />
          <Stack technologies={technologies} />
          <InfoScene />
          <Expose projects={projects} />
          <Contact />
        </ScrollControls>
      </Suspense>
    </>
  )
}

export default ScrollFlow
