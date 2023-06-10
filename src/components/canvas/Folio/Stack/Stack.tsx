// @ts-nocheck
'use client'
import { Center, useScroll, useTexture, Image, Text } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import WhiteBlackText from '../../WhiteBlackText'
import { TechnologyType } from '@/sanity/types'

const Tech = ({ tech, technologies, i, currentPage }) => {
  const mesh = useRef<THREE.Mesh>()
  const modal = useRef<THREE.Mesh>()
  const [hover, setHover] = useState<boolean>(false)

  const aspectRatio = tech.logo.split('-')[1].split('x')[1].split('.')[0] / tech.logo.split('-')[1].split('x')[0]
  const width = 2
  const height = width * aspectRatio
  const radius = 10
  const theta = (2 * Math.PI * i) / technologies.length
  const x = radius * Math.cos(theta)
  const z = radius * Math.sin(theta)
  const y = 0
  const position = new THREE.Vector3(x, y, z)
  const randomColor = Math.random() * 0xff00ff
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.1
    if (mesh.current) {
      // orbit around the center of the group (the origin)
      mesh.current.position.x = Math.cos(t + theta) * radius
      mesh.current.position.z = Math.sin(t + theta) * radius
    }
    if (modal.current) {
      modal.current.position.x = Math.cos(t + theta) * radius
      modal.current.position.z = Math.sin(t + theta) * radius
      modal.current.material.opacity = THREE.MathUtils.lerp(modal.current.material.opacity, hover ? 1 : 0, 0.2)
    }
  })
  return (
    <>
      <Image
        key={i}
        position={position}
        ref={mesh}
        url={tech.logo}
        transparent
        scale={[width, height]}
        depthWrite={false}
        onPointerEnter={() => {
          setHover(true)
        }}
        onPointerLeave={() => {
          setHover(false)
        }}
      />

      <Text
        color={randomColor}
        fontSize={0.5}
        lineHeight={1.5}
        position={[position.x + height, position.y + width, position.z]}
        ref={modal}
        font='/fonts/Steps-Mono-Regular_mono.otf'
      >
        <meshBasicMaterial color={'#00f'} opacity={0} />
        {tech.name}
      </Text>
    </>
  )
}

const Stack = ({ technologies, currentPage }) => {
  const { camera, size } = useThree()
  const scroll = useScroll()
  const stack = useRef<THREE.Group>()

  const isMobile = size.width < 768

  useFrame(() => {
    if (stack.current) {
      const camerapos = new THREE.Vector3(
        stack.current.position.x,
        stack.current.position.y,
        stack.current.position.z + 20,
      )
      if (currentPage === 2) {
        camera.position.lerp(camerapos, 0.05)
      }
    }
  })

  return (
    <group position={[-100, 0, 0]} ref={stack} rotation={[Math.PI * 0.1, 0, -Math.PI * 0.1]} scale={isMobile ? 0.5 : 1}>
      <group position-y={isMobile ? 6 : 4.5} scale={1.5}>
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
        <Tech key={i} tech={tech} technologies={technologies} i={i} />
      ))}
    </group>
  )
}

export default Stack
