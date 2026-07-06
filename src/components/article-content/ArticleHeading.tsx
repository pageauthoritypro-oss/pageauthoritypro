interface Props {
	level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	children: React.ReactNode;
	id?: string;
}

const styles: Record<string, string> = {
	h1: 'font-heading font-bold text-[32px] leading-[40px] text-white mb-2 scroll-mt-24',
	h2: 'font-heading font-bold text-[22px] leading-[28px] text-white mb-2 scroll-mt-24',
	h3: 'font-heading font-semibold text-[18px] leading-[26px] text-white mb-2 scroll-mt-24',
	h4: 'font-heading font-semibold text-[16px] leading-[24px] text-white mb-2 scroll-mt-24',
	h5: 'font-heading font-semibold text-[14px] leading-[22px] text-white mb-2 scroll-mt-24',
	h6: 'font-heading font-semibold text-[13px] leading-[20px] text-white mb-2 uppercase tracking-[0.04em] scroll-mt-24',
};

export default function ArticleHeading({ level, children, id }: Props) {
	const Tag = level;
	return (
		<Tag id={id} className={styles[level]}>
			{children}
		</Tag>
	);
}
