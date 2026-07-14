import DynamicIcon from '@/components/DynamicIcon';
import type { AuthorSocialLink } from '@/sanity/types/blog';

const PLATFORM_LABELS: Record<string, string> = {
	facebook: 'Facebook',
	twitter: 'Twitter/X',
	instagram: 'Instagram',
	linkedin: 'LinkedIn',
	youtube: 'YouTube',
	tiktok: 'TikTok',
	github: 'GitHub',
};

export default function SocialIconLink({ platform, url }: AuthorSocialLink) {
	const label = PLATFORM_LABELS[platform] ?? platform;

	return (
		<div className='group relative'>
			<a
				href={url}
				target='_blank'
				rel='noopener noreferrer'
				aria-label={label}
				className='flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-[#B4BAC2] hover:bg-white/10 hover:text-white transition-colors'>
				<DynamicIcon icon={platform} size={16} />
			</a>
			<span className='pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#020E1C] px-2.5 py-1 font-heading text-[12px] text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100'>
				{label}
			</span>
		</div>
	);
}
