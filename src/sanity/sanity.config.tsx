import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemas } from '@/sanity/schemas/schemas'

type Config = {
  title: string
  projectId: string
  dataset: string
  plugins: any[]
  basePath: string
  apiVersion: string
  schema: {
    types: any[]
  }
}

export default defineConfig({
  title: 'gilb3rt0 CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  plugins: [deskTool()],
  basePath: '/cms',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  schema: {
    types: schemas,
  },
} as Config)
