import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import CtaLink from '@/components/CtaLink';
import DynamicIcon from '@/components/DynamicIcon';
import SectionContainer from '@/components/layout/SectionContainer';
import DynamicHeading from '@/components/DynamicHeading';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import type { GrowthServicesSectionData, GrowthServiceCard } from '@/sanity/types';
import PremiumCardBorder from '@/components/PremiumCardBorder';

function CheckItem({ text }: { text: string }) {
	return (
		<li className='flex items-center gap-2'>
			<CheckCircle className='h-5 w-5 shrink-0 text-[#C7933D]' />
			<span className='font-heading font-medium text-[14px] leading-[125%] text-[#B4BAC2]'>{text}</span>
		</li>
	);
}

function LargeCard({ card }: { card: GrowthServiceCard }) {
	return (
		<article className='relative group flex flex-1 flex-col gap-6 p-8 rounded-[12px] bg-[rgba(15,31,56,0.2)] border border-transparent transition-all duration-300 hover:bg-[#0f1f38]/35 hover:shadow-[0_8px_20px_rgba(199,147,61,0.08)] h-full justify-start'>
			<PremiumCardBorder />
			<div className='flex items-center gap-6 relative z-10'>
				{card.icon && <DynamicIcon icon={card.icon} size={64} className='shrink-0 text-[#C7933D]' />}
				<h3 className='font-heading font-bold text-[24px] leading-[125%] text-white'>{card.title}</h3>
			</div>
			{!!card.features?.length && (
				<ul role='list' className='grid list-none grid-cols-1 sm:grid-cols-2 gap-3 relative'>
					{card.features.map((item, i) => (
						<CheckItem key={i} text={item.text} />
					))}
				</ul>
			)}
		</article>
	);
}

function SmallCard({ card }: { card: GrowthServiceCard }) {
	const isIconOnly = !card.description;
	return (
		<article
			className={cn(
				'relative group flex p-8 rounded-[12px] bg-[rgba(15,31,56,0.2)] border border-transparent transition-all duration-300 hover:bg-[#0f1f38]/35 hover:shadow-[0_8px_20px_rgba(199,147,61,0.08)] h-full justify-start',
				isIconOnly ? 'flex-col items-center justify-center gap-6 text-center min-h-[181px]' : 'flex-col sm:flex-row items-start gap-6',
			)}>
			<PremiumCardBorder />
			{card.icon && <DynamicIcon icon={card.icon} size={isIconOnly ? 56 : 64} className='shrink-0 text-[#C7933D] relative z-10' />}
			<div className={cn('flex flex-col gap-5 relative z-10', isIconOnly && 'items-center')}>
				<h3 className='font-heading font-bold text-[24px] leading-[125%] text-white'>{card.title}</h3>
				{card.description && <p className='font-heading font-medium text-[16px] leading-[112%] text-[#B4BAC2]'>{card.description}</p>}
			</div>
		</article>
	);
}

export default function OptionalGrowthServicesSection({ heading, headingTag, cards, cta }: GrowthServicesSectionData) {
	// Cards with features → large left column; cards without → small right column
	const largeCards = cards?.filter((c) => !!c.features?.length) ?? [];
	const smallCards = cards?.filter((c) => !c.features?.length) ?? [];

	return (
		<section aria-labelledby='growth-services-heading' className='w-full py-16 lg:py-24'>
			<SectionContainer className='flex flex-col gap-6 lg:gap-8'>
				{!!heading?.length && (
					<DynamicHeading
						heading={heading}
						tag={headingTag}
						defaultTag='h2'
						align='center'
						className='text-center font-heading font-medium text-[32px] lg:text-[52px] leading-[125%] tracking-[-1.3px] text-white'
					/>
				)}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:items-stretch'>
					<div className='flex flex-col gap-5'>
						{largeCards.map((card, i) => (
							<AnimatedFadeUp key={card._key ?? i} className='h-full'>
								<LargeCard card={card} />
							</AnimatedFadeUp>
						))}
					</div>
					<div className='flex flex-col gap-5'>
						{smallCards.map((card, i) => (
							<AnimatedFadeUp key={card._key ?? i} className='h-full'>
								<SmallCard card={card} />
							</AnimatedFadeUp>
						))}
					</div>
				</div>

				{cta?.url && cta?.cta_text && (
					<AnimatedFadeUp>
						<div className='flex justify-center'>
							<CtaLink href={cta.url} variant='primary' target={cta.target}>
								{cta.cta_text}
							</CtaLink>
						</div>
					</AnimatedFadeUp>
				)}
			</SectionContainer>
		</section>
	);
}
