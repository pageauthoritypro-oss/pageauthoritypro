import type { WebsitesUnderperformSectionData } from '@/sanity/types';
import DynamicIcon from '@/components/DynamicIcon';
import SectionHeader from '@/components/layout/SectionHeader';
import CtaLink from '@/components/CtaLink';
import Section from '@/components/layout/Section';
import SectionContainer from '@/components/layout/SectionContainer';
import PremiumCardBorder from '@/components/PremiumCardBorder';

interface WebsitesUnderperformSectionProps {
	data?: Partial<WebsitesUnderperformSectionData>;
}

export default function WebsitesUnderperformSection({ data }: WebsitesUnderperformSectionProps) {
	if (!data || !data.cards) return null;

	const heading = data.heading;
	const footerText = data.footerText || '';
	const ctaButtons = heading?.cta_btn || [];

	const firstRowCards = data.cards.slice(0, 4);
	const secondRowCards = data.cards.slice(4, 6);

	return (
		<Section className='flex flex-col items-center'>
			<SectionContainer className='relative z-10 flex flex-col gap-10 lg:gap-16'>
				<SectionHeader
					header={heading}
					align='center'
					headingClassName='font-normal text-white lg:leading-[70px]'
					descriptionClassName='text-sm sm:text-base leading-relaxed max-w-[500px]'
					className='w-full max-w-6xl mx-auto'
					showCta={false}
				/>

				<div className='flex flex-col gap-6 w-full'>
					<ul className='list-none grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
						{firstRowCards.map((card, idx) => {
							if (!card) return null;
							return (
								<li
									key={idx}
									className='relative group flex flex-col items-center justify-center py-6 px-4 sm:py-8 sm:px-5 gap-4 sm:gap-5 rounded-xl bg-[#0f1f38]/20 border border-transparent'>
									<PremiumCardBorder />
									{card.icon && (
										<div className='w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] flex items-center justify-center'>
											<DynamicIcon icon={card.icon} size={75} className='w-full h-full object-contain' />
										</div>
									)}
									<h3 className='font-heading font-bold text-xl sm:text-2xl leading-tight text-white text-center select-none'>
										{card.title}
									</h3>
								</li>
							);
						})}
					</ul>

					<ul className='list-none grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
						{secondRowCards.map((card, idx) => {
							if (!card) return null;
							return (
								<li
									key={idx}
									className='relative group flex flex-col items-center justify-center py-6 px-4 sm:py-8 sm:px-5 gap-4 sm:gap-5 rounded-xl bg-[#0f1f38]/20 border border-transparent'>
									<PremiumCardBorder />
									{card.icon && (
										<div className='w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] flex items-center justify-center'>
											<DynamicIcon icon={card.icon} size={75} className='w-full h-full object-contain' />
										</div>
									)}
									<h3 className='font-heading font-bold text-xl sm:text-2xl leading-tight text-white text-center select-none'>
										{card.title}
									</h3>
								</li>
							);
						})}
					</ul>
				</div>

				{footerText && (
					<div className='w-full text-center'>
						<p className='font-heading font-normal text-lg sm:text-2xl leading-relaxed text-text-muted select-none'>{footerText}</p>
					</div>
				)}

				{!!ctaButtons.length && (
					<div className='flex flex-wrap items-center justify-center gap-4'>
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
					</div>
				)}
			</SectionContainer>
		</Section>
	);
}
