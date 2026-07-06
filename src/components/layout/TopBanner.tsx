'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const DISMISSED_KEY = 'top_banner_dismissed_until';

interface TopBannerProps {
	text: string;
	link?: string;
	variant?: 'primary' | 'secondary' | 'accent' | 'info';
}

// Only text + the internal separator border (between banner and navbar below it).
// Background is owned by NavbarContainer so both banner and navbar share the same bg.
const VARIANT: Record<string, string> = {
	primary: 'border-brand-gold/25 text-brand-gold',
	secondary: 'border-white/8        text-white/80',
	accent: 'border-blue-500/20    text-blue-300',
	info: 'border-sky-400/20     text-sky-300',
};

// Hardcoded snooze duration — 24 hours. Can be made a Sanity field later.
const SNOOZE_MS = 24 * 60 * 60 * 1000;

export default function TopBanner({ text, link, variant = 'primary' }: TopBannerProps) {
	const [dismissed, setDismissed] = useState(true);

	useEffect(() => {
		const until = localStorage.getItem(DISMISSED_KEY);
		if (!until || Date.now() > Number(until)) {
			setTimeout(() => setDismissed(false), 0);
		}
	}, []);

	const dismiss = () => {
		localStorage.setItem(DISMISSED_KEY, String(Date.now() + SNOOZE_MS));
		setDismissed(true);
	};

	if (dismissed) return null;

	return (
		<div role='banner' className={cn('w-full border-b px-4 py-2', VARIANT[variant] ?? VARIANT.primary)}>
			<div className='mx-auto flex max-w-7xl items-center gap-3'>
				<div className='min-w-0 flex-1 text-center font-heading text-[13px] font-medium tracking-[0.02em]'>
					{link ? (
						<Link href={link} className='inline-flex items-center gap-1.5 transition-opacity hover:opacity-75'>
							{text}
							{/* external arrow */}
							<svg width='10' height='10' viewBox='0 0 10 10' fill='none' aria-hidden='true'>
								<path
									d='M1.5 8.5L8.5 1.5M8.5 1.5H4M8.5 1.5V6'
									stroke='currentColor'
									strokeWidth='1.3'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</Link>
					) : (
						text
					)}
				</div>

				<Button
					type='button'
					variant='ghost'
					size='icon-xs'
					onClick={dismiss}
					aria-label='Dismiss announcement'
					className='shrink-0 rounded p-1 text-current opacity-50 hover:bg-transparent hover:opacity-100 focus-visible:ring-1 focus-visible:ring-current'>
					<svg width='10' height='10' viewBox='0 0 10 10' fill='none' aria-hidden='true'>
						<path d='M1 1l8 8M9 1L1 9' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
					</svg>
				</Button>
			</div>
		</div>
	);
}
