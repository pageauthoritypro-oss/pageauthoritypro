'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import DynamicIcon from "@/components/DynamicIcon";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CtaLink from '@/components/CtaLink';
import { cn } from '@/lib/utils';
import type { NavLink, NavCta } from '@/components/layout/Navbar';
import SectionContainer from '@/components/layout/SectionContainer';

// Background, border, and scroll-driven transparency are owned by NavbarContainer.

interface Props {
  links: NavLink[];
  ctas: NavCta[];
  logo?: { url?: string; iconSvg?: string; alt?: string } | null;
}

export default function NavbarClient({ links, ctas, logo }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

	useEffect(() => {
		const timer = setTimeout(() => {
			setSheetOpen(false);
		}, 0);
		return () => clearTimeout(timer);
	}, [pathname]);

  return (
    // Background and border are owned by NavbarContainer above — no bg/border here
    <header className="py-2">
      <SectionContainer as='nav' aria-label='Main navigation' className='flex h-16 items-center justify-between'>
        {/* Logo */}
        {(logo?.url || logo?.iconSvg) && (
          <Link href="/" aria-label={logo.alt} className="shrink-0">
            <DynamicIcon icon={logo} size={40} className="h-8.5 w-auto" />
          </Link>
        )}

				{/* Desktop links */}
				{links.length > 0 && (
					<ul className='hidden md:flex items-center gap-8 list-none' role='list'>
						{links.map(({ label, href, openInNewTab, children }, i) => (
							<li key={i} className={cn(children?.length && 'group relative')}>
								<Link
									href={href}
									target={openInNewTab ? '_blank' : undefined}
									rel={openInNewTab ? 'noopener noreferrer' : undefined}
									className='flex items-center gap-1 text-sm font-medium text-text-muted transition-colors hover:text-white'>
									{label}
									{children?.length && (
										<svg
											width='12'
											height='12'
											viewBox='0 0 12 12'
											fill='none'
											aria-hidden='true'
											className='transition-transform duration-200 group-hover:rotate-180'>
											<path
												d='M2 4l4 4 4-4'
												stroke='currentColor'
												strokeWidth='1.5'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</svg>
									)}
								</Link>

								{children?.length && (
									<div className='invisible absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100'>
										<ul className='min-w-44 overflow-hidden rounded-lg border border-white/10 bg-hero-bg/95 py-1.5 shadow-xl backdrop-blur-md list-none'>
											{children.map((child, j) => (
												<li key={j}>
													<Link
														href={child.href}
														target={child.openInNewTab ? '_blank' : undefined}
														rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
														className='block px-4 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white'>
														{child.label}
													</Link>
												</li>
											))}
										</ul>
									</div>
								)}
							</li>
						))}
					</ul>
				)}

				{/* Desktop CTAs */}
				{ctas.length > 0 && (
					<div className='hidden md:flex items-center gap-3'>
						{ctas.map(({ text, href, variant, target }, i) => (
							<CtaLink
								key={i}
								href={href}
								variant={variant}
								target={target === '_blank' ? '_blank' : undefined}
								rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
								{text}
							</CtaLink>
						))}
					</div>
				)}

				{/* Mobile menu */}
				<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
					<SheetTrigger aria-label='Open mobile menu' className='md:hidden p-2 text-white/70 transition-colors hover:text-white'>
						<svg width='20' height='20' viewBox='0 0 20 20' fill='none' aria-hidden='true'>
							<path d='M2 5h16M2 10h16M2 15h16' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' />
						</svg>
					</SheetTrigger>

          <SheetContent
            side="right"
            className="flex w-72 flex-col border-white/8 bg-hero-bg px-6 py-8"
            onClick={(e) => { if ((e.target as Element).closest("a")) setSheetOpen(false); }}
          >
             {(logo?.url || logo?.iconSvg) && (
              <Link href="/" aria-label={logo.alt} className="mb-8 block shrink-0">
                <DynamicIcon icon={logo} size={40} className="h-8.5 w-auto" />
              </Link>
            )}

						{links.length > 0 && (
							<ul className='flex flex-col gap-0.5 list-none' role='list'>
								{links.map(({ label, href, openInNewTab, children }, i) => (
									<li key={i}>
										<Link
											href={href}
											target={openInNewTab ? '_blank' : undefined}
											rel={openInNewTab ? 'noopener noreferrer' : undefined}
											className='block rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white'>
											{label}
										</Link>
										{children?.length && (
											<ul className='mb-1 ml-3 flex flex-col gap-0.5 list-none border-l border-white/8 pl-3'>
												{children.map((child, j) => (
													<li key={j}>
														<Link
															href={child.href}
															target={child.openInNewTab ? '_blank' : undefined}
															rel={child.openInNewTab ? 'noopener noreferrer' : undefined}
															className='block rounded-md px-3 py-2 text-sm text-white/50 transition-colors hover:bg-white/5 hover:text-white/80'>
															{child.label}
														</Link>
													</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>
						)}

						{ctas.length > 0 && (
							<div className='mt-8 flex flex-col gap-3'>
								{ctas.map(({ text, href, variant, target }, i) => (
									<CtaLink
										key={i}
										href={href}
										variant={variant}
										target={target === '_blank' ? '_blank' : undefined}
										rel={target === '_blank' ? 'noopener noreferrer' : undefined}
										className='w-full text-center'>
										{text}
									</CtaLink>
								))}
							</div>
						)}
					</SheetContent>
				</Sheet>
			</SectionContainer>
		</header>
	);
}
