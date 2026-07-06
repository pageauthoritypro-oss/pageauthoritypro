interface CheckpointItem {
	_key?: string;
	icon?: 'check' | 'cancel' | 'checkCircle';
	text: string;
}

interface Props {
	checklist?: CheckpointItem[];
}

function CheckIcon({ type = 'checkCircle' }: { type?: string }) {
	if (type === 'cancel') {
		return (
			<svg className='w-5 h-5 text-red-400 shrink-0 mt-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
				<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
			</svg>
		);
	}
	return (
		<svg className='w-5 h-5 text-[#C7933D] shrink-0 mt-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
			<path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
		</svg>
	);
}

export default function ChecklistBlock({ checklist }: Props) {
	if (!checklist || checklist.length === 0) return null;
	return (
		<div className='mb-7.5 px-6 bg-[rgba(8,16,28,1)] rounded-2xl'>
			<ul className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3'>
				{checklist.map((item, i) => (
					<li key={item._key ?? i} className='flex items-start gap-2.5'>
						<CheckIcon type={item.icon} />
						<span className='font-heading font-normal text-[14px] leading-[20px] text-white'>
							{item.text}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}
