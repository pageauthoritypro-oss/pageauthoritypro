import { Fragment, JSX } from 'react';
import { cn } from '@/lib/utils';
import { SanityHeadingPart } from '@/sanity/types';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';

type ValidTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';

interface DynamicHeadingProps {
	heading?: SanityHeadingPart[];
	tag?: string;
	className?: string;
	spanClassName?: string;
	id?: string;
	align?: 'left' | 'center';
	defaultTag?: ValidTag;
	isHero?: boolean;
	isLcp?: boolean;
	delay?: number;
	animate?: boolean;
}

const variantClassMap: Record<string, string> = {
	brand: 'text-brand-gold',
	secondary: 'text-secondary',
	accent: 'text-accent',
	info: 'text-info',
};

function getVariantClass(variant?: string): string {
	return variant ? (variantClassMap[variant] ?? 'text-brand-gold') : 'text-brand-gold';
}

export default function DynamicHeading({
	heading,
	tag,
	className,
	spanClassName,
	id,
	align = 'left',
	defaultTag = 'p',
	isHero,
	isLcp,
	delay,
	animate = true,
}: DynamicHeadingProps) {
	if (!heading?.length) return null;

	const validTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'] as const;

	const rawTag = tag?.toLowerCase();

	const Tag: keyof JSX.IntrinsicElements = validTags.includes(rawTag as (typeof validTags)[number]) ? (rawTag as ValidTag) : defaultTag;

	const headingContent = (
		<Tag
			id={id}
			className={cn(
				'font-heading text-[32px] font-medium leading-tight tracking-[-0.0232em] sm:text-[40px] lg:text-[52px] lg:leading-[56.16px] lg:tracking-[-1.3px] text-text-heading',
				className,
			)}>
			{heading.map(({ text, variant, isHighlighted }, index) => {
				const cleanText = text?.replace(/[ \t]/g, '');
				if (cleanText === '\n' || cleanText === '\\n') {
					return <br key={index} />;
				}

				// Process embedded newlines inside the text segment
				const lines = (text || '')
					.replace(/\\n/g, '\n')
					.split('\n')
					.map((line: string, lineIndex: number, arr: string[]) => (
						<Fragment key={lineIndex}>
							{line}
							{lineIndex < arr.length - 1 && <br />}
						</Fragment>
					));

				return (
					<Fragment key={index}>
						{isHighlighted ? (
							<span className={cn(align === 'center' && 'text-center', getVariantClass(variant), spanClassName)}>
								{lines}
								{index !== heading.length - 1 && ' '}
							</span>
						) : (
							<span className={cn(spanClassName)}>
								{lines}
								{index !== heading.length - 1 && ' '}
							</span>
						)}
					</Fragment>
				);
			})}
		</Tag>
	);

	if (!animate) {
		return headingContent;
	}

	return (
		<AnimatedFadeUp isHero={isHero} delay={delay} isLcp={isLcp}>
			{headingContent}
		</AnimatedFadeUp>
	);
}
