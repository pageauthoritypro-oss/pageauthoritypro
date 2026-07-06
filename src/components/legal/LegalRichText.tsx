import { PortableText, type PortableTextComponents, type PortableTextBlock } from '@portabletext/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const components: PortableTextComponents = {
	block: {
		normal: ({ children }) => <p className='font-satoshi text-base text-[#B5BBC3] leading-[1.65] mb-6'>{children}</p>,
		h1: ({ children }) => (
			<h1 className='font-heading text-[36px] sm:text-[48px] lg:text-[56px] font-bold text-brand-gold mt-6 mb-12 tracking-tight text-center leading-tight'>
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 className='font-heading text-xl sm:text-2xl font-bold text-white mt-10 mb-4 leading-snug'>
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className='font-heading text-lg sm:text-xl font-bold text-white mt-8 mb-3 leading-snug'>
				{children}
			</h3>
		),
		h4: ({ children }) => (
			<h4 className='font-heading text-base sm:text-lg font-bold text-white mt-6 mb-2 leading-snug'>
				{children}
			</h4>
		),
		h5: ({ children }) => (
			<h5 className='font-heading text-base font-bold text-white mt-6 mb-2 leading-snug'>
				{children}
			</h5>
		),
		h6: ({ children }) => (
			<h6 className='font-heading text-sm font-bold text-[#B5BBC3] mt-6 mb-2 leading-snug uppercase tracking-wider'>
				{children}
			</h6>
		),
		blockquote: ({ children }) => (
			<blockquote className='border-l-2 border-brand-gold/40 pl-4 italic text-[#B5BBC3] mb-6 my-4'>
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }) => <ul className='font-satoshi text-base text-[#B5BBC3] list-disc pl-6 space-y-2 mb-6'>{children}</ul>,
		number: ({ children }) => <ol className='font-satoshi text-base text-[#B5BBC3] list-decimal pl-6 space-y-2 mb-6'>{children}</ol>,
	},
	listItem: {
		bullet: ({ children }) => <li className='leading-[150%]'>{children}</li>,
		number: ({ children }) => <li className='leading-[150%]'>{children}</li>,
	},
	marks: {
		strong: ({ children }) => <strong className='font-bold text-white'>{children}</strong>,
		em: ({ children }) => <em className='italic'>{children}</em>,
		underline: ({ children }) => <span className='underline'>{children}</span>,
		strike: ({ children }) => <span className='line-through'>{children}</span>,
		'strike-through': ({ children }) => <span className='line-through'>{children}</span>,
		link: ({ children, value }) => {
			const href = value?.href ?? '#';
			const isExternal = href.startsWith('http');
			return (
				<a
					href={href}
					className='text-brand-gold underline underline-offset-2 hover:text-brand-gold/80 transition-colors font-bold'
					{...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
					{children}
				</a>
			);
		},
	},
	types: {
		imageWithAlt: ({ value }) => {
			if (!value?.url) return null;
			return (
				<figure className='my-6'>
					<Image src={value.url} alt={value.alt || ''} width={800} height={450} className='rounded-lg w-full h-auto' />
					{value.alt && <figcaption className='mt-2 text-xs text-[#B5BBC3] text-center'>{value.alt}</figcaption>}
				</figure>
			);
		},
	},
};

interface LegalRichTextProps {
	value: PortableTextBlock[];
	className?: string;
}

export default function LegalRichText({ value, className }: LegalRichTextProps) {
	if (!value) return null;
	return (
		<div className={cn('space-y-4', className)}>
			<PortableText value={value} components={components} />
		</div>
	);
}
