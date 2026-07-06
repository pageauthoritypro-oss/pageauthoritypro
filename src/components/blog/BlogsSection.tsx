'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SectionContainer from '@/components/layout/SectionContainer';
import ArticleCard from './ArticleCard';
import type { BlogArticle } from '@/sanity/types/blog';

interface Props {
	categories: string[];
	articles: BlogArticle[];
	showFilter?: boolean;
}

export default function BlogsSection({ categories, articles, showFilter = true }: Props) {
	const [activeCategory, setActiveCategory] = useState(categories[0]);

	const filteredArticles =
		activeCategory === 'All' || activeCategory === categories[0]
			? articles
			: articles.filter((a) => a.category === activeCategory);

	return (
		<section className='bg-background pt-10 pb-16 lg:pb-24'>
			<SectionContainer className='flex flex-col gap-8'>
				{/* Category filter tabs — hidden when showFilter is false in Sanity */}
				{showFilter && (
				<div className='relative z-20 flex items-center gap-2 rounded-lg overflow-x-auto scrollbar-hide bg-[#08101C] p-3 -m-3'>
					{categories.map((cat) => (
						<Button
							key={cat}
							type='button'
							variant='ghost'
							aria-pressed={activeCategory === cat}
							onClick={() => setActiveCategory(cat)}
							className={cn(
								'relative z-10 h-auto shrink-0 rounded-full font-heading font-bold text-[14px] leading-4 px-5 py-2 transition-[background-color,box-shadow,color]',
								activeCategory === cat
									? 'bg-[#C7933D] text-[#08101C] hover:bg-[#C7933D]'
									: 'text-[#555555] border border-white/10 hover:bg-white/10 hover:text-white hover:shadow-[0_0_24px_5px_rgba(255,255,255,0.28),0_0_8px_2px_rgba(255,255,255,0.2)]',
							)}>
							{cat}
						</Button>
					))}
				</div>
				)}

				{/* Article grid */}
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{filteredArticles.map((article, i) => (
						<ArticleCard key={i} article={article} />
					))}
				</div>
			</SectionContainer>
		</section>
	);
}
