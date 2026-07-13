import { stegaClean } from 'next-sanity';
import SectionHeader from '@/components/layout/SectionHeader';
import { CardsGridSectionData } from '@/sanity/types';
import SectionContainer from '@/components/layout/SectionContainer';
import CaseStudiesClient from './CaseStudiesClient';
import { fetchCaseStudiesPage } from '@/sanity/actions/listing-actions';

export default async function CaseStudiesSection(props: CardsGridSectionData) {
	// stegaClean strips the invisible stega metadata the Presentation Tool encodes into
	// strings in draft mode — without it this key never matches 'primary'/'secondary' and
	// the map lookup returns undefined, crashing the render.
	const cardVariant = (stegaClean(props?.cardVariant) ?? 'primary') as 'primary' | 'secondary';
	const limit = props.cardsPerPage || 6;
	const useManualOrder = props.useManualOrder === true;
	const manualCaseStudies = props.caseStudies ?? [];

	const { caseStudies, totalPages } = await fetchCaseStudiesPage({
		page: 1,
		limit,
		useManualOrder,
		manualCaseStudies,
	});

	return (
		<section id='case-studies-list' className='relative overflow-hidden bg-background py-16 lg:py-24 2xl:pb-[139px] 2xl:pt-[167px] scroll-mt-24'>
			<SectionContainer className='relative z-10 grid gap-16'>
				<SectionHeader header={props.header} descriptionClassName='max-w-[525px]' />
				<CaseStudiesClient
					cardVariant={cardVariant}
					initialCaseStudies={caseStudies}
					initialTotalPages={totalPages}
					limit={limit}
					useManualOrder={useManualOrder}
					manualCaseStudies={manualCaseStudies}
				/>
			</SectionContainer>
		</section>
	);
}
