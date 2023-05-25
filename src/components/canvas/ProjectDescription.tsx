import { Html } from '@react-three/drei'
import { PortableText } from '@portabletext/react'

const ProjectDescription = ({ description }) => {
  return <Html>{description && <PortableText value={description} />}</Html>
}

export default ProjectDescription
