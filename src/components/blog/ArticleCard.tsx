import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { BlogArticle } from '@/sanity/types/blog';

function AuthorAvatar({ initials }: { initials: string }) {
	return (
		<span className='w-8 h-8 rounded-full flex items-center justify-center font-heading font-bold text-[11px] text-white shrink-0 bg-[linear-gradient(135deg,#C7933D_0%,#61481E_100%)]'>
			{initials}
		</span>
	);
}

export default function ArticleCard({ article }: { article: BlogArticle }) {
	return (
		<article className='flex flex-col rounded-lg overflow-hidden border-t border-[#8C8C8C]/15 bg-[#08101C] shadow-[0px_2px_12px_rgba(0,0,0,0.02)]'>
			{/* Image area */}
			<div className='relative aspect-video w-full'>
				<div className='absolute inset-0 bg-[linear-gradient(135deg,#C7933D_0%,#61481E_100%)]' />
				<span className='absolute top-4 left-4 inline-flex items-center font-heading font-medium text-[12px] leading-[15px] tracking-[0.083em] uppercase rounded-[40px] px-3 py-1.5 bg-[#F5F5F5] text-[#000000]'>
					{article.category}
				</span>
			</div>

			{/* Content */}
			<div className='flex flex-col justify-between gap-3 p-8 flex-1'>
				<div className='flex flex-col gap-3'>
					<h3 className='font-heading font-bold text-[22px] leading-[27.5px] text-white'>
						{article.title}
					</h3>
					<p className='font-heading font-normal text-[14px] leading-6 text-[#B5BBC3]'>
						{article.description}
					</p>
				</div>

				<div className='flex items-center justify-between gap-3 pt-3.5 border-t border-[#B5BBC3]/15'>
					<div className='flex items-center gap-3'>
						<AuthorAvatar initials={article.author.initials} />
						<div className='flex flex-col gap-0.5'>
							<span className='font-heading font-bold text-[14px] leading-5 text-white'>
								{article.author.name}
							</span>
							<span className='font-heading font-normal text-[12px] leading-[16.5px] text-[#50607E]'>
								{article.author.date}
							</span>
						</div>
					</div>
					<Link
						href={article.href}
						className='flex items-center gap-1.5 font-heading font-bold text-[14px] leading-5 text-[#C7933D] hover:underline shrink-0'>
						Read More <ArrowRight className='w-4 h-4' />
					</Link>
				</div>
			</div>
		</article>
	);
}
