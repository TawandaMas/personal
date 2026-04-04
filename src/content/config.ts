import { defineCollection, z } from 'astro:content';

const gamesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tag: z.string(),
    order: z.number().optional(),
  }),
});

const thoughtsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    year: z.string(),
    description: z.string(),
    url: z.string(),
    logo: z.string().optional(),
    status: z.enum(['Live', 'WIP', 'In Progress', 'Archived']),
    order: z.number().optional(),
  }),
});

const booksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    year: z.number(),
    genre: z.string(),
    status: z.enum(['reading', 'read', 'queue']),
    rating: z.number().optional(),
    note: z.string().optional(),
    order: z.number().optional(),
  }),
});

const newsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    edition: z.string().optional(),
    summary: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = {
  'games': gamesCollection,
  'thoughts': thoughtsCollection,
  'projects': projectsCollection,
  'books': booksCollection,
  'news': newsCollection,
};
