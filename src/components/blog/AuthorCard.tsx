import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { BlogAuthor } from '@/sanity/types/blog';

export default function AuthorCard({ author }: { author: BlogAuthor }) {
	const initials = author.name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();

	return (
		<div className='rounded-xl bg-[#0F1F38]/20 p-6 flex flex-col gap-6'>
			<div className='flex items-center justify-between'>
				<span className='font-heading font-bold text-[18px] leading-[125%] text-[#C7933D]'>About Author</span>
				<Link
					href='/blog'
					className='font-heading font-medium text-[14px] leading-[149%] text-[#C7933D] hover:opacity-80 transition-opacity'>
					View All Blogs →
				</Link>
			</div>
			<div className='flex items-center gap-3'>
				<Avatar className='w-[61px] h-[61px]'>
					<AvatarImage src={author.avatarUrl} alt={author.name} className='object-cover' />
					<AvatarFallback className='bg-[#D9D9D9] text-[#020E1C] font-heading font-bold text-[18px]'>
						{initials}
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col gap-3'>
					<div className='flex flex-col'>
						<span className='font-heading font-bold text-[18px] leading-[125%] text-white'>By {author.name}</span>
						{author.role && (
							<span className='font-heading font-medium text-[14px] leading-[112%] text-[#B4BAC2]'>{author.role}</span>
						)}
					</div>
				</div>
			</div>
			{author.bio && (
				<p className='font-heading font-medium text-[16px] leading-[112%] text-[#B4BAC2]'>{author.bio}</p>
			)}
		</div>
	);
}
