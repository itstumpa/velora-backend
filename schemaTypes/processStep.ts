import {SortIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const processStepType = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'document',
  icon: SortIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Discovery", "Concept Development"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stepNumber',
      title: 'Step Number',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          {title: 'Search', value: 'search'},
          {title: 'Lightbulb', value: 'lightbulb'},
          {title: 'Pencil', value: 'pencil'},
          {title: 'Tool', value: 'tool'},
          {title: 'Star', value: 'star'},
        ],
        layout: 'radio',
      },
      initialValue: 'search',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'stepNumber',
    },
    prepare({title, subtitle}: {title?: string; subtitle?: number}) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle ? `Step ${subtitle}` : 'No step number',
      }
    },
  },
  orderings: [
    {
      title: 'Step Number',
      name: 'stepNumber',
      by: [{field: 'stepNumber', direction: 'asc'}],
    },
  ],
})
