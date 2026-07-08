import { getPage } from '@/sanity/helpers/pages';
import Footer from '@/components/layout/Footer';
import SectionRenderer from '@/components/SectionRenderer';
import { getSiteSettings } from '@/sanity/helpers/settings';
import Navbar from '@/components/layout/Navbar';
import CtaLink from '@/components/CtaLink';

export default async function NotFound() {
	const settings = await getSiteSettings({ cache: false });
	const page = await getPage('404');

	if (!page || !page.sections) {
		return (
			<>
				<Navbar settings={settings} />
				<main id='main-content' className='flex-1 flex flex-col items-center justify-center bg-[#060D15] text-center px-5 py-32 relative min-h-[500px]'>
					<div
						aria-hidden='true'
						className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px] pointer-events-none'
					/>
					<h1 className='font-heading text-[80px] leading-none lg:text-[112px] font-bold text-brand-gold mb-1 relative z-10 select-none drop-shadow-[0_0_50px_rgba(199,147,61,0.15)]'>
						404
					</h1>
					<p className='font-satoshi text-base text-[#B4BAC2] mb-8 max-w-md relative z-10'>
						The page you are looking for cannot be found.
					</p>
					<CtaLink href='/' variant='primary' className='relative z-10'>
						Go Home
					</CtaLink>
				</main>
				<Footer settings={settings} />
			</>
		);
	}

	return (
		<>
			<Navbar settings={settings} />
			<main id='main-content'>
				<SectionRenderer sections={page.sections} />
			</main>
			<Footer settings={settings} />
		</>
	);
}
