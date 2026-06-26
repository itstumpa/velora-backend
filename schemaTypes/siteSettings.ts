import {CogIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'cta', title: 'CTA Section'},
    {name: 'contact', title: 'Contact Section'},
    {name: 'general', title: 'General'},
  ],
  fields: [
    // --- General ---
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal label',
      initialValue: 'Global Settings',
      group: 'general',
    }),
    // --- CTA Section ---
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Subtitle',
      type: 'string',
      initialValue: "Let's Create Together",
      group: 'cta',
    }),
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
      initialValue: 'Ready to Transform Your Space?',
      group: 'cta',
    }),
    defineField({
      name: 'ctaBackgroundImage',
      title: 'CTA Background Image',
      type: 'image',
      options: {hotspot: true},
      group: 'cta',
    }),
    defineField({
      name: 'ctaPrimaryButtonText',
      title: 'CTA Primary Button Text',
      type: 'string',
      initialValue: 'Book a Consultation',
      group: 'cta',
    }),
    defineField({
      name: 'ctaPrimaryButtonLink',
      title: 'CTA Primary Button Link',
      type: 'string',
      initialValue: '/#contact',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSecondaryButtonText',
      title: 'CTA Secondary Button Text',
      type: 'string',
      initialValue: 'View Portfolio',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSecondaryButtonLink',
      title: 'CTA Secondary Button Link',
      type: 'string',
      initialValue: '/#projects',
      group: 'cta',
    }),
    // --- Contact Section ---
    defineField({
      name: 'contactSubtitle',
      title: 'Contact Subtitle',
      type: 'string',
      initialValue: 'Get in Touch',
      group: 'contact',
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact Heading',
      type: 'string',
      initialValue: "Let's Start a Conversation",
      group: 'contact',
    }),
    defineField({
      name: 'contactDescription',
      title: 'Contact Description',
      type: 'text',
      rows: 2,
      initialValue:
        "Tell us about your project. We'll get back to you within 24 hours to schedule a complimentary consultation.",
      group: 'contact',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
