import { LayerMaterial, Depth, Noise } from 'lamina'
import { useFrame } from '@react-three/fiber'
import { BackSide } from 'three'
import { useRef } from 'react'

type Colors = {
  colorA: string
  colorB: string
}

const Background = ({ colorA, colorB }: Colors) => {
  const mesh = useRef<THREE.Mesh>()
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y = mesh.current.rotation.x = mesh.current.rotation.z += 0.001
    }
  })
  return (
    <mesh scale={100} ref={mesh}>
      <sphereGeometry args={[1, 64, 64]} />
      <LayerMaterial side={BackSide}>
        <Depth colorA={colorA} colorB={colorB} alpha={1} mode='normal' near={130} far={200} origin={[100, 100, -100]} />
        <Noise opacity={0.1} alpha={0.1} />
      </LayerMaterial>
    </mesh>
  )
}

export default Background
