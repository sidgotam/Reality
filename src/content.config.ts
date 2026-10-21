import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const showSchema = z.object({
	name: z.string(),
	slug: z.string(),
	description: z.string(),
	poster: z.string(),
	posterAlt: z.string().optional(),
	seasons: z.number().default(1),
	trending: z.boolean().default(false),
	featured: z.boolean().default(false),
	seasonSlugs: z.array(z.string()).optional(),
});

const seasonSchema = z.object({
	showName: z.string(),
	showSlug: z.string(),
	seasonNumber: z.number(),
	seasonSlug: z.string(),
	description: z.string().optional(),
	poster: z.string().optional(),
});

const episodeSchema = z.object({
	showName: z.string(),
	showSlug: z.string(),
	seasonNumber: z.number(),
	seasonSlug: z.string(),
	episodeNumber: z.number(),
	title: z.string(),
	description: z.string(),
	releaseDate: z.coerce.date(),
	poster: z.string(),
	posterAlt: z.string().optional(),
	videoType: z.enum(['hls', 'mp4', 'embed']).default('hls'),
	videoUrl: z.string(),
	thumbnail: z.string().optional(),
	featured: z.boolean().default(false),
	duration: z.number().optional(),
	hideStructuredData: z.boolean().default(false),
});

export const collections = {
	shows: defineCollection({
		loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/shows' }),
		schema: showSchema,
	}),
	seasons: defineCollection({
		loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/seasons' }),
		schema: seasonSchema,
	}),
	episodes: defineCollection({
		loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/episodes' }),
		schema: episodeSchema,
	}),
};