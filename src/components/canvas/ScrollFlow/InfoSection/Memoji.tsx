import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { DoubleSide } from 'three'
import * as THREE from 'three'

const Memoji = () => {
  const textures = useTexture([
    '/textures/memoji_hand.png',
    '/textures/memoji_bulb.png',
    '/textures/memoji_laptop.png',
    '/textures/memoji_laptop.png',
    '/textures/memoji_laptop.png',
    '/textures/memoji_laptop.png',
  ])
  const materials = textures.map((texture) => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
    })
  })

  const mesh = useRef<THREE.Mesh>()
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01
      // mesh.current.rotation.z += 0.005
    }
  })
  return (
    <mesh position={[0, 0, 0]} scale={[1, 1, 1]} ref={mesh} material={materials}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  )
}

export default Memoji
