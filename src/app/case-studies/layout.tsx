import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getSiteSettings } from '@/sanity/helpers/settings';

export default async function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
	const settings = await getSiteSettings({ cache: false });
	return (
		<>
			<Navbar settings={settings} />
			{children}
			<Footer settings={settings} />
		</>
	);
}
