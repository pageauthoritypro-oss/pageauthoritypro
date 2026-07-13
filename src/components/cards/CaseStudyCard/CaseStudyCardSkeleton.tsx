export default function CaseStudyCardSkeleton() {
	return (
		<div className='rounded-[6px] overflow-hidden h-full bg-linear-to-br from-[#000000] to-[#010509] animate-pulse'>
			<div className='w-full min-h-60 bg-white/5' />
			<div className='p-5 pt-6 flex flex-col gap-4'>
				<div className='h-3 w-24 rounded bg-white/10' />
				<div className='h-5 w-3/4 rounded bg-white/10' />
				<div className='grid grid-cols-3 gap-4 mt-4'>
					<div className='h-8 rounded bg-white/5' />
					<div className='h-8 rounded bg-white/5' />
					<div className='h-8 rounded bg-white/5' />
				</div>
			</div>
		</div>
	);
}
