import { PortableTextBlock } from 'sanity'

export type ProjectType = {
  _id: string
  _createdAt: string
  title: string
  description: PortableTextBlock[]
  image: {
    url: string
    alt: string
  }

  link: string
}

export type TechnologyType = {
  _id: string
  _createdAt: string
  name: string
  logo: {
    url: string
  }
}
