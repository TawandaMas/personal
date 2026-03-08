import { defineCollection, z } from 'astro:content';

const gamesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tag: z.string(),
    order: z.number().optional(),
    slug: z.string().optional(),
  }),
});

export const collections = {
  'games': gamesCollection,
};
