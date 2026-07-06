import TrustedBySection from '@/components/home/TrustedBySection';
import type { CompanyLogoSectionData } from '@/sanity/types';
import { cn } from '@/lib/utils';

export default function CompanyLogoSection({
	partnerText,
	logos,
	autoPlay,
	autoPlaySpeed,
	overlapPrevious = false,
}: Partial<CompanyLogoSectionData> & { overlapPrevious?: boolean } = {}) {
	if (!logos?.length) return null;

	return (
		<section
			aria-label='Partnered and trusted by top platforms'
			className={cn('relative z-10 pb-12 lg:pb-20', overlapPrevious && 'lg:mt-[-134px]')}>
			<TrustedBySection label={partnerText} logos={logos} autoPlay={autoPlay} autoPlaySpeed={autoPlaySpeed} />
		</section>
	);
}
