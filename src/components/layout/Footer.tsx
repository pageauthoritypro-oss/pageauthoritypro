import Image from 'next/image';
import Link from 'next/link';
import CtaLink from '@/components/CtaLink';
import DynamicIcon from '@/components/DynamicIcon';
import SectionContainer from '@/components/layout/SectionContainer';
import type { SiteSettings } from '@/sanity/types';

export default function Footer({ settings }: { settings?: SiteSettings | null }) {
	if (!settings) return null;

	const tagline = settings.footerTagline;
	const cta = settings.footerCta?.[0];
	const copyright = settings.footerCopyright;
	const bottomDescription = settings.footerDescription;
	const footerLogo = settings.footerLogo;
	const socialMedia = settings.socialMedia ?? [];
	const hasContact = settings.phone || settings.email || settings.address;

	const navColumns = settings.footerNavigation?.map((col) => ({
		title: col.label,
		links: col.children?.map((c) => ({ label: c.label, href: c.url })) ?? [],
	})) ?? [];

	return (
		<footer className='w-full bg-[#020508]'>
			<SectionContainer className='pt-20 pb-0'>
				<div className='flex flex-col text-center sm:text-left lg:flex-row lg:justify-between gap-12 lg:gap-0 pb-16 lg:pb-[300px]'>

					<div className='flex flex-col items-center sm:items-start gap-8 lg:w-[304px] lg:shrink-0'>
						<div className='flex flex-col items-center sm:items-start gap-8'>
							<Link href='/' aria-label='Page Authority Pro — Home' className='w-fit'>
								{footerLogo?.url && (
									<Image src={footerLogo.url} alt={footerLogo.alt ?? ''} width={120} height={40} className='h-10 w-auto object-contain' />
								)}
								{!footerLogo?.url && footerLogo?.iconSvg && (
									<span dangerouslySetInnerHTML={{ __html: footerLogo.iconSvg }} className='block' />
								)}
							</Link>
							{tagline && (
								<p className='font-heading text-base text-white/80 leading-[1.4] tracking-[-0.01em]'>{tagline}</p>
							)}
						</div>

						{cta && (
							<CtaLink href={cta.url} variant={cta.variant as 'primary' | 'secondary'} className='w-fit'>
								{cta.cta_text}
							</CtaLink>
						)}

						{socialMedia.length > 0 && (
							<div className='flex items-center justify-center sm:justify-start gap-3'>
								{socialMedia.map((social) => (
									<Link
										key={social.platform}
										href={social.url}
										target='_blank'
										rel='noopener noreferrer'
										aria-label={social.platform}
										className='flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white/60 hover:text-brand-gold hover:bg-white/15 transition-colors'
									>
										<DynamicIcon icon={social.platform} size={16} />
									</Link>
								))}
							</div>
						)}
					</div>

					<nav aria-label='Footer' className='w-full flex flex-col items-center text-center px-8 sm:px-0 sm:grid sm:grid-cols-3 sm:items-start sm:text-left gap-x-12 gap-y-14 lg:contents'>
						{navColumns.map((col) => (
							<div key={col.title} className='w-fit sm:w-auto flex flex-col items-center sm:items-start gap-5'>
								<p className='font-heading font-medium text-[12px] uppercase tracking-[0.1em] leading-none text-white/60'>{col.title}</p>
								<ul className='flex flex-col items-center sm:items-start gap-3'>
									{col.links.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												className='font-heading text-base text-white/80 leading-[1.4] tracking-[-0.01em] hover:text-white transition-colors'
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}

						{hasContact && (
							<div className='w-fit sm:w-auto flex flex-col items-center sm:items-start gap-5'>
								<p className='font-heading font-medium text-[12px] uppercase tracking-[0.1em] leading-none text-white/60'>Contact</p>
								<ul className='flex flex-col items-center sm:items-start gap-3'>
									{settings.phone && (
										<li className='flex items-center gap-2.5'>
											<span className='flex items-center justify-center w-6 h-6 rounded-full shrink-0 bg-[#211F1B] text-white'>
												<DynamicIcon icon='Phone' size={14} />
											</span>
											<span className='font-heading text-base text-white/80 leading-[1.4] tracking-[-0.01em]'>{settings.phone}</span>
										</li>
									)}
									{settings.email && (
										<li className='flex items-center gap-2.5'>
											<span className='flex items-center justify-center w-6 h-6 rounded-full shrink-0 bg-[#211F1B] text-white'>
												<DynamicIcon icon='Mail' size={14} />
											</span>
											<span className='font-heading text-base text-white/80 leading-[1.4] tracking-[-0.01em]'>{settings.email}</span>
										</li>
									)}
									{settings.address && (
										<li className='flex items-start gap-2.5'>
											<span className='flex items-center justify-center w-6 h-6 rounded-full shrink-0 mt-0.5 bg-[#211F1B] text-white'>
												<DynamicIcon icon='MapPin' size={14} />
											</span>
											<span className='font-heading text-base text-white/80 leading-[1.4] tracking-[-0.01em]'>{settings.address}</span>
										</li>
									)}
								</ul>
							</div>
						)}
					</nav>
				</div>

				{(copyright || bottomDescription) && (
					<div className='border-t border-white/6 pt-6 pb-8 flex flex-col items-center sm:items-start gap-4'>
						{copyright && (
							<p className='font-heading text-[13px] leading-[18.2px] tracking-[-0.03em] text-white/60 text-center sm:text-left'>{copyright}</p>
						)}
						{bottomDescription && (
							<p className='font-heading text-[12px] leading-[16.2px] tracking-[-0.02em] text-white/60 text-center sm:text-left'>{bottomDescription}</p>
						)}
					</div>
				)}
			</SectionContainer>
		</footer>
	);
}
