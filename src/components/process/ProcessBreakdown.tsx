import ProcessBreakdownRow from '@/components/process/ProcessBreakdownRow';
import type { GrowthPhaseDetailsCard } from '@/sanity/types';
import SectionContainer from '@/components/layout/SectionContainer';

interface Props {
	cards?: GrowthPhaseDetailsCard[];
}

export default function ProcessBreakdown({ cards }: Props) {
	if (!cards?.length) return null;

	return (
		<section
			aria-label='Detailed breakdown of our four-phase growth process'
			className='bg-background py-16 lg:py-24'>
			<SectionContainer>
				<div className='overflow-hidden rounded-2xl border border-white/6 bg-[#0F1F38]/20 px-6 sm:px-10'>
					{cards.map((card, i) => (
						<ProcessBreakdownRow
							key={card.badgeNumber ?? i}
							card={card}
							index={i}
							isLast={i === cards.length - 1}
						/>
					))}
				</div>
			</SectionContainer>
		</section>
	);
}
