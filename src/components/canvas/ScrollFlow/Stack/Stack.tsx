'use client'
import { useScroll, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const Stack = ({ technologies }) => {
  const { camera } = useThree()
  const scroll = useScroll()
  const stack = useRef<THREE.Group>()

  useFrame(() => {
    const { offset } = scroll
    if (stack.current) {
      const camerapos = new THREE.Vector3(
        stack.current.position.x,
        stack.current.position.y,
        stack.current.position.z + 20,
      )
      if (offset > 1 / 4 && offset < 1 / 2) {
        camera.position.lerp(camerapos, 0.05)
      }
    }
  })

  return (
    <group position={[-100, 0, 0]} ref={stack} rotation={[Math.PI * 0.1, 0, 0]}>
      5
      {technologies?.map((tech, i) => {
        const mesh = useRef<THREE.Mesh>()
        const texture = useTexture(tech.logo)
        const radius = 10
        const theta = (2 * Math.PI * i) / technologies.length
        const x = radius * Math.cos(theta)
        const z = radius * Math.sin(theta)
        const y = 0
        const position = new THREE.Vector3(x, y, z)
        useFrame(({ clock }) => {
          const t = clock.getElapsedTime() * 0.1
          if (mesh.current) {
            // orbit around the center of the group (the origin)
            mesh.current.position.x = Math.cos(t + theta) * radius
            mesh.current.position.z = Math.sin(t + theta) * radius
          }
        })
        return (
          <mesh key={i} position={position} ref={mesh}>
            <planeGeometry args={[2, 2]} />
            <meshBasicMaterial map={texture} transparent />
          </mesh>
        )
      })}
    </group>
  )
}

export default Stack