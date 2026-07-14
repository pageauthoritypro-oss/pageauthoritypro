import { getInitials, formatDate } from '@/lib/utils';
import type { SanityHeadingPart } from '@/sanity/types';
import type { BlogArticle, SanityBlogPost } from '@/sanity/types/blog';

// Editors type a literal "\n" inside a title part to force a line break on the
// detail page's heading. Card titles are single-line, so collapse any literal
// or real newline into a plain space instead of leaking "\n" into the text.
export function sanitizeCardTitle(title?: string): string {
	if (!title) return '';
	return title.replace(/\\n/g, ' ').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
}

export function mapToArticle(blog: SanityBlogPost): BlogArticle {
	let titleStr = '';
	const blogTitle = blog.title as unknown;
	if (typeof blogTitle === 'string') {
		titleStr = blogTitle;
	} else if (blog.titleText) {
		titleStr = blog.titleText;
	} else if (Array.isArray(blogTitle)) {
		titleStr = (blogTitle as SanityHeadingPart[]).map((p) => p.text || '').join(' ').trim();
	}
	return {
		category: blog.category?.title ?? 'Blog',
		title: sanitizeCardTitle(titleStr),
		description: blog.excerpt ?? blog.description ?? '',
		author: {
			name: blog.author?.name ?? 'Author',
			initials: getInitials(blog.author?.name ?? 'A'),
			date: formatDate(blog.publishedAt ?? ''),
		},
		href: `/blogs/${typeof blog.slug === 'string' ? blog.slug : blog.slug?.current ?? ''}`,
		image: blog.image ?? blog.featuredImageUrl,
	};
}
