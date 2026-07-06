'use client';

import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

import XIcon from './icons/XIcon';
import FacebookIcon from './icons/FacebookIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import CopyLinkIcon from './icons/CopyLinkIcon';

interface Props {
	heading?: string;
	platforms?: string[];
}

const ICON_SIZE_CLASS = '!w-[22px] !h-[22px]';

const PLATFORMS = [
	{
		id: 'x',
		label: 'Share on X',
		icon: <XIcon className={ICON_SIZE_CLASS} />,
		getUrl: (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
	},
	{
		id: 'facebook',
		label: 'Share on Facebook',
		icon: <FacebookIcon className={ICON_SIZE_CLASS} />,
		getUrl: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
	},
	{
		id: 'linkedin',
		label: 'Share on LinkedIn',
		icon: <LinkedInIcon className={ICON_SIZE_CLASS} />,
		getUrl: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
	},
	{
		id: 'link',
		label: 'Copy link',
		icon: <CopyLinkIcon className={ICON_SIZE_CLASS} />,
		getUrl: () => '',
	},
];

const PLATFORM_KEY_MAP: Record<string, string> = {
	twitter: 'x',
	facebook: 'facebook',
	linkedin: 'linkedin',
	copyLink: 'link',
};

export default function SharePost({ heading, platforms }: Props) {
	const enabledKeys = platforms
		? platforms.map((p) => PLATFORM_KEY_MAP[p]).filter(Boolean)
		: PLATFORMS.map((p) => p.id);
	const visiblePlatforms = PLATFORMS.filter((p) => enabledKeys.includes(p.id));

	const handleShare = (platform: (typeof PLATFORMS)[number]) => {
		if (platform.id === 'link') {
			navigator.clipboard
				.writeText(window.location.href)
				.then(() => {
					toast('Link copied!', {
						description: 'The page URL has been copied to your clipboard.',
						icon: <CopyLinkIcon />,
					});
				})
				.catch(() => {
					toast.error('Failed to copy link');
				});
			return;
		}
		window.open(platform.getUrl(window.location.href), '_blank', 'noopener,noreferrer');
	};

	return (
		<div className='rounded-xl bg-[#0F1F38]/20 p-6 flex flex-col gap-4 border border-white/5'>
			{heading && (
				<span className='font-heading font-bold text-[16px] leading-[20px] text-[#C7933D]'>
					{heading}
				</span>
			)}
			<div className='flex items-center gap-2.5'>
				{visiblePlatforms.map((platform) => (
					<Button
						key={platform.id}
						type='button'
						variant='outline'
						size='icon'
						onClick={() => handleShare(platform)}
						aria-label={platform.label}
						className='w-[46px] h-[46px] rounded-full border-[1.5px] border-[#B5BBC3]/17 bg-[#08101C] text-[#C7933D] hover:bg-[#08101C] hover:text-white hover:border-white/30 transition-colors'>
						{platform.icon}
					</Button>
				))}
			</div>
		</div>
	);
}
