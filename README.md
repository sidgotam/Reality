# RealityShow Video Website

A modern, responsive reality-show video website built with Astro 5, Tailwind CSS, and designed for Cloudflare Pages and R2.

## Features

- **Homepage** with featured show hero section, trending shows, latest episodes, and popular shows
- **Show detail pages** with seasons and episode listings
- **Episode watch pages** with video player (HLS/MP4 support via Plyr + hls.js), episode description, related episodes, and navigation
- **Search page** (placeholder for future implementation)
- **Static pages**: About, Contact, Privacy Policy, Disclaimer, DMCA
- **Custom 404 page**
- **Reusable UI components**: VideoPlayer, AdSlot, ShowCard, EpisodeCard, Button, LoadingSpinner
- **Content collections** for shows, seasons, and episodes (Markdown-based)
- **SEO optimization**: meta tags, Open Graph, canonical URLs, structured data for VideoObject
- **Advertisement slots** with placeholder components for easy AdSense integration
- **Dark theme** with orange/red accent colors (Indian reality-show vibe)
- **Fully static** – no backend required; content managed via Markdown files

## Technology Stack

- **Astro 5** with TypeScript
- **Tailwind CSS** for styling
- **Plyr** + **hls.js** for video playback
- **Astro Content Collections** for content management
- **Cloudflare Pages** for deployment
- **Cloudflare R2** for video storage (configured via environment variables)
- **Cloudflare Web Analytics** (optional, via env var)

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── BaseLayout.astro
│   │   ├── Header.astro
│   │   └── Footer.astro
│   ├── ui/
│   │   ├── VideoPlayer.astro
│   │   ├── AdSlot.astro
│   │   ├── ShowCard.astro
│   │   ├── EpisodeCard.astro
│   │   ├── Button.astro
│   │   └── LoadingSpinner.astro
│   └── sections/
│       ├── HeroSection.astro
│       ├── TrendingShows.astro
│       ├── LatestEpisodes.astro
│       └── PopularShows.astro
├── content/
│   ├── shows/
│   │   ├── biggboss.md
│   │   ├── roadies.md
│   │   ├── splitsvilla.md
│   │   └── indianidol.md
│   ├── seasons/
│   │   ├── biggboss-season-18.md
│   │   ├── roadies-season-19.md
│   │   └── splitsvilla-season-15.md
│   └── episodes/
│       ├── biggboss-season-18-episode-1.md
│       ├── biggboss-season-18-episode-2.md
│       ├── biggboss-season-18-episode-3.md
│       └── roadies-season-19-episode-1.md
├── layouts/
│   └── Layout.astro
├── pages/
│   ├── index.astro
│   ├── shows/
│   │   ├── [slug].astro
│   │   └── [slug]/[seasonSlug].astro
│   ├── watch/
│   │   └── [slug].astro
│   ├── search.astro
│   ├── about.astro
│   ├── contact.astro
│   ├── privacy.astro
│   ├── disclaimer.astro
│   ├── dmca.astro
│   └── 404.astro
├── styles/
│   └── globals.css
└── utils/
    ├── videoHelpers.ts
    └── adHelpers.ts
```

## Getting Started

### Prerequisites

- Node.js >=22.22.0
- npm or yarn

### Installation

1. Clone the repository (or copy the files)
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Building for Production

```bash
npm run build
```

The output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Cloudflare Pages

1. Build the project: `npm run build`
2. Install [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) if you haven't already
3. Publish to Cloudflare Pages:

```bash
wrangler pages publish dist --project-name=<your-project-name>
```

### Environment Variables

Create a `.env` file in the root directory (or set them in your Cloudflare Pages dashboard):

```
# R2 Public Domain (for video and poster URLs)
R2_PUBLIC_DOMAIN=https://your-custom-domain.com

# Cloudflare Web Analytics (optional)
CLOUDFLARE_ANALYTICS_SITE_TOKEN=your_site_token_here

# Site URL (for canonical URLs and sitemap)
SITE_URL=https://your-site.com
```

## Adding New Content

Content is managed via Markdown files in `src/content/`.

### Adding a Show

Create a file: `src/content/shows/<show-slug>.md`

```markdown
---
name: "Show Name"
slug: "show-slug"
description: "Show description."
poster: "https://example.com/poster.jpg"
posterAlt: "Poster alt text"
seasons: 1
trending: false
featured: false
seasonSlugs: ["season-1"]
---
```

### Adding a Season

Create a file: `src/content/seasons/<show-slug>-season-<number>.md`

```markdown
---
showName: "Show Name"
showSlug: "show-slug"
seasonNumber: 1
seasonSlug: "season-1"
description: "Season description."
poster: "https://example.com/season-poster.jpg"
---
```

### Adding an Episode

Create a file: `src/content/episodes/<show-slug>-season-<number>-episode-<number>.md`

```markdown
---
showName: "Show Name"
showSlug: "show-slug"
seasonNumber: 1
seasonSlug: "season-1"
episodeNumber: 1
title: "Episode Title"
description: "Episode description."
releaseDate: "2024-10-06"
poster: "https://example.com/episode-poster.jpg"
posterAlt: "Episode poster alt"
videoType: "hls"
videoUrl: "shows/show-slug/season-1/episode-1.m3u8"
thumbnail: "https://example.com/episode-thumbnail.jpg"
featured: true
duration: 60
---
```

## Video Player Notes

- The video player supports HLS (`.m3u8`) and MP4 sources
- Video URLs are resolved via `utils/videoHelpers.ts` using the `R2_PUBLIC_DOMAIN` environment variable
- In development, if `R2_PUBLIC_DOMAIN` is not set, URLs are served from `/videos/` (you can place test files in `public/videos/`)
- The player lazy-loads Plyr and HLS.js only when visiting an episode page
- Ad slots above and below the video player are responsive and can be replaced with actual ad code later

## Advertisement Slots

The following ad slot positions are available (see `src/components/ui/AdSlot.astro`):

- Top banner (`top-banner`)
- Above video player (`above-player`)
- Below video player (`below-player`)
- Between episode lists (`between-lists`)
- Sidebar (`sidebar` – visible on desktop >=1024px)

Each slot has a placeholder label. To integrate AdSense or another ad network, replace the inner markup of the slot with your ad unit code while keeping the wrapper for layout and analytics.

## SEO & Performance

- Unique titles and meta descriptions for all pages
- Open Graph tags for social sharing
- Canonical URLs to prevent duplicate content
- Structured data (JSON-LD) for VideoObject on episode pages (when video sources are available)
- Sitemap generated automatically (`/sitemap-index.xml`)
- Robots.txt (`/robots.txt`)
- Lazy-loaded images
- Accessible navigation and focus management
- Minimal client-side JavaScript (only video player loads external libraries)

## Troubleshooting

- **Content collections not loading**: Ensure you have running `npm run dev` or `npm run build` after adding/editing Markdown files. The content config uses glob loaders.
- **Video not playing**: Check that the video URL is correctly resolved (see `utils/videoHelpers.ts`). Verify that the HLS.js library loads correctly in the browser console.
- **Build errors related to content collections**: Make sure you are using the correct loader import (`import { glob } from 'astro:content'` for Astro 4.x, or `import { glob } from 'astro:loaders'` for Astro 3.x). This project uses Astro 5, so `import { glob } from 'astro:content'` is correct.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Inspired by Indian reality shows like Bigg Boss, Roadies, Splitsvilla, and Indian Idol
- Built with Astro 5 and Tailwind CSS
- Video player powered by Plyr and hls.js
- Deployed to Cloudflare Pages with R2 storage