import Image from 'next/image';
import ArticleRichText from '@/components/article-content/ArticleRichText';
import type { SanityCaseStudyPost } from '@/sanity/types/case-study';
import type { PortableTextBlock } from '@portabletext/react';

interface Props {
	post: SanityCaseStudyPost;
}

export default function CaseStudyContent({ post }: Props) {
	return (
		<div className='flex flex-col gap-8 py-3'>
			{post.featuredImageUrl && (
				<div className='relative w-full rounded-2xl overflow-hidden aspect-789/430'>
					<Image src={post.featuredImageUrl} alt={post.description ?? post.titleText} fill className='object-contain lg:object-cover' />
				</div>
			)}
			{post.body && <ArticleRichText value={post.body as PortableTextBlock[]} />}
		</div>
	);
}
