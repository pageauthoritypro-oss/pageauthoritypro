import CtaLink from '@/components/CtaLink';
import DynamicIcon from '@/components/DynamicIcon';
import DynamicHeading from '@/components/DynamicHeading';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import RichText from '@/components/RichText';
import SectionContainer from '@/components/layout/SectionContainer';
import type { PracticeAreasSectionData, PracticeAreaCard } from '@/sanity/types';

function PlanCard({ card }: { card: PracticeAreaCard }) {
	return (
		<article className='flex w-full flex-1 flex-col items-center pt-[60px] pb-[60px] px-[34px] gap-[15px] text-center bg-[rgba(15,31,56,0.2)] border border-[rgba(255,255,255,0.08)] rounded-[6px] justify-start'>
			{card.icon && (
				<div
					className='flex h-11 w-11 shrink-0 items-center justify-center border border-transparent rounded-[12px]'
					style={{
						background: 'linear-gradient(#61481E,#61481E) padding-box, linear-gradient(180deg,#C7933D 0%,#61481E 100%) border-box',
					}}>
					<DynamicIcon icon={card.icon} size={20} className='text-white' />
				</div>
			)}

			<div className='flex flex-col gap-[6px]'>
				{card.eyebrow && (
					<p className='font-heading font-medium text-xs leading-[normal] tracking-[1.62px] uppercase text-[#B5BBC3]'>{card.eyebrow}</p>
				)}
				<h3 className='font-heading font-bold text-[20px] leading-[normal] uppercase text-[#F5F5F5]'>{card.title}</h3>
			</div>

			{!!card.details?.length && (
				<RichText value={card.details} className='font-heading text-[14px] leading-[21.45px] text-[#B5BBC3] text-left' />
			)}
		</article>
	);
}

export default function ClientEngagementSection({ heading, headingTag, cards, cta }: PracticeAreasSectionData) {
	return (
		<section aria-labelledby='engagement-heading' className='w-full py-16 lg:py-24 bg-[#060D15]'>
			<SectionContainer className='flex flex-col gap-8'>
				{!!heading?.length && (
					<DynamicHeading
						heading={heading}
						tag={headingTag}
						defaultTag='h2'
						align='center'
						className='text-center font-heading font-medium text-[32px] lg:text-[52px] leading-[normal] tracking-[-1.3px] text-white'
					/>
				)}

				<div className='flex flex-col sm:flex-row gap-3 items-stretch justify-center'>
					{cards?.map((card, i) => (
						<AnimatedFadeUp key={card._key ?? i} className='flex flex-col flex-1'>
							<PlanCard card={card} />
						</AnimatedFadeUp>
					))}
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
