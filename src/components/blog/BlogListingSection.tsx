import BlogsSection from '@/components/blog/BlogsSection';
import { getAllBlogCategories } from '@/sanity/helpers/blog';
import { fetchBlogArticlesPage } from '@/sanity/actions/listing-actions';
import { mapToArticle } from '@/sanity/helpers/blog-mappers';
import type { FeaturedArticlesCategorySectionData } from '@/sanity/types';
import type { SanityBlogPost } from '@/sanity/types/blog';

interface BlogListingSectionProps extends FeaturedArticlesCategorySectionData {
	overlapPrevious?: boolean;
}

export default async function BlogListingSection(props: BlogListingSectionProps) {
	const blogsPerPage = (props.blogsPerPage as number) || 6;
	const showFilter = props.showFilter !== false;
	const manualBlogRefs = (props.blogs as { _id: string; categoryTitle?: string }[] | undefined) ?? [];
	const useManualOrder = props.useManualOrder === true;

	const sanityCategories = props.enabledCategories as { title: string }[] | undefined;
	const allCategories: { title: string }[] = sanityCategories?.length
		? sanityCategories
		: await getAllBlogCategories();
	const categories = ['All', ...allCategories.map((c) => c.title)];

	const featuredPost = props.featuredPost as SanityBlogPost | undefined;
	const featuredArticle = featuredPost ? mapToArticle(featuredPost) : undefined;

	const { articles, totalPages } = await fetchBlogArticlesPage({
		page: 1,
		category: 'All',
		blogsPerPage,
		useManualOrder,
		manualBlogRefs,
	});

	return (
		<BlogsSection
			categories={categories}
			initialArticles={articles}
			initialTotalPages={totalPages}
			blogsPerPage={blogsPerPage}
			useManualOrder={useManualOrder}
			manualBlogRefs={manualBlogRefs}
			featuredArticle={featuredArticle}
			featuredHeading={props.heading}
			showFilter={showFilter}
			overlapPrevious={props.overlapPrevious}
		/>
	);
}
