interface Props {
	children: React.ReactNode;
}

export default function ArticleParagraph({ children }: Props) {
	return (
		<p className='font-heading font-normal text-[16px] leading-[28px] text-[#B4BAC2] mb-7.5 last:mb-0'>
			{children}
		</p>
	);
}
