import { groq } from 'next-sanity';
import { CTA_BTN_FIELDS, SEO_FIELDS } from './fragments';

export const BLOG_BY_SLUG_QUERY = groq`
  *[_type == "blog" && slug.current == $slug][0] {
    _id,
    title[] { text, isHighlighted, variant },
    "titleText": array::join(title[].text, " "),
    backLabel,
    "slug": slug.current,
    description,
    publishedAt,
    "featuredImageUrl": image.asset->url,
    body[] {
      ...,
      _type == "imageWithAlt" => { "url": asset->url, alt },
      _type == "iconCardList" => {
        ...,
        cards[] { ..., icon { "url": asset->url, alt, iconSvg } }
      },
      _type == "testimonialBlock" => {
        ...,
        testimonials[]->{ _id, author, designation, rating, quote }
      }
    },
    "category": category->{ _id, title, "slug": slug.current },
    "author": author->{ _id, name, role, "avatarUrl": image.asset->url, bio },
    hideSidebar,
    aboutAuthorTitle,
    showViewAllBlogs,
    authorBottomText,
    bookCallCard {
      heading,
      description,
      "icon": icon { "url": asset->url, alt, iconSvg },
      ctas[] { cta_text, url, variant, target }
    },
    sharePost { heading, platforms },
    seo { ${SEO_FIELDS} }
  }
`;

export const BLOG_PATHS_QUERY = groq`
  *[_type == "blog" && defined(slug.current)][].slug.current
`;

export const ALL_BLOG_CATEGORIES_QUERY = groq`
  *[_type == "blogCategory"] | order(title asc) { title }
`;

export const CASE_STUDY_BY_SLUG_QUERY = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    title[] { text, isHighlighted, variant },
    "titleText": array::join(title[].text, " "),
    backLabel,
    "slug": slug.current,
    description,
    publishedAt,
    "featuredImageUrl": image.asset->url,
    body[] {
      ...,
      _type == "imageWithAlt" => { "url": asset->url, alt },
      _type == "iconCardList" => {
        ...,
        cards[] { ..., icon { "url": asset->url, alt, iconSvg } }
      },
      _type == "testimonialBlock" => {
        ...,
        testimonials[]->{ _id, author, designation, rating, quote }
      }
    },
    "location": location->{ _id, name, area },
    tags[]->{ _id, title, "slug": slug.current },
    caseStudyMetrics[],
    "author": author->{ _id, name, role, "avatarUrl": image.asset->url, bio },
    hideSidebar,
    aboutAuthorTitle,
    showViewAllBlogs,
    authorBottomText,
    bookCallCard {
      heading,
      description,
      "icon": icon { "url": asset->url, alt, iconSvg },
      ctas[] { cta_text, url, variant, target }
    },
    sharePost { heading, platforms },
    seo { ${SEO_FIELDS} }
  }
`;

export const CASE_STUDY_PATHS_QUERY = groq`
  *[_type == "caseStudy" && defined(slug.current)][].slug.current
`;
