'use server';

import {
	getDynamicPaginatedBlogs,
	getBlogPostsByIds,
	getDynamicPaginatedCaseStudies,
	getCaseStudiesByIds,
} from '@/sanity/helpers/blog';
import { mapToArticle } from '@/sanity/helpers/blog-mappers';
import type { BlogArticle, SanityBlogPost } from '@/sanity/types/blog';
import type { CaseStudyItem } from '@/sanity/types';

export async function fetchBlogArticlesPage({
	page,
	category,
	blogsPerPage,
	useManualOrder,
	manualBlogRefs,
}: {
	page: number;
	category: string;
	blogsPerPage: number;
	useManualOrder: boolean;
	manualBlogRefs: { _id: string }[];
}): Promise<{ articles: BlogArticle[]; totalPages: number }> {
	if (useManualOrder) {
		const manualIds = manualBlogRefs.map((b) => b._id);
		let manualPosts: SanityBlogPost[] = [];

		if (manualIds.length > 0) {
			const resolvedBlogs = await getBlogPostsByIds(manualIds);
			manualPosts = manualIds
				.map((id) => resolvedBlogs.find((b) => b._id === id))
				.filter(Boolean) as SanityBlogPost[];
		}

		if (category !== 'All') {
			manualPosts = manualPosts.filter((b) => b.category?.title === category);
		}

		const totalPages = Math.max(Math.ceil(manualPosts.length / blogsPerPage), 1);
		const start = (page - 1) * blogsPerPage;
		return { articles: manualPosts.slice(start, start + blogsPerPage).map(mapToArticle), totalPages };
	}

	const result = await getDynamicPaginatedBlogs({
		page,
		limit: blogsPerPage,
		category: category === 'All' ? undefined : category,
	});
	const totalPages = Math.max(Math.ceil(result.totalCount / blogsPerPage), 1);
	return { articles: result.blogs.map(mapToArticle), totalPages };
}

export async function fetchCaseStudiesPage({
	page,
	limit,
	useManualOrder,
	manualCaseStudies,
}: {
	page: number;
	limit: number;
	useManualOrder: boolean;
	manualCaseStudies: Array<{ _id?: string; _ref?: string }>;
}): Promise<{ caseStudies: CaseStudyItem[]; totalPages: number }> {
	let caseStudies: CaseStudyItem[] = [];
	let totalCount = 0;

	if (useManualOrder) {
		totalCount = manualCaseStudies.length;
		const start = (page - 1) * limit;
		const slicedList = manualCaseStudies.slice(start, start + limit);
		const slicedIds = slicedList.map((c) => c._id || c._ref).filter(Boolean) as string[];

		if (slicedIds.length > 0) {
			const resolved = await getCaseStudiesByIds(slicedIds);
			caseStudies = slicedIds
				.map((id) => resolved.find((c) => c._id === id))
				.filter(Boolean) as CaseStudyItem[];
		}
	} else {
		const result = await getDynamicPaginatedCaseStudies({ page, limit });
		caseStudies = result.caseStudies as CaseStudyItem[];
		totalCount = result.totalCount;
	}

	const totalPages = Math.max(Math.ceil(totalCount / limit), 1);
	return { caseStudies, totalPages };
}
