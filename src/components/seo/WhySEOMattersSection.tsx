import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import CtaLink from '@/components/CtaLink';
import DynamicIcon from '@/components/DynamicIcon';
import DynamicHeading from '@/components/DynamicHeading';
import type { SeoFeaturesSectionData } from '@/sanity/types';
import SectionContainer from '@/components/layout/SectionContainer';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import PremiumCardBorder from '@/components/PremiumCardBorder';

export default function WhySEOMattersSection({
	header,
	cards,
	columns,
	overlapPrevious = false,
}: SeoFeaturesSectionData & { overlapPrevious?: boolean }) {
	if (!cards?.length && !header) return null;

	const heading = header?.heading;
	const description = header?.description;
	const ctaBtns = header?.cta_btn?.filter((b) => b.cta_text && b.url) ?? [];
	const ctaPosition = header?.cta_button_position;

	const ctaBlock =
		ctaBtns.length > 0 ? (
			<AnimatedFadeUp>
				<div className='flex flex-wrap justify-center items-center gap-4'>
					{ctaBtns.map((btn, i) => (
						<CtaLink key={i} href={btn.url} variant={btn.variant} target={btn.target} className='flex items-center'>
							<span>{btn.cta_text}</span>
							{btn.icon && <DynamicIcon icon={btn.icon} size={16} />}
						</CtaLink>
					))}
				</div>
			</AnimatedFadeUp>
		) : null;

	return (
		<section className={cn('relative z-10 py-16 lg:py-24', overlapPrevious && 'lg:mt-[-285px]')}>
			<SectionContainer className='flex flex-col gap-10 lg:gap-14'>
				{ctaPosition === 'top' && ctaBlock}

				{(!!heading?.length || description || ((!ctaPosition || ctaPosition === 'center') && ctaBlock)) && (
					<div className='flex flex-col items-center text-center gap-[18px]'>
						{!!heading?.length && (
							<DynamicHeading
								heading={heading}
								tag={header?.headingTag}
								align='center'
								defaultTag='h2'
								className='text-[40px] lg:text-[52px] leading-[125%] tracking-tight'
							/>
						)}
						{description && (
							<AnimatedFadeUp delay={0.1}>
								<p className='font-satoshi text-base text-[#B5BBC3] leading-[22px] tracking-[0.01em] max-w-[588px]'>{description}</p>
							</AnimatedFadeUp>
						)}
						{(!ctaPosition || ctaPosition === 'center') && ctaBlock}
					</div>
				)}

				{!!cards?.length && (
					<ul
						role='list'
						className={cn(
							'grid list-none grid-cols-1 gap-5',
							columns === 3 && 'sm:grid-cols-2 lg:grid-cols-3',
							columns === 4 && 'sm:grid-cols-2 lg:grid-cols-4',
							columns !== 3 && columns !== 4 && 'sm:grid-cols-2',
						)}>
						{cards.map((card, i) => (
							<AnimatedFadeUp key={card._key ?? i} as='li' className='h-full'>
								<div className='relative group bg-[#0F1F38]/20 rounded-xl flex flex-col items-center justify-center py-14 px-8 h-full border border-transparent transition-all duration-300 hover:bg-[#0f1f38]/35 hover:shadow-[0_8px_20px_rgba(199,147,61,0.08)]'>
									<PremiumCardBorder />
									<div className='flex flex-col items-center gap-12 max-w-[245px] w-full relative z-10'>
										<div className='w-22 h-22 flex items-center justify-center shrink-0'>
											{card.icon && <DynamicIcon icon={card.icon} size={88} className='w-22 h-22' />}
										</div>
										<div className='flex flex-col items-center gap-8 w-full text-center'>
											<div className='flex flex-col items-center gap-3'>
												<h3 className='font-heading font-bold text-2xl text-white leading-[125%]'>{card.title}</h3>
												{card.description && (
													<p className='font-satoshi text-base text-[#B4BAC2] leading-[112%]'>{card.description}</p>
												)}
											</div>
											{card.link?.url && card.link.label && (
												<Link
													href={card.link.url}
													target={card.link.target}
													className='flex items-center gap-1.5 font-heading font-bold text-[12px] uppercase tracking-[0.08em] text-brand-gold underline underline-offset-2'>
													{card.link.label} <ArrowUpRight className='w-3.5 h-3.5' />
												</Link>
											)}
										</div>
									</div>
								</div>
							</AnimatedFadeUp>
						))}
					</ul>
				)}

				{ctaPosition === 'bottom' && ctaBlock}
			</SectionContainer>
		</section>
	);
}
