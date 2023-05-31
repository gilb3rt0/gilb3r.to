'use client'
import React, { useRef, useState } from 'react'
import { useGLTF, Html, PresentationControls, Float, PerspectiveCamera } from '@react-three/drei'
import { PortableText } from '@portabletext/react'
import * as THREE from 'three'
import ProjectTitle from './ProjectTitle'

import styles from './Laptop.module.scss'

export default function Laptop({ projects }) {
  const [currentProject, setCurrentProject] = useState<number>(0)
  const laptop = useRef<THREE.Group>()
  const descriptionContainer = useRef<THREE.Group>()
  const textContainer = useRef<THREE.Mesh>()
  const nextButton = useRef<THREE.Mesh>()
  const prevButton = useRef<THREE.Mesh>()
  const display = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF(
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf',
  ) as any

  const link = projects[currentProject].link

  //  divide the title by length into an array of lines with maximum 15 characters per array ond do not break words

  return (
    <>
      <ProjectTitle title={projects[currentProject].title} y={0.5} />
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />
      <PresentationControls azimuth={[-Math.PI / 4, Math.PI / 4]} polar={[-Math.PI / 16, Math.PI / 8]}>
        <Float>
          <group
            ref={laptop}
            dispose={null}
            position={[-1.5, -1, 0]}
            rotation={[Math.PI / 16, Math.PI / 8, 0]}
            scale={0.15}
          >
            <group position={[0, 0.52, 0]}>
              <mesh geometry={nodes.Circle001.geometry} material={nodes.Circle001.material} />
              <mesh geometry={nodes.Circle001_1.geometry} material={nodes.Circle001_1.material} />
              <mesh geometry={nodes.Circle001_2.geometry} material={materials.HeadPhoneHole} />
              <mesh geometry={nodes.Circle001_3.geometry} material={nodes.Circle001_3.material} />
              <mesh geometry={nodes.Circle001_4.geometry} material={nodes.Circle001_4.material} />
              <mesh geometry={nodes.Circle001_5.geometry} material={materials.TouchbarBorder} />
              <mesh geometry={nodes.Circle001_6.geometry} material={materials.Keyboard} />
              <mesh
                geometry={nodes.FrontCameraRing001.geometry}
                material={materials['CameraRIngBlack.002']}
                position={[-0.15, 19.57, -16.15]}
                scale={5.8}
              />
              <mesh
                geometry={nodes.KeyboardKeyHole.geometry}
                material={nodes.KeyboardKeyHole.material}
                position={[-11.79, -0.15, -8.3]}
                scale={5.8}
              />
              <mesh
                geometry={nodes.RubberFoot.geometry}
                material={materials.DarkRubber}
                position={[-11.95, -0.75, 7.86]}
                scale={5.8}
              />
              <group position={[0.01, -0.21, -10.56]} scale={5.8}>
                <mesh geometry={nodes.Circle012.geometry} material={materials.HingeBlack} />
                <mesh geometry={nodes.Circle012_1.geometry} material={materials.HingeMetal} />
              </group>
              <group position={[0, -0.51, 0]} scale={5.8}>
                <mesh geometry={nodes.Circle006.geometry} material={nodes.Circle006.material} />
                <mesh geometry={nodes.Circle006_1.geometry} material={nodes.Circle006_1.material} />
              </group>
              <group position={[-11.79, -0.15, -8.3]} scale={5.8}>
                <mesh geometry={nodes.Circle.geometry} material={nodes.Circle.material} />
                <mesh geometry={nodes.Circle_1.geometry} material={materials.Key} />
                <mesh geometry={nodes.Circle_2.geometry} material={materials.Touchbar} />
              </group>

              <group position={[0.01, -0.47, -10.41]} rotation={[1.31, 0, 0]} scale={5.8} ref={display}>
                <mesh geometry={nodes.Circle002.geometry} material={nodes.Circle002.material} />
                <mesh geometry={nodes.Circle002_1.geometry} material={materials.Screen}>
                  <Html
                    scale={0.155}
                    rotation-x={-Math.PI / 2}
                    position={[0, -0.06, -1.95]}
                    parent={nodes.Circle002_1}
                    transform
                    className={styles.Screen}
                    occlude='blending'
                  >
                    <iframe title='embed' frameBorder={0} src={link}></iframe>
                  </Html>
                </mesh>
                <mesh geometry={nodes.Circle002_2.geometry} material={materials.ScreenGlass} />
                <mesh geometry={nodes.Circle002_3.geometry} material={materials.Rubber} />
                <mesh geometry={nodes.Circle002_4.geometry} material={materials.DisplayGlass} />
                <mesh
                  geometry={nodes.AppleLogo000.geometry}
                  material={materials['AppleLogo.004']}
                  position={[0, -0.11, -1.8]}
                  rotation={[-Math.PI, 0, -Math.PI]}
                  scale={[0.58, 0.58, 0.58]}
                />
              </group>
              <group position={[12.2, 0.03, 0.6]} scale={5.8}>
                <mesh geometry={nodes.Circle003.geometry} material={nodes.Circle003.material} />
                <mesh geometry={nodes.Circle003_1.geometry} material={nodes.Circle003_1.material} />
              </group>
              <group position={[-15.03, 0.03, 0.6]} scale={5.8}>
                <mesh geometry={nodes.Circle009.geometry} material={nodes.Circle009.material} />
                <mesh geometry={nodes.Circle009_1.geometry} material={nodes.Circle009_1.material} />
              </group>
            </group>
          </group>
        </Float>
      </PresentationControls>

      <group ref={descriptionContainer} position={[4, -1, -4]}>
        <Float>
          <Html
            rotation={[0, -Math.PI / 4, 0]}
            transform
            parent={textContainer.current}
            center
            position-z={0.1}
            castShadow
            receiveShadow
            occlude
            className={styles.Description}
          >
            <PortableText value={projects[currentProject].description} />
          </Html>
          <group position={[-1, -2, 2]}>
            <mesh position={[-3, 0, 0]} ref={prevButton}>
              <circleGeometry args={[0.6, 32]} />
              <meshBasicMaterial color='black' />
              <Html
                occlude
                transform
                parent={prevButton.current}
                center
                position-z={0.1}
                castShadow
                receiveShadow
                className={styles.Button}
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
            </mesh>
            <mesh position={[3, 0, 0]} ref={nextButton}>
              <circleGeometry args={[0.6, 32]} />
              <meshBasicMaterial color='black' />
              <Html
                occlude
                transform
                parent={nextButton.current}
                center
                position-z={0.1}
                castShadow
                receiveShadow
                className={styles.Button}
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
            </mesh>
          </group>
        </Float>
      </group>
    </>
  )
}
