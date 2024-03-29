'use client'
import Laptop from './Laptop'
import ProjectTitle from './ProjectTitle'
import { useRef, useState } from 'react'
import Description from './Description'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const Expose = ({ projects, currentPage }) => {
  const [currentProject, setCurrentProject] = useState<number>(0)
  const link = projects[currentProject].link
  const { size, camera } = useThree()
  const { width } = size

  const isMobile = width < 768
  const expose = useRef<THREE.Group>()

  useFrame(() => {
    if (expose.current) {
      const camerapos = new THREE.Vector3(
        expose.current.position.x,
        expose.current.position.y,
        expose.current.position.z + 20,
      )
      if (currentPage === 3) {
        camera.position.lerp(camerapos, 0.05)
      }
    }
  })

  return (
    <group position={[-50, 75, -100]} ref={expose} scale={1.75}>
      <Float floatIntensity={isMobile ? 0.1 : 0.5}>
        <Laptop link={link} position={isMobile ? [0, 1.5, 0] : [-2.5, -1, 0]} scale={isMobile ? 0.5 : 1} />
      </Float>
      <Float floatIntensity={isMobile ? 0.1 : 0.5}>
        <Description
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
          projects={projects}
          position={isMobile ? [1, -1.5, -5] : [4, -1, -4]}
          scale={isMobile ? 0.75 : 1}
          rotation={isMobile ? [0, 0, 0] : [0, -Math.PI / 4, 0]}
        />
      </Float>
      {isMobile ? (
        <ProjectTitle title={projects[currentProject].title} position={[0.5, 0.25, 5]} scale={isMobile ? 0.25 : 1} />
      ) : (
        <Float>
          <ProjectTitle title={projects[currentProject].title} position={[3, 3, 0]} scale={isMobile ? 0.25 : 1} />
        </Float>
      )}
    </group>
  )
}

export default Expose
