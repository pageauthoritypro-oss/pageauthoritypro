import DynamicIcon from '@/components/DynamicIcon';
import SectionHeader from '@/components/layout/SectionHeader';
import type { ServicesSectionData } from '@/sanity/types';
import SectionContainer from '@/components/layout/SectionContainer';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import { cn } from '@/lib/utils';
import PremiumCardBorder from '@/components/PremiumCardBorder';

export default function SEOServicesSection({
	header,
	services,
	columns,
	overlapPrevious = false,
}: ServicesSectionData & { overlapPrevious?: boolean }) {
	if (!services?.length && !header) return null;

	const hasCta = !!header?.cta_btn?.filter((b) => b.cta_text && b.url).length;
	const align = hasCta ? 'left' : 'center';

	return (
		<section className={cn('py-16 lg:py-24 relative z-10', overlapPrevious && 'lg:mt-[-280px]')}>
			<SectionContainer className='flex flex-col gap-12 lg:gap-16'>
				<SectionHeader
					header={header}
					align={align}
					showCta={true}
					headingClassName='text-[40px] lg:text-[52px] leading-[125%] lg:leading-[125%] tracking-[-0.025em] lg:tracking-[-0.025em]'
					descriptionClassName='max-w-[588px]'
				/>

				{!!services?.length && (
					<ul
						role='list'
						className={cn(
							'grid list-none grid-cols-1 gap-8',
							columns === 3 && 'md:grid-cols-2 lg:grid-cols-3',
							columns === 4 && 'md:grid-cols-2 lg:grid-cols-4',
							columns !== 3 && columns !== 4 && 'md:grid-cols-2',
						)}>
						{services.map((item, index) => (
							<AnimatedFadeUp key={item._key ?? index} as='li' className='h-full'>
								<div className='relative group bg-[#0F1F38]/20 rounded-xl p-8 flex items-start gap-6 border border-transparent transition-all duration-300 hover:bg-[#0f1f38]/35 hover:shadow-[0_8px_20px_rgba(199,147,61,0.08)] h-full'>
									<PremiumCardBorder />
									<div className='w-22 h-22 flex items-center justify-center shrink-0 relative z-10'>
										{item.icon && <DynamicIcon icon={item.icon} size={88} className='w-22 h-22' />}
									</div>
									<div className='flex flex-col gap-2 relative z-10'>
										<h3 className='font-heading font-bold text-2xl text-white leading-[125%]'>{item.title}</h3>
										{item.description && (
											<p className='font-heading font-medium text-base text-[#B4BAC2] leading-[112%]'>{item.description}</p>
										)}
									</div>
								</div>
							</AnimatedFadeUp>
						))}
					</ul>
				)}
			</SectionContainer>
		</section>
	);
}
