'use client'
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState } from 'react'
import Loading3D from '@/components/canvas/Loading/Loading3D'
import Background from '@/components/canvas/Background'
import Expose from './Expose/Expose'
import InfoScene from './InfoSection/InfoScene'
import Contact from './Contact/Contact'
import FloatingG from '../FloatingG'
import Stack from './Stack/Stack'
import PageControls from '../PageControls/PageControls'

const ScrollFlow = ({ projects, technologies }) => {
  const [currentPage, setCurrentPage] = useState<number>(4)

  return (
    <>
      <Background colorA='#6446DB' colorB='#B0A6DA' />
      <ambientLight intensity={0.5} />
      <Suspense fallback={<Loading3D />}>
        <PerspectiveCamera makeDefault fov={45} position={[-200, -200, -200]} />
        <Environment files={'/img/empty_warehouse_01_1k.hdr'} />
        <FloatingG />
        <PageControls currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Stack technologies={technologies} currentPage={currentPage} />
        <InfoScene currentPage={currentPage} />
        <Expose projects={projects} currentPage={currentPage} />
        <Contact currentPage={currentPage} />
      </Suspense>
    </>
  )
}

export default ScrollFlow
