import { cn } from '@/lib/utils';
import PracticeAreaCard from '@/components/home/PracticeAreaCard';
import type { SpecializedAreaSectionData } from '@/sanity/types';
import SectionHeader from '@/components/layout/SectionHeader';
import SectionContainer from '@/components/layout/SectionContainer';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';

const COLUMN_CLASS: Record<number, string> = {
	2: 'lg:grid-cols-2',
	3: 'lg:grid-cols-3',
	4: 'lg:grid-cols-4',
};

export default function AreasOfLawSection({ header, areas, columns }: SpecializedAreaSectionData) {
	const heading = header?.heading?.filter((h) => h.text);
	const colClass = COLUMN_CLASS[columns ?? 4] ?? 'lg:grid-cols-4';
	const ctaPosition = header?.cta_button_position;

	if (!heading?.length && !header?.description && !areas?.length) return null;

	return (
		<section className='bg-background relative z-30 py-16 lg:py-24'>
			<SectionContainer>
				<SectionHeader
					header={header}
					align={ctaPosition === 'center' ? 'center' : 'left'}
					headingClassName='text-white font-medium leading-none tracking-[-0.5px]'
					descriptionClassName='text-text-muted mt-2 lg:mt-3'
				/>

				{areas?.length ? (
					<ul
						className={cn('mt-6 grid list-none grid-cols-1 gap-2 sm:grid-cols-2 lg:mt-10', colClass)}
						role='list'
						aria-label='Practice areas we serve'>
						{areas.map((area) => (
							<AnimatedFadeUp key={area.title} as='li' className='h-full'>
								<PracticeAreaCard title={area.title} description={area.description ?? ''} icon={area.icon} />
							</AnimatedFadeUp>
						))}
					</ul>
				) : null}
			</SectionContainer>
		</section>
	);
}
