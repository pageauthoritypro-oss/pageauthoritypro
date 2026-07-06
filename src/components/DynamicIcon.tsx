import type { SVGProps } from 'react';
import * as LucideIcons from 'lucide-react';
import { stegaClean } from 'next-sanity';
import { CUSTOM_ICONS } from '@/components/icons';
import Image from 'next/image';
import type { SanityLogoItem } from '@/sanity/types';

interface DynamicIconProps extends Omit<SVGProps<SVGSVGElement>, 'name' | 'width' | 'height'> {
	icon: string | SanityLogoItem;
	size?: number;
}

// Convert "kebab-case" or "lowercase" to "PascalCase" for Lucide lookup
function toPascalCase(str: string): string {
	return str
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('');
}

export default function DynamicIcon({ icon, size, className, ...props }: DynamicIconProps) {
	// If icon is a Sanity image/SVG object
	if (typeof icon === 'object' && icon !== null) {
		if (icon.iconSvg) {
			let cleanedSvg = icon.iconSvg.replace(/class="[^"]*"/i, '');
			// Prevent transparent bounding boxes (fill="none") from inheriting stroke styles
			cleanedSvg = cleanedSvg.replace(/<path([^>]*fill="none"[^>]*)(?!\bstroke=)/gi, '<path$1 stroke="none"');
			if (size) {
				cleanedSvg = cleanedSvg
					.replace(/width="[^"]*"/i, '')
					.replace(/height="[^"]*"/i, '')
					.replace(/<svg/i, `<svg class="${className || ''}" width="${size}" height="${size}"`);
			} else {
				cleanedSvg = cleanedSvg.replace(/<svg/i, `<svg class="${className || ''}"`);
			} 
			return (
				<span
					style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
					dangerouslySetInnerHTML={{ __html: cleanedSvg }}
				/>
			);
		}
		if (icon.url) {
			if (size) {
				return <Image src={icon.url} alt={icon.alt || ''} width={size} height={size} className={className} />;
			}
			return <img src={icon.url} alt={icon.alt || ''} className={className} />;
		}
		return null;
	}

	if (typeof icon !== 'string') return null;

	const lucideSize = size ?? 24;

	// Strip stega metadata the Presentation Tool encodes into strings in draft mode —
	// otherwise the icon name never matches a lookup key and the icon silently disappears.
	icon = stegaClean(icon);

	// 1. Check custom SVG icons first
	const CustomIcon = CUSTOM_ICONS[icon];
	if (CustomIcon) {
		return <CustomIcon width={lucideSize} height={lucideSize} className={className} {...props} />;
	}

	// 2. Try exact Lucide match (already PascalCase)
	// 3. Try converting lowercase/kebab-case → PascalCase
	const lucideName = (LucideIcons[icon as keyof typeof LucideIcons] ? icon : toPascalCase(icon)) as keyof typeof LucideIcons;

	const LucideIcon = LucideIcons[lucideName] as LucideIcons.LucideIcon | undefined;
	if (LucideIcon) {
		return <LucideIcon size={lucideSize} className={className} {...props} />;
	}

	return null;
}
