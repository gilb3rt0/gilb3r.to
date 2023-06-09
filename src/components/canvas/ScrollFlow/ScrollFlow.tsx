'use client'
import { Environment, PerspectiveCamera, OrbitControls, ScrollControls } from '@react-three/drei'
import { Suspense } from 'react'
import Loading3D from '@/components/canvas/Loading/Loading3D'
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
      <ambientLight intensity={0.5} />
      <Suspense fallback={<Loading3D />}>
        <PerspectiveCamera makeDefault fov={45} position={[-200, -200, -200]} />
        <Environment files={'/img/empty_warehouse_01_1k.hdr'} />
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
