'use client';

import { useEffect } from 'react';

export default function BackgroundScript({ script }: { script: string }) {
	useEffect(() => {
		const el = document.createElement('script');
		el.textContent = script;
		document.body.appendChild(el);
		return () => el.remove();
	}, [script]);

	return null;
}
