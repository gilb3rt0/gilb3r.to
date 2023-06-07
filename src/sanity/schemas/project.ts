export const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'orderRank',
      type: 'string',
    },
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    },
    {
      name: 'description',
      title: 'Project Description',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
}
