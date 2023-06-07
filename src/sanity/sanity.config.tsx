import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import { schemas } from '@/sanity/schemas/schemas'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

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
  plugins: [
    deskTool({
      structure: (S, context) => {
        return S.list()
          .title('Content')
          .items([
            // Minimum required configuration
            orderableDocumentListDeskItem({ type: 'project', title: 'Projects', S, context }),
            orderableDocumentListDeskItem({ type: 'technology', title: 'Technologies', S, context }),
          ])
      },
    }),
    vercelDeployTool(),
  ],
  basePath: '/cms',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  schema: {
    types: schemas,
  },
} as Config)
