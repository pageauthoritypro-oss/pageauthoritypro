'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Script from 'next/script';
import { cn } from '@/lib/utils';

declare global {
	interface Window {
		turnstile?: {
			render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
			reset: (widgetId?: string) => void;
		};
	}
}

interface TurnstileProps {
	siteKey?: string;
	onVerify: (token: string) => void;
	onExpire?: () => void;
}

export interface TurnstileHandle {
	reset: () => void;
}

const Turnstile = forwardRef<TurnstileHandle, TurnstileProps>(function Turnstile({ siteKey, onVerify, onExpire }, ref) {
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<string | undefined>(undefined);
	const [scriptLoaded, setScriptLoaded] = useState(false);
	const [widgetRendered, setWidgetRendered] = useState(false);
	const [minTimeElapsed, setMinTimeElapsed] = useState(false);
	// Rendering itself is near-instant once the widget script is loaded, so on a
	// fast connection the skeleton can flash for under a frame. Enforce a small
	// minimum display time so it's never an imperceptible flicker.
	const isReady = widgetRendered && minTimeElapsed;

	useEffect(() => {
		const timer = setTimeout(() => setMinTimeElapsed(true), 600);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (!scriptLoaded || !siteKey || !containerRef.current || !window.turnstile) return;
		widgetIdRef.current = window.turnstile.render(containerRef.current, {
			sitekey: siteKey,
			callback: onVerify,
			'expired-callback': onExpire,
			theme: 'dark',
		});
		setWidgetRendered(true);
	}, [scriptLoaded, siteKey, onVerify, onExpire]);

	useImperativeHandle(ref, () => ({
		reset: () => {
			if (window.turnstile && widgetIdRef.current) {
				window.turnstile.reset(widgetIdRef.current);
			}
		},
	}));

	if (!siteKey) return null;

	return (
		<>
			<Script src='https://challenges.cloudflare.com/turnstile/v0/api.js' async defer onLoad={() => setScriptLoaded(true)} />
			<div className='relative h-[65px] w-[300px] max-w-full'>
				{!isReady && (
					<div className='absolute inset-0 flex h-[65px] w-full animate-pulse items-center gap-2 rounded-md border border-white/10 bg-white/10 px-3'>
						<div className='h-4 w-4 shrink-0 rounded-full bg-white/20' />
						<div className='h-3 w-32 rounded bg-white/20' />
					</div>
				)}
				<div ref={containerRef} className={cn('min-h-[65px]', !isReady && 'invisible')} />
			</div>
		</>
	);
});

export default Turnstile;
