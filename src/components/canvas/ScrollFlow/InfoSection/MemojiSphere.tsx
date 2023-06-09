import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

import * as THREE from 'three'

const Memoji = () => {
  const textures = useTexture('/textures/memoji_hand.png')

  const mesh = useRef<THREE.Mesh>()
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01
      // mesh.current.rotation.z += 0.005
    }
  })
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.75, 32, 32]} />
      <meshBasicMaterial color='#fff' wireframe transparent />
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial map={textures} transparent roughness={0} metalness={0.9} />
      </mesh>
    </mesh>
  )
}

export default Memoji
