import { PortableText, type PortableTextComponents, type PortableTextBlock } from '@portabletext/react';
import { cn } from '@/lib/utils';
import ArticleParagraph from './ArticleParagraph';
import ArticleHeading from './ArticleHeading';
import ArticleLink from './ArticleLink';
import { ArticleBulletList, ArticleBulletListItem } from './ArticleBulletList';
import ArticleBlockquote from './ArticleBlockquote';
import InlineImage from './InlineImage';
import ChecklistBlock from './ChecklistBlock';
import DetailedCardsGrid from './DetailedCardsGrid';
import IconCardList from './IconCardList';
import ResultsBlock from './ResultsBlock';
import TestimonialBlock from './TestimonialBlock';

const components: PortableTextComponents = {
	block: {
		normal: ({ children }) => <ArticleParagraph>{children}</ArticleParagraph>,
		h1: ({ value, children }) => <ArticleHeading level='h1' id={value._key}>{children}</ArticleHeading>,
		h2: ({ value, children }) => <ArticleHeading level='h2' id={value._key}>{children}</ArticleHeading>,
		h3: ({ value, children }) => <ArticleHeading level='h3' id={value._key}>{children}</ArticleHeading>,
		h4: ({ value, children }) => <ArticleHeading level='h4' id={value._key}>{children}</ArticleHeading>,
		h5: ({ value, children }) => <ArticleHeading level='h5' id={value._key}>{children}</ArticleHeading>,
		h6: ({ value, children }) => <ArticleHeading level='h6' id={value._key}>{children}</ArticleHeading>,
		blockquote: ({ children }) => <ArticleBlockquote>{children}</ArticleBlockquote>,
	},
	list: {
		bullet: ({ children }) => <ArticleBulletList>{children}</ArticleBulletList>,
	},
	listItem: {
		bullet: ({ children }) => <ArticleBulletListItem>{children}</ArticleBulletListItem>,
	},
	marks: {
		strong: ({ children }) => (
			<strong className='font-semibold text-[#F5F5F5]'>{children}</strong>
		),
		em: ({ children }) => <em className='italic'>{children}</em>,
		link: ({ children, value }) => (
			<ArticleLink href={value?.href ?? '#'}>{children}</ArticleLink>
		),
	},
	types: {
		imageWithAlt: ({ value }) => {
			if (!value?.url) return null;
			return <InlineImage url={value.url} alt={value.alt} />;
		},
		checklistBlock: ({ value }) => (
			<ChecklistBlock checklist={value?.checklist} />
		),
		detailedCardsGrid: ({ value }) => (
			<DetailedCardsGrid cards={value?.cards} />
		),
		iconCardList: ({ value }) => (
			<IconCardList cards={value?.cards} />
		),
		resultsBlock: ({ value }) => (
			<ResultsBlock metrics={value?.metrics} />
		),
		testimonialBlock: ({ value }) => (
			<TestimonialBlock
				id={value?._key}
				title={value?.title}
				testimonials={value?.testimonials}
			/>
		),
	},
};

interface Props {
	value: PortableTextBlock[];
	className?: string;
}

function isBlankTextBlock(block: PortableTextBlock): boolean {
	if (block._type !== 'block') return false;
	const children = (block.children as Array<{ text?: string }> | undefined) ?? [];
	return children.every((child) => !child.text?.trim());
}

export default function ArticleRichText({ value, className }: Props) {
	if (!value) return null;
	const blocks = value.filter((block) => !isBlankTextBlock(block));
	return (
		<div className={cn('flex flex-col', className)}>
			<PortableText value={blocks} components={components} />
		</div>
	);
}
