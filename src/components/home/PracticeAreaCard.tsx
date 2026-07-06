import DynamicIcon from '@/components/DynamicIcon';
import type { SanityLogoItem } from '@/sanity/types';

interface PracticeAreaCardProps {
	title: string;
	description: string;
	icon?: string | SanityLogoItem;
}

export default function PracticeAreaCard({ title, description, icon }: PracticeAreaCardProps) {
	return (
		<article className='group relative h-full overflow-hidden rounded-[6px] border border-[#C7933D]/7 bg-white/[0.024] px-[29px] pt-[33px] pb-10 transition-colors duration-300 hover:bg-white/4'>
			<div aria-hidden='true' className='flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#C7933D]/7 bg-[#C7933D]/7'>
				{icon && <DynamicIcon icon={icon} size={20} className='text-brand-gold' />}
			</div>

			<h3 className='mt-[21px] font-heading text-[15px] font-medium leading-none text-[#F5F5F5]'>{title}</h3>

			<p className='mt-[11px] font-heading text-[13px] font-normal leading-[21.45px] text-text-muted'>{description}</p>

			<span
				aria-hidden='true'
				className='absolute inset-x-0 bottom-0 h-0.5 w-0 bg-brand-gold transition-all duration-300 ease-out group-hover:w-full'
			/>
		</article>
	);
}
