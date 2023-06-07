import {
  Center,
  MeshReflectorMaterial,
  Text3D,
  Float,
  PresentationControls,
  MeshTransmissionMaterial,
} from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import WhiteBlackText from '@/components/canvas/WhiteBlackText'

const ProjectTitle = ({ title, position, scale }) => {
  const titleArray = title.split(' ')
  // create strings with a max length of 25 characters from the titleArray and push them into the titleLines array
  const titleLines = []
  let titleLine = ''
  for (let i = 0; i < titleArray.length; i++) {
    if (titleLine.length + titleArray[i].length < 15) {
      titleLine += titleArray[i] + ' '
    } else {
      titleLines.push(titleLine)
      titleLine = titleArray[i] + ' '
    }
  }
  titleLines.push(titleLine)
  // get all characters in the title
  const titleCharacters = useMemo(() => {
    const characters = []
    for (let i = 0; i < title.length; i++) {
      characters.push(title.charAt(i))
    }
    return characters
  }, [title])

  console.log(titleLines.length)

  return (
    <group position={position} scale={scale}>
      <Center>
        <PresentationControls azimuth={[-Math.PI / 4, Math.PI / 4]} polar={[-Math.PI / 16, Math.PI / 8]}>
          <Center>
            <group>
              <mesh>
                <boxGeometry
                  args={[
                    titleLines.length > 1 ? titleLines.length * 1.5 : titleCharacters.length * 0.45,
                    titleLines.length * 0.75,
                    titleLines.length / 2,
                  ]}
                />
                <MeshTransmissionMaterial
                  envMapIntensity={0.1}
                  samples={10}
                  resolution={2048}
                  transmission={1}
                  roughness={0.125}
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
                <group position-y={titleLines.length > 1 && titleLines.length * 0.25}>
                  {titleLines.map((line, index) => {
                    return <WhiteBlackText text={line} index={index} key={index} />
                  })}
                </group>
              </mesh>
            </group>
          </Center>
          {/* </mesh> */}
        </PresentationControls>
      </Center>
    </group>
  )
}

export default ProjectTitle
