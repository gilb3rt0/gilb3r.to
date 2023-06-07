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

const ScrollFlow = ({ projects, technologies }) => {
  return (
    <Suspense fallback={<Loading3D />}>
      <PerspectiveCamera makeDefault fov={45} />
      <Background colorA='#6446DB' colorB='#B0A6DA' />
      <Environment preset='warehouse' />
      <FloatingG />
      {/* <OrbitControls /> */}
      <ScrollControls pages={4}>
        <Stack technologies={technologies} />
        <InfoScene />
        <Expose projects={projects} />
        <Contact />
      </ScrollControls>
    </Suspense>
  )
}

export default ScrollFlow
