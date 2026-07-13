export default function DraftModeBanner() {
	return (
		<div className='fixed inset-x-0 bottom-0 z-[9999] flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-[#C7933D] px-4 py-2 text-center text-sm font-medium text-[#08101C]'>
			<span>Draft mode is on — you&apos;re seeing preview content, and maintenance mode is bypassed.</span>
			<a href='/api/draft-mode/disable' className='font-bold underline'>
				Exit draft mode
			</a>
		</div>
	);
}
