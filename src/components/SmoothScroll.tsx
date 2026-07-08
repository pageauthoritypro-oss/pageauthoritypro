'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface LenisInstance {
	raf: (time: number) => void;
	destroy: () => void;
}

interface LenisConstructor {
	new (options: unknown): LenisInstance;
}

interface WindowWithLenis {
	Lenis?: LenisConstructor;
	lenis?: LenisInstance;
}

export default function SmoothScroll() {
	useEffect(() => {
		let lenis: LenisInstance | null = null;
		let rafId: number | null = null;

		const initLenis = () => {
			// Skip scroll jacking on mobile/touch devices to preserve native momentum scrolling
			if (window.matchMedia('(pointer: coarse)').matches) {
				return true;
			}

			const win = window as unknown as WindowWithLenis;
			const LenisClass = win.Lenis;
			if (!LenisClass) return false;

			lenis = new LenisClass({
				duration: 1.2,
				easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				orientation: 'vertical',
				gestureOrientation: 'vertical',
				smoothWheel: true,
				wheelMultiplier: 1,
				touchMultiplier: 2,
				infinite: false,
			});

			function raf(time: number) {
				if (lenis) {
					lenis.raf(time);
					rafId = requestAnimationFrame(raf);
				}
			}

			rafId = requestAnimationFrame(raf);
			win.lenis = lenis;
			return true;
		};

		// Try to initialize immediately (if script already loaded)
		const initialized = initLenis();

		// If not loaded yet, poll until it is available.
		let intervalId: NodeJS.Timeout | null = null;
		if (!initialized) {
			intervalId = setInterval(() => {
				if (initLenis() && intervalId) {
					clearInterval(intervalId);
				}
			}, 100);
		}

		// Cleanup on unmount!
		return () => {
			if (intervalId) clearInterval(intervalId);
			if (rafId) cancelAnimationFrame(rafId);
			if (lenis) {
				lenis.destroy();
				const win = window as unknown as WindowWithLenis;
				win.lenis = undefined;
			}
		};
	}, []);

	return (
		<Script
			src="https://unpkg.com/lenis@1.1.20/dist/lenis.min.js"
			strategy="afterInteractive"
		/>
	);
}
