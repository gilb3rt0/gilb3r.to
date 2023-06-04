'use client'
import Laptop from './Laptop'
import ProjectTitle from './ProjectTitle'
import { useRef, useState } from 'react'
import Description from './Description'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, ScrollControls, Scroll } from '@react-three/drei'
import * as THREE from 'three'

const Expose = ({ projects }) => {
  const [currentProject, setCurrentProject] = useState<number>(0)
  const link = projects[currentProject].link
  const { viewport, camera } = useThree()
  const { width, height } = viewport
  const expose = useRef<THREE.Group>()
  const scroll = useScroll()
  useFrame(() => {
    const { offset } = scroll
    if (expose.current) {
      const camerapos = new THREE.Vector3(
        expose.current.position.x,
        expose.current.position.y,
        expose.current.position.z + 10,
      )
      if (offset > 1 / 3 && offset < (1 / 3) * 2) {
        camera.position.lerp(camerapos, 0.05)
      }
    }
  })

  return (
    <group position={[-50, 75, -100]} ref={expose}>
      <group position={[width / 3, 2, 0]} rotation-y={-Math.PI / 8}>
        <Laptop link={link} />
      </group>
      <group position={[-width / 3, -height / 4, 0]} rotation-y={Math.PI / 8} scale={0.75}>
        <Description currentProject={currentProject} setCurrentProject={setCurrentProject} projects={projects} />
      </group>
      <group scale={0.75} position={[0, -height / 3, 0]} rotation-y={Math.PI / 8}>
        <ProjectTitle title={projects[currentProject].title} y={0.5} />
      </group>
    </group>
  )
}

export default Expose