import PremiumCardBorder from '@/components/PremiumCardBorder';

interface Checkpoint {
	_key?: string;
	icon?: string;
	text: string;
}

interface Card {
	_key?: string;
	badgeNumber?: string;
	title: string;
	description?: string;
	checkpoints?: Checkpoint[];
}

interface Props {
	cards?: Card[];
}

function CheckIcon() {
	return (
		<svg className='w-4 h-4 text-[#C7933D] shrink-0 mt-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
			<path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
		</svg>
	);
}

export default function DetailedCardsGrid({ cards }: Props) {
	if (!cards || cards.length === 0) return null;
	return (
		<ul role='list' className='mb-7.5 grid list-none grid-cols-1 md:grid-cols-2 gap-5'>
			{cards.map((card, i) => {
				const badgeNumber = card.badgeNumber || String(i + 1).padStart(2, '0');
				return (
					<li
						key={card._key ?? i}
						className='relative group flex flex-col p-6 bg-[#0F1F38]/20 border border-transparent rounded-2xl transition-all duration-300 hover:bg-[#0f1f38]/35 hover:shadow-[0_8px_20px_rgba(199,147,61,0.08)]'>
						<PremiumCardBorder />
						<div className='flex items-center gap-3 mb-2 relative z-10'>
							<span className='font-heading font-bold text-[12px] leading-[16px] text-[#E8A020]'>{badgeNumber}</span>
							<h4 className='font-heading font-bold text-[16px] leading-[24px] text-white'>{card.title}</h4>
						</div>
						{card.description && (
							<p className='font-heading font-normal text-[13px] leading-[20px] text-[#B4BAC2] mb-4 relative z-10'>
								{card.description}
							</p>
						)}
						{card.checkpoints && card.checkpoints.length > 0 && (
							<ul className='flex flex-col gap-2.5 mt-auto relative z-10'>
								{card.checkpoints.map((cp, ci) => (
									<li key={cp._key ?? ci} className='flex items-start gap-2.5'>
										<CheckIcon />
										<span className='font-heading font-normal text-[13px] leading-[18px] text-white'>{cp.text}</span>
									</li>
								))}
							</ul>
						)}
					</li>
				);
			})}
		</ul>
	);
}
