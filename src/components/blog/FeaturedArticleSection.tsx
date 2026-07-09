import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionContainer from '@/components/layout/SectionContainer';
import DynamicHeading from '@/components/DynamicHeading';
import type { BlogArticle } from '@/sanity/types/blog';
import type { SanityHeadingPart } from '@/sanity/types';
import { cn } from '@/lib/utils';

interface Props {
	article: BlogArticle;
	heading?: SanityHeadingPart[];
	overlapPrevious?: boolean;
}

function AuthorAvatar({ initials }: { initials: string }) {
	return (
		<span className='w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-sm text-white shrink-0 bg-[linear-gradient(135deg,#C7933D_0%,#61481E_100%)]'>
			{initials}
		</span>
	);
}

export default function FeaturedArticleSection({ article, heading, overlapPrevious = false }: Props) {
	return (
		<section
			className={cn(
				'relative z-10 pt-12 lg:pt-0 pb-0',
				overlapPrevious && 'lg:-mt-35'
			)}>
			<SectionContainer className='flex flex-col gap-10'>
				{heading && heading.length > 0 && (
					<DynamicHeading
						heading={heading}
						tag='h2'
						className='font-medium text-[28px] lg:text-[52px] leading-[125%] tracking-tight text-center'
						align='center'
					/>
				)}

				{/* Featured article card */}
				<div className='flex flex-col lg:flex-row rounded-lg overflow-hidden gap-[26px] bg-[#08101C] border-[0.5px] border-[rgba(255,255,255,0.08)]'>
					{/* Image area */}
					<div className='relative shrink-0 aspect-video sm:aspect-2/1 lg:aspect-auto lg:w-[50%] xl:w-[594px] min-h-[260px] lg:min-h-0'>
						{article.image ? (
							<Image
								src={article.image}
								alt={article.title}
								fill
								priority
								className='object-cover'
								sizes='(min-width: 1024px) 50vw, 100vw'
							/>
						) : (
							<div className='absolute inset-0 bg-[linear-gradient(135deg,#C7933D_0%,#61481E_100%)]' />
						)}
						<span className='absolute top-4 left-4 inline-flex items-center font-heading font-normal text-[12px] uppercase leading-none rounded-[40px] px-3 py-1.5 bg-[#F5F5F5] text-[#011324]'>
							★ Featured
						</span>
					</div>

					{/* Content */}
					<div className='flex flex-col justify-between p-8 lg:p-14'>
						{/* Top: category + title + description */}
						<div className='flex flex-col gap-3'>
							<div className='flex flex-col gap-2'>
								<span className='font-heading font-bold text-[12px] leading-[16px] tracking-widest uppercase text-[#CD9E51]'>
									{article.category}
								</span>
								<h3 className='font-heading font-bold text-[28px] lg:text-[32px] text-white leading-[44px] tracking-[-0.031em]'>
									{article.title}
								</h3>
							</div>
							<p className='font-heading font-normal text-[16px] leading-[26px] text-[#B4BAC2]'>
								{article.description}
							</p>
						</div>

						{/* Bottom: author + read link */}
						<div className='flex items-center justify-between gap-4 mt-8 pt-4 border-t border-white'>
							<div className='flex items-center gap-3'>
								<AuthorAvatar initials={article.author.initials} />
								<div className='flex flex-col gap-0.5'>
									<span className='font-heading font-bold text-[14px] leading-[20px] text-white'>
										{article.author.name}
									</span>
									<span className='font-heading font-normal text-[13px] leading-[19.5px] text-white'>
										{article.author.date}
									</span>
								</div>
							</div>
							<Link
								href={article.href}
								className='flex items-center gap-1.5 font-heading font-bold text-[14px] leading-[20px] text-[#C7933D] hover:underline shrink-0'>
								Read article <ArrowRight className='w-4 h-4' />
							</Link>
						</div>
					</div>
				</div>
			</SectionContainer>
		</section>
	);
}
