'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import SectionContainer from '@/components/layout/SectionContainer';
import AnimatedFadeUp from '@/components/AnimatedFadeUp';

interface BlogAuthor {
  _id: string;
  name: string;
  image?: string;
}

interface BlogCategory {
  _id: string;
  title: string;
  slug: { current: string };
}

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  description?: string;
  image?: string;
  category?: BlogCategory;
  publishedAt: string;
  author?: BlogAuthor;
}

export interface FeaturedArticlesCategoryProps {
  _type: 'featuredArticlesCategory';
  _key: string;
  heading: string;
  featuredPost: BlogPost;
  showFilter?: boolean;
  enabledCategories?: BlogCategory[];
  blogs?: BlogPost[];
  blogsPerPage?: number;
}

export default function FeaturedArticlesCategorySection({
  heading,
  featuredPost,
  showFilter = true,
  enabledCategories,
  blogs = [],
  blogsPerPage = 6,
}: FeaturedArticlesCategoryProps) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>('all');

  // Format Date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Determine which categories to show in tabs
  const getFilterCategories = () => {
    if (enabledCategories && enabledCategories.length > 0) {
      return enabledCategories;
    }
    // Extract unique categories from blogs
    const uniqueMap = new Map<string, BlogCategory>();
    blogs.forEach((blog) => {
      if (blog.category) {
        uniqueMap.set(blog.category._id, blog.category);
      }
    });
    return Array.from(uniqueMap.values());
  };

  const filterCategories = getFilterCategories();

  // Filter posts based on selected tab
  // (Excluding the featured post from the grid list so it doesn't duplicate)
  const nonFeaturedBlogs = blogs.filter((b) => b._id !== featuredPost?._id);
  const filteredBlogs = selectedCategorySlug === 'all'
    ? nonFeaturedBlogs
    : nonFeaturedBlogs.filter((b) => b.category?.slug?.current === selectedCategorySlug);

  // Paginated/Limited Blogs
  const displayedBlogs = filteredBlogs.slice(0, blogsPerPage);

  return (
    <section className="relative overflow-hidden bg-background py-16 lg:py-24">
      <SectionContainer className="relative z-10 grid gap-12">
        {/* Section Heading */}
        <div className="text-center">
          <AnimatedFadeUp>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-text-heading tracking-tight">
              {heading.split(' ').map((word, idx) => {
                const isGold = word.toLowerCase().includes('articles') || word.toLowerCase().includes('category');
                return (
                  <span key={idx} className={cn(isGold ? 'text-brand-gold' : 'text-text-heading', 'mr-2.5 last:mr-0')}>
                    {word}
                  </span>
                );
              })}
            </h2>
          </AnimatedFadeUp>
        </div>

        {/* Featured Post Card */}
        {featuredPost && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-[#03060b] border border-white/5 rounded-3xl overflow-hidden p-6 lg:p-8 hover:border-brand-gold/15 transition-all duration-500 shadow-xl">
            {/* Featured Image */}
            <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px] w-full rounded-2xl overflow-hidden group">
              {featuredPost.image ? (
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  priority
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-tr from-[#020e1c] to-[#03060b] flex items-center justify-center text-text-muted">
                  Featured Image
                </div>
              )}
              {/* Featured Label */}
              <div className="absolute top-4 left-4 bg-brand-gold text-[#020e1c] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md">
                Featured
              </div>
            </div>

            {/* Featured Details */}
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div className="grid gap-4">
                {featuredPost.category && (
                  <span className="text-xs font-semibold text-brand-gold uppercase tracking-wider">
                    {featuredPost.category.title}
                  </span>
                )}
                <h3 className="text-2xl lg:text-4.5xl font-heading font-bold text-text-heading leading-tight hover:text-brand-gold/90 transition-colors">
                  <Link href={`/blog/${featuredPost.slug.current}`}>
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="text-text-muted text-base leading-relaxed line-clamp-4">
                  {featuredPost.description || featuredPost.excerpt}
                </p>
              </div>

              {/* Author & Read CTA */}
              <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6 lg:mt-0">
                <div className="flex items-center gap-3">
                  {featuredPost.author?.image ? (
                    <Image
                      src={featuredPost.author.image}
                      alt={featuredPost.author.name}
                      width={44}
                      height={44}
                      className="rounded-full object-cover border border-brand-gold/25"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold text-sm font-bold border border-brand-gold/25">
                      {featuredPost.author?.name?.charAt(0) || 'A'}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-text-heading">
                      {featuredPost.author?.name || 'Author'}
                    </span>
                    <span className="text-xs text-text-muted">
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug.current}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-gold hover:text-brand-gold-light transition-colors group"
                >
                  Read Article
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Category Filtering Tabs */}
        {showFilter && filterCategories.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3 py-2 border-y border-white/5">
            <Button
              type='button'
              variant='ghost'
              aria-pressed={selectedCategorySlug === 'all'}
              onClick={() => setSelectedCategorySlug('all')}
              className={cn(
                'h-auto px-4 py-2 text-xs lg:text-sm font-heading font-medium rounded-full transition-all duration-300 border',
                selectedCategorySlug === 'all'
                  ? 'bg-brand-gold border-brand-gold text-[#020e1c] font-semibold hover:bg-brand-gold'
                  : 'bg-[#03060b] border-white/5 text-text-muted hover:bg-[#03060b] hover:text-text-heading hover:border-brand-gold/30'
              )}
            >
              All
            </Button>
            {filterCategories.map((cat) => (
              <Button
                key={cat._id}
                type='button'
                variant='ghost'
                aria-pressed={selectedCategorySlug === cat.slug.current}
                onClick={() => setSelectedCategorySlug(cat.slug.current)}
                className={cn(
                  'h-auto px-4 py-2 text-xs lg:text-sm font-heading font-medium rounded-full transition-all duration-300 border',
                  selectedCategorySlug === cat.slug.current
                    ? 'bg-brand-gold border-brand-gold text-[#020e1c] font-semibold hover:bg-brand-gold'
                    : 'bg-[#03060b] border-white/5 text-text-muted hover:bg-[#03060b] hover:text-text-heading hover:border-brand-gold/30'
                )}
              >
                {cat.title}
              </Button>
            ))}
          </div>
        )}

        {/* Blogs Listing Grid */}
        {displayedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-4">
            {displayedBlogs.map((blog) => (
              <article
                key={blog._id}
                className="flex flex-col justify-between bg-[#03060b] border border-white/5 rounded-2xl overflow-hidden hover:border-brand-gold/25 transition-all duration-300 hover:shadow-xl group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#020e1c] to-[#03060b] flex items-center justify-center text-text-muted">
                      No Image Available
                    </div>
                  )}
                  {/* Category Tag */}
                  {blog.category && (
                    <span className="absolute top-3 left-3 bg-[#03060b]/90 border border-brand-gold/15 text-brand-gold text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                      {blog.category.title}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between p-5 lg:p-6">
                  <div className="grid gap-3">
                    <h4 className="text-lg lg:text-xl font-heading font-bold text-text-heading leading-snug line-clamp-2 hover:text-brand-gold transition-colors">
                      <Link href={`/blog/${blog.slug.current}`}>
                        {blog.title}
                      </Link>
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed line-clamp-2">
                      {blog.description || blog.excerpt}
                    </p>
                  </div>

                  {/* Footer (Author Details & Read More Link) */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-5">
                    <div className="flex items-center gap-2">
                      {blog.author?.image ? (
                        <Image
                          src={blog.author.image}
                          alt={blog.author.name}
                          width={28}
                          height={28}
                          className="rounded-full object-cover border border-brand-gold/20"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold text-[10px] font-bold border border-brand-gold/20">
                          {blog.author?.name?.charAt(0) || 'A'}
                        </div>
                      )}
                      <div className="flex flex-col">
                        <span className="text-[11px] font-semibold text-text-heading">
                          {blog.author?.name || 'Author'}
                        </span>
                        <span className="text-[9px] text-text-muted">
                          {formatDate(blog.publishedAt)}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${blog.slug.current}`}
                      className="text-xs font-bold text-brand-gold hover:underline flex items-center gap-1 group/btn"
                    >
                      Read More
                      <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#03060b] border border-white/5 rounded-2xl">
            <p className="text-text-muted text-lg">No articles found in this category.</p>
          </div>
        )}
      </SectionContainer>
    </section>
  );
}
