import type { MetadataRoute } from 'next';
import { client } from '@/sanity/lib/client';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pageauthoritypro.com';

const NON_ROUTE_PAGE_SLUGS = ['blog-details', 'case-study-details'];

const PRIORITY_BY_SLUG: Record<string, number> = {
	'/': 1.0,
	seo: 0.9,
	'google-ads': 0.9,
	'case-studies': 0.8,
	blogs: 0.8,
	process: 0.7,
	pricing: 0.7,
	about: 0.6,
	contact: 0.6,
};

const CHANGE_FREQUENCY_BY_SLUG: Record<string, MetadataRoute.Sitemap[number]['changeFrequency']> = {
	'case-studies': 'weekly',
	blogs: 'daily',
	'/': 'weekly',
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [pages, blogs, caseStudies] = await Promise.all([
		client.fetch<Array<{ slug: string; updatedAt: string }>>(
			`*[_type == "pages" && defined(slug.current) && !(_id in path("drafts.**")) && !(slug.current in $excludedSlugs)] {
				"slug": slug.current,
				"updatedAt": _updatedAt
			}`,
			{ excludedSlugs: NON_ROUTE_PAGE_SLUGS },
		),
		client.fetch<Array<{ slug: string; updatedAt: string }>>(
			`*[_type == "blog" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
				"slug": slug.current,
				"updatedAt": _updatedAt
			}`
		),
		client.fetch<Array<{ slug: string; updatedAt: string }>>(
			`*[_type == "caseStudy" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
				"slug": slug.current,
				"updatedAt": _updatedAt
			}`
		),
	]);

	const pageEntries: MetadataRoute.Sitemap = pages.map(({ slug, updatedAt }) => ({
		url: slug === '/' ? `${BASE_URL}/` : `${BASE_URL}/${slug}`,
		lastModified: new Date(updatedAt),
		changeFrequency: CHANGE_FREQUENCY_BY_SLUG[slug] ?? 'monthly',
		priority: PRIORITY_BY_SLUG[slug] ?? 0.6,
	}));

	const blogEntries: MetadataRoute.Sitemap = blogs.map(({ slug, updatedAt }) => ({
		url: `${BASE_URL}/blogs/${slug}`,
		lastModified: new Date(updatedAt),
		changeFrequency: 'monthly',
		priority: 0.7,
	}));

	const caseStudyEntries: MetadataRoute.Sitemap = caseStudies.map(({ slug, updatedAt }) => ({
		url: `${BASE_URL}/case-studies/${slug}`,
		lastModified: new Date(updatedAt),
		changeFrequency: 'monthly',
		priority: 0.7,
	}));

	return [...pageEntries, ...blogEntries, ...caseStudyEntries];
}
