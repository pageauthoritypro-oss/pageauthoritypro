'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

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

export default function Turnstile({ siteKey, onVerify, onExpire }: TurnstileProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [scriptLoaded, setScriptLoaded] = useState(false);

	useEffect(() => {
		if (!scriptLoaded || !siteKey || !containerRef.current || !window.turnstile) return;
		window.turnstile.render(containerRef.current, {
			sitekey: siteKey,
			callback: onVerify,
			'expired-callback': onExpire,
			theme: 'dark',
		});
	}, [scriptLoaded, siteKey, onVerify, onExpire]);

	if (!siteKey) return null;

	return (
		<>
			<Script src='https://challenges.cloudflare.com/turnstile/v0/api.js' async defer onLoad={() => setScriptLoaded(true)} />
			<div ref={containerRef} className='min-h-[65px]' />
		</>
	);
}
