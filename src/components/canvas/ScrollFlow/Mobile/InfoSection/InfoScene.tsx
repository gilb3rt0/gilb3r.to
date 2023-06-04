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
  const { viewport, gl, camera } = useThree()
  const { height } = viewport
  const yMax = height / 2

  const scroll = useScroll()

  useFrame(() => {
    const { offset } = scroll

    if (infoScene.current) {
      const camerapos = new THREE.Vector3(
        infoScene.current.position.x,
        infoScene.current.position.y,
        infoScene.current.position.z + 10,
      )
      if (offset < 1 / 3) {
        camera.position.lerp(camerapos, 0.05)
      }
    }
  })

  return (
    <group ref={infoScene}>
      <Float>
        <group position={[0, yMax / 3, 0]} scale={0.8}>
          <AnimatePresence>
            <Html transform occlude center className={styles.InfoScene} portal={{ current: gl.domElement.parentNode }}>
              <motion.div
                className={styles.InfoScene}
                variants={BounceDown}
                initial='hidden'
                animate='visible'
                exit='hidden'
              >
                <motion.h2 variants={BounceDown}>Hi!</motion.h2>
                <motion.p variants={BounceDown}>
                  My name is <motion.span variants={BounceDown}>Gilberto</motion.span> and I am a full-stack web
                  developer based in Berlin.
                </motion.p>
                <motion.p variants={BounceDown}>
                  I am passionate about creating beautiful and functional websites and applications.
                </motion.p>
              </motion.div>
            </Html>
          </AnimatePresence>
        </group>
      </Float>
      <Float>
        <group ref={capsule} position={[0, (-yMax / 3) * 2, 0]} scale={1.2}>
          <mesh>
            <MeshTransmissionMaterial
              envMapIntensity={0.1}
              samples={10}
              resolution={2048}
              transmission={1}
              roughness={0}
              thickness={0.5}
              ior={4.5}
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
            <capsuleGeometry args={[1, 1, 4, 32]} />
            <Memoji />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

export default InfoScene
