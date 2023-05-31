import { Html } from '@react-three/drei'
import { PortableText } from '@portabletext/react'

const ProjectDescription = ({ description }) => {
  return (
    <Html occlude transform>
      {description && <PortableText value={description} />}
    </Html>
  )
}

export default ProjectDescription
