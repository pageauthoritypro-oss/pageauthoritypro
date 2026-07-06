import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import DynamicHeading from '@/components/DynamicHeading';
import DynamicIcon from '@/components/DynamicIcon';
import type { GrowthPhaseProcessSectionData } from '@/sanity/types';
import SectionContainer from '@/components/layout/SectionContainer';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';

export default function ProcessOverview({
	eyebrow,
	heading,
	headingTag,
	cards,
	overlapPrevious = false,
}: Omit<Partial<GrowthPhaseProcessSectionData>, 'overlapPrevious'> & { overlapPrevious?: boolean }) {
	return (
		<section className={cn('relative z-10 py-16 lg:py-24', overlapPrevious && 'lg:-mt-69')}>
			<SectionContainer>
				{/* Eyebrow with gradient lines */}
				{eyebrow && (
					<AnimatedFadeUp>
						<div className='mb-10 flex items-center gap-4.5' aria-hidden='true'>
							<span className='h-px min-w-6 flex-1 bg-gradient-to-r from-[#61481E] to-[#C7933D]' />
							<p className='text-center font-heading text-base font-normal uppercase tracking-[0.08em] text-brand-gold [text-shadow:0_4px_4px_rgba(6,13,21,0.25)]'>
								{eyebrow}
							</p>
							<span className='h-px min-w-6 flex-1 bg-gradient-to-l from-[#61481E] to-[#C7933D]' />
						</div>
					</AnimatedFadeUp>
				)}

				<DynamicHeading heading={heading} tag={headingTag} className='mb-14 text-center max-w-2xl mx-auto' align='center' defaultTag='h2' />

				{!!cards?.length && (
					<ol role='list' className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
						{cards.map((card, index) => {
							const badge = card.badgeNumber ?? String(index + 1).padStart(2, '0');

							return (
								<AnimatedFadeUp as='li' key={badge} className='h-full'>
									<div className='h-full'>
										<article
											className='relative group flex h-full flex-col items-center gap-6 rounded-2xl border border-white/8 bg-[#0F1F38]/20 p-7 text-center transition-all duration-300 hover:bg-[#0f1f38]/35 hover:shadow-[0_8px_20px_rgba(199,147,61,0.08)]'
											aria-labelledby={`overview-${badge}-title`}>
											<div
												aria-hidden
												className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
												style={{
													borderRadius: 'inherit',
													padding: 1,
													background:
														'linear-gradient(135deg, rgba(199,147,61,1) 0%, rgba(199,147,61,0) 50%, rgba(199,147,61,1) 100%)',
													WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
													WebkitMaskComposite: 'xor',
													maskComposite: 'exclude',
													pointerEvents: 'none',
												}}
											/>
											<span className='self-start font-heading text-[32px] font-bold leading-tight tracking-[-1.3px] text-brand-gold relative z-10'>
												{badge}
											</span>

											{card.icon && (
												<DynamicIcon
													icon={card.icon}
													size={84}
													className='h-21 w-21 object-contain relative z-10'
													aria-hidden='true'
												/>
											)}
											<div className='flex flex-1 flex-col gap-3 relative z-10'>
												<h3
													id={`overview-${badge}-title`}
													className='font-heading text-[24px] font-bold leading-tight text-text-heading'>
													{card.title}
												</h3>
												{card.description && (
													<p className='text-base font-normal leading-[1.12] text-text-muted'>{card.description}</p>
												)}
											</div>

											{card.learnMoreLink?.url && card.learnMoreLink?.label && (
												<Link
													href={card.learnMoreLink.url}
													target={card.learnMoreLink.target}
													rel={card.learnMoreLink.target === '_blank' ? 'noopener noreferrer' : undefined}
													className='inline-flex items-center gap-1 font-heading text-xs font-bold uppercase tracking-[0.99px] text-brand-gold underline underline-offset-2'
													aria-label={`${card.learnMoreLink.label} about ${card.title}`}>
													{card.learnMoreLink.label}
													<ArrowUpRight className='h-3.5 w-3.5' />
												</Link>
											)}
										</article>
									</div>
								</AnimatedFadeUp>
							);
						})}
					</ol>
				)}
			</SectionContainer>
		</section>
	);
}
