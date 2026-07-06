import { CheckCircle } from 'lucide-react';
import CtaLink from '@/components/CtaLink';
import DynamicHeading from '@/components/DynamicHeading';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import DynamicIcon from '@/components/DynamicIcon';
import SectionContainer from '@/components/layout/SectionContainer';
import type { MarketingAuditSectionData } from '@/sanity/types';

export default function AuditSection({ eyebrow, heading, headingTag, description, auditItems, pricing, cta }: MarketingAuditSectionData) {
	return (
		<section aria-labelledby='audit-heading' className='w-full py-16 lg:py-24 bg-[#08111C]'>
			<SectionContainer className='flex flex-col items-center gap-8 text-center'>
				<div className='flex flex-col items-center gap-3 w-full text-center'>
					{eyebrow && (
						<AnimatedFadeUp>
							<p className='font-heading font-medium text-[16px] leading-[112%] text-[#B4BAC2]'>{eyebrow}</p>
						</AnimatedFadeUp>
					)}
					{heading && heading.length > 0 && (
						<DynamicHeading
							heading={heading}
							tag={headingTag}
							defaultTag='h2'
							align='center'
							className='font-heading font-medium text-[32px] lg:text-[52px] leading-[125%] tracking-[-1.3px] text-white text-center'
						/>
					)}
					{description && (
						<AnimatedFadeUp>
							<p className='font-heading font-medium text-[16px] leading-[112%] text-[#B4BAC2] max-w-2xl'>{description}</p>
						</AnimatedFadeUp>
					)}
				</div>

				{!!auditItems?.length && (
					<div className='w-full max-w-[672px] flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-12 rounded-2xl p-4'>
						<AnimatedFadeUp className='w-full sm:w-auto'>
							<ul className='list-none flex flex-col gap-3 w-full sm:w-auto rounded-2xl p-3 bg-[#08101C]'>
								{auditItems
									.filter((_, i) => i % 2 === 0)
									.map((item, i) => (
										<li key={i} className='flex items-center gap-2'>
											<CheckCircle className='h-4 w-4 shrink-0 text-[#C7933D]' />
											<span className='font-heading font-normal text-[14px] leading-[normal] tracking-[0.01em] text-white whitespace-nowrap'>
												{item.text}
											</span>
										</li>
									))}
							</ul>
						</AnimatedFadeUp>
						<AnimatedFadeUp className='w-full sm:w-auto'>
							<ul className='list-none flex flex-col gap-3 w-full sm:w-auto rounded-2xl p-3 bg-[#08101C]'>
								{auditItems
									.filter((_, i) => i % 2 === 1)
									.map((item, i) => (
										<li key={i} className='flex items-center gap-2'>
											<CheckCircle className='h-4 w-4 shrink-0 text-[#C7933D]' />
											<span className='font-heading font-normal text-[14px] leading-[normal] tracking-[0.01em] text-white whitespace-nowrap'>
												{item.text}
											</span>
										</li>
									))}
							</ul>
						</AnimatedFadeUp>
					</div>
				)}

				{(pricing?.label || pricing?.price) && (
					<AnimatedFadeUp>
						<div className='flex flex-col items-center gap-4'>
							{pricing?.label && (
								<p className='font-heading font-normal text-[16px] leading-[22px] tracking-[0.01em] text-[#B5BBC3]'>
									{pricing.label}
								</p>
							)}
							{pricing?.price && <p className='font-heading font-bold text-[52px] leading-[40px] text-[#C7933D]'>{pricing.price}</p>}
						</div>
					</AnimatedFadeUp>
				)}

				{cta?.url && cta?.cta_text && (
					<AnimatedFadeUp>
						<CtaLink href={cta.url} variant='primary' target={cta.target} className='flex items-center gap-2'>
						<span>{cta.cta_text}</span>
						{cta.icon && <DynamicIcon icon={cta.icon} size={16} />}
						</CtaLink>
					</AnimatedFadeUp>
				)}
			</SectionContainer>
		</section>
	);
}
