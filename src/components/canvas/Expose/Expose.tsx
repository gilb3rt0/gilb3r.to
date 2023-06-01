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
  const { width } = viewport
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
        camera.position.lerp(camerapos, 0.5)
      }
    }
  })

  return (
    <group position={[0, 0, -100]} ref={expose}>
      <Laptop link={link} />
      <Description currentProject={currentProject} setCurrentProject={setCurrentProject} projects={projects} />
      <ProjectTitle title={projects[currentProject].title} y={0.5} />
    </group>
  )
}

export default Expose
