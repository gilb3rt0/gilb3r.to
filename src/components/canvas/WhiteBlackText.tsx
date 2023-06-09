import * as THREE from 'three'
import { Text3D, Center, Text } from '@react-three/drei'

const WhiteBlackText = ({ text, index }: { text: string; index: number }) => {
  const mat1 = new THREE.MeshBasicMaterial({ color: '#fff' })
  const mat2 = new THREE.MeshBasicMaterial({ color: '#000' })
  const matArray = [mat1, mat2]
  const randomColor = new THREE.Color()
  randomColor.setHSL(Math.random(), 0.5, 0.5)
  return (
    <group position-y={0 - index * 0.5} key={index}>
      <Center>
        {/* <Text3D
          font='/fonts/Pilowlava_Regular.json'
          curveSegments={12}
          bevelEnabled
          height={0.1}
          size={0.3}
          letterSpacing={0.02}
          material={matArray}
        >
          {text.toUpperCase()}
        </Text3D> */}
        <Text
          font='/fonts/Basteleur-Bold.otf'
          fontSize={0.5}
          whiteSpace='overflowWrap'
          color={'#fff'}
          strokeColor={'#000'}
          strokeWidth={0.01}
          lineHeight={1.5}
        >
          {text}
        </Text>
      </Center>
    </group>
  )
}

export default WhiteBlackText
