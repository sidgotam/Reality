// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL || 'https://realityshows.example.com',
	output: 'static',
	adapter: undefined,
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		sitemap({
			// Include all static routes in the sitemap.
			filter: (page) => !page.includes('/404'),
		}),
	],
	security: {
		allowUnsafeHTML: false,
	},
	// Enable experimental features for content collections & prerendering
	experimental: {
		// Keep prerendering explicit so the build is fully static by default.
	},
	vite: {
		// Make sure hls.js is tree-shaken properly.
		build: {
			rollupOptions: {
				external: [],
			},
		},
	},
});