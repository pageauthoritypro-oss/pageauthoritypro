import DynamicIcon from '@/components/DynamicIcon';
import SectionHeader from '@/components/layout/SectionHeader';
import type { GrowthMetricsSectionData } from '@/sanity/types';
import SectionContainer from '@/components/layout/SectionContainer';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';

export default function StatsSection({ header, metrics }: GrowthMetricsSectionData) {
	if (!metrics?.length && !header) return null;

	return (
		<section className='bg-background py-16 lg:py-24'>
			<SectionContainer className='flex flex-col gap-16'>
				{/* Header row */}
				<SectionHeader header={header} align='left' headingClassName='text-[40px] lg:text-[48px] leading-none tracking-[-0.025em]' />

				{/* Stats columns */}
				{!!metrics?.length && (
					<div className='grid grid-cols-1 sm:grid-cols-3'>
						{metrics.map((metric, i) => {
							const graphIcon =
								metric.graphImageUrl || metric.graphImageSvg ? { url: metric.graphImageUrl, iconSvg: metric.graphImageSvg } : null;

							return (
								<AnimatedFadeUp
									key={metric._key ?? i}
									className='bg-[#060D15]/20 rounded-[6px] p-8 flex flex-col gap-[22px] border border-white/6 sm:border-0 sm:border-r sm:border-r-white/8 sm:last:border-r-0 h-full'>
									<div className='flex flex-col gap-3'>
										<span className='font-heading font-medium text-[64px] sm:text-[36px] md:text-[48px] lg:text-[80px] leading-none tracking-tighter text-brand-gold'>
											{metric.number}
										</span>
										<span className='font-heading font-medium text-base uppercase tracking-[0.06em] text-[#B5BBC3] leading-none'>
											{metric.label}
										</span>
									</div>

									{graphIcon && <DynamicIcon icon={graphIcon} className='w-full h-auto' />}
								</AnimatedFadeUp>
							);
						})}
					</div>
				)}
			</SectionContainer>
		</section>
	);
}
