import Link from 'next/link';
import Image from 'next/image';
import { cn, getHeadingText } from '@/lib/utils';
import { MoveUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CaseStudyItem, SanityHeadingPart } from '@/sanity/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const variantClassMap: Record<string, string> = {
	brand: 'text-brand-gold',
	secondary: 'text-secondary',
	accent: 'text-accent',
	info: 'text-info',
};

export default function ListingCaseStudyCard({
	_id: _id,
	slug,
	title,
	description: _description,
	caseStudyMetrics,
	excerpt,
	image,
	tags,
}: CaseStudyItem) {
	return (
		<Link href={slug} className='h-full'>
			<Card className='relative group gap-0 overflow-hidden rounded-[6px] h-full py-0 bg-linear-to-br from-[#000000] to-[#010509] border-0 outline-0 ring-0'>
				<CardHeader className='w-full min-h-60 rounded-t-[6px] overflow-hidden relative '>
					<div className='flex items-start w-auto flex-wrap gap-1 absolute top-5 left-5 right-5 z-10'>
						{tags &&
							tags.length > 0 &&
							tags.map((tag, index) => (
								<Badge
									key={index}
									variant={'brand-gold'}
									className='h-auto text-[9px] font-heading font-medium tracking-[0.18em] px-3.5 py-1.5 rounded-xs uppercase'>
									{tag?.title}
								</Badge>
							))}
					</div>
					{image && (
						<div className='absolute w-full h-full'>
							<Image
								src={image}
								alt=''
								fill
								sizes='(max-width: 768px) 100vw, 33vw'
								className='bg-white w-full h-60 object-cover object-center mask-[linear-gradient(to_top,transparent_0%,#000204_80%,#000000_90%)]'
								loading='lazy'
							/>

							{/* Glowing Golden Sphere in center */}
							<div
								aria-hidden='true'
								className='pointer-events-none absolute left-1/2 top-[48%] z-1 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.22] blur-[30px] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.32]'
								style={{ background: 'radial-gradient(circle, #C7933D 0%, transparent 70%)' }}
							/>
						</div>
					)}
				</CardHeader>

				<div className='h-full p-5 pt-6 sm:py-5 sm:pt-6 md:p-5 md:pt-6 lg:p-5 lg:pt-6  bg-linear-to-br from-black to-[#010509] flex flex-col justify-between gap-14'>
					<CardContent className='relative z-10 flex flex-col justify-between w-full gap-[8.719rem] sm:gap-[13.719rem] md:gap-[8.719rem] lg:gap-[13.844rem] p-0'>
						<div>
							<div className='flex flex-col justify-center my-auto w-full divide-y-2 divide-brand-gold/25'>
								<div className='flex flex-col gap-3 pb-3'>
									{excerpt && (
										<p className='text-[10px] sm:text-xs font-heading font-medium tracking-[0.099em] sm:tracking-[0.09em] text-brand-gold'>
											{excerpt}
										</p>
									)}
									{title && (
										<CardTitle className='text-lg font-heading font-medium tracking-normal leading-[125%] text-white group-hover:text-brand-gold transition-transform duration-500 ease-out line-clamp-2'>
											{getHeadingText(title)}
										</CardTitle>
									)}
								</div>
								{caseStudyMetrics && caseStudyMetrics.length > 0 && (
									<div className='w-full mt-8'>
										<ul role='list' className='grid list-none gap-4 grid-cols-3'>
											{caseStudyMetrics.slice(0, 3).map(({ value, label, isHighlighted, variant }, index) => (
												<li key={index} className='flex flex-col text-center gap-2'>
													<span
														className={cn(
															'font-heading text-[20px] font-medium leading-5 tracking-[-0.4px] text-[#F5F5F5]',
															isHighlighted && variant == 'brand' && isHighlighted && 'text-brand-gold',
															isHighlighted && variant == 'secondary' && 'text-secondary',
															isHighlighted && variant == 'accent' && 'text-accent',
															isHighlighted && variant == 'info' && 'text-info',
														)}>
														{value}
													</span>

													<span className='font-heading text-xs font-medium tracking-[1px] text-text-muted uppercase'>
														{label}
													</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					</CardContent>
					<CardFooter className='bg-transparent border-0 p-0'>
						<p className='flex items-center justify-center gap-1.5 text-brand-gold font-bold text-xs leading-0 tracking-[0.99px]'>
							<span>READ CASE STUDY</span>
							<span>
								<MoveUpRight size={16} />
							</span>
						</p>
					</CardFooter>
				</div>
			</Card>
		</Link>
	);
}
