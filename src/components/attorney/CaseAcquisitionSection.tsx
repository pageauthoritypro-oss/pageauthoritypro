import type { CaseAcquisitionSectionData } from '@/sanity/types';
import SectionHeader from '@/components/layout/SectionHeader';
import SectionContainer from '@/components/layout/SectionContainer';
import DynamicIcon from '@/components/DynamicIcon';
import Section from '@/components/layout/Section';
import PremiumCardBorder from '@/components/PremiumCardBorder';

export default function CaseAcquisitionSection(props: CaseAcquisitionSectionData) {
	const header = props.header;
	const cards = props.cards;

	const heading = header?.heading?.filter((h) => h.text);
	if (!heading?.length && !header?.description && !cards?.length) return null;

	return (
		<Section className='z-30'>
			<SectionContainer className='relative z-10 flex flex-col items-center gap-[62px] max-w-7xl'>
				<SectionHeader
					header={header}
					align='center'
					headingClassName='text-white font-medium text-3xl sm:text-4xl lg:text-[52px] lg:leading-[120%] tracking-[-1px] text-center font-heading'
					descriptionClassName='text-text-muted mt-3 mx-auto text-center text-base lg:text-lg font-heading'
					showCta={false}
				/>

				{cards && cards.length > 0 && (
					<ul
						role='list'
						className='flex list-none flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-[26px] w-full'>
						{cards.map((card, index) => {
							const { title, icon } = card;
							return (
								<li
									key={index}
									className='relative group flex flex-col justify-end items-center p-[32px_20px] gap-[48px] w-[219.2px] h-[227px] bg-[#0f1f38]/20 border border-transparent rounded-[12px] transition-all duration-300 hover:bg-[#0f1f38]/35 hover:shadow-[0_8px_20px_rgba(199,147,61,0.08)]'>
									<PremiumCardBorder />
									<div className='case-acquisition-icon flex items-center justify-center w-[75px] h-[75px] text-[#C7933D] transition-transform duration-300 hover:scale-105'>
										{icon && <DynamicIcon icon={icon} size={75} />}
									</div>

									<h3 className='font-heading text-[20px] font-bold leading-[125%] text-center text-white w-full'>{title}</h3>
								</li>
							);
						})}
					</ul>
				)}
			</SectionContainer>
		</Section>
	);
}
