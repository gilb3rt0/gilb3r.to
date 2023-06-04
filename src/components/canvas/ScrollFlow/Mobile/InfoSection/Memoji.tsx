import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { DoubleSide } from 'three'
import * as THREE from 'three'

const Memoji = () => {
  const memoji = useTexture('/textures/memoji_laptop.png')
  const mesh = useRef<THREE.Mesh>()
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01
    }
  })
  return (
    <mesh position={[0, 0, 0]} scale={[1, 1, 1]} ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial map={memoji} transparent side={DoubleSide} />
    </mesh>
  )
}

export default Memoji
