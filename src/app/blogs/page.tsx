import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import SectionRenderer from '@/components/SectionRenderer';
import { getPage } from '@/sanity/helpers/pages';
import {
	generateMetadata as genMeta,
	renderJsonLd,
} from '@/sanity/helpers/seo';

export async function generateMetadata(): Promise<Metadata> {
	const page = await getPage('blogs');
	return genMeta(page?.seo);
}

export default async function BlogIndexPage() {
	const page = await getPage('blogs');

	return (
		<main id='main-content'>
			{page?.enableSmoothScroll && <SmoothScroll />}
			{page?.seo?.schemaMarkup && renderJsonLd(page.seo.schemaMarkup)}
			<SectionRenderer sections={page?.sections} />
		</main>
	);
}
