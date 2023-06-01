'use client'
import Laptop from './Laptop'
import ProjectTitle from './ProjectTitle'
import { useState } from 'react'
import Description from './Description'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll, ScrollControls, Scroll } from '@react-three/drei'
import * as THREE from 'three'
const Expose = ({ projects }) => {
  const [currentProject, setCurrentProject] = useState<number>(0)
  const link = projects[currentProject].link
  const { viewport, camera } = useThree()
  const scroll = useScroll()
console.log(scroll);


  return (
    <group>
      <Laptop link={link} />
      <Description currentProject={currentProject} setCurrentProject={setCurrentProject} projects={projects} />
      <ProjectTitle title={projects[currentProject].title} y={0.5} />
    </group>
  )
}

export default Expose
