import SectionContainer from '@/components/layout/SectionContainer';
import SectionHeader from '@/components/layout/SectionHeader';
import DynamicIcon from '@/components/DynamicIcon';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import type { BuiltAroundDataSectionData } from '@/sanity/types/index';
import { cn } from '@/lib/utils';

export default function BuiltAroundDataSection({ header, checkpoints, numberOfCheckPoints }: Partial<BuiltAroundDataSectionData>) {
	if (!checkpoints || checkpoints.length === 0) return null;

	// Grid layout depending on the number of items in a row
	let gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
	if (numberOfCheckPoints === 4) {
		gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
	} else if (numberOfCheckPoints === 2) {
		gridColsClass = 'grid-cols-1 sm:grid-cols-2';
	}

	return (
		<section className='relative overflow-hidden bg-background py-16 lg:py-24'>
			<SectionContainer className='flex flex-col gap-16 items-center'>
				<SectionHeader
					header={header}
					align='center'
					showCta={false}
					headingClassName='text-3xl sm:text-4xl lg:text-[52px] sm:leading-14'
					descriptionClassName='max-w-[609px] text-[14.75px] sm:text-base leading-normal tracking-normal'
				/>

				<div className={cn('grid w-full gap-4 md:gap-5', gridColsClass)}>
					{checkpoints.map((item, index) => {
						const { icon, text } = item;

						return (
							<AnimatedFadeUp key={index} className='h-full'>
								<div className='flex items-center gap-4 bg-brand-gold/7 border border-brand-gold/17 hover:border-brand-gold/20 hover:bg-brand-gold/10 transition-all duration-300 rounded-xl p-5 h-full'>
									<DynamicIcon icon={icon} size={20} className='text-brand-gold shrink-0' strokeWidth={2.5} />
									<span className='font-heading text-sm sm:text-base font-normal text-white leading-tight'>{text}</span>
								</div>
							</AnimatedFadeUp>
						);
					})}
				</div>
			</SectionContainer>
		</section>
	);
}
