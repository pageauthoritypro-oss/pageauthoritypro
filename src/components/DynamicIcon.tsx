import { createElement, type ComponentType, type SVGProps } from 'react';
import dynamic from 'next/dynamic';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { stegaClean } from 'next-sanity';
import { CUSTOM_ICONS } from '@/components/icons';
import Image from 'next/image';
import type { SanityLogoItem } from '@/sanity/types';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps extends Omit<SVGProps<SVGSVGElement>, 'name' | 'width' | 'height'> {
	icon: string | SanityLogoItem;
	size?: number;
}

// Convert CamelCase/PascalCase or lowercase to kebab-case for Lucide dynamicIconImports lookup
function toKebabCase(str: string): string {
	return str
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
		.toLowerCase();
}

// Predefined map to translate legacy/CMS values to standard Lucide names
const ICON_MAPPING: Record<string, string> = {
	tick: 'check',
	cross: 'x',
	cancel: 'x',
};

// Cache dynamically loaded icon components to prevent unmounting/remounting on re-render
const dynamicCache: Record<string, ComponentType<LucideProps>> = {};

function getDynamicIcon(name: keyof typeof dynamicIconImports) {
	if (!dynamicCache[name]) {
		dynamicCache[name] = dynamic(dynamicIconImports[name]);
	}
	return dynamicCache[name];
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

	// 2. Try mapping CMS names to standard Lucide icons, then convert to kebab-case
	let normalizedIcon = icon;
	const mapped = ICON_MAPPING[normalizedIcon.toLowerCase()];
	if (mapped) {
		normalizedIcon = mapped;
	}

	const kebabName = toKebabCase(normalizedIcon);

	if (kebabName in dynamicIconImports) {
		const iconComponent = getDynamicIcon(kebabName as keyof typeof dynamicIconImports);
		return createElement(iconComponent, { size: lucideSize, className, ...props });
	}

	return null;
}
