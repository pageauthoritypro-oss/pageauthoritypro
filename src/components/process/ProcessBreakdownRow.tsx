import { cn } from '@/lib/utils';
import DynamicIcon from '@/components/DynamicIcon';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import type { GrowthPhaseDetailsCard } from '@/sanity/types';

interface Props {
	card: GrowthPhaseDetailsCard;
	index: number;
	isLast?: boolean;
}

export default function ProcessBreakdownRow({ card, index, isLast = false }: Props) {
	const badge = card.badgeNumber ?? String(index + 1).padStart(2, '0');
	const anchor = `phase-${badge}`;

	return (
		<AnimatedFadeUp>
			<article
				id={anchor}
				aria-labelledby={`breakdown-${anchor}-heading`}
				className={cn(
					'grid gap-10 py-12 lg:grid-cols-[280px_1px_1fr] lg:gap-12',
					!isLast && 'border-b border-white/6',
				)}>
				{/* Left: badge + title + description */}
				<div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
					<div
						aria-hidden='true'
						className='mb-6 flex h-15.75 w-15.75 items-center justify-center rounded-full border-[1.5px] border-brand-gold'
						style={{ background: 'radial-gradient(circle at center, #241A0A, #060D15)' }}>
						<span className='font-heading text-[32px] font-bold leading-none tracking-[-1.3px] text-brand-gold'>
							{badge}
						</span>
					</div>

					<h3
						id={`breakdown-${anchor}-heading`}
						className='mb-3 font-heading text-[32px] font-bold leading-tight tracking-[-1.3px] text-text-heading'>
						{card.title}
					</h3>

					{card.description && (
						<p className='max-w-65 text-base font-normal leading-[1.12] text-text-muted'>
							{card.description}
						</p>
					)}
				</div>

				{/* Vertical divider — desktop only */}
				<div aria-hidden='true' className='hidden w-px bg-white/6 lg:block' />

				{/* Right: checklist */}
				<div>
					{card.checklistTitle && (
						<h4 className='mb-6 font-heading text-[24px] font-bold leading-tight text-brand-gold'>
							{card.checklistTitle}
						</h4>
					)}

					{!!card.checkpoints?.length && (
						<ul
							className='grid gap-x-10 gap-y-3.5 sm:grid-cols-2'
							aria-label={`${card.checklistTitle ?? card.title} checklist`}>
							{card.checkpoints.map((cp, i) => (
								<li key={`${cp.text}-${i}`} className='flex items-start gap-2.5'>
									{cp.icon && (
										<DynamicIcon
											icon={cp.icon}
											size={16}
											className='mt-0.5 shrink-0 text-brand-gold'
											aria-hidden='true'
										/>
									)}
									<span className='text-sm font-medium leading-tight text-text-muted'>
										{cp.text}
									</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</article>
		</AnimatedFadeUp>
	);
}
