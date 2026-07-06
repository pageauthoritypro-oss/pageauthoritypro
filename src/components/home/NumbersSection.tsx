import { cn } from '@/lib/utils';
import type { NumbersSectionData } from '@/sanity/types';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';

export default function NumbersSection(props: NumbersSectionData) {
	const heading = props.heading;
	const statItems = props.statItems;
	const extraSpacingBottom = props.extraSpacingBottom;

	return (
		<section
			aria-label='Key growth statistics'
			className={cn('flex flex-col items-center justify-center py-10', extraSpacingBottom && ' mb-24 lg:mb-28 xl:mb-44')}>
			<div className='mx-auto w-full max-w-7xl px-5 min-[1400px]:px-0 space-y-10'>
				{heading && (
					<AnimatedFadeUp>
						<p className='uppercase text-center font-medium text-text-muted text-base leading-5.5 tracking-[0.08em] font-heading'>
							{heading}
						</p>
					</AnimatedFadeUp>
				)}
				{statItems && statItems.length > 0 && (
					<div
						className={cn(
							'w-full flex flex-wrap justify-center gap-x-4 gap-y-8 xl:flex-nowrap- xl:gap-x-12 xl:gap-y-8',
							statItems.length % 5 === 0 ? `xl:justify-between` : `xl:justify-center`,
						)}
						role='list'>
						{statItems.map(({ number, label, variant }, index) => (
							<AnimatedFadeUp
								key={label + index}
								className='w-full min-[400px]:basis-[calc(50%-0.5rem)] min-[400px]:max-w-[calc(50%-0.5rem)] min-[900px]:basis-[calc(33.333%-0.75rem)] min-[900px]:max-w-[calc(33.333%-0.75rem)] xl:basis-auto xl:max-w-fit xl:flex-none'>
								<div
									role='listitem'
									className='flex flex-col items-center text-center gap-1 w-full'>
									<strong
										className={cn(
											'font-heading text-[32px] font-bold leading-10 tracking-normal sm:text-4xl md:text- lg:text-[32px]',
											variant == 'brand' && 'text-brand-gold',
											variant == 'secondary' && 'text-secondary',
											variant == 'accent' && 'text-accent',
											variant == 'info' && 'text-info',
										)}>
										{number}
									</strong>
									<span className='font-satoshi font-normal leading-5.5 tracking-[0.01em] text-text-muted text-base'>{label}</span>
								</div>
							</AnimatedFadeUp>
						))}
					</div>
				)}
			</div>
		</section>
	);
}
