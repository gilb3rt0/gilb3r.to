import { useTexture, Points } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const FloatingG = () => {
  const count = 3000
  const texture = useTexture('/img/g_alpha.jpg')
  const cloud = useRef<THREE.Points>()
  useFrame(() => {
    if (cloud.current) {
      cloud.current.rotation.y += 0.001
    }
  })
  const radius = 100

  const points = useMemo(() => {
    const p = new Array(count).fill(0).map((v) => (0.5 - Math.random()) * radius)
    return new THREE.BufferAttribute(new Float32Array(p), 3)
  }, [count])
  const colors = useMemo(() => {
    const c = new Array(count).fill(0).map((v) => 0.1 + Math.random() * 0.5)
    return new THREE.BufferAttribute(new Float32Array(c), 3)
  }, [count])
  const sizes = useMemo(() => {
    const s = new Array(count).fill(0).map((v) => Math.random() * 50)
    return new THREE.BufferAttribute(new Float32Array(s), 1)
  }, [count])

  return (
    <points ref={cloud}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' {...points} />
        <bufferAttribute attach='attributes-color' {...colors} />
        <bufferAttribute attach='attributes-size' {...sizes} needsUpdate />
      </bufferGeometry>
      <pointsMaterial
        needsUpdate
        vertexColors
        alphaMap={texture}
        transparent
        depthWrite={false}
        color={'#ffffff'}
        sizeAttenuation={true}
        opacity={0.5}
      />
    </points>
  )
  // return (
  //   <Points positions={points} colors={colors} sizes={sizes} ref={cloud}>
  //     <pointsMaterial alphaMap={texture} transparent depthWrite={false} vertexColors />
  //   </Points>
  // )
}

export default FloatingG
