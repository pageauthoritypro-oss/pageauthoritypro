import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import DynamicHeading from '@/components/DynamicHeading';
import CaseStudyContent from './CaseStudyContent';
import AuthorCard from '@/components/article-content/AuthorCard';
import TableOfContents from '@/components/article-content/TableOfContents';
import BookCallWidget from '@/components/article-content/BookCallWidget';
import SharePost from '@/components/article-content/SharePost';
import SectionContainer from '@/components/layout/SectionContainer';
import type { SanityCaseStudyPost } from '@/sanity/types/case-study';
import type { PortableTextBlock } from '@portabletext/react';

interface CaseStudyDetailSectionProps {
	post: SanityCaseStudyPost;
}

export default function CaseStudyDetailSection({ post }: CaseStudyDetailSectionProps) {
	const showSidebar = !post.hideSidebar;

	const publishedDate = post.publishedAt
		? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
		: null;

	return (
		<section className='w-full pt-25 pb-16 lg:pb-24'>
			<SectionContainer className='flex flex-col gap-6'>
				{post.backLabel && (
					<Link
						href='/case-studies'
						className='flex items-center gap-1.5 font-heading font-medium text-[16px] leading-[149%] text-[#C7933D] hover:opacity-80 transition-opacity w-fit'>
						<ArrowLeft className='w-4 h-4' />
						{post.backLabel}
					</Link>
				)}

				<div className='flex flex-col gap-3'>
					<DynamicHeading
						heading={post.title}
						className='font-medium text-[32px] lg:text-[64px] leading-[1.125]'
						animate={false}
					/>
					{post.description && (
						<p className='font-heading font-normal text-[18px] leading-[112%] text-[#B4BAC2]'>
							{post.description}
						</p>
					)}
					{(post.location || publishedDate) && (
						<div className='flex items-center gap-2 font-heading text-[16px] leading-[120%] flex-wrap'>
							{post.location && <span className='text-[#C7933D]'>{post.location.name}</span>}
							{post.location && (post.location.area || publishedDate) && (
								<span className='inline-block w-[5px] h-[5px] rounded-full bg-[#D9D9D9] shrink-0' />
							)}
							{post.location?.area && <span className='text-[#F5F5F5]'>{post.location.area}</span>}
							{post.location?.area && publishedDate && (
								<span className='inline-block w-[5px] h-[5px] rounded-full bg-[#D9D9D9] shrink-0' />
							)}
							{publishedDate && <span className='text-[#F5F5F5]'>{publishedDate}</span>}
						</div>
					)}
				</div>

				{showSidebar ? (
					<div className='grid grid-cols-1 lg:grid-cols-[1fr_387px] gap-6 items-stretch'>
						<CaseStudyContent post={post} />
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
					<CaseStudyContent post={post} />
				)}
			</SectionContainer>
		</section>
	);
}
