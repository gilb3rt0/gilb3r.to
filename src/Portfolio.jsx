import React from "react";
import { Float, OrbitControls } from "@react-three/drei";
import ComingSoon from "./ComingSoon";

const Portfolio = () => {
  return (
    <>
      <OrbitControls />
      <directionalLight position={[1, 2, 3]} castShadow />
      <Float>
        <ComingSoon />
      </Float>
    </>
  );
};

export default Portfolio;
