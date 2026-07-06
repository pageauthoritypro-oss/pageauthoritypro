import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import FeaturedArticleSection from '@/components/blog/FeaturedArticleSection';
import BlogsSection from '@/components/blog/BlogsSection';
import CtaSection from '@/components/home/CtaSection';
import SmoothScroll from '@/components/SmoothScroll';
import AnimatedSection from '@/components/AnimatedSection';
import { getPage } from '@/sanity/helpers/pages';
import { getAllBlogCategories } from '@/sanity/helpers/blog';
import { generateMetadata as genMeta } from '@/sanity/helpers/seo';
import type { HeroSectionData, CtaSectionData } from '@/sanity/types';
import type { BlogArticle } from '@/sanity/types/blog';
import type { SanityHeadingPart } from '@/sanity/types';
import { getInitials, formatDate } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPage('blogs');
	return genMeta(page?.seo);
}

export default async function BlogIndexPage() {
	const page = await getPage('blogs');
	const sections = page?.sections ?? [];

	const sanityHero = sections.find((s) => s._type === 'heroSection') as HeroSectionData | undefined;
	const sanityCtaSection = sections.find((s) => s._type === 'ctaSection') as CtaSectionData | undefined;
	const featuredSection = sections.find((s) => s._type === 'featuredArticlesCategory') as Record<string, unknown> | undefined;

	const sanityBlogs = (featuredSection?.blogs as BlogPost[] | undefined) ?? [];
	const blogsPerPage = featuredSection?.blogsPerPage as number | undefined;
	const showFilter = featuredSection?.showFilter !== false;

	const sanityCategories = featuredSection?.enabledCategories as { title: string }[] | undefined;
	const allCategories: { title: string }[] = sanityCategories?.length
		? sanityCategories
		: await getAllBlogCategories();

	const featuredPost = (featuredSection?.featuredPost ?? sanityBlogs[0]) as BlogPost | undefined;

	const article = featuredPost
		? {
				category: featuredPost.category?.title ?? 'Blog',
				title: featuredPost.title ?? '',
				description: featuredPost.excerpt ?? featuredPost.description ?? '',
				author: {
					name: featuredPost.author?.name ?? 'Author',
					initials: getInitials(featuredPost.author?.name ?? 'A'),
					date: formatDate(featuredPost.publishedAt),
				},
				href: `/blogs/${(featuredPost.slug as { current: string })?.current ?? ''}`,
		  }
		: undefined;

	const articles: BlogArticle[] = sanityBlogs.map((blog) => ({
		category: (blog.category as { title: string })?.title ?? 'Blog',
		title: blog.title ?? '',
		description: (blog.excerpt ?? blog.description ?? '') as string,
		author: {
			name: (blog.author as { name: string })?.name ?? 'Author',
			initials: getInitials((blog.author as { name: string })?.name ?? 'A'),
			date: formatDate(blog.publishedAt as string),
		},
		href: `/blogs/${(blog.slug as { current: string })?.current ?? ''}`,
	}));

	const categories = ['All', ...allCategories.map((c) => c.title)];
	const limitedArticles = blogsPerPage ? articles.slice(0, blogsPerPage) : articles;

	return (
		<main id='main-content'>
			{page?.enableSmoothScroll && <SmoothScroll />}
			{sanityHero && (
				<AnimatedSection isHero>
					<HeroSection {...sanityHero} />
				</AnimatedSection>
			)}
			{article && (
				<AnimatedSection>
					<FeaturedArticleSection
						article={article}
						heading={featuredSection?.heading as unknown as SanityHeadingPart[] | undefined}
						overlapPrevious={!!sanityHero}
					/>
				</AnimatedSection>
			)}
			<AnimatedSection>
				<BlogsSection categories={categories} articles={limitedArticles} showFilter={showFilter} />
			</AnimatedSection>
			{sanityCtaSection && (
				<AnimatedSection>
					<CtaSection {...sanityCtaSection} />
				</AnimatedSection>
			)}
		</main>
	);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BlogPost = Record<string, any>;
