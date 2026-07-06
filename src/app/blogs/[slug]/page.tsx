import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailSection from '@/components/blog/BlogDetailSection';
import CtaSection from '@/components/home/CtaSection';
import AnimatedSection from '@/components/AnimatedSection';
import { getBlogBySlug, getBlogPaths } from '@/sanity/helpers/blog';
import { getPage } from '@/sanity/helpers/pages';
import { generateMetadata as genMeta, renderJsonLd } from '@/sanity/helpers/seo';
import type { CtaSectionData } from '@/sanity/types';

interface Props {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	const slugs = await getBlogPaths();
	return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const post = await getBlogBySlug(slug);
	if (!post) return {};
	return genMeta(post.seo);
}

export default async function BlogDetailPage({ params }: Props) {
	const { slug } = await params;
	const [post, page] = await Promise.all([
		getBlogBySlug(slug),
		getPage('blog-details'),
	]);

	if (!post) notFound();

	const sanityCtaSection = page?.sections?.find((s) => s._type === 'ctaSection') as CtaSectionData | undefined;

	return (
		<main id='main-content'>
			{post.seo?.schemaMarkup && renderJsonLd(post.seo.schemaMarkup)}
			<AnimatedSection isHero>
				<BlogDetailSection post={post} />
			</AnimatedSection>
			{sanityCtaSection && (
				<AnimatedSection>
					<CtaSection {...sanityCtaSection} />
				</AnimatedSection>
			)}
		</main>
	);
}
