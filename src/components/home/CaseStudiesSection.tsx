import { cn } from '@/lib/utils';
import { stegaClean } from 'next-sanity';
import SectionHeader from '@/components/layout/SectionHeader';
import { CardsGridSectionData, CaseStudyItem } from '@/sanity/types';
import { HomeCaseStudyCard, ListingCaseStudyCard } from '@/components/cards/CaseStudyCard';
import type { ComponentType } from 'react';
import SectionContainer from '@/components/layout/SectionContainer';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';

const cardVariantMap: Record<'primary' | 'secondary', ComponentType<CaseStudyItem>> = {
	primary: HomeCaseStudyCard,
	secondary: ListingCaseStudyCard,
};

export default function CaseStudiesSection(props: CardsGridSectionData) {
	const allCaseStudies = props?.caseStudies;
	const case_studies = props?.maxCardToShow ? allCaseStudies?.slice(0, props.maxCardToShow) : allCaseStudies;
	// stegaClean strips the invisible stega metadata the Presentation Tool encodes into
	// strings in draft mode — without it this key never matches 'primary'/'secondary' and
	// the map lookup returns undefined, crashing the render.
	const cardVariant = stegaClean(props?.cardVariant) ?? 'primary';
	const CardComponent = cardVariantMap[cardVariant] ?? HomeCaseStudyCard;

	return (
		<section className='relative overflow-hidden bg-background py-16 lg:py-24 2xl:pb-[139px] 2xl:pt-[167px]'>
			<SectionContainer className='relative z-10 grid gap-16'>
				<SectionHeader header={props.header} descriptionClassName='max-w-[525px]' />

				{case_studies && case_studies.length > 0 && (
					<div
						className={cn(
							cardVariant == 'primary' && 'grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-8',
							cardVariant == 'secondary' && 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 lg:gap-8',
						)}>
						{case_studies.map((study, i) => (
							<AnimatedFadeUp key={`${study._id}-${i}`} className='h-full'>
								<CardComponent {...study} />
							</AnimatedFadeUp>
						))}
					</div>
				)}
			</SectionContainer>
		</section>
	);
}
