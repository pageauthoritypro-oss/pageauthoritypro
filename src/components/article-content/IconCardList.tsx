import DynamicIcon from '@/components/DynamicIcon';

interface Card {
	_key?: string;
	icon?: Record<string, unknown>;
	title: string;
	subtitle?: string;
}

interface Props {
	cards?: Card[];
}

export default function IconCardList({ cards }: Props) {
	if (!cards || cards.length === 0) return null;
	return (
		<ul role='list' className='mb-7.5 grid list-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
			{cards.map((card, i) => (
				<li
					key={card._key ?? i}
					className='flex flex-col items-start p-4 bg-[rgba(199,147,61,0.07)] border border-white/5 rounded-2xl hover:border-[#C7933D]/20 transition-colors duration-300'>
					{card.icon && (
						<div className='mb-4'>
							<DynamicIcon icon={card.icon as never} size={24} className='text-[#C7933D]' />
						</div>
					)}
					<h4 className='font-heading font-medium text-[14px] leading-[20px] text-white mb-1'>
						{card.title}
					</h4>
					{card.subtitle && (
						<p className='font-heading font-normal text-[12px] leading-[16px] text-[#C3C3C3]'>
							{card.subtitle}
						</p>
					)}
				</li>
			))}
		</ul>
	);
}
