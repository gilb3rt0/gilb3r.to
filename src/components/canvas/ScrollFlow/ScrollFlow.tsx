'use client'
import { Environment, PerspectiveCamera, Scroll, ScrollControls } from '@react-three/drei'
import { Suspense } from 'react'
import Loading3D from '@/components/canvas/Loading/Loading3D'
import { useThree } from '@react-three/fiber'
import Background from '@/components/canvas/Background'
import DesktopFlow from './Desktop/DesktopFlow'
import MobileFlow from './Mobile/MobileFlow'

const ScrollFlow = ({ projects }) => {
  const { size } = useThree()
  const { width } = size
  return (
    <Suspense fallback={<Loading3D />}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      <Background colorA='#6446DB' colorB='#B0A6DA' />
      <Environment preset='studio' />
      {width > 768 ? <DesktopFlow projects={projects} /> : <MobileFlow projects={projects} />}
    </Suspense>
  )
}

export default ScrollFlow
