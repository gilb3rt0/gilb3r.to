import { createClient } from 'next-sanity'
import { Project, Technology } from './sanity.config'
import { TechnologyType } from './types'


const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-20',
  useCdn: true,
})

export const getProjects = async (): Promise<Project[]> => {
  const query = `*[_type == "project"]|order(orderRank){
        _id,
        _createdAt,
        title,
        slug,
        description,
        link
    }`
  const projects = await sanityClient.fetch(query)
  return projects
}

export const getTechnologies = async (): Promise<Technology[]> => {
  const query = `*[_type == "technology"]|order(orderRank){
        _id,
        _createdAt,
        name,
        logo{
          asset->{
            url,
            metadata
          }
        }
    }`
  const technologies = await sanityClient.fetch(query)
  return technologies
}
