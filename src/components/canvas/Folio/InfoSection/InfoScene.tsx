import { useRef } from 'react'
import Memoji from './MemojiCube'
import { Float, useScroll, Center, Text3D, MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import WhiteBlackText from '../../WhiteBlackText'

const InfoScene = ({ currentPage }) => {
  const capsule = useRef<THREE.Group>()
  const infoScene = useRef<THREE.Group>()
  const { camera, size } = useThree()
  const { width } = size
  const isMobile = width < 768

  useFrame(() => {
    if (infoScene.current) {
      const camerapos = new THREE.Vector3(
        infoScene.current.position.x,
        infoScene.current.position.y,
        infoScene.current.position.z + 20,
      )
      const stackPosMobile = new THREE.Vector3(-100, 0, 0)
      const stackPosDesktop = new THREE.Vector3(-50, 0, 0)
      const capsulepos = new THREE.Vector3(isMobile ? 0 : 5, isMobile ? 4 : 0, -5)

      if (currentPage === 1) {
        camera.position.lerp(camerapos, 0.05)
        capsule.current.position.lerp(capsulepos, 0.05)
        capsule.current.scale.lerp(
          new THREE.Vector3(isMobile ? 3 : 3.5, isMobile ? 3 : 3.5, isMobile ? 3 : 3.5),
          0.05,
        )
        capsule.current.rotation.y = THREE.MathUtils.lerp(capsule.current.rotation.y, 0, 0.05) // animate rotation.y to 0
      }
      if (currentPage === 2) {
        capsule.current.position.lerp(isMobile ? stackPosMobile : stackPosDesktop, 0.05)
        capsule.current.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.05)
        capsule.current.rotation.y = THREE.MathUtils.lerp(capsule.current.rotation.y, Math.PI, 0.05) // animate rotation.y to Math.PI
        // animate rotation.y to Math.PI
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
        <group position={isMobile ? [0, -3, 0] : [-2, -0.5, 0]}>
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
                  <WhiteBlackText text={text} index={index} key={index} />
                ))}
              </Float>
            </group>
          </group>
        </group>
      </Float>

      <group ref={capsule}>
        <Float>
          <mesh>
            <meshBasicMaterial color='#ad00da' wireframe />
            <sphereGeometry args={[0.8, 8, 8]} />
            <Memoji />
          </mesh>
        </Float>
      </group>
    </group>
  )
}

export default InfoScene
