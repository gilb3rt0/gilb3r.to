import Scene from '@/components/canvas/Scene'
import ScrollFlow from '@/components/canvas/Folio/Folio'
import { getProjects, getTechnologies } from '@/sanity/utils'
import Link from 'next/link'
import Image from 'next/image'

export default async function Page() {
  const projects = await getProjects()
  const technologies = await getTechnologies()

  return (
    <main className='w-screen min-h-screen'>
      <nav className='border-b-4 border-black bg-violet-300 py-2 px-4 flex items-center justify-between'>
        <Image src='/img/favicon.png' height={40} width={40} alt='logo' />
        <ul className='flex h-screen sm:h-auto fixed sm:relative flex-col sm:flex-row justify-end gap-4 items-center font-gloock text-xl'>
          <li className='bg-white py-1 px-2 shadow-hard rounded-sm'>
            <Link href='/'>home</Link>
          </li>
          <li className='bg-white py-1 px-2 shadow-hard rounded-sm'>
            <Link href='/blog'>blog</Link>
          </li>
          <li className='bg-white py-1 px-2 shadow-hard rounded-sm'>
            <Link href='/projects'>projects</Link>
          </li>
        </ul>
      </nav>
      <section className='bg-orange-200 p-4 sm:py-20 px-56 min-h-[calc(100vh-3.75rem)] flex gap-4'>
        <article className='prose font-mono'>
          <h1 className='text-6xl font-display font-bold text-center'>Hello!</h1>
          <p>
            My name is Gilberto and I am a full-stack web developer leaning towards the front-end, based in Berlin. I am
            passionate about creating beautiful, functional websites and applications.
          </p>
          <h4 className='mb-6'>i like working with these technologies:</h4>
          <div className='grid gap-6 grid-cols-8'>
            {technologies?.map((t) => {
              return (
                <div
                  key={t._id}
                  className="group/item w-12 h-12 justify-self-center flex justify-center items-center p-2 bg-green-100 sm:hover:scale-110 cursor-pointer transition-transform ease-in-out duration-75 shadow-hard rounded-sm relative"
                >
                  <span
                    className="absolute opacity-0 group-hover/item:opacity-100 bg-black text-white text-xs px-2 py-1 rounded-sm -top-4 left-8 transition-opacity duration-100 delay-75 ease-in-out"
                  >
                    {t.name}
                  </span>
                  <Image
                    src={t.logo.asset.url}
                    alt={t.name}
                    width={t.logo.asset.metadata.dimensions.width}
                    height={t.logo.asset.metadata.dimensions.height}
                  />
                </div>
              )
            })}
          </div>
        </article>
        <div className='bg-pink-100 shadow-hard flex-grow-0 flex-0 w-96 h-96 relative rounded-lg'>
          <Image src='/img/calling.jpg' fill objectFit='contain' alt='me' />
        </div>
        {/* <Scene>
        <ScrollFlow projects={projects} technologies={technologies} />
      </Scene> */}
      </section>
    </main>
  )
}
