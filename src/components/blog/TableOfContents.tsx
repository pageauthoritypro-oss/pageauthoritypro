import Link from 'next/link';

export default function TableOfContents({ items }: { items: string[] }) {
	return (
		<div className='rounded-xl bg-[#0F1F38]/20 p-6 flex flex-col gap-4'>
			<span className='font-heading font-bold text-[18px] leading-[125%] text-[#C7933D]'>Table Of Content</span>
			<ul className='flex flex-col gap-4'>
				{items.map((item, i) => (
					<li key={i}>
						<Link
							href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
							className='font-heading font-medium text-[16px] leading-[112%] text-[#B4BAC2] hover:text-white transition-colors'>
							{item}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
