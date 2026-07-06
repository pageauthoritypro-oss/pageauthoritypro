import { Badge } from '@/components/ui/badge';
import { CaseStudyItem } from '@/sanity/types';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeCaseStudyCard({
	_id: _id,
	slug,
	caseStudyMetrics,
	excerpt,
	image,
	tags,
	title: _title,
	description: _description,
}: CaseStudyItem) {
	const [firstMetric, ...restMetrics] = caseStudyMetrics ?? [];
	return (
		<Link href={slug} className='h-full'>
			<article className='group relative overflow-hidden rounded-[6px] p-6 sm:p-8 md:p-6 lg:p-8 h-full'>
				{image && (
					<div className='absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110'>
						<Image
							src={image}
							alt={''}
							fill
							sizes='(max-width: 768px) 100vw, 20vw'
							className='w-full h-full object-contain object-center'
							loading='lazy'
						/>
					</div>
				)}
				{/* Misty Dark Blue Overlay */}
				<div className='absolute inset-0 z-0 bg-linear-to-t to-[#010509]/5 via-[#010509]/50 from-[#010509]/97 from-0% via-38% to-100% transition-opacity duration-300 group-hover:opacity-90' />

				{/* Glowing Golden Sphere in center */}
				<div
					aria-hidden='true'
					className='pointer-events-none absolute left-1/2 top-[48%] z-1 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.22] blur-[30px] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.32]'
					style={{ background: 'radial-gradient(circle, #C7933D 0%, transparent 70%)' }}
				/>

				<div className='relative z-10 flex h-full flex-col justify-between w-full gap-[8.719rem] sm:gap-[13.719rem] md:gap-[8.719rem] lg:gap-[13.844rem]'>
					<div className='flex items-start justify-between w-full'>
						<div>
							{tags && tags.length > 0 && (
								<Badge
									variant={'brand-gold'}
									className='h-auto text-[9px] font-heading font-medium tracking-[0.18em] px-3.5 py-1.5 rounded-xs uppercase'>
									{tags?.find((tag) => !!tag.title)?.title}
								</Badge>
							)}
						</div>
						<span className='w-8 h-8 sm:w-[34px] sm:h-[34px] shrink-0 text-[#C7933D] transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:translate-x-[6px] group-hover:translate-y-[-6px]'>
							<svg className='w-full h-full' viewBox='0 0 34 34' fill='none' xmlns='http://www.w3.org/2000/svg'>
								<rect x='0.5' y='0.5' width='33' height='33' rx='16.5' stroke='currentColor' />
								<path
									d='M14.084 19.9167L19.9173 14.0834M19.9173 19.9167V14.0834H14.084'
									stroke='currentColor'
									strokeWidth='0.875'
									strokeLinecap='round'
								/>
							</svg>
						</span>
					</div>

					<div>
						<div className='flex flex-col justify-center my-auto py-6 w-full divide-y-2 divide-brand-gold/25'>
							{excerpt && (
								<div className='pb-7'>
									<p className='text-[10px] sm:text-[11px] font-heading font-medium  tracking-[0.099em] sm:tracking-[0.09em] text-[#F5F5F5] uppercase'>
										{excerpt}
									</p>
								</div>
							)}

							{firstMetric && (
								<div className='pt-7 flex flex-col gap-1'>
									<div className='font-heading text-[54px] md:text-5xl sm:text-6xl lg:text-6xl  font-bold leading-none tracking-tight text-[#C7933D]'>
										{firstMetric?.value}
									</div>
									<span className='text-[10px] font-heading font-medium uppercase leading-normal tracking-widest text-text-muted'>
										{firstMetric?.label}
									</span>
								</div>
							)}
						</div>

						{restMetrics && restMetrics.length > 0 && (
							<div className='w-full'>
								<ul role='list' className='grid list-none gap-4 grid-cols-3'>
									{restMetrics.map(({ value, label, isHighlighted: _isHighlighted, variant: _variant }, index) => (
										<li key={index} className='flex flex-col text-left gap-1'>
											<span className='font-heading text-[20px] font-medium leading-5 tracking-[-0.4px] text-[#F5F5F5]'>
												{value}
											</span>

											<span className='font-heading text-[10px]  font-medium leading-normal tracking-normal text-text-muted'>
												{label}
											</span>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</article>
		</Link>
	);
}
