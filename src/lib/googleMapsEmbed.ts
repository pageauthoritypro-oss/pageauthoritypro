const GOOGLE_MAPS_EMBED_HOST = 'www.google.com';
const GOOGLE_MAPS_EMBED_PATH_PREFIX = '/maps/embed';

/**
 * Editors paste either a full <iframe> snippet from Google Maps' "Share > Embed
 * a map" option, or just the bare src URL. Pull out the src and make sure it's
 * actually a Google Maps embed URL before we ever render it — since we build
 * our own <iframe> from this value, we never render arbitrary pasted HTML.
 */
export function extractGoogleMapsEmbedSrc(input?: string | null): string | null {
	if (!input) return null;

	const trimmed = input.trim();
	if (!trimmed) return null;

	const match = trimmed.match(/src\s*=\s*["']([^"']+)["']/i);
	const candidate = match ? match[1] : trimmed;

	try {
		const url = new URL(candidate);
		const hasEmbedPath =
			url.pathname === GOOGLE_MAPS_EMBED_PATH_PREFIX || url.pathname.startsWith(`${GOOGLE_MAPS_EMBED_PATH_PREFIX}/`);

		if (url.protocol !== 'https:' || url.hostname !== GOOGLE_MAPS_EMBED_HOST || !hasEmbedPath) {
			return null;
		}
		return url.toString();
	} catch {
		return null;
	}
}
