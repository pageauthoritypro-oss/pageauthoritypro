import { cn } from '@/lib/utils';
import CtaLink from '@/components/CtaLink';
import type { SanityHeaderSection } from '@/sanity/types';
import DynamicHeading from '../DynamicHeading';
import AnimatedFadeUp from '../AnimatedFadeUp';
import DynamicIcon from '../DynamicIcon';

interface SectionHeaderProps {
	header?: SanityHeaderSection;
	align?: 'left' | 'center';
	headingClassName?: string;
	descriptionClassName?: string;
	className?: string;
	showCta?: boolean;
}

export default function SectionHeader({
	header,
	align = 'left',
	headingClassName,
	descriptionClassName,
	className,
	showCta = true,
}: SectionHeaderProps) {
	const heading = header?.heading;
	const description = header?.description;
	const ctaBtns = header?.cta_btn;
	const ctaPosition = header?.cta_button_position;
	const eyebrow = header?.eyebrow;

	const hasHeading = heading && heading.length > 0;
	const hasDescription = !!description;
	const hasCta = showCta && ctaBtns && ctaBtns.length > 0;
	const hasEyebrow = eyebrow && !!eyebrow.text;

	if (!hasHeading && !hasDescription && !hasCta && !hasEyebrow) return null;

	const isCenter = align === 'center';
	const isRow = !isCenter && hasCta;

	let gapClass = 'gap-6'; // top (24px)
	if (eyebrow?.position === 'center') {
		gapClass = 'gap-3'; // center (20px)
	} else if (eyebrow?.position === 'bottom') {
		gapClass = 'gap-0'; // bottom (16px)
	}

	return (
		<div className={cn('flex flex-col gap-5', isRow ? 'lg:flex-row lg:justify-between lg:gap-2' : '', className)}>
			<div className={cn('flex flex-col gap-4', isRow ? 'lg:w-[64%]' : 'w-full', isCenter && 'justify-center items-center text-center')}>
				<div className={cn('flex flex-col w-full', gapClass, isCenter ? 'items-center text-center' : 'items-start')}>
					{hasEyebrow && (
						<AnimatedFadeUp>
							<span
								className={cn('font-heading font-medium text-base leading-[125%] text-brand-gold block', isCenter && 'text-center')}>
								{eyebrow?.text}
							</span>
						</AnimatedFadeUp>
					)}
					{hasHeading && <DynamicHeading heading={heading} tag={header?.headingTag} align={align} className={headingClassName} />}
				</div>

				{hasDescription && (
					<AnimatedFadeUp delay={0.08}>
						<p
							className={cn(
								'font-heading text-base font-normal leading-normal text-text-muted',
								isCenter ? 'max-w-md' : 'max-w-[492px]',
								descriptionClassName,
							)}>
							{description}
						</p>
					</AnimatedFadeUp>
				)}
			</div>

			{/* CTA Buttons */}
			{hasCta && (
				<AnimatedFadeUp
					delay={0.16}
					className={cn(
						'flex flex-wrap gap-3 lg:justify-end',
						isCenter
							? 'items-center justify-center'
							: cn(
									'lg:w-[36%] lg:items-end',
									ctaPosition === 'top' && 'lg:items-start',
									ctaPosition === 'center' && 'lg:items-center',
									ctaPosition === 'bottom' && 'lg:items-end',
									!ctaPosition && 'lg:items-end',
								),
					)}>
					{ctaBtns.map((btn, index) => (
						<CtaLink key={index} href={btn.url} variant={btn.variant} target={btn.target}>
							<span>{btn.cta_text}</span>
							{btn.icon && <DynamicIcon icon={btn.icon} size={16} />}
						</CtaLink>
					))}
				</AnimatedFadeUp>
			)}
		</div>
	);
}
