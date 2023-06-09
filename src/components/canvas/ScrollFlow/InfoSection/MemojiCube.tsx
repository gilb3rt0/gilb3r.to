import { useTexture } from '@react-three/drei'
import { useRef } from 'react'
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
      depthWrite: false,
    })
  })
  const mesh = useRef<THREE.Mesh>()

  return (
    <mesh position={[0, 0, 0]} scale={[1, 1, 1]} ref={mesh} material={materials}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  )
}

export default Memoji
