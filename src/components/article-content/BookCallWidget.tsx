import CtaLink from '@/components/CtaLink';
import DynamicIcon from '@/components/DynamicIcon';

interface Cta {
	cta_text: string;
	url: string;
	variant?: string;
	target?: string;
}

interface SanityIcon {
	url?: string;
	alt?: string;
	iconSvg?: string;
}

interface Props {
	heading: string;
	description?: string;
	ctas?: Cta[];
	icon?: SanityIcon;
}

export default function BookCallWidget({ heading, description, ctas, icon }: Props) {
	const primary = ctas?.[0];
	const secondary = ctas?.[1];

	return (
		<div className='rounded-xl bg-[rgba(199,147,61,0.07)] p-6 flex flex-col items-center text-center gap-6 border border-[rgba(199,147,61,0.17)]'>
			{icon && (
				<div className='text-[#C7933D]'>
					<DynamicIcon icon={icon as never} size={82.5} className='text-[#C7933D]' />
				</div>
			)}
			<h3 className='font-heading font-bold text-[24px] leading-[125%] text-[#C7933D] max-w-69.75'>
				{heading}
			</h3>
			{description && (
				<p className='font-heading font-medium text-[16px] leading-[120%] text-[#B4BAC2]'>
					{description}
				</p>
			)}
			{primary && (
				<CtaLink
					href={primary.url}
					variant={(primary.variant as 'primary' | 'secondary') ?? 'primary'}
					target={primary.target}
					className='w-full justify-center'>
					{primary.cta_text}
				</CtaLink>
			)}
			{secondary && (
				<CtaLink
					href={secondary.url}
					target={secondary.target}
					variant='accent'
					className='w-auto rounded-none border-none bg-transparent p-0 font-heading font-medium text-[16px] leading-[149%] text-[#C7933D] hover:bg-transparent hover:opacity-80'>
					{secondary.cta_text} →
				</CtaLink>
			)}
		</div>
	);
}
