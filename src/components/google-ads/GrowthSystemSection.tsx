import Image from 'next/image';
import SectionContainer from '@/components/layout/SectionContainer';
import CtaLink from '@/components/CtaLink';
import DynamicHeading from '@/components/DynamicHeading';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import DynamicIcon from '@/components/DynamicIcon';
import { cn } from '@/lib/utils';
import type { GrowthSystemSectionData } from '@/sanity/types';

interface Props {
	data?: GrowthSystemSectionData;
}

export default function GrowthSystemSection({ data }: Props) {
	const eyebrow = data?.header?.eyebrow;
	const heading = data?.header?.heading;
	const headingTag = data?.header?.headingTag;
	const description = data?.header?.description;
	const ctaBtns = data?.header?.cta_btn?.filter((b) => b.cta_text && b.url) ?? [];
	const imageUrl = data?.image?.url;

	const hasEyebrow = eyebrow && !!eyebrow.text;
	const hasHeading = heading && heading.length > 0;

	let gapClass = 'gap-6'; // top (24px)
	if (eyebrow?.position === 'center') {
		gapClass = 'gap-3'; // center (20px)
	} else if (eyebrow?.position === 'bottom') {
		gapClass = 'gap-0'; // bottom (16px)
	}

	return (
		<section className='w-full bg-[#060D15] py-16 lg:py-24 overflow-hidden'>
			<SectionContainer className='flex flex-col lg:flex-row items-center lg:justify-between gap-12 lg:gap-0'>
				{/* Left text column */}
				<div className='flex flex-col gap-6 lg:max-w-[520px] shrink-0 w-full lg:w-auto'>
					<div className={cn('flex flex-col w-full items-start', gapClass)}>
						{hasEyebrow && (
							<AnimatedFadeUp delay={0.05}>
								<span className='font-heading font-medium text-base leading-[125%] text-brand-gold block'>{eyebrow.text}</span>
							</AnimatedFadeUp>
						)}

						{hasHeading && (
							<DynamicHeading
								heading={heading}
								tag={headingTag}
								defaultTag='h2'
								align='left'
								className='font-heading font-medium text-[40px] lg:text-[52px] leading-[120%] tracking-[-1px] text-white'
								delay={hasEyebrow ? 0.12 : 0.05}
							/>
						)}
					</div>

					{description && (
						<AnimatedFadeUp delay={0.2}>
							<p className='font-heading font-normal text-[16px] text-[#B4BAC2] leading-[112%]'>{description}</p>
						</AnimatedFadeUp>
					)}

					{ctaBtns.length > 0 && (
						<AnimatedFadeUp delay={0.28}>
							<div className='flex flex-wrap items-center gap-4'>
								{ctaBtns.map((btn, i) => (
									<CtaLink key={i} href={btn.url} variant={btn.variant} target={btn.target}>
										<span>{btn.cta_text}</span>
										{btn.icon && <DynamicIcon icon={btn.icon} size={16} />}
									</CtaLink>
								))}
							</div>
						</AnimatedFadeUp>
					)}
				</div>

				{/* Right image — 603×523 in Figma */}
				{imageUrl && (
					<AnimatedFadeUp delay={0.05} className='lg:flex-1 flex justify-center lg:justify-end w-full'>
						<Image
							src={imageUrl}
							alt={data?.image?.alt ?? ''}
							width={603}
							height={523}
							className='object-contain max-w-full w-full lg:max-w-[603px]'
							style={{
								maskImage: 'linear-gradient(to top, transparent 0%, rgba(0, 0, 0, 0.82) 50%)',
								WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0, 0, 0, 0.82) 50%)',
							}}
							unoptimized
						/>
					</AnimatedFadeUp>
				)}
			</SectionContainer>
		</section>
	);
}
