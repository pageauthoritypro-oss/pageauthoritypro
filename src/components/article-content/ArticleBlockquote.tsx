interface Props {
	children: React.ReactNode;
}

export default function ArticleBlockquote({ children }: Props) {
	return (
		<blockquote className='border-l-2 border-[#C7933D]/40 pl-5 mb-7.5 italic font-heading font-normal text-[16px] leading-[28px] text-[#B4BAC2]'>
			{children}
		</blockquote>
	);
}
