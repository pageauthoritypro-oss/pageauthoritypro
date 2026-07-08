import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ArticleContent from './ArticleContent';
import AuthorCard from '@/components/article-content/AuthorCard';
import TableOfContents from '@/components/article-content/TableOfContents';
import BookCallWidget from '@/components/article-content/BookCallWidget';
import SharePost from '@/components/article-content/SharePost';
import SectionContainer from '@/components/layout/SectionContainer';
import type { SanityBlogPost } from '@/sanity/types/blog';
import type { PortableTextBlock } from '@portabletext/react';

interface BlogDetailSectionProps {
	post: SanityBlogPost;
}

export default function BlogDetailSection({ post }: BlogDetailSectionProps) {
	const showSidebar = !post.hideSidebar;

	return (
		<section className='w-full pt-25 pb-16 lg:pb-24'>
			<SectionContainer className='flex flex-col gap-6'>
				{post.backLabel && (
					<Link
						href='/blogs'
						className='flex items-center gap-1.5 font-heading font-medium text-[16px] leading-[149%] text-[#C7933D] hover:opacity-80 transition-opacity w-fit'>
						<ArrowLeft className='w-4 h-4' />
						{post.backLabel}
					</Link>
				)}

				{showSidebar ? (
					<div className='grid grid-cols-1 lg:grid-cols-[1fr_387px] gap-5 items-stretch'>
						<ArticleContent post={post} />
						<aside className='flex flex-col gap-5'>
							{post.author && (
								<div className='relative'>
									<AuthorCard
										author={post.author}
										title={post.aboutAuthorTitle}
										showViewAllLink={post.showViewAllBlogs}
										bottomText={post.authorBottomText}
									/>
								</div>
							)}
							<div className='flex flex-col gap-5 lg:sticky lg:top-20'>
								{post.body && post.body.length > 0 && (
									<TableOfContents body={post.body as PortableTextBlock[]} />
								)}
								{post.bookCallCard && (
									<BookCallWidget
										heading={post.bookCallCard.heading}
										description={post.bookCallCard.description}
										icon={post.bookCallCard.icon}
										ctas={post.bookCallCard.ctas}
									/>
								)}
								<SharePost heading={post.sharePost?.heading} platforms={post.sharePost?.platforms} />
							</div>
						</aside>
					</div>
				) : (
					<ArticleContent post={post} />
				)}
			</SectionContainer>
		</section>
	);
}
