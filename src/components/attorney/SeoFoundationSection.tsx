import type { SeoFoundationSectionData, SeoFoundationCardItem } from '@/sanity/types';
import SectionHeader from '@/components/layout/SectionHeader';
import DynamicIcon from '@/components/DynamicIcon';
import Section from '@/components/layout/Section';
import SectionContainer from '@/components/layout/SectionContainer';

interface SeoCardProps {
	items?: SeoFoundationCardItem[] | string;
}

const SeoCard = ({ items }: SeoCardProps) => {
	if (!items) return null;

	const itemsArray = Array.isArray(items) ? items : typeof items === 'string' ? [{ text: items } as SeoFoundationCardItem] : [];

	if (itemsArray.length === 0) return null;

	return (
		<div className='relative flex flex-col justify-start items-center p-6 sm:p-8 md:p-12 rounded-xl shadow-[inset_0_0_146.5px_-91px_#C7933D] transition-colors duration-300 min-h-[283px] card-gold-gradient-border'>
			<ul className='flex flex-col gap-6 items-start'>
				{itemsArray.map((item, idx) => (
					<li key={idx} className='flex flex-row items-center gap-3'>
						<DynamicIcon icon={item.icon ?? ''} size={20} className='w-5 h-5 shrink-0 text-brand-gold' />
						<span className='font-heading font-medium text-base sm:text-lg text-[#B4BAC2] hover:text-white transition-colors duration-200 select-none'>
							{item.text}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
};

export default function SeoFoundationSection(props: SeoFoundationSectionData) {
	const cards = props.cards;

	return (
		<Section className='flex flex-col items-center'>
			<SectionContainer className='relative z-10 flex flex-col gap-10 lg:gap-16'>
				<SectionHeader
					header={props.header}
					align='center'
					headingClassName='font-normal text-white lg:leading-[70px]'
					descriptionClassName='text-sm sm:text-base leading-relaxed max-w-[716px]'
					className='w-full text-center'
				/>

				{cards && cards.length > 0 && (
					<ul role='list' className='grid list-none grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto'>
						{cards.map((card, idx) => (
							<li key={idx}>
								<SeoCard items={card.items} />
							</li>
						))}
					</ul>
				)}
			</SectionContainer>
		</Section>
	);
}
