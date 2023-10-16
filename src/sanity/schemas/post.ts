import { defineType, defineArrayMember, defineField, ImageSchemaType, Image } from 'sanity'
import { Technology } from './technologies'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      type: 'image',
      name: 'coverImage',
      title: 'Cover Image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'technology',
      title: 'Technology',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'technology' as const }] })],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
        }),
      ],
    }),
  ],
})

export const markdown = defineType({
  name: 'markdown',
  title: 'Markdown',
  type: 'array',
  of: [defineArrayMember({ type: 'block' })],
})

export const sandbox = defineType({
  name: 'sandbox',
  title: 'Sandbox',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

/* write a type */
export type Post = {
  _id: string
  _type: 'post'
  title: string
  slug: string
  date: string
  coverImage: ImageSchemaType
  excerpt: string
  technology: Technology[]
  content: Markdown[] | Image[] | Sandbox[]
}

export type Markdown = {
  _type: 'markdown'
  children: {
    _type: 'span'
    marks: []
    text: string
  }[]
  style: 'normal'
  _key: string
}

export type Sandbox = {
  _type: 'sandbox'
  url: string
  _key: string
}
