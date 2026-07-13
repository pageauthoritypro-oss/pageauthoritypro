'use client';

import { useRef, useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import SectionContainer from '@/components/layout/SectionContainer';
import ArticleCard from './ArticleCard';
import ArticleCardSkeleton from './ArticleCardSkeleton';
import FeaturedArticleSection from './FeaturedArticleSection';
import ListingPagination from '@/components/ui/listing-pagination';
import { fetchBlogArticlesPage } from '@/sanity/actions/listing-actions';
import type { BlogArticle } from '@/sanity/types/blog';
import type { SanityHeadingPart } from '@/sanity/types';

interface Props {
	categories: string[];
	initialArticles: BlogArticle[];
	initialTotalPages: number;
	blogsPerPage: number;
	useManualOrder: boolean;
	manualBlogRefs: { _id: string }[];
	featuredArticle?: BlogArticle;
	featuredHeading?: SanityHeadingPart[];
	showFilter?: boolean;
	overlapPrevious?: boolean;
}

function GridSkeleton({ count }: { count: number }) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
			{Array.from({ length: count }, (_, i) => (
				<ArticleCardSkeleton key={i} />
			))}
		</div>
	);
}

export default function BlogsSection({
	categories,
	initialArticles,
	initialTotalPages,
	blogsPerPage,
	useManualOrder,
	manualBlogRefs,
	featuredArticle,
	featuredHeading,
	showFilter = true,
	overlapPrevious = false,
}: Props) {
	const [page, setPage] = useState(1);
	const [category, setCategory] = useState('All');
	const [articles, setArticles] = useState(initialArticles);
	const [totalPages, setTotalPages] = useState(initialTotalPages);
	const [isPending, startTransition] = useTransition();
	const requestId = useRef(0);
	const cache = useRef(new Map<string, { articles: BlogArticle[]; totalPages: number }>());
	// Seed the cache with the page the server already rendered so re-selecting
	// "All"/page 1 doesn't re-fetch what we already have.
	if (cache.current.size === 0) {
		cache.current.set('1-All', { articles: initialArticles, totalPages: initialTotalPages });
	}

	function goTo(nextPage: number, nextCategory: string) {
		if (isPending || (nextPage === page && nextCategory === category)) return;
		const key = `${nextPage}-${nextCategory}`;
		const cached = cache.current.get(key);
		if (cached) {
			setArticles(cached.articles);
			setTotalPages(cached.totalPages);
			setPage(nextPage);
			setCategory(nextCategory);
			return;
		}
		const thisRequest = ++requestId.current;
		startTransition(async () => {
			const result = await fetchBlogArticlesPage({
				page: nextPage,
				category: nextCategory,
				blogsPerPage,
				useManualOrder,
				manualBlogRefs,
			});
			if (requestId.current !== thisRequest) return;
			cache.current.set(key, result);
			setArticles(result.articles);
			setTotalPages(result.totalPages);
			setPage(nextPage);
			setCategory(nextCategory);
		});
	}

	return (
		<>
			{featuredArticle && (
				<FeaturedArticleSection
					article={featuredArticle}
					heading={featuredHeading}
					overlapPrevious={overlapPrevious}
				/>
			)}
			<section id='blog-list' className='bg-background pt-10 pb-16 lg:pb-24 scroll-mt-24'>
				<SectionContainer className='flex flex-col gap-8'>
					{showFilter && (
						<div className='relative z-20 flex items-center gap-2 rounded-lg overflow-x-auto scrollbar-hide bg-[#08101C] p-3 -m-3'>
							{categories.map((cat) => (
								<button
									key={cat}
									type='button'
									onClick={() => goTo(1, cat)}
									aria-current={category === cat ? 'page' : undefined}
									className={cn(
										'relative z-10 h-auto shrink-0 rounded-full font-heading font-bold text-[14px] leading-4 px-5 py-2 transition-[background-color,box-shadow,color] inline-flex items-center justify-center',
										category === cat
											? 'bg-[#C7933D] text-[#08101C] hover:bg-[#C7933D]'
											: 'text-[#555555] border border-white/10 hover:bg-white/10 hover:text-white hover:shadow-[0_0_24px_5px_rgba(255,255,255,0.28),0_0_8px_2px_rgba(255,255,255,0.2)]',
									)}>
									{cat}
								</button>
							))}
						</div>
					)}

					{isPending ? (
						<GridSkeleton count={Math.min(blogsPerPage, 9)} />
					) : articles.length > 0 ? (
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
							{articles.map((article, i) => (
								<ArticleCard key={i} article={article} />
							))}
						</div>
					) : (
						<div className='text-center py-16 bg-[#08101C] border border-white/5 rounded-2xl'>
							<p className='text-[#B4BAC2] text-lg'>No articles found in this category.</p>
						</div>
					)}

					<ListingPagination
						currentPage={page}
						totalPages={totalPages}
						onPageChange={(nextPage) => goTo(nextPage, category)}
						className='mt-8'
					/>
				</SectionContainer>
			</section>
		</>
	);
}
