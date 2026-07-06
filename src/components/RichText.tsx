import { PortableText, type PortableTextComponents, type PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const components: PortableTextComponents = {
	block: {
		normal: ({ children }) => <p className='leading-7'>{children}</p>,
		h1: ({ children }) => <h1 className='text-3xl font-bold tracking-tight'>{children}</h1>,
		h2: ({ children }) => <h2 className='text-2xl font-bold tracking-tight'>{children}</h2>,
		h3: ({ children }) => <h3 className='text-xl font-semibold'>{children}</h3>,
		h4: ({ children }) => <h4 className='text-lg font-semibold'>{children}</h4>,
		blockquote: ({ children }) => <blockquote className='border-l-2 border-brand-gold/40 pl-4 italic text-text-muted'>{children}</blockquote>,
	},
	list: {
		bullet: ({ children }) => <ul className='list-disc space-y-1 pl-6'>{children}</ul>,
	},
	listItem: {
		bullet: ({ children }) => <li>{children}</li>,
	},
	marks: {
		strong: ({ children }) => <strong className='font-semibold text-[#F5F5F5]'>{children}</strong>,
		em: ({ children }) => <em>{children}</em>,
		link: ({ children, value }) => {
			const href = value?.href ?? '#';
			const isExternal = href.startsWith('http') || href.startsWith('//');
			return (
				<Link
					href={href}
					{...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
					className='text-brand-gold underline-offset-2 hover:underline font-bold hover:text-brand-gold/80 transition-colors'>
					{children}
				</Link>
			);
		},
	},
	types: {
		imageWithAlt: ({ value }) => {
			if (!value?.url) return null;
			return (
				<figure className='my-4'>
					<Image src={value.url} alt={value.alt || ''} width={800} height={450} className='rounded-lg w-full h-auto' />
					{value.alt && <figcaption className='mt-2 text-xs text-text-muted text-center'>{value.alt}</figcaption>}
				</figure>
			);
		},
	},
};

interface RichTextProps {
	value: PortableTextBlock[];
	className?: string;
}

export default function RichText({ value, className }: RichTextProps) {
	if (!value) return null;
	return (
		<div className={cn('space-y-4', className)}>
			<PortableText value={value} components={components} />
		</div>
	);
}
