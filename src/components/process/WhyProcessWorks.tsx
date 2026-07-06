import Image from 'next/image';
import DynamicHeading from '@/components/DynamicHeading';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import type { SanityHeadingPart, HowItWorksCard } from '@/sanity/types';
import SectionContainer from '@/components/layout/SectionContainer';

interface Props {
	heading?: SanityHeadingPart[];
	headingTag?: string;
	cards?: HowItWorksCard[];
}

export default function WhyProcessWorks({ heading, headingTag, cards }: Props) {
	return (
		<section className='bg-background py-16 lg:py-24'>
			<SectionContainer>
				<DynamicHeading heading={heading} tag={headingTag} className='mb-12 text-center' align='center' defaultTag='h2' />

				<div className='overflow-hidden rounded-2xl border border-white/6 bg-[#0F1F38]/20 p-10'>
					{!!cards?.length && (
						<ul role='list' className='grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-16 lg:grid-cols-4 lg:gap-6'>
							{cards.map((card, i) => (
								<AnimatedFadeUp key={i} as='li' className='flex flex-col items-center text-center h-full'>
									{card.icon?.url && (
										<div aria-hidden='true' className='mb-5'>
											<Image
												src={card.icon.url}
												alt={card.icon.alt ?? card.title}
												width={88}
												height={88}
												className='h-22 w-22 object-contain'
											/>
										</div>
									)}

									<h3 className='mb-2.5 font-heading text-[24px] font-bold leading-tight text-text-heading'>{card.title}</h3>

									{card.description && (
										<p className='max-w-55 text-base font-normal leading-[1.12] text-text-muted'>{card.description}</p>
									)}
								</AnimatedFadeUp>
							))}
						</ul>
					)}
				</div>
			</SectionContainer>
		</section>
	);
}
