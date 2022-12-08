import React, { useEffect, useRef } from "react";
import { extend, useThree } from "@react-three/fiber";
import { Text3D, Center, MeshReflectorMaterial } from "@react-three/drei";
import { TextureLoader } from "three";

extend({ TextureLoader });

const textureLoader = new TextureLoader();
const matcap = textureLoader.load(
  "/textures/matcaps/B0A2A8_866A63_E8E9F2_614C4F.png"
);
const notoRegular = "/fonts/json/Kenia_Regular.json";
const isMobile = window.matchMedia("(max-width: 800px)").matches;
console.log(isMobile);

const ComingSoon = () => {
  console.log(notoRegular);
  const mesh = useRef();
  

  return (
    <Center>
      <Text3D
        ref={mesh}
        font={notoRegular}
        scale={0.6}
        castShadow
        receiveShadow
        bevelEnabled={true}
        rotation={isMobile ? [0, 0.5, 0.5] : [0.25, 0.5, 0.25]}
      >
        {"coming soon..."}
        <meshMatcapMaterial matcap={matcap} />
      </Text3D>
    </Center>
  );
};

export default ComingSoon;
