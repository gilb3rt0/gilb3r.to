import { ScrollControls } from '@react-three/drei'
import Loading3D from '@/components/canvas/Loading/Loading3D'
import InfoScene from '@/components/canvas/ScrollFlow/Desktop/InfoSection/InfoScene'
import Expose from '@/components/canvas/ScrollFlow/Desktop/Expose/Expose'
import Contact from '@/components/canvas/ScrollFlow/Desktop/Contact/Contact'

const DesktopFlow = ({ projects }) => {
  return (
    <ScrollControls damping={1} pages={3}>
      <InfoScene />
      <Expose projects={projects} />
      <Contact />
    </ScrollControls>
  )
}

export default DesktopFlow
