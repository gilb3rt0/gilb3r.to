import { defineType, defineArrayMember, defineField } from '@sanity-typed/types'

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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
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
          type: 'markdown' || 'image' || 'code' || 'sandbox',
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
