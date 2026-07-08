import Image from 'next/image';

interface Props {
	url: string;
	alt?: string;
}

export default function InlineImage({ url, alt }: Props) {
	return (
		<figure className='mb-7.5 rounded-xl overflow-hidden'>
			<Image src={url} alt={alt ?? ''} width={800} height={450} sizes='50vw' className='w-full h-auto rounded-xl' />
			{alt && <figcaption className='mt-2 text-center font-heading font-normal text-[12px] leading-[16px] text-[#B4BAC2]'>{alt}</figcaption>}
		</figure>
	);
}
