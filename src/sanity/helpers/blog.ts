import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import {
	BLOG_BY_SLUG_QUERY,
	BLOG_PATHS_QUERY,
	ALL_BLOG_CATEGORIES_QUERY,
	CASE_STUDY_BY_SLUG_QUERY,
	CASE_STUDY_PATHS_QUERY,
} from '@/sanity/queries/blog';
import type { SanityBlogPost } from '@/sanity/types/blog';
import type { SanityCaseStudyPost } from '@/sanity/types/case-study';

export async function getBlogBySlug(slug: string): Promise<SanityBlogPost | null> {
	try {
		const { data } = await sanityFetch({ query: BLOG_BY_SLUG_QUERY, params: { slug } });
		return data as SanityBlogPost | null;
	} catch (error) {
		console.error('Error fetching blog by slug:', error);
		return null;
	}
}

export async function getAllBlogCategories(): Promise<{ title: string }[]> {
	try {
		const { data } = await sanityFetch({ query: ALL_BLOG_CATEGORIES_QUERY });
		return (data as { title: string }[]) || [];
	} catch (error) {
		console.error('Error fetching blog categories:', error);
		return [];
	}
}

export async function getBlogPaths(): Promise<string[]> {
	try {
		const data = await client.fetch<string[]>(BLOG_PATHS_QUERY);
		return data || [];
	} catch (error) {
		console.error('Error fetching blog paths:', error);
		return [];
	}
}

export async function getCaseStudyBySlug(slug: string): Promise<SanityCaseStudyPost | null> {
	try {
		const { data } = await sanityFetch({ query: CASE_STUDY_BY_SLUG_QUERY, params: { slug } });
		return data as SanityCaseStudyPost | null;
	} catch (error) {
		console.error('Error fetching case study by slug:', error);
		return null;
	}
}

export async function getCaseStudyPaths(): Promise<string[]> {
	try {
		const data = await client.fetch<string[]>(CASE_STUDY_PATHS_QUERY);
		return data || [];
	} catch (error) {
		console.error('Error fetching case study paths:', error);
		return [];
	}
}
