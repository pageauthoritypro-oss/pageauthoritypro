export default function PremiumCardBorder() {
	return (
		<>
			{/* Default Border (White 18% Opacity) */}
			<div
				aria-hidden='true'
				className='absolute inset-0 transition-opacity duration-300'
				style={{
					borderRadius: 'inherit',
					padding: 1,
					background:
						'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.18) 100%)',
					WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					WebkitMaskComposite: 'xor',
					maskComposite: 'exclude',
					pointerEvents: 'none',
				}}
			/>
			{/* Hover Border (Gold) */}
			<div
				aria-hidden='true'
				className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'
				style={{
					borderRadius: 'inherit',
					padding: 1,
					background:
						'linear-gradient(135deg, rgba(199,147,61,1) 0%, rgba(199,147,61,0) 50%, rgba(199,147,61,1) 100%)',
					WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
					WebkitMaskComposite: 'xor',
					maskComposite: 'exclude',
					pointerEvents: 'none',
				}}
			/>
		</>
	);
}
