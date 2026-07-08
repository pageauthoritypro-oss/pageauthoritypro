import Image from 'next/image';
import CtaLink from '@/components/CtaLink';
import BackgroundScript from '@/components/home/BackgroundScript';
import SectionContainer from '@/components/layout/SectionContainer';
import type { HeroSectionData } from '@/sanity/types';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';
import DynamicHeading from '@/components/DynamicHeading';
import DynamicIcon from '@/components/DynamicIcon';

export default function HeroSection(props: Partial<HeroSectionData> = {}) {
	const eyebrow = props.eyebrow;
	const heading = props.header?.heading?.filter((h) => h.text);
	const description = props.header?.description;
	const ctaButtons = props.header?.cta_btn?.filter((b) => b.cta_text && b.url) ?? [];
	const heroImageUrl = props.heroImage;

	return (
		<section className='relative overflow-hidden bg-hero-bg' aria-labelledby='hero-heading'>
			{props.backgroundScript && (
				<div className='absolute inset-0 z-0 pointer-events-none'>
					<div className='w-full h-full relative pointer-events-none'>
						<BackgroundScript script={props.backgroundScript} />
					</div>
				</div>
			)}
			<div className='relative w-full lg:min-h-236'>
				{heroImageUrl && (
					<div aria-hidden='true' className='absolute right-0 bottom-0 z-0 hidden w-full lg:block lg:h-190.75 select-none'>
						<Image
							src={heroImageUrl}
							alt=''
							fill
							priority
							fetchPriority='high'
							sizes='50vw'
							className='hidden lg:block mask-[linear-gradient(to_right,#060D1500_0%,#060D15_95%)] [-webkit-mask-image:linear-gradient(to_right,#060D1500_0%,#060D15_95%)] object-contain object-bottom-right'
						/>
					</div>
				)}

				<div
					aria-hidden='true'
					className='pointer-events-none absolute inset-y-0 left-0 z-1 hidden w-[52%] lg:block'
					style={{ background: 'linear-gradient(to right, #020E1C 60%, transparent)' }}
				/>

				<SectionContainer className='relative z-10 flex flex-col lg:min-h-236'>
					<div className='flex flex-col gap-6 pt-32 pb-16 lg:w-184 lg:pt-48 lg:pb-0'>
						{eyebrow && (
							<AnimatedFadeUp isHero delay={0.05}>
								<p className='flex items-center justify-center h-[31px] font-heading font-medium leading-none tracking-[0.08em] text-brand-gold text-[14px] bg-brand-gold/5 py-1.5 px-3 rounded-full w-fit shadow-[inset_0_0_0_1.2px_#C7933D]'>
									{eyebrow}
								</p>
							</AnimatedFadeUp>
						)}

						<div className='flex flex-col gap-8 lg:gap-12'>
							<div className='flex flex-col gap-6'>
								{!!heading?.length && (
									<DynamicHeading
										heading={heading}
										tag='h1'
										id='hero-heading'
										className='font-heading font-medium tracking-normal text-[40px] leading-11 lg:text-[64px] lg:leading-18'
										isHero={true}
										delay={0.15}
									/>
								)}

								{description && (
									<AnimatedFadeUp isHero delay={0.25}>
										<p className='text-base font-normal leading-5.5 tracking-[0.01em] text-text-muted max-w-md lg:max-w-lg'>
											{description}
										</p>
									</AnimatedFadeUp>
								)}
							</div>

							{!!ctaButtons.length && (
								<AnimatedFadeUp isHero delay={0.35}>
									<div className='flex flex-wrap items-center gap-4'>
										{ctaButtons.map((btn, i) => (
											<CtaLink
												key={i}
												href={btn.url}
												variant={btn.variant === 'secondary' ? 'secondary' : 'primary'}
												target={btn.target === '_blank' ? '_blank' : undefined}
												rel={btn.target === '_blank' ? 'noopener noreferrer' : undefined}>
												<span>{btn.cta_text}</span>
												{btn.icon && <DynamicIcon icon={btn.icon} size={16} />}
											</CtaLink>
										))}
									</div>
								</AnimatedFadeUp>
							)}
						</div>
					</div>
				</SectionContainer>

				<div
					aria-hidden='true'
					className='pointer-events-none absolute bottom-0 left-0 right-0 z-5 h-82.25'
					style={{ background: 'linear-gradient(180deg, rgba(2,14,28,0) 17.4%, rgba(2,14,28,0.709) 59.13%, #060D15 100%)' }}
				/>
			</div>
		</section>
	);
}
