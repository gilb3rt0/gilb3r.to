import * as THREE from 'three'
import { Text3D, Center } from '@react-three/drei'

const WhiteBlackText = ({ text, index }: { text: string; index: number }) => {
  const mat1 = new THREE.MeshBasicMaterial({ color: '#fff' })
  const mat2 = new THREE.MeshBasicMaterial({ color: '#000' })
  const matArray = [mat1, mat2]

  return (
    <group position-y={0 - index * 0.5} key={index}>
      <Center>
        <Text3D
          font='/fonts/Pilowlava_Regular.json'
          curveSegments={12}
          bevelEnabled
          height={0.1}
          size={0.3}
          letterSpacing={0.02}
          material={matArray}
        >
          {text.toUpperCase()}
        </Text3D>
      </Center>
    </group>
  )
}

export default WhiteBlackText
