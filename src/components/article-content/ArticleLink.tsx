import Link from 'next/link';

interface Props {
	href: string;
	children: React.ReactNode;
}

export default function ArticleLink({ href, children }: Props) {
	const isExternal = href.startsWith('http') || href.startsWith('//');

	return (
		<Link
			href={href}
			{...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
			className='text-[#C7933D] underline underline-offset-2 hover:text-[#C7933D]/80 transition-colors'>
			{children}
		</Link>
	);
}
