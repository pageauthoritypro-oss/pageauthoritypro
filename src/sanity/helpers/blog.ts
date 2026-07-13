import { sanityFetch } from '@/sanity/lib/live';
import { client } from '@/sanity/lib/client';
import {
	BLOG_BY_SLUG_QUERY,
	BLOG_PATHS_QUERY,
	ALL_BLOG_CATEGORIES_QUERY,
	CASE_STUDY_BY_SLUG_QUERY,
	CASE_STUDY_PATHS_QUERY,
	PAGINATED_BLOGS_QUERY,
	TOTAL_BLOGS_COUNT_QUERY,
	RESOLVE_BLOGS_BY_IDS_QUERY,
	PAGINATED_CASE_STUDIES_QUERY,
	TOTAL_CASE_STUDIES_COUNT_QUERY,
	RESOLVE_CASE_STUDIES_BY_IDS_QUERY,
} from '@/sanity/queries/blog';
import type { SanityBlogPost } from '@/sanity/types/blog';
import type { SanityCaseStudyPost } from '@/sanity/types/case-study';
import type { CaseStudyItem } from '@/sanity/types';

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

export async function getDynamicPaginatedBlogs({
	page,
	limit,
	category,
	excludeId,
}: {
	page: number;
	limit: number;
	category?: string;
	excludeId?: string;
}): Promise<{ blogs: SanityBlogPost[]; totalCount: number }> {
	try {
		const start = (page - 1) * limit;
		const end = start + limit;
		const params: Record<string, string | number | null> = {
			start,
			end,
			category: category || null,
			excludeId: excludeId || null,
		};

		const [blogsResult, countResult] = await Promise.all([
			sanityFetch({ query: PAGINATED_BLOGS_QUERY, params }),
			sanityFetch({ query: TOTAL_BLOGS_COUNT_QUERY, params }),
		]);

		return {
			blogs: (blogsResult.data as SanityBlogPost[]) || [],
			totalCount: (countResult.data as number) || 0,
		};
	} catch (error) {
		console.error('Error fetching dynamic paginated blogs:', error);
		return { blogs: [], totalCount: 0 };
	}
}

export async function getBlogPostsByIds(ids: string[]): Promise<SanityBlogPost[]> {
	if (!ids.length) return [];
	try {
		const { data } = await sanityFetch({ query: RESOLVE_BLOGS_BY_IDS_QUERY, params: { ids } });
		return (data as SanityBlogPost[]) || [];
	} catch (error) {
		console.error('Error resolving blog posts by ids:', error);
		return [];
	}
}

export async function getDynamicPaginatedCaseStudies({
	page,
	limit,
}: {
	page: number;
	limit: number;
}): Promise<{ caseStudies: CaseStudyItem[]; totalCount: number }> {
	try {
		const start = (page - 1) * limit;
		const end = start + limit;
		const params = { start, end };

		const [caseStudiesResult, countResult] = await Promise.all([
			sanityFetch({ query: PAGINATED_CASE_STUDIES_QUERY, params }),
			sanityFetch({ query: TOTAL_CASE_STUDIES_COUNT_QUERY, params }),
		]);

		return {
			caseStudies: (caseStudiesResult.data as CaseStudyItem[]) || [],
			totalCount: (countResult.data as number) || 0,
		};
	} catch (error) {
		console.error('Error fetching dynamic paginated case studies:', error);
		return { caseStudies: [], totalCount: 0 };
	}
}

export async function getCaseStudiesByIds(ids: string[]): Promise<CaseStudyItem[]> {
	if (!ids.length) return [];
	try {
		const { data } = await sanityFetch({ query: RESOLVE_CASE_STUDIES_BY_IDS_QUERY, params: { ids } });
		return (data as CaseStudyItem[]) || [];
	} catch (error) {
		console.error('Error resolving case studies by ids:', error);
		return [];
	}
}
