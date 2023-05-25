import { PortableTextBlock } from 'sanity'

export type ProjectType = {
  _id: string
  _createdAt: string
  title: string
  description: PortableTextBlock[]
  link: string
}
