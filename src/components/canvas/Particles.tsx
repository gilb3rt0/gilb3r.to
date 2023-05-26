import { Points, Point, useTexture } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from 'three'
import colors from 'nice-color-palettes'
import { useFrame } from '@react-three/fiber'

const palette = colors[Math.floor(Math.random() * colors.length)]

function Particles() {
  const particleTexture = useTexture(`/textures/particle.png`)

  const particlesRef = useRef()
  const size = 0.2
  const count = 1000
  const positionFactor = 10
  const rotationSpeed = 0.01

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    if (particlesRef.current) {
      particlesRef.current.rotation.y = elapsedTime * rotationSpeed
    }
  })

  return (
    <Points ref={particlesRef} limit={10000}>
      <pointsMaterial
        size={size}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        vertexColors
        map={particleTexture}
        alphaMap={particleTexture}
      />
      {Array.from({ length: count }).map((_, i) => (
        <Point
          key={i}
          position={[
            (0.5 - Math.random()) * positionFactor,
            (0.5 - Math.random()) * positionFactor,
            (0.5 - Math.random()) * positionFactor,
          ]}
          color={palette[Math.floor(Math.random() * palette.length)]}
        />
      ))}
    </Points>
  )
}

export { Particles }
