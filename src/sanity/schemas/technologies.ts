import { ImageSchemaType, defineField, defineType } from 'sanity'

export const technology = defineType({
  name: 'technology',
  title: 'Technology',
  type: 'document',
  fields: [
    defineField({
      name: 'orderRank',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Technology Name',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
  ],
})

/* write a type */
export type Technology = {
  _id: string
  _type: 'technology'
  orderRank: string
  name: string
  logo: ImageSchemaType
}
