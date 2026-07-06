interface Testimonial {
	_id?: string;
	_key?: string;
	rating?: number;
	quote: string;
	author?: string;
	designation?: string;
}

interface Props {
	id?: string;
	title?: string;
	testimonials?: Testimonial[];
}

export default function TestimonialBlock({ id, title, testimonials }: Props) {
	if (!testimonials || testimonials.length === 0) return null;
	return (
		<div className='mb-7.5'>
			{title && (
				<h3 id={id} className='font-heading font-bold text-[20px] leading-[28px] text-white mb-4 scroll-mt-24'>
					{title}
				</h3>
			)}
			<ul role='list' className='flex list-none flex-col gap-5'>
				{testimonials.map((item, i) => (
					<li
						key={item._key ?? i}
						className='px-6 pt-2 pb-3 bg-[rgba(9,17,29,0.2)] border border-white/5 border-l-4 border-l-[#C7933D] rounded-r-2xl space-y-3'>
						{item.rating && item.rating > 0 && (
							<div className='flex gap-1'>
								{Array.from({ length: item.rating }).map((_, si) => (
									<svg key={si} className='w-5 h-5 fill-[#C7933D]' viewBox='0 0 20 20'>
										<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
									</svg>
								))}
							</div>
						)}
						<blockquote className='font-heading font-medium text-[16px] leading-[26px] text-white italic'>
							&ldquo;{item.quote}&rdquo;
						</blockquote>
						{item.author && (
							<cite className='not-italic font-heading font-medium text-sm leading-5 text-white'>
								— {item.author}{item.designation ? `, ${item.designation}` : ''}
							</cite>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
