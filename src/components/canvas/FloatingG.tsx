import { Center, Text3D, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Suspense, useMemo, useRef } from 'react'
import * as THREE from 'three'

const G = ({ geometry, material }) => {
  const mesh = useRef<THREE.Mesh>()
  const speedPos = Math.random() * 0.01
  const speedRot = Math.random() * 0.1
  const scale = Math.random() * 3

  useFrame(() => {
    if (mesh.current) {
      // orbit around the center of the scene keeping the same distance
      mesh.current.position.x =
        mesh.current.position.x * Math.cos(speedPos) + mesh.current.position.z * Math.sin(speedPos)
      mesh.current.position.z =
        mesh.current.position.z * Math.cos(speedPos) - mesh.current.position.x * Math.sin(speedPos)
      mesh.current.rotation.y = mesh.current.rotation.z = mesh.current.rotation.x += speedRot
    }
  })

  // radius should be minimum 25
  // place mesh randomly on the surface of a sphere with radius 25 + random of 125
  const radius = 25 + Math.random() * 150
  const theta = Math.random() * 2 * Math.PI
  const phi = Math.acos(2 * Math.random() - 1)
  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi) * Math.sin(theta)
  const z = radius * Math.cos(phi)

  const position = new THREE.Vector3(x, y, z)
  return (
    <mesh position={position} ref={mesh} scale={scale}>
      {geometry}
    </mesh>
  )
}
const FloatingG = () => {
  const texture = useTexture(
    'https://raw.githubusercontent.com/nidorx/matcaps/master/512/3F3D52_CCCED9_AFB0C6_8D8CAC-512px.png',
  )
  const material = useMemo(() => new THREE.MeshMatcapMaterial({ matcap: texture }), [texture])
  const geometry = useMemo(
    () => (
      <Center>
        <Text3D
          font={'/fonts/Pilowlava_Regular.json'}
          curveSegments={2}
          bevelEnabled
          height={0.2}
          size={0.2}
          letterSpacing={0.02}
          material={material}
        >
          G
        </Text3D>
      </Center>
    ),
    [material],
  )

  return (
    <group>
      <Suspense fallback={null}>
        {new Array(500).fill(0).map((_, i) => (
          <G key={i} geometry={geometry} material={material} />
        ))}
      </Suspense>
    </group>
  )
}

export default FloatingG
