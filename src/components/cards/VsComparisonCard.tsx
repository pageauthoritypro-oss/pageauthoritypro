import { cn } from '@/lib/utils';
import type { VsComparisonSectionData } from '@/sanity/types';
import DynamicIcon from '@/components/DynamicIcon';

type ColumnData = NonNullable<VsComparisonSectionData['columns']>[number];

interface VsComparisonCardProps {
	column: ColumnData;
}

export default function VsComparisonCard({ column }: VsComparisonCardProps) {
	const isBrand = column.type === 'brand';
	const isSecondary = column.type === 'secondary';

	return (
		<div
			className={cn(
				'relative w-full lg:shrink-0 rounded-xl p-8 pb-20 flex-1 flex flex-col items-center gap-8 md:gap-12',
				isBrand ? 'shadow-[inset_0_0_146.5px_-91px_#C7933D] card-gold-gradient-border' : 'bg-[#0f1f38]/20 border-[5px] border-[#555555]',
			)}>
			<div className='flex flex-col items-center justify-center gap-4 sm:gap-6 w-full'>
				{column.icon && (
					<div className='w-16 h-16 sm:w-24 sm:h-24 flex items-center justify-center shrink-0'>
						<DynamicIcon icon={column.icon} size={96} className='w-full h-full object-contain' />
					</div>
				)}

				<h3 className='font-heading font-bold text-2xl sm:text-3xl text-white text-center flex items-center justify-center select-none'>
					{column.heading}
				</h3>
			</div>

			<ul className='w-auto mx-auto flex flex-col justify-center gap-3'>
				{column.items?.map((feature, idx) => {
					if (!feature || !feature.name) return null;
					return (
						<li key={idx} className='flex flex-row items-start gap-3 w-full'>
							<DynamicIcon
								icon={feature.icon || 'circle-check'}
								className={cn('w-5 h-5 shrink-0 mt-0.5', isSecondary ? 'text-[#555555]' : 'text-brand-gold')}
								size={20}
							/>
							<span className='font-heading font-medium text-base leading-5 text-text-muted hover:text-white transition-colors duration-200 select-none'>
								{feature.name}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
