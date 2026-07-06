import SectionContainer from '@/components/layout/SectionContainer';
import SectionHeader from '@/components/layout/SectionHeader';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import DynamicIcon from '@/components/DynamicIcon';
import type { ResultsMattersSectionData } from '@/sanity/types';
import PremiumCardBorder from '@/components/PremiumCardBorder';

interface Props {
	data?: ResultsMattersSectionData;
}

export default function ResultsSection({ data }: Props) {
	const cards = data?.cards ?? [];

	return (
		<section className='w-full bg-[#060D15] py-16 lg:py-24'>
			<SectionContainer className='flex flex-col gap-[62px]'>
				<SectionHeader
					header={data?.header}
					align='left'
					showCta={true}
					headingClassName='text-[40px] lg:text-[52px] leading-[120%] tracking-[-1px]'
				/>

				{cards.length > 0 && (
					<ul role='list' className='grid list-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[26px]'>
						{cards.map((card, index) => {
							const { title, icon } = card;
							return (
								<AnimatedFadeUp key={card._key ?? index} as='li' className='h-full'>
									<div className='relative group flex flex-col items-center gap-12 py-8 px-5 text-center rounded-xl bg-[rgba(15,31,56,0.2)] border border-transparent transition-all duration-300 hover:bg-[#0f1f38]/35 hover:shadow-[0_8px_20px_rgba(199,147,61,0.08)] h-full justify-between'>
										<PremiumCardBorder />
										<div className='relative z-10'>{icon && <DynamicIcon icon={icon} />}</div>
										<h3
											className='relative z-10 flex items-center justify-center max-w-[75%] font-heading font-bold text-[20px] text-white whitespace-pre-line text-balance'
											style={{ lineHeight: '125%' }}>
											{title}
										</h3>
									</div>
								</AnimatedFadeUp>
							);
						})}
					</ul>
				)}
			</SectionContainer>
		</section>
	);
}
