// Video source helpers for Cloudflare R2 and authorized external embeds.
// Never hardcode real video URLs or secret keys — resolve them at runtime
// from environment variables / content frontmatter.

export type VideoType = 'hls' | 'mp4' | 'embed';

export interface ResolvedVideo {
	type: VideoType;
	url: string;
	poster?: string;
}

export interface VideoSource {
	type: VideoType;
	url: string;
}

/**
 * Check if a URL or video type represents an embedded iframe source (e.g. ok.ru, YouTube, Vimeo).
 */
export function isEmbedSource(type: VideoType, url: string): boolean {
	if (type === 'embed') return true;
	if (!url) return false;
	const lower = url.toLowerCase();
	return (
		lower.includes('ok.ru/') ||
		lower.includes('/videoembed/') ||
		lower.includes('youtube.com/embed/') ||
		lower.includes('player.vimeo.com/') ||
		lower.includes('dailymotion.com/embed/')
	);
}

/**
 * Normalize an external embed URL (e.g. converting ok.ru video URLs to videoembed).
 */
export function normalizeEmbedUrl(url: string): string {
	if (!url) return '';
	let normalized = url.trim();
	if (normalized.startsWith('//')) {
		normalized = `https:${normalized}`;
	}
	// Convert ok.ru/video/<id> to ok.ru/videoembed/<id>?nochat=1
	const okRuVideoMatch = normalized.match(/ok\.ru\/video\/(\d+)/i);
	if (okRuVideoMatch) {
		return `https://ok.ru/videoembed/${okRuVideoMatch[1]}?nochat=1`;
	}
	// Ensure ok.ru/videoembed/<id> has nochat=1
	if (normalized.includes('ok.ru/videoembed/') && !normalized.includes('nochat=')) {
		const separator = normalized.includes('?') ? '&' : '?';
		return `${normalized}${separator}nochat=1`;
	}
	return normalized;
}

/**
 * Resolve a raw video URL from content frontmatter into a final URL.
 *
 * Rules:
 * - Protocol-relative URLs (starting with //) are prefixed with https:
 * - Absolute URLs (http/https) are returned as-is (with embed normalization)
 * - Relative paths (starting with /) are treated as local public assets.
 * - Everything else is treated as an R2 object key and is rewritten against
 *   the configured R2 public domain (R2_PUBLIC_DOMAIN env var).
 */
export function resolveVideoUrl(raw: string | undefined | null): string {
	if (!raw) return '';
	const trimmed = raw.trim();
	if (trimmed.startsWith('//')) {
		return normalizeEmbedUrl(`https:${trimmed}`);
	}
	if (/^https?:\/\//i.test(trimmed)) {
		return normalizeEmbedUrl(trimmed);
	}
	if (trimmed.startsWith('/')) return trimmed;

	const domain = (import.meta.env.R2_PUBLIC_DOMAIN as string | undefined)?.replace(/\/+$/, '');
	if (domain) {
		return `${domain}/${trimmed.replace(/^\/+/, '')}`;
	}
	// Fallback: return the key as a path so the dev server can serve it.
	return `/videos/${trimmed.replace(/^\/+/, '')}`;
}

/**
 * Build a list of video sources for the player from an episode's frontmatter.
 * Returns an empty array when no usable source is configured.
 */
export function buildVideoSources(videoType: VideoType, videoUrl: string | undefined | null): VideoSource[] {
	if (!videoUrl) return [];
	const resolved = resolveVideoUrl(videoUrl);
	if (!resolved) return [];
	const effectiveType = isEmbedSource(videoType, resolved) ? 'embed' : videoType;
	return [{ type: effectiveType, url: resolved }];
}

/**
 * Generate a slug-friendly string from arbitrary text.
 */
export function slugify(text: string): string {
	return text
		.toString()
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/**
 * Build a watch-page path slug from show/season/episode identifiers.
 * e.g. /watch/biggboss-season-18-episode-1
 */
export function buildWatchSlug(showSlug: string, seasonNumber: number, episodeNumber: number): string {
	return `${showSlug}-season-${seasonNumber}-episode-${episodeNumber}`;
}

/**
 * Build a season collection slug.
 * e.g. /shows/biggboss/season-18
 */
export function buildSeasonSlug(seasonNumber: number): string {
	return `season-${seasonNumber}`;
}

/**
 * Format a Date object into a readable, stable string for SEO/meta.
 */
export function formatDate(date: Date): string {
	return new Date(date).toLocaleDateString('en-IN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
}

/**
 * Format a Date object into an ISO string suitable for structured data.
 */
export function formatISODate(date: Date): string {
	return new Date(date).toISOString();
}

/**
 * Build a canonical absolute URL for a given path.
 */
export function canonicalUrl(path: string): string {
	const base = (import.meta.env.SITE_URL as string | undefined) || 'https://realityshows.example.com';
	return `${base.replace(/\/+$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Build a poster URL from a relative path, resolving against the R2 domain.
 */
export function resolvePoster(raw: string | undefined | null): string {
	if (!raw) return '';
	if (/^https?:\/\//i.test(raw)) return raw;
	if (raw.startsWith('/')) return raw;
	return resolveVideoUrl(raw);
}