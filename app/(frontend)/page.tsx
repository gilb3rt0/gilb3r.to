import Background from '@/components/canvas/Background'
import Scene from '@/components/canvas/Scene'
import ScrollFlow from '@/components/canvas/ScrollFlow/ScrollFlow'
import { getProjects, getTechnologies } from '@/sanity/utils'

export default async function Page() {
  const projects = await getProjects()
  const technologies = await getTechnologies()

  return (
    <Scene>
      <ScrollFlow projects={projects} technologies={technologies} />
    </Scene>
  )
}
