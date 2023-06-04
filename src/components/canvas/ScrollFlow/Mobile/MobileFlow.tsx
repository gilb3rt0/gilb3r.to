import { ScrollControls } from '@react-three/drei'
import Loading3D from '@/components/canvas/Loading/Loading3D'
import InfoScene from '@/components/canvas/ScrollFlow/Mobile/InfoSection/InfoScene'
import Expose from '@/components/canvas/ScrollFlow/Mobile/Expose/Expose'
import Contact from '@/components/canvas/ScrollFlow/Mobile/Contact/Contact'

const MobileFlow = ({ projects }) => {
  return (
    <ScrollControls damping={1} pages={3} eps={0.1}>
      <InfoScene />
      <Expose projects={projects} />
      <Contact />
    </ScrollControls>
  )
}

export default MobileFlow
