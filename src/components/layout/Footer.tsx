import Image from 'next/image';
import Link from 'next/link';
import CtaLink from '@/components/CtaLink';
import DynamicIcon from '@/components/DynamicIcon';
import SectionContainer from '@/components/layout/SectionContainer';
import type { SiteSettings } from '@/sanity/types';

const USER_LINK_REGEX =
	/(?:mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|tel:\+?[0-9()[\]\-.\s]{3,}|(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+(?:\/[^\s]*)?|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i;

function formatLink(url?: string): string | null {
	if (!url) return null;
	const trimmed = url.trim();
	if (!trimmed) return null;

	// Keep support for standard Next.js relative paths & anchor links
	const isRelativeOrAnchor = /^(\/|\.\/|\.\.\/|#.+)/.test(trimmed);
	if (isRelativeOrAnchor) {
		return trimmed;
	}

	const match = trimmed.match(USER_LINK_REGEX);
	// Only treat as a link if the match exactly matches the full trimmed version
	if (!match || match[0] !== trimmed) {
		return null;
	}

	// 1. Check if it's a raw email address
	if (trimmed.includes('@') && !trimmed.toLowerCase().startsWith('mailto:')) {
		return `mailto:${trimmed}`;
	}

	// 2. Check if it's a domain name without a protocol (like example.com or www.example.com)
	const hasProtocol = /^(https?:\/\/|\/\/|mailto:|tel:)/i.test(trimmed);
	if (!hasProtocol) {
		return `https://${trimmed}`;
	}

	return trimmed;
}

export default function Footer({ settings }: { settings?: SiteSettings | null }) {
	if (!settings) return null;

	const tagline = settings.footerTagline;
	const cta = settings.footerCta?.[0];
	const copyright = settings.footerCopyright;
	const bottomDescription = settings.footerDescription;
	const footerLogo = settings.footerLogo;
	const socialMedia = settings.socialMedia ?? [];
	const footerNavigation = settings?.footerNavigation ?? [];

	return (
		<footer className='w-full bg-[#020508]'>
			<SectionContainer className='pt-20 pb-0'>
				<div className='flex flex-col text-center sm:text-left lg:flex-row lg:justify-between gap-12 lg:gap-0 pb-16 lg:pb-[300px]'>
					<div className='flex flex-col items-center sm:items-start gap-8 lg:w-[304px] lg:shrink-0'>
						<div className='flex flex-col items-center sm:items-start gap-8'>
							<Link href='/' aria-label='Page Authority Pro — Home' className='w-fit'>
								{footerLogo?.url && (
									<Image
										src={footerLogo.url}
										alt={footerLogo.alt ?? ''}
										width={120}
										height={40}
										className='h-10 w-auto object-contain'
									/>
								)}
								{!footerLogo?.url && footerLogo?.iconSvg && (
									<span dangerouslySetInnerHTML={{ __html: footerLogo.iconSvg }} className='block' />
								)}
							</Link>
							{tagline && <p className='font-heading text-base text-white/80 leading-[1.4] tracking-[-0.01em]'>{tagline}</p>}
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
										className='flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white/90 hover:text-brand-gold hover:bg-white/15 transition-colors'>
										<DynamicIcon icon={social.platform} size={16} />
									</Link>
								))}
							</div>
						)}
					</div>

					<nav
						aria-label='Footer'
						className='w-full flex flex-col items-center text-center px-8 sm:px-0 sm:grid sm:grid-cols-3 sm:items-start sm:text-left gap-x-12 gap-y-14 lg:contents'>
						{footerNavigation.map((col, i) => {
							const formattedColUrl = formatLink(col.url);
							const links = col?.children || [];
							return (
								<div key={i} className='w-fit sm:w-auto flex flex-col items-center sm:items-start gap-5'>
									{formattedColUrl ? (
										<Link
											href={formattedColUrl}
											target={col.openInNewTab ? '_blank' : '_self'}
											rel={col.openInNewTab ? 'noopener noreferrer' : undefined}
											className='font-heading font-medium text-[12px] uppercase tracking-widest leading-none text-white/60 hover:text-white transition-colors block'>
											{col.label}
										</Link>
									) : (
										<p className='font-heading font-medium text-[12px] uppercase tracking-widest leading-none text-white/60'>
											{col.label}
										</p>
									)}
									<ul className='flex flex-col items-center sm:items-start gap-3'>
										{links.map((link, idx) => {
											const formattedHref = formatLink(link.url);
											const isFlex = !!link.logo;
											const baseClass = isFlex
												? 'flex items-center gap-2.5 font-heading text-base text-white/80 leading-[1.4] tracking-[-0.01em]'
												: 'font-heading text-base text-white/80 leading-[1.4] tracking-[-0.01em]';

											const content = (
												<>
													{link.logo && (
														<span className='flex items-center justify-center w-6 h-6 rounded-full shrink-0 bg-[#211F1B] text-white transition-colors group-hover:bg-[#312E29]'>
															<DynamicIcon icon={link.logo} size={14} />
														</span>
													)}
													<span>{link.label}</span>
												</>
											);

											return (
												<li key={`${link.url}-${idx}`}>
													{formattedHref ? (
														<Link
															href={formattedHref}
															className={`${baseClass} hover:text-white transition-colors group`}>
															{content}
														</Link>
													) : (
														<div className={baseClass}>{content}</div>
													)}
												</li>
											);
										})}
									</ul>
								</div>
							);
						})}
					</nav>
				</div>

				{(copyright || bottomDescription) && (
					<div className='border-t border-white/6 pt-6 pb-8 flex flex-col items-center sm:items-start gap-4'>
						{copyright && (
							<p className='font-heading text-[13px] leading-[18.2px] tracking-[-0.03em] text-white/60 text-center sm:text-left'>
								{copyright}
							</p>
						)}
						{bottomDescription && (
							<p className='font-heading text-[12px] leading-[16.2px] tracking-[-0.02em] text-white/60 text-center sm:text-left'>
								{bottomDescription}
							</p>
						)}
					</div>
				)}
			</SectionContainer>
		</footer>
	);
}
