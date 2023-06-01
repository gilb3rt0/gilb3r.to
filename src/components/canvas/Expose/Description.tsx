// @ts-nocheck
import { PortableText } from '@portabletext/react'
import { Float, Html } from '@react-three/drei'
import { useRef, useState } from 'react'
import styles from './Laptop.module.scss'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

const Description = ({ currentProject, setCurrentProject, projects }) => {
  const descriptionContainer = useRef<THREE.Group>()
  const { gl } = useThree()
  return (
    <group ref={descriptionContainer} position={[4, -1, -4]}>
      <Float>
        <Html
          rotation={[0, -Math.PI / 4, 0]}
          transform
          center
          position-z={0.1}
          castShadow
          receiveShadow
          occlude
          className={styles.Description}
          portal={{ current: gl.domElement.parentNode }}
        >
          <PortableText value={projects[currentProject].description} />
        </Html>
        <group position={[-1, -2, 2]}>
          <Html
            position={[-3, 0, 0]}
            occlude
            transform
            center
            castShadow
            receiveShadow
            className={styles.Button}
            portal={{ current: gl.domElement.parentNode }}
          >
            <button
              onClick={() => {
                setCurrentProject(currentProject - 1)
                if (currentProject === 0) {
                  setCurrentProject(projects.length - 1)
                }
              }}
            >
              prev
            </button>
          </Html>
          <Html
            position={[3, 0, 0]}
            occlude
            transform
            center
            position-z={0.1}
            castShadow
            receiveShadow
            className={styles.Button}
            portal={{ current: gl.domElement.parentNode }}
          >
            <button
              onClick={() => {
                setCurrentProject(currentProject + 1)
                if (currentProject === projects.length - 1) {
                  setCurrentProject(0)
                }
              }}
            >
              next
            </button>
          </Html>
        </group>
      </Float>
    </group>
  )
}

export default Description
