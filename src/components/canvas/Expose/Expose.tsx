import { Html, PerspectiveCamera } from '@react-three/drei'
import Laptop from './Laptop'
import ProjectTitle from './ProjectTitle'
import { Suspense, useState } from 'react'
import Description from './Description'

const Expose = ({ projects }) => {
  const [currentProject, setCurrentProject] = useState<number>(0)
  const link = projects[currentProject].link

  return (
    <group>
      <Laptop link={link} />
      <Description currentProject={currentProject} setCurrentProject={setCurrentProject} projects={projects} />
      <ProjectTitle title={projects[currentProject].title} y={0.5} />
    </group>
  )
}

export default Expose
