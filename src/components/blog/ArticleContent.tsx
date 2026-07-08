import Image from 'next/image';
import ArticleRichText from '@/components/article-content/ArticleRichText';
import DynamicHeading from '@/components/DynamicHeading';
import type { SanityBlogPost } from '@/sanity/types/blog';

interface ArticleContentProps {
	post: SanityBlogPost;
}

export default function ArticleContent({ post }: ArticleContentProps) {
	const publishedDate = post.publishedAt
		? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
		: null;

	return (
		<div className='flex flex-col gap-9'>
			<div className='flex flex-col gap-[18px]'>
				<DynamicHeading
					heading={post.title}
					className='font-medium text-[36px] lg:text-[64px] leading-[1.15] lg:leading-[72px]'
					animate={false}
				/>
				{post.description && <p className='font-heading font-medium text-[16px] leading-[112%] text-[#B4BAC2]'>{post.description}</p>}
				{(publishedDate || post.category) && (
					<div className='flex items-center gap-2 font-heading font-medium text-[16px] leading-[120%]'>
						{publishedDate && <span className='text-[#F5F5F5]'>{publishedDate}</span>}
						{publishedDate && post.category && <div className='w-[5px] h-[5px] rounded-full bg-[#D9D9D9] shrink-0' />}
						{post.category && <span className='text-[#C7933D]'>{post.category.title}</span>}
					</div>
				)}
			</div>

			{post.featuredImageUrl && (
				<div className='w-full rounded-2xl overflow-hidden aspect-793/430 relative'>
					<Image
						src={post.featuredImageUrl}
						alt={post.description ?? post.titleText}
						fill
						priority
						fetchPriority='high'
						quality={80}
						sizes='(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 48px), 793px'
						className='object-contain lg:object-cover'
					/>
				</div>
			)}

			{post.body && <ArticleRichText value={post.body} />}
		</div>
	);
}
