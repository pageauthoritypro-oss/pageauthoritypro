import CtaLink from '@/components/CtaLink';
import type { BookCallCardData } from '@/sanity/types/blog';

function GrowthIcon() {
	return (
		<svg width='88' height='88' viewBox='0 0 88 88' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<rect x='8' y='52' width='16' height='28' rx='2' fill='#C7933D' opacity='0.9' />
			<rect x='36' y='36' width='16' height='44' rx='2' fill='#C7933D' opacity='0.9' />
			<rect x='64' y='16' width='16' height='64' rx='2' fill='#C7933D' opacity='0.9' />
			<path d='M12 56 L42 32 L72 16' stroke='#C7933D' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
			<path d='M60 14 L76 14 L76 30' stroke='#C7933D' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
}

export default function BlogCtaWidget({ data }: { data: BookCallCardData }) {
	const primaryCta = data.ctas?.[0];
	const secondaryCta = data.ctas?.[1];

	return (
		<div className='rounded-xl p-6 flex flex-col gap-6 bg-[rgba(199,147,61,0.07)] border border-[rgba(199,147,61,0.17)]'>
			<div className='flex flex-col items-center gap-3 text-center'>
				<GrowthIcon />
				{data.heading && (
					<h3 className='font-heading font-bold text-[24px] leading-[125%] text-[#C7933D]'>
						{data.heading}
					</h3>
				)}
				{data.description && (
					<p className='font-heading font-medium text-[16px] leading-[120%] text-[#B4BAC2]'>{data.description}</p>
				)}
			</div>
			<div className='flex flex-col gap-4'>
				{primaryCta && (
					<CtaLink href={primaryCta.url} variant='primary' className='w-full flex items-center justify-center'>
						{primaryCta.cta_text}
					</CtaLink>
				)}
				{secondaryCta && (
					<CtaLink href={secondaryCta.url} variant='accent' className='w-full flex items-center justify-center'>
						{secondaryCta.cta_text} →
					</CtaLink>
				)}
			</div>
		</div>
	);
}
