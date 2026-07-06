import { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { Marquee } from '@/components/shadcn-space/animations/marquee';
import DynamicIcon from '@/components/DynamicIcon';
import type { SanityLogoItem } from '@/sanity/types';
import SectionContainer from '@/components/layout/SectionContainer';

interface TrustedBySectionProps {
	label?: string;
	logos: SanityLogoItem[];
	autoPlay?: boolean;
	autoPlaySpeed?: number; // seconds for one full cycle
	className?: string;
}

export default function TrustedBySection({ label, logos, autoPlay, autoPlaySpeed = 20, className }: TrustedBySectionProps) {
	if (!logos.length) return null;

	return (
		<SectionContainer className={cn('flex flex-col gap-6', className)}>
			{label && (
				<p
					className='font-heading text-center text-base font-normal leading-5.5 tracking-[0.08em] uppercase text-brand-gold'
					style={{ textShadow: '0 4px 4px rgba(6,13,21,0.25)' }}>
					{label}
				</p>
			)}

			{autoPlay ? (
				<div
					className='overflow-hidden rounded-[20px] border border-white/8 bg-[#0F1F38]/20 h-20 mask-fade-x'
					role='list'
					aria-label='Platform partners'>
					<Marquee className='h-full p-0 [--gap:0px]' style={{ '--duration': `${autoPlaySpeed}s` } as React.CSSProperties} repeat={2}>
						{logos.map((logo, i) => (
							<div key={i} role='listitem' className='flex shrink-0 items-center justify-center px-10'>
								<DynamicIcon icon={logo} className='max-h-12 w-auto object-contain' />
							</div>
						))}
					</Marquee>
				</div>
			) : (
				<>
					{/* Desktop */}
					<div
						className='hidden rounded-[20px] border border-white/8 bg-[#0F1F38]/20 lg:flex h-20 items-center justify-between px-18'
						role='list'
						aria-label='Platform partners'>
						{logos.map((logo, i) => (
							<Fragment key={i}>
								<div role='listitem' className='flex items-center justify-center'>
									<DynamicIcon
										icon={logo}
										className='max-h-12 w-auto object-contain'
									/>
								</div>
								{i < logos.length - 1 && <div aria-hidden='true' className='h-8 w-px shrink-0 bg-white/10' />}
							</Fragment>
						))}
					</div>

					{/* Mobile */}
					<div
						className='flex flex-wrap items-center justify-center gap-8 rounded-[20px] border border-white/8 bg-[#0F1F38]/20 px-6 py-8 lg:hidden'
						role='list'
						aria-label='Platform partners'>
						{logos.map((logo, i) => (
							<div key={i} role='listitem'>
								<DynamicIcon
									icon={logo}
									className='h-8 w-auto object-contain'
								/>
							</div>
						))}
					</div>
				</>
			)}
		</SectionContainer>
	);
}
