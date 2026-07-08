import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Author {
	name: string;
	role?: string;
	bio?: string;
	avatarUrl?: string;
}

interface Props {
	author: Author;
	title?: string;
	showViewAllLink?: boolean;
	bottomText?: string;
}

export default function AuthorCard({ author, title, showViewAllLink, bottomText }: Props) {
	const resolvedShowViewAllLink = showViewAllLink ?? true;

	const initials = author.name
		.split(' ')
		.map((p) => p[0])
		.join('')
		.slice(0, 2)
		.toUpperCase();

	return (
		<div className='rounded-xl bg-[#0F1F38]/20 p-6 flex flex-col gap-5 border border-white/5'>
			<div className='flex items-center justify-between'>
				{title && (
					<span className='font-heading font-bold text-[16px] leading-[20px] text-[#C7933D]'>
						{title}
					</span>
				)}
				{resolvedShowViewAllLink && (
					<Link
						href='/blogs'
						className='font-heading font-medium text-[13px] leading-[149%] text-[#C7933D] hover:opacity-80 transition-opacity'>
						View All Blogs →
					</Link>
				)}
			</div>

			<div className='flex items-center gap-3'>
				<Avatar className='w-[56px] h-[56px] shrink-0'>
					<AvatarImage src={author.avatarUrl} alt={author.name} className='object-cover' />
					<AvatarFallback className='bg-[#D9D9D9] text-[#020E1C] font-heading font-bold text-[16px]'>
						{initials}
					</AvatarFallback>
				</Avatar>
				<div className='flex flex-col'>
					<span className='font-heading font-bold text-[16px] leading-[22px] text-white'>
						By {author.name}
					</span>
					{author.role && (
						<span className='font-heading font-medium text-[13px] leading-[18px] text-[#B4BAC2]'>
							{author.role}
						</span>
					)}
				</div>
			</div>

			{(author.bio || bottomText) && (
				<p className='font-heading font-normal text-[14px] leading-[20px] text-[#B4BAC2]'>
					{bottomText ?? author.bio}
				</p>
			)}
		</div>
	);
}
