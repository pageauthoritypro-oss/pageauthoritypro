'use client';

import { useEffect } from 'react';

interface CustomScriptsInjectorProps {
	html: string;
	target: 'head' | 'body';
}

/**
 * Injects raw HTML/script markup from CMS-provided header/footer script fields.
 * Elements set via dangerouslySetInnerHTML never execute <script> tags, so this
 * recreates each node manually to get real execution.
 */
export function CustomScriptsInjector({ html, target }: CustomScriptsInjectorProps) {
	useEffect(() => {
		const container = document.createElement('div');
		container.innerHTML = html;
		const parent = target === 'head' ? document.head : document.body;
		const inserted: Node[] = [];

		Array.from(container.childNodes).forEach((node) => {
			if (node.nodeName === 'SCRIPT') {
				const source = node as HTMLScriptElement;
				const script = document.createElement('script');
				Array.from(source.attributes).forEach((attr) => script.setAttribute(attr.name, attr.value));
				script.text = source.text;
				parent.appendChild(script);
				inserted.push(script);
			} else {
				const clone = node.cloneNode(true);
				parent.appendChild(clone);
				inserted.push(clone);
			}
		});

		return () => {
			inserted.forEach((node) => {
				if (node.parentNode === parent) {
					parent.removeChild(node);
				}
			});
		};
	}, [html, target]);

	return null;
}
