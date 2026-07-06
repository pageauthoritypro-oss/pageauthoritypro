import type { Metadata } from 'next';
import SectionRenderer from '@/components/SectionRenderer';
import SmoothScroll from '@/components/SmoothScroll';
import { getPage } from '@/sanity/helpers/pages';
import { generateMetadata as genMeta } from '@/sanity/helpers/seo';

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPage('case-studies');
	return genMeta(page?.seo);
}

export default async function CaseStudiesPage() {
	const page = await getPage('case-studies');

	return (
		<main id='main-content'>
			{page?.enableSmoothScroll && <SmoothScroll />}
			<SectionRenderer sections={page?.sections} />
		</main>
	);
}
