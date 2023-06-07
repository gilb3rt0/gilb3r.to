import Scene from '@/components/canvas/Scene'
import ScrollFlow from '@/components/canvas/ScrollFlow/ScrollFlow'
import { View } from '@/components/canvas/View'
import { getProjects, getTechnologies } from '@/sanity/utils'

export default async function Page() {
  const projects = await getProjects()
  const technologies = await getTechnologies()
  console.log(technologies);
  

  return (
    <Scene>
      <ScrollFlow projects={projects} />
    </Scene>
  )
}
