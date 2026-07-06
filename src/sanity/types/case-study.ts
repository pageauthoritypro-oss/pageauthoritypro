import type { PortableTextBlock } from '@portabletext/react';
import type { SanityHeadingPart } from './index';
import type { BlogAuthor, BookCallCardData, SanityBlogAuthor } from './blog';
import type { AdvancedSeoSettings } from './advanced';

export interface CaseStudyBeforeStat {
	iconType: 'rankings' | 'traffic' | 'leads' | string;
	title: string;
	description?: string;
}

export interface CaseStudyResult {
	value: string;
	label: string;
}

export interface CaseStudyTestimonial {
	stars?: number;
	quote: string;
	author?: string;
}

export interface CaseStudyPost {
	slug?: string;
	heading: SanityHeadingPart[];
	description?: string;
	location?: string;
	area?: string;
	publishedAt?: string;
	featuredImageUrl?: string;
	author?: BlogAuthor;
	tableOfContents?: string[];
	ctaWidget?: {
		heading?: SanityHeadingPart[];
		description?: string;
		primaryCta?: { text: string; url: string };
		secondaryCta?: { text: string; url: string };
	};
	beforeStats?: CaseStudyBeforeStat[];
	strategyBullets?: string[];
	results?: CaseStudyResult[];
	closingText?: string;
	testimonial?: CaseStudyTestimonial;
}

export interface SanityCaseStudyMetric {
	_key?: string;
	value: string;
	label?: string;
	isHighlighted?: boolean;
	variant?: 'brand' | 'secondary' | 'destructive' | 'transparent';
}

export interface SanityCaseStudyPost {
	_id: string;
	title: SanityHeadingPart[];
	titleText: string;
	backLabel?: string;
	slug: string;
	description?: string;
	publishedAt?: string;
	featuredImageUrl?: string;
	body?: PortableTextBlock[];
	location?: { _id: string; name: string; area: string };
	tags?: Array<{ _id: string; title: string; slug: string }>;
	caseStudyMetrics?: SanityCaseStudyMetric[];
	author?: SanityBlogAuthor;
	hideSidebar?: boolean;
	aboutAuthorTitle?: string;
	showViewAllBlogs?: boolean;
	authorBottomText?: string;
	bookCallCard?: BookCallCardData;
	sharePost?: { heading: string; platforms?: string[] };
	seo?: AdvancedSeoSettings;
}
