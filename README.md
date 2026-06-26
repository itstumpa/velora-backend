# Velora Interiors — Sanity CMS Backend

Headless content management backend for the Velora Interiors website, powered by **Sanity v6**. Provides structured content delivery to the Next.js frontend via GROQ queries and a hosted Sanity Studio for editors.

**Deployed Studio:** [https://velora-interiors-cms.sanity.studio/](https://velora-interiors-cms.sanity.studio/)

## Tech Stack

| Technology      | Purpose                              |
| --------------- | ------------------------------------ |
| **Sanity v6.2** | Headless CMS platform                |
| **TypeScript**  | Type-safe schema definitions         |
| **Sanity CLI**  | Schema deployment, Studio management |

## Project Details

| Property         | Value             |
| ---------------- | ----------------- |
| **Project ID**   | `is280nl5`        |
| **Dataset**      | `production`      |
| **Schema Types** | 11 document types |

## Schema Types

All content types are defined in `schemaTypes/` and deployed to Sanity:

| Type           | Purpose                                     |
| -------------- | ------------------------------------------- |
| `hero`         | Hero banner heading, subtitle, CTA, image   |
| `about`        | Studio story, philosophy (Portable Text)    |
| `stat`         | Animated stats with label and value         |
| `service`      | Service offerings with icon, title, points  |
| `project`      | Portfolio projects with category, images    |
| `testimonial`  | Client testimonials with name, role, avatar |
| `beforeAfter`  | Before/after image comparisons              |
| `processStep`  | Design process timeline steps               |
| `galleryImage` | Inspiration gallery with category filtering |
| `siteSettings` | Global site configuration (SEO, contact)    |

## Managing Content

Content is managed through the [Sanity Studio](https://velora-interiors-cms.sanity.studio/):

1. **Log in** with your Sanity account credentials
2. **Navigate** between document types using the left sidebar
3. **Create / Edit** documents with the structured field forms
4. **Publish** changes — the frontend picks up updates on next build

For real-time previews, run the frontend dev server alongside Studio.

## Getting Started

```bash
# Install dependencies
npm install

# Start Sanity Studio (local development)
npx sanity dev

# Deploy schema changes (after editing schemaTypes/)
npx sanity schema deploy

# Deploy Studio to Sanity's infrastructure
npx sanity deploy

# Query data (test GROQ queries)
npx sanity query '*[_type == "hero"]'

# Manage datasets
npx sanity dataset list
```

## Studio URL

The production Studio is hosted at:
**https://velora-interiors-cms.sanity.studio/**

During development, run `npx sanity dev` to start a local instance.

## Deployment

Schema and Studio are deployed via Sanity's managed infrastructure:

- **Schema** — Deployed with `npx sanity schema deploy` (or via MCP tools)
- **Studio** — Deployed to `sanity.studio` with `npx sanity deploy`

No separate hosting configuration is needed.
