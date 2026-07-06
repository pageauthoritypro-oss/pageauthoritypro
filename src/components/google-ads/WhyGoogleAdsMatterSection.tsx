import SectionContainer from '@/components/layout/SectionContainer';
import DynamicIcon from '@/components/DynamicIcon';
import DynamicHeading from '@/components/DynamicHeading';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import type { ServicesSectionData } from '@/sanity/types';
import { cn } from '@/lib/utils';
import PremiumCardBorder from '@/components/PremiumCardBorder';

interface Props {
	data?: ServicesSectionData;
	overlapPrevious?: boolean;
}

export default function WhyGoogleAdsMatterSection({ data, overlapPrevious = false }: Props) {
	const bullets = data?.bullets ?? [];
	const desc = data?.header?.description;
	const services = data?.services ?? [];

	return (
		<section className={cn('w-full py-16 lg:py-24 relative z-10', overlapPrevious && 'lg:mt-[-280px]')}>
			<SectionContainer className='flex flex-col gap-16'>
				<div className='flex flex-col items-center gap-4 text-center'>
					{data?.header?.heading && (
						<DynamicHeading
							heading={data.header.heading}
							tag={data.header.headingTag}
							defaultTag='h2'
							align='center'
							className='font-heading font-medium text-[32px] lg:text-[52px] text-white text-center leading-[125%] tracking-[-1.3px]'
						/>
					)}
					<div className='flex flex-col items-center gap-3'>
						{bullets.length > 0 && (
							<AnimatedFadeUp delay={0.08}>
								<div className='flex flex-wrap justify-center items-center gap-3'>
									{bullets.map((bullet, index) => (
										<span
											key={index}
											className='flex items-center gap-2 font-heading font-normal text-[16px] text-[#B5BBC3]'
											style={{ lineHeight: '22px' }}>
											{bullet.logo && <DynamicIcon icon={bullet.logo} size={14} className='text-[#C7933D] shrink-0' />}
											{bullet.description}
										</span>
									))}
								</div>
							</AnimatedFadeUp>
						)}
						{desc && (
							<AnimatedFadeUp delay={0.16}>
								<p className='font-heading font-normal text-[16px] text-[#B5BBC3] max-w-[588px]' style={{ lineHeight: '22px' }}>
									{desc}
								</p>
							</AnimatedFadeUp>
						)}
					</div>
				</div>

				{/* Cards — 2 per row, gap 20px */}
				{services.length > 0 && (
					<ul role='list' className='list-none grid grid-cols-1 sm:grid-cols-2 gap-5'>
						{services.map((item, index) => (
							<AnimatedFadeUp key={item._key ?? index} as='li' className='h-full'>
								<div className='relative group bg-[#0F1F38]/20 rounded-2xl p-8 flex items-start gap-6 border border-transparent transition-all duration-300 h-full'>
									<PremiumCardBorder />
									{item.icon && (
										<div className='relative z-10 flex h-[72px] w-[72px] aspect-square items-center justify-center text-[#C7933D] shrink-0'>
											<DynamicIcon icon={item.icon} className='w-full h-full' />
										</div>
									)}
									<div className='flex flex-col gap-3 relative z-10'>
										<h3 className='font-heading font-bold text-2xl text-white leading-[125%]'>{item.title}</h3>
										{item?.description && (
											<p className='font-heading font-normal text-[15px] text-[#B5BBC3] leading-[22px]'>{item.description}</p>
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
