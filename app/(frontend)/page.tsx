import Scene from '@/components/canvas/Scene'
import ScrollFlow from '@/components/canvas/ScrollFlow/ScrollFlow'
import { getProjects } from '@/sanity/utils'

export default async function Page() {
  const projects = await getProjects()

  return (
    <Scene>
      <ScrollFlow projects={projects} />
    </Scene>
  )
}
