import React, { useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
const Contact = () => {
  const contact = useRef<THREE.Group>()
  const { viewport, camera } = useThree()
  const { width } = viewport

  const scroll = useScroll()

  useFrame(() => {
    const { offset } = scroll
    if (contact.current) {
      const camerapos = new THREE.Vector3(
        contact.current.position.x,
        contact.current.position.y,
        contact.current.position.z + 10,
      )
      if (offset > (1 / 3) * 2) {
        camera.position.lerp(camerapos, 0.5)
      }
    }
  })
  return (
    <group position-z={-200} ref={contact}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color='red' />
      </mesh>
    </group>
  )
}

export default Contact
