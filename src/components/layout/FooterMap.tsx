import { extractGoogleMapsEmbedSrc } from '@/lib/googleMapsEmbed';

interface FooterMapProps {
	embed?: string;
}

export default function FooterMap({ embed }: FooterMapProps) {
	const src = extractGoogleMapsEmbedSrc(embed);
	if (!src) return null;

	return (
		<div className='mx-auto w-4/5 overflow-hidden rounded-md sm:rounded-2xl border border-white/10 bg-white/5 lg:mr-0'>
			<div className='relative aspect-video w-full'>
				<iframe
					src={src}
					title='Our location on Google Maps'
					loading='lazy'
					referrerPolicy='strict-origin-when-cross-origin'
					allowFullScreen
					className='absolute inset-0 h-full w-full border-0'
					suppressHydrationWarning
				/>
			</div>
		</div>
	);
}
