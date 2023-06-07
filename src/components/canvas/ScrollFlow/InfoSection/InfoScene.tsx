import { useRef } from 'react'
import Memoji from './Memoji'
import {
  MeshTransmissionMaterial,
  PresentationControls,
  Float,
  Html,
  useScroll,
  Center,
  Text3D,
  MeshReflectorMaterial,
} from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import styles from './InfoSection.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { BounceDown } from '@/components/dom/Framer/Animations'
import WhiteBlackText from '../../WhiteBlackText'

const InfoScene = () => {
  const capsule = useRef<THREE.Group>()
  const infoScene = useRef<THREE.Group>()
  const { camera, size } = useThree()
  const { width } = size
  const isMobile = width < 768
  const scroll = useScroll()

  useFrame(() => {
    const { offset } = scroll

    if (infoScene.current) {
      const camerapos = new THREE.Vector3(
        infoScene.current.position.x,
        infoScene.current.position.y,
        infoScene.current.position.z + 20,
      )
      const stackpos = new THREE.Vector3(-50, 0, 0)
      const capsulepos = new THREE.Vector3(isMobile ? 0 : 4, isMobile ? 4 : 0, 0)

      if (offset < 1 / 4) {
        camera.position.lerp(camerapos, 0.05)
        capsule.current.position.lerp(capsulepos, 0.05)
      }
      if (offset > 1 / 4 && offset < 1 / 2) {
        capsule.current.position.lerp(stackpos, 0.05)
      }
    }
  })
  const infoText = `My name is Gilberto and I am a full-stack web developer leaning towards the front-end, based in Berlin. I am passionate about creating beautiful, functional websites and applications.`

  const infoTextArray = infoText.split(' ')
  const infoTextLines = []
  let infoTextLine = ''
  for (let i = 0; i < infoTextArray.length; i++) {
    if (infoTextLine.length + infoTextArray[i].length < 25) {
      infoTextLine += infoTextArray[i] + ' '
    } else {
      infoTextLines.push(infoTextLine)
      infoTextLine = infoTextArray[i] + ' '
    }
  }
  infoTextLines.push(infoTextLine)

  return (
    <group ref={infoScene} scale={isMobile ? 1 : 2}>
      <Float>
        <group position={isMobile ? [0, -3, 0] : [-3, -0.5, 0]}>
          <group position-y={3}>
            <Center>
              <Text3D
                font='/fonts/Pilowlava_Regular.json'
                curveSegments={12}
                bevelEnabled
                height={0.1}
                size={1}
                letterSpacing={0.02}
              >
                <MeshReflectorMaterial
                  mirror={0.5}
                  metalness={0.9}
                  roughness={0.01}
                  blur={[0, 0]}
                  distortion={0.1}
                  resolution={1024}
                  args={[{ color: '#fff' }]}
                />
                HELLO!
              </Text3D>
            </Center>
            <group position-y={-1.5}>
              <Float floatIntensity={0.1} speed={0.25}>
                {infoTextLines.map((text, index) => (
                  <WhiteBlackText text={text} index={index} />
                ))}
              </Float>
            </group>
          </group>
        </group>
      </Float>
      <Float>
        <group ref={capsule} position={isMobile ? [0, 4, 0] : [4, 0, 0]} scale={2.5}>
          <mesh>
            <MeshTransmissionMaterial
              envMapIntensity={0.1}
              samples={10}
              resolution={2048}
              transmission={1}
              roughness={0}
              thickness={0.5}
              ior={2}
              chromaticAberration={0.0}
              anisotropy={0.1}
              distortion={0.3}
              distortionScale={0.01}
              temporalDistortion={0.01}
              clearcoat={1}
              attenuationDistance={0.1}
              attenuationColor='#fff'
              color='#fff'
            />
            <sphereGeometry args={[0.8, 32, 32]} />
            <Memoji />
          </mesh>
        </group>
      </Float>
    </group>
  )
}

export default InfoScene
