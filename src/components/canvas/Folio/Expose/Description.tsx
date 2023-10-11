import { PortableText } from '@portabletext/react'
import { Html } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const Description = ({ currentProject, setCurrentProject, projects, position, scale, rotation }) => {
  const descriptionContainer = useRef<THREE.Group>()

  return (
    <group ref={descriptionContainer} position={position} scale={scale} rotation={rotation}>
      <Html
        transform
        center
        occlude
        className='max-w-xs overflow-y-auto max-h-56 font-primary text-purple-100 opacity-70'
      >
        <PortableText value={projects[currentProject].description} />
      </Html>
      <group position={[-1, -2, 2]}>
        <Html position={[-3, 0, 0]} occlude transform center>
          <button
            className='bg-black rounded-full p-6 text-purple-100 font-display cursor-pointer hover:scale-110 transition-all ease-in-out duration-150'
            onClick={() => {
              setCurrentProject(currentProject - 1)
              if (currentProject === 0) {
                setCurrentProject(projects.length - 1)
              }
            }}
          >
            prev
          </button>
        </Html>
        <Html position={[3, 0, 0]} occlude transform center position-z={0.1} castShadow receiveShadow>
          <button
            className='bg-black rounded-full p-6 text-purple-100 font-display cursor-pointer hover:scale-110 transition-all ease-in-out duration-150'
            onClick={() => {
              setCurrentProject(currentProject + 1)
              if (currentProject === projects.length - 1) {
                setCurrentProject(0)
              }
            }}
          >
            next
          </button>
        </Html>
      </group>
    </group>
  )
}

export default Description
