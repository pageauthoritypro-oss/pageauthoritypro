import type { SanityImageWithAlt } from '@/sanity/types';

/**
 * Returns the CDN URL for a Sanity image, or null if unavailable.
 * Centralises URL access so any future transform params live here.
 */
export function sanityImageUrl(image: SanityImageWithAlt | undefined | null): string | null {
	if (!image?.url) return null;
	return image.url;
}
