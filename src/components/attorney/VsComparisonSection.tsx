import type { VsComparisonSectionData } from '@/sanity/types';
import VsComparisonCard from '@/components/cards/VsComparisonCard';
import CtaLink from '@/components/CtaLink';
import Section from '@/components/layout/Section';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import SectionContainer from '@/components/layout/SectionContainer';

interface VsComparisonSectionProps {
	data?: Partial<VsComparisonSectionData>;
}

export default function VsComparisonSection({ data }: VsComparisonSectionProps) {
	if (!data || !data.columns || data.columns.length < 2) return null;

	const bannerText = data.eyebrow;
	const leftColumn = data.columns[0];
	const rightColumn = data.columns[1];
	const ctaButtons = data.cta_btn || [];

	return (
		<Section className='flex flex-col items-center'>
			<SectionContainer className='relative z-10'>
				{bannerText && (
					<div className='flex flex-row justify-center items-center gap-4 w-full max-w-[924px] mx-auto mb-12 md:mb-16 px-4 md:px-0'>
						<AnimatedFadeUp className='flex-1 flex justify-center items-center'>
							<div className='hidden md:block flex-1 max-w-72 h-px bg-gradient-to-r from-transparent to-brand-gold' />
							<h2 className='w-auto whitespace-normal md:whitespace-nowrap font-heading font-normal text-base tracking-[0.08em] uppercase text-brand-gold text-center select-none flex items-center justify-center [text-shadow:0px_4px_4px_rgba(6,13,21,0.25)] px-4'>
								{bannerText}
							</h2>
							<div className='hidden md:block flex-1 max-w-72 h-px bg-gradient-to-r from-brand-gold to-transparent' />
						</AnimatedFadeUp>
					</div>
				)}

				<div className='relative w-full flex flex-col min-[1280px]:flex-row gap-12 justify-center items-stretch mx-auto'>
					<AnimatedFadeUp className='flex-1 flex min-[1280px]:flex-none'>
						<VsComparisonCard column={leftColumn} />
					</AnimatedFadeUp>

					<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden min-[1280px]:flex items-center justify-center'>
						<div className='w-32 h-24 rounded-full border-2 border-brand-gold bg-[radial-gradient(50%_50%_at_50%_50%,#060D15_0%,#241A0A_100%)] flex items-center justify-center shadow-[0_0_20px_6px_rgba(199,147,61,0.25)] select-none'>
							<span className='font-heading text-[52px] font-bold text-brand-gold tracking-[-1.3px] leading-tight flex items-center justify-center'>
								VS
							</span>
						</div>
					</div>

					<div className='flex min-[1280px]:hidden items-center justify-center my-2 relative z-20'>
						<div className='w-32 h-24 rounded-full border-2 border-brand-gold bg-[radial-gradient(50%_50%_at_50%_50%,#060D15_0%,#241A0A_100%)] flex items-center justify-center shadow-[0_0_15px_4px_rgba(199,147,61,0.2)] select-none'>
							<span className='font-heading text-[52px] font-bold text-brand-gold tracking-[-1.3px] leading-tight flex items-center justify-center'>
								VS
							</span>
						</div>
					</div>

					<AnimatedFadeUp className='flex-1 flex min-[1280px]:flex-none'>
						<VsComparisonCard column={rightColumn} />
					</AnimatedFadeUp>
				</div>
				{!!ctaButtons.length && (
					<AnimatedFadeUp className='flex flex-wrap items-center justify-center gap-4 mt-16'>
						{ctaButtons.map((btn, i) => (
							<CtaLink
								key={i}
								href={btn.url}
								variant={btn.variant === 'secondary' ? 'secondary' : 'primary'}
								target={btn.target === '_blank' ? '_blank' : undefined}
								rel={btn.target === '_blank' ? 'noopener noreferrer' : undefined}>
								{btn.cta_text}
							</CtaLink>
						))}
					</AnimatedFadeUp>
				)}
			</SectionContainer>
		</Section>
	);
}
