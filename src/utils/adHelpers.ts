// Advertisement slot helpers.
// These are placeholder components with clear labels. They are designed so
// that AdSense or another compliant ad network can be dropped in later
// without rewriting the layout — just swap the slot body.

export type AdPlacement =
	| 'top-banner'
	| 'above-player'
	| 'below-player'
	| 'between-lists'
	| 'sidebar';

export interface AdSlotProps {
	/** Stable id used for analytics + ad-network mapping. */
	id: string;
	/** Human-readable label shown in the placeholder. */
	label: string;
	/** Where this slot lives (for analytics). */
	placement: AdPlacement;
	/** Optional width hint for responsive containers. */
	width?: string;
	/** Optional extra className. */
	className?: string;
	/** When true, only render on desktop (>= 1024px). */
	desktopOnly?: boolean;
	/** When true, only render on mobile. */
	mobileOnly?: boolean;
	/** When true, render a thin placeholder strip instead of a box. */
	compact?: boolean;
}

/**
 * Determine whether an ad slot should render at the current viewport width.
 * Astro components are server-rendered, so we accept explicit flags from
 * the page and let the client-side player handle responsive behaviour.
 */
export function shouldRenderAd(props: AdSlotProps, isDesktop: boolean, isMobile: boolean): boolean {
	if (props.desktopOnly && !isDesktop) return false;
	if (props.mobileOnly && !isMobile) return false;
	return true;
}

/**
 * Default ad unit sizes per placement, used to size placeholder boxes.
 */
export function defaultSizeForPlacement(placement: AdPlacement): { w: string; h: string } {
	switch (placement) {
		case 'top-banner':
			return { w: 'max-w-7xl', h: 'h-24' };
		case 'above-player':
		case 'below-player':
			return { w: 'w-full', h: 'h-20' };
		case 'between-lists':
			return { w: 'w-full', h: 'h-28' };
		case 'sidebar':
			return { w: 'w-full', h: 'h-28' };
	}
}