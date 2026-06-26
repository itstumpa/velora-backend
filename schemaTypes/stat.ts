import {NumberIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const statType = defineType({
  name: 'stat',
  title: 'Stat',
  type: 'document',
  icon: NumberIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g. "Years Experience", "Projects Completed"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
      description: 'e.g. 15, 200, 98',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'suffix',
      title: 'Suffix',
      type: 'string',
      description: 'e.g. "+", "%"',
      initialValue: '+',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls display order (lower numbers appear first)',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
    },
    prepare({title, subtitle}: {title?: string; subtitle?: number}) {
      return {
        title: title || 'Untitled',
        subtitle: subtitle ? `${subtitle}` : 'No value',
      }
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'order',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
