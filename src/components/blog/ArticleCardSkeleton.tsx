export default function ArticleCardSkeleton() {
	return (
		<div className='flex flex-col rounded-lg overflow-hidden border-t border-[#8C8C8C]/15 bg-[#08101C] animate-pulse'>
			<div className='aspect-video w-full bg-white/5' />
			<div className='flex flex-col justify-between gap-3 p-8 flex-1'>
				<div className='flex flex-col gap-3'>
					<div className='h-5 w-3/4 rounded bg-white/10' />
					<div className='h-4 w-full rounded bg-white/5' />
					<div className='h-4 w-2/3 rounded bg-white/5' />
				</div>
				<div className='flex items-center justify-between gap-3 pt-3.5 border-t border-[#B5BBC3]/15'>
					<div className='flex items-center gap-3'>
						<div className='w-8 h-8 rounded-full bg-white/10 shrink-0' />
						<div className='flex flex-col gap-1'>
							<div className='h-3 w-20 rounded bg-white/10' />
							<div className='h-2.5 w-14 rounded bg-white/5' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
