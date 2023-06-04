import {
  Center,
  MeshReflectorMaterial,
  Text3D,
  Float,
  PresentationControls,
  MeshTransmissionMaterial,
} from '@react-three/drei'

const ProjectTitle = ({ title, y }: { title: string; y: number }) => {
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
  return (
    <Float>
      <group rotation-y={-Math.PI / 8} position={[2.5, 2, 0]}>
        <Center>
          <PresentationControls azimuth={[-Math.PI / 4, Math.PI / 4]} polar={[-Math.PI / 16, Math.PI / 8]}>
            <mesh>
              <sphereGeometry args={[1.75, 64]} />
              <MeshTransmissionMaterial
                samples={10}
                resolution={2048}
                transmission={1}
                roughness={0}
                thickness={0.5}
                ior={1.5}
                chromaticAberration={0.0}
                anisotropy={0.1}
                distortion={0.0}
                distortionScale={0.1}
                temporalDistortion={0.1}
                clearcoat={1}
                attenuationDistance={0.1}
                attenuationColor='#fff'
                color='#fff'
              />
              <Center>
                <group>
                  {titleLines.map((line, index) => (
                    <group position-y={0 - index * 0.25} key={index}>
                      <Center>
                        <Text3D
                          font={'/fonts/Basteleur Moonlight_Regular.json'}
                          curveSegments={12}
                          bevelEnabled
                          height={0.1}
                          size={0.2}
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
                          {line}
                        </Text3D>
                      </Center>
                    </group>
                  ))}
                </group>
              </Center>
            </mesh>
          </PresentationControls>
        </Center>
      </group>
    </Float>
  )
}

export default ProjectTitle
