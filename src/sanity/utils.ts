import { createClient } from 'next-sanity'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-20',
  useCdn: true,
})

export const getProjects = async () => {
  const query = `*[_type == "project"]{
        _id,
        _createdAt,
        title,
        slug,
        description,
        link,
    }`
  const projects = await sanityClient.fetch(query)
  return projects
}
