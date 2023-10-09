import Scene from '@/components/canvas/Scene'
import ScrollFlow from '@/components/canvas/Folio/Folio'
import { getProjects, getTechnologies } from '@/sanity/utils'

export default async function Page() {
  const projects = await getProjects()
  const technologies = await getTechnologies()

  return (
    <main className='w-screen h-screen'>
      <Scene>
        <ScrollFlow projects={projects} technologies={technologies} />
      </Scene>
    </main>
  )
}
