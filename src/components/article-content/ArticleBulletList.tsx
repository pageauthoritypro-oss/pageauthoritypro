interface Props {
	children: React.ReactNode;
}

function CheckIcon() {
	return (
		<svg className='w-5 h-5 text-[#C7933D] shrink-0 mt-0.5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth='2'>
			<path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
		</svg>
	);
}

export function ArticleBulletList({ children }: Props) {
	return <ul className='flex flex-col gap-3 mb-7.5'>{children}</ul>;
}

export function ArticleBulletListItem({ children }: Props) {
	return (
		<li className='flex items-start gap-3 font-heading font-normal text-[16px] leading-[24px] text-white'>
			<CheckIcon />
			<span>{children}</span>
		</li>
	);
}
