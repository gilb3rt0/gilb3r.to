// @ts-nocheck
import { Image } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

const Memoji = () => {
  const mesh = useRef<THREE.Mesh>()

  return (
    <mesh position={[0, 0, 0]} scale={[1, 1, 1]} ref={mesh}>
      <Image url={'/textures/memoji_wave.png'} transparent depthWrite={false} />
      <Image url={'/textures/memoji_laptop.png'} transparent rotation-y={Math.PI} depthWrite={false} />
    </mesh>
  )
}

export default Memoji
