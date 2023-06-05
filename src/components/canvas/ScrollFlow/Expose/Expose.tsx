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
  const { size, camera } = useThree()
  const { width } = size

  const isMobile = width < 768
  const expose = useRef<THREE.Group>()
  const scroll = useScroll()
  useFrame(() => {
    const { offset } = scroll
    if (expose.current) {
      const camerapos = new THREE.Vector3(
        expose.current.position.x,
        expose.current.position.y,
        expose.current.position.z + 20,
      )
      if (offset > 1 / 3 && offset < (1 / 3) * 2) {
        camera.position.lerp(camerapos, 0.05)
      }
    }
  })

  return (
    <group position={[-50, 75, -100]} ref={expose} scale={1.75}>
      <Laptop link={link} position={isMobile ? [0, 1, 0] : [-2.5, -1, 0]} scale={isMobile ? 0.5 : 1} />
      <Description
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
        projects={projects}
        position={isMobile ? [1, -1.5, -5] : [4, -1, -4]}
        scale={isMobile ? 0.75 : 1}
        rotation={isMobile ? [0, 0, 0] : [0, -Math.PI / 4, 0]}
      />
      <ProjectTitle
        title={projects[currentProject].title}
        position={isMobile ? [1, 0, 5] : [3, 3, 0]}
        scale={isMobile ? 0.25 : 1}
      />
    </group>
  )
}

export default Expose
