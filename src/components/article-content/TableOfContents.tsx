import Link from 'next/link';
import type { PortableTextBlock } from '@portabletext/react';

interface Props {
	body: PortableTextBlock[];
}

const HEADING_STYLES = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

function extractHeadings(body: PortableTextBlock[]): { text: string; id: string }[] {
	return body
		.map((block) => {
			if (block._type === 'block' && HEADING_STYLES.has(block.style as string) && block._key) {
				const text = (block.children as Array<{ text: string }>)?.map((child) => child.text).join('') ?? '';
				return { text, id: block._key as string };
			}
			if (block._type === 'testimonialBlock' && block._key && (block as { title?: string }).title) {
				return { text: (block as { title?: string }).title as string, id: block._key as string };
			}
			return null;
		})
		.filter((h): h is { text: string; id: string } => !!h && h.text.length > 0);
}

export default function TableOfContents({ body }: Props) {
	const headings = extractHeadings(body);
	if (headings.length === 0) return null;

	return (
		<div className='rounded-xl bg-[#0F1F38]/20 p-6 flex flex-col gap-4 border border-white/5'>
			<span className='font-heading font-bold text-[16px] leading-[20px] text-[#C7933D]'>
				Table Of Contents
			</span>
			<nav>
				<ul className='flex flex-col gap-2.5'>
					{headings.map((h) => (
						<li key={h.id}>
							<Link
								href={`#${h.id}`}
								className='font-heading font-normal text-[14px] leading-[20px] text-white hover:text-[#C7933D] transition-colors'>
								{h.text}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
}
