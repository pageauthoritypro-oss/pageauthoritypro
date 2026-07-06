import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { SanityHeaderSection, SanityHeadingPart } from '@/sanity/types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function extractHeader(header?: SanityHeaderSection) {
	return {
		heading: header?.heading,
		description: header?.description,
		ctaButtons: header?.cta_btn,
		ctaButtonPosition: header?.cta_button_position,
	};
}

export function getHeadingText(titleVal: string | SanityHeadingPart | SanityHeadingPart[] | undefined): string | string[] | null {
	if (!titleVal) return null;
	if (typeof titleVal === 'string') {
		return titleVal;
	}
	if (Array.isArray(titleVal)) {
		return titleVal.map((part) => part.text || '');
	}
	if (typeof titleVal === 'object') {
		return titleVal.text || null;
	}
	return null;
}

export function getInitials(name: string): string {
	return name
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);
}

export function formatDate(date?: string): string {
	if (!date) return '';
	return new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
