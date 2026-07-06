import SectionContainer from '@/components/layout/SectionContainer';
import CtaLink from '@/components/CtaLink';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import type { NotFoundSectionData } from '@/sanity/types';

export default function NotFoundSection(props: NotFoundSectionData) {
	const title = props.title;
	const description = props.description;
	const ctaButtons = props.ctaButtons;

	return (
		<section className='relative overflow-hidden bg-[#060D15] min-h-[480px] flex items-center py-16 lg:py-24'>
			<div
				aria-hidden='true'
				className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none'
			/>

			<SectionContainer className='relative z-10 flex flex-col items-center justify-center text-center gap-6 max-w-2xl mx-auto'>
				{title && (
					<AnimatedFadeUp delay={0.05}>
						<h1 className='font-heading text-[80px] leading-[72px] lg:text-[64px] font-medium text-brand-gold tracking-tight select-none mb-1 drop-shadow-[0_0_50px_rgba(199,147,61,0.15)]'>
							{title}
						</h1>
					</AnimatedFadeUp>
				)}

				{description && (
					<AnimatedFadeUp delay={0.15}>
						<p className='font-satoshi text-base text-[#B4BAC2] leading-relaxed max-w-md mx-auto mb-2'>{description}</p>
					</AnimatedFadeUp>
				)}

				{ctaButtons && ctaButtons.length > 0 && (
					<AnimatedFadeUp delay={0.25}>
						<div className='flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto'>
							{ctaButtons.map((btn, i) => (
								<CtaLink
									key={i}
									href={btn.url ?? '/'}
									variant={btn.variant ?? 'primary'}
									target={btn.target}
									className='rounded-full font-bold font-satoshi text-[16px] px-8 py-3.5 min-w-[160px] text-center justify-center'>
									{btn.cta_text}
								</CtaLink>
							))}
						</div>
					</AnimatedFadeUp>
				)}
			</SectionContainer>
		</section>
	);
}
