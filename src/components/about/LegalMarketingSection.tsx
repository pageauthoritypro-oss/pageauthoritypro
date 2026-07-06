import DynamicIcon from '@/components/DynamicIcon';
import DynamicHeading from '@/components/DynamicHeading';
import CtaLink from '@/components/CtaLink';
import SectionContainer from '@/components/layout/SectionContainer';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import type { LegalMarketingSectionData } from '@/sanity/types';
import { cn } from '@/lib/utils';
import PremiumCardBorder from '@/components/PremiumCardBorder';

export default function LegalMarketingSection({
	header,
	services,
	overlapPrevious = false,
}: LegalMarketingSectionData & { overlapPrevious?: boolean }) {
	if (!services?.length && !header) return null;

	return (
		<section className={cn('py-16 lg:py-24 relative overflow-hidden z-10', overlapPrevious && 'lg:mt-[-300px]')}>
			<SectionContainer className='flex flex-col gap-12 lg:gap-16 items-center'>
				<div className='flex flex-col items-center text-center w-full max-w-[924px] mx-auto gap-5'>
					{header?.eyebrow?.text && (
						<AnimatedFadeUp className='w-full flex justify-center items-center gap-4 px-4 md:px-0'>
							<div className='hidden md:block flex-1 max-w-72 h-px bg-gradient-to-r from-transparent to-brand-gold' />
							<p className='w-auto whitespace-normal md:whitespace-nowrap font-heading font-normal text-base tracking-[0.08em] uppercase text-brand-gold text-center select-none flex items-center justify-center [text-shadow:0px_4px_4px_rgba(6,13,21,0.25)] px-4'>
								{header.eyebrow.text}
							</p>
							<div className='hidden md:block flex-1 max-w-72 h-px bg-gradient-to-r from-brand-gold to-transparent' />
						</AnimatedFadeUp>
					)}

					{header?.heading && (
						<DynamicHeading
							heading={header.heading}
							tag={header.headingTag}
							align='center'
							className='text-3xl sm:text-4xl lg:text-[52px] sm:leading-14 text-center mx-auto text-text-heading'
						/>
					)}

					{header?.description && (
						<AnimatedFadeUp delay={0.08}>
							<p className='font-heading text-text-muted text-center mx-auto max-w-[609px] text-[14.75px] sm:text-base leading-normal tracking-normal'>
								{header.description}
							</p>
						</AnimatedFadeUp>
					)}

					{header?.cta_btn && header.cta_btn.length > 0 && (
						<AnimatedFadeUp delay={0.16} className='flex flex-wrap items-center justify-center gap-4 mt-2'>
							{header.cta_btn.map((btn, i) => (
								<CtaLink key={i} href={btn.url} variant={btn.variant} target={btn.target}>
									<span>{btn.cta_text}</span>
									{btn.icon && <DynamicIcon icon={btn.icon} size={16} />}
								</CtaLink>
							))}
						</AnimatedFadeUp>
					)}
				</div>

				{!!services?.length && (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1fr_1fr_1.2fr] gap-6 lg:gap-8 w-full'>
						{services.map((item, index) => {
							return (
								<AnimatedFadeUp key={item._key ?? index} className='h-full'>
									<div className='relative flex flex-col items-center text-center p-8 sm:px-8 sm:py-10 bg-[#0F1F38]/10 border border-transparent hover:bg-[#0F1F38]/15 transition-all duration-300 rounded-[14px] h-full justify-start gap-6 group'>
										<PremiumCardBorder />
										{item?.icon && (
											<div className='flex h-[72px] w-[72px] aspect-square items-center justify-center text-brand-gold relative z-10'>
												<DynamicIcon icon={item.icon} />
											</div>
										)}
										<div className='flex flex-col gap-2 relative z-10'>
											{item.title && <h3 className='font-heading font-bold text-lg text-white leading-snug'>{item.title}</h3>}
											{item.description && (
												<p className='font-heading font-normal text-[15px] sm:text-base text-[#B5BBC3] leading-relaxed'>
													{item.description}
												</p>
											)}
										</div>
									</div>
								</AnimatedFadeUp>
							);
						})}
					</div>
				)}
			</SectionContainer>
		</section>
	);
}
