import CtaLink from '@/components/CtaLink';
import Image from 'next/image';
import type { CtaSectionData } from '@/sanity/types';
import DynamicIcon from '@/components/DynamicIcon';
import DynamicHeading from '../DynamicHeading';
import RichText from '@/components/RichText';
import { extractHeader } from '@/lib/utils';

export default function CtaSection(props: CtaSectionData) {
	const { heading, description, ctaButtons } = extractHeader(props.header);
	const features = props.features;
	const bgImage = props.backgroundImage;
	const supportingText = props.supportingText;

	return (
		<section className='px-5 lg:px-0 relative overflow-hidden bg-background py-20 lg:py-32 xl:py-36 flex flex-col items-center justify-center z-10 w-full min-h-[600px]'>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute left-0 bottom-0 top-0 w-[120px] sm:w-[220px] md:w-[280px] lg:w-[320px] xl:w-[360px] select-none z-0 translate-x-[-42%]'>
				<div className='relative w-full h-full'>
					<Image
						src='/assets/column.webp'
						alt=''
						fill
						className='aspect-auto object-contain object-center opacity-16'
						sizes='(max-width: 768px) 120px, 360px'
						priority
					/>
				</div>
			</div>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute right-0 bottom-0 top-0 w-[120px] sm:w-[220px] md:w-[280px] lg:w-[320px] xl:w-[360px] select-none z-0 translate-x-[42%]'>
				<div className='relative w-full h-full'>
					<Image
						src='/assets/column.webp'
						alt=''
						fill
						className='aspect-auto object-contain object-center opacity-16'
						sizes='(max-width: 768px) 120px, 360px'
						priority
					/>
				</div>
			</div>
			{bgImage && (
				<div
					aria-hidden='true'
					className='pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full inset-0 select-none -z-10 mix-blend-screen'>
					<Image src={bgImage} alt='' fill className='object-cover object-top opacity-20' priority />
				</div>
			)}
			<div className='flex flex-col gap-[75px]'>
				<div className='flex flex-col gap-[53px] relative'>
					<div className='absolute w-[120%] h-[120%] top-0 -left-1/10'>
						<svg width='100%' height='100%' viewBox='0 0 1000 600' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<g filter='url(#filter0_f_91_2425)'>
								<rect x='100' y='100' width='800' height='400' rx='200' fill='#C7933D' fillOpacity='0.06' />
							</g>
							<defs>
								<filter
									id='filter0_f_91_2425'
									x='0'
									y='0'
									width='100%'
									height='100%'
									filterUnits='userSpaceOnUse'
									colorInterpolationFilters='sRGB'>
									<feFlood floodOpacity='0' result='BackgroundImageFix' />
									<feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
									<feGaussianBlur stdDeviation='50' result='effect1_foregroundBlur_91_2425' />
								</filter>
							</defs>
						</svg>
					</div>
					<div className='relative w-full max-w-5xl mx-auto px-6 text-center z-10 flex flex-col items-center gap-6.75'>
						{heading && heading.length > 0 && (
							<DynamicHeading
								heading={heading}
								align='center'
								className='font-heading text-4xl sm:text-[44px] lg:text-[54px] 2xl:text-7xl 2xl:leading-[72px] tracking-tight leading-tight font-bold text-white max-w-lg sm:max-w-xl lg:max-w-3xl 2xl:max-w-5xl mx-auto'
							/>
						)}
						{description && (
							<p className='text-base sm:text-lg lg:text-[20px] lg:leading-[32.5px] text-text-muted max-w-xl lg:max-w-[560px] mx-auto leading-relaxed font-satoshi font-normal'>
								{description}
							</p>
						)}
					</div>
					<div className='relative '>
						{ctaButtons && ctaButtons.length > 0 && (
							<div className='flex flex-col sm:flex-row justify-center items-center gap-2.5 w-full sm:w-auto'>
								{ctaButtons.map((btn, i) => {
									const isSecondary = btn.variant === 'secondary';
									return (
										<CtaLink
											key={i}
											href={btn.url}
											variant={isSecondary ? 'secondary' : 'primary'}
											className='w-full sm:w-auto flex items-center justify-center gap-2 group font-medium py-3 px-4'
											target={btn.target}>
											<span>{btn.cta_text}</span>
											{btn.icon && <DynamicIcon icon={btn.icon} size={18} />}
										</CtaLink>
									);
								})}
							</div>
						)}
					</div>
				</div>

				{features && features.length > 0 && (
					<div className='flex flex-row justify-center flex-wrap items-center gap-6 md:gap-10 text-[13px] text-text-muted font-heading font-medium tracking-wide max-w-4xl'>
						{features.map((item, index) => {
							const { logo, description } = item;
							return (
								<div key={index} className='flex items-center justify-center gap-2'>
									{logo && <DynamicIcon icon={logo} size={14} className='w-3.5 h-3.5 text-brand-gold' />}
									{description && <span>{description}</span>}
								</div>
							);
						})}
					</div>
				)}

				{supportingText && supportingText.length > 0 && (
					<RichText
						value={supportingText}
						className='text-center text-[13px] leading-[18px] text-text-muted font-inter max-w-2xl mx-auto'
					/>
				)}
			</div>
		</section>
	);
}
