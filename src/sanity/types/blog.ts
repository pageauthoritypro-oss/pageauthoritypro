import type { PortableTextBlock } from '@portabletext/react';
import type { SanityHeadingPart } from './index';
import type { AdvancedSeoSettings } from './advanced';
export type { SanityHeadingPart };

export interface BlogAuthor {
	name: string;
	role?: string;
	bio?: string;
	avatarUrl?: string;
}

export interface BlogStrategyCard {
	number: string;
	title: string;
	description?: string;
	checkpoints?: string[];
}

export interface BlogPost {
	slug?: string;
	heading: SanityHeadingPart[];
	description?: string;
	publishedAt?: string;
	category?: string;
	featuredImageUrl?: string;
	author?: BlogAuthor;
	tableOfContents?: string[];
	ctaWidget?: {
		heading?: SanityHeadingPart[];
		description?: string;
		primaryCta?: { text: string; url: string };
		secondaryCta?: { text: string; url: string };
	};
}

export interface SanityBlogAuthor {
	_id: string;
	name: string;
	role?: string;
	avatarUrl?: string;
	bio?: string;
}

export interface BookCallCardData {
	heading: string;
	description?: string;
	icon?: { url?: string; alt?: string; iconSvg?: string };
	ctas?: Array<{ cta_text: string; url: string; variant?: string; target?: string }>;
}

export interface SanityBlogPost {
	_id: string;
	title: SanityHeadingPart[];
	titleText: string;
	backLabel?: string;
	slug: string;
	description?: string;
	publishedAt?: string;
	featuredImageUrl?: string;
	body?: PortableTextBlock[];
	category?: { _id: string; title: string; slug: string };
	author?: SanityBlogAuthor;
	hideSidebar?: boolean;
	aboutAuthorTitle?: string;
	showViewAllBlogs?: boolean;
	authorBottomText?: string;
	bookCallCard?: BookCallCardData;
	sharePost?: { heading: string; platforms?: string[] };
	seo?: AdvancedSeoSettings;
}

export interface BlogArticle {
	category: string;
	title: string;
	description: string;
	author: { name: string; initials: string; date: string };
	href: string;
}
