//@ts-nocheck
import { useRef } from 'react'
import Memoji from './Memoji'
import { MeshTransmissionMaterial, PresentationControls, Float, Html, useScroll } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import styles from './InfoSection.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { BounceDown } from '@/components/dom/Framer/Animations'

const InfoScene = () => {
  const capsule = useRef<THREE.Group>()
  const infoScene = useRef<THREE.Group>()
  const { viewport, camera } = useThree()
  const { width } = viewport
  const xMax = width / 2
  const scroll = useScroll()

  useFrame(() => {
    const { offset } = scroll

    if (infoScene.current) {
      const camerapos = new THREE.Vector3(
        infoScene.current.position.x,
        infoScene.current.position.y,
        infoScene.current.position.z + 20,
      )
      if (offset < 1 / 3) {
        camera.position.lerp(camerapos, 0.05)
      } else {
        capsule.current.rotation.y += 0.01
      }
    }
  })

  return (
    <group ref={infoScene} scale={1.75}>
      <Float>
        <group position={[-xMax / 3, 0, 0]}>
          <Html transform className={styles.InfoScene} portal={{ current: scroll.fixed }}>
            <motion.div
              className={styles.InfoScene}
              variants={BounceDown}
              initial='hidden'
              animate='visible'
              exit='hidden'
            >
              <motion.h2 variants={BounceDown}>Hi!</motion.h2>
              <motion.p variants={BounceDown}>
                My name is <motion.span variants={BounceDown}>Gilberto</motion.span> and I am a full-stack web developer
                based in Berlin.
              </motion.p>
              <motion.p variants={BounceDown}>
                I am passionate about creating beautiful and functional websites and applications.
              </motion.p>
            </motion.div>
          </Html>
        </group>
      </Float>
      <Float>
        <group ref={capsule} position={[xMax / 2, 0, 0]} scale={1.75}>
          <mesh>
            <MeshTransmissionMaterial
            envMapIntensity={0.1}
              samples={10}
              resolution={2048}
              transmission={1}
              roughness={0}
              thickness={0.5}
              ior={3.5}
              chromaticAberration={0.0}
              anisotropy={0.1}
              distortion={0.3}
              distortionScale={0.1}
              temporalDistortion={0.01}
              clearcoat={1}
              attenuationDistance={0.1}
              attenuationColor='#fff'
              color='#fff'
            />
            <sphereGeometry args={[1, 32, 32]} />

            <Memoji />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

export default InfoScene
