import { MeshReflectorMaterial, Text3D } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const FloatingG = () => {
  const mesh = useRef<THREE.Mesh>()
  useFrame(() => {})
  const { viewport } = useThree()
  const position = new THREE.Vector3(
    Math.random() * viewport.width * 2 - viewport.width,
    Math.random() * viewport.height * 2 - viewport.height,
    2,
  )

  return (
    <Text3D
      ref={mesh}
      position={position}
      font={'/fonts/Basteleur Moonlight_Regular.json'}
      curveSegments={12}
      bevelEnabled
      height={0.1}
      size={0.2}
      letterSpacing={0.02}
    >
      <MeshReflectorMaterial mirror={0.5} metalness={0.5} roughness={0.01} />G
    </Text3D>
  )
}

export default FloatingG
