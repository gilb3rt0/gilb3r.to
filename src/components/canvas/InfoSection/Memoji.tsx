import { useTexture } from '@react-three/drei'
import { useRef } from 'react'
import { DoubleSide } from 'three'
import * as THREE from 'three'

const Memoji = () => {
  const memoji = useTexture('/textures/memoji.png')
  const mesh = useRef<THREE.Mesh>()

  return (
    <mesh position={[0, 0, 0]} scale={[1, 1, 1]} ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial map={memoji} transparent side={DoubleSide} />
    </mesh>
  )
}

export default Memoji
