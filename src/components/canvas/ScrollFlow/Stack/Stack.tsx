'use client'
import { Center, useScroll, useTexture, Image } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import WhiteBlackText from '../../WhiteBlackText'
import { TechnologyType } from '@/sanity/types'

const Tech = ({ tech, index, technologies, i }) => {
  const mesh = useRef<THREE.Mesh>()
  const texture = useTexture(tech.logo)
  console.log(tech.logo)

  const aspectRatio = tech.logo.split('-')[1].split('x')[1].split('.')[0] / tech.logo.split('-')[1].split('x')[0]
  console.log(aspectRatio)
  const width = 2
  const height = width * aspectRatio
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
    <>
      <Image key={i} position={position} ref={mesh} url={tech.logo} transparent scale={[width, height]} />
    </>
  )
}

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
    <group position={[-100, 0, 0]} ref={stack} rotation={[Math.PI * 0.1, 0, -Math.PI * 0.1]}>
      <group position-y={4.5} scale={1.5}>
        <group position-y={0.5}>
          <Center>
            <WhiteBlackText text='I Like working with' index={0} />
          </Center>
        </group>
        <group position-y={0}>
          <Center>
            <WhiteBlackText text='these technologies' index={0} />
          </Center>
        </group>
      </group>
      {technologies?.map((tech: TechnologyType, i: number) => (
        <Tech key={i} tech={tech} index={0} technologies={technologies} i={i} />
      ))}
    </group>
  )
}

export default Stack
