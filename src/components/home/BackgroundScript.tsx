'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundScript({ script }: { script: string }) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!script) return;

		let injected = false;
		let scriptEl: HTMLScriptElement | null = null;
		let idleId: number | undefined;
		let observer: IntersectionObserver | null = null;

		function inject() {
			if (injected) return;
			injected = true;
			scriptEl = document.createElement('script');
			scriptEl.textContent = script;
			document.body.appendChild(scriptEl);
		}

		function schedule() {
			if (typeof (window as any).requestIdleCallback === 'function') {
				idleId = (window as any).requestIdleCallback(inject, { timeout: 2000 });
			} else {
				idleId = window.setTimeout(inject, 200) as unknown as number;
			}
		}

		// Don't even schedule until the hero is actually on screen
		observer = new IntersectionObserver((entries) => {
			if (!entries[0].isIntersecting) return;
			observer?.disconnect();
			if (document.readyState === 'complete') {
				schedule();
			} else {
				window.addEventListener('load', schedule, { once: true });
			}
		});
		if (containerRef.current && observer) observer.observe(containerRef.current);

		return () => {
			observer?.disconnect();
			window.removeEventListener('load', schedule);
			if ('cancelIdleCallback' in window && idleId) (window as any).cancelIdleCallback(idleId);
			else if (idleId) clearTimeout(idleId);
			scriptEl?.remove();
		};
	}, [script]);

	return <div ref={containerRef} className='absolute inset-0 pointer-events-none' />;
}
