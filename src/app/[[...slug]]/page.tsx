import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, getPagePaths } from "@/sanity/helpers/pages";
import {
  generateMetadata as genMeta,
  renderJsonLd,
} from "@/sanity/helpers/seo";
import SectionRenderer from "@/components/SectionRenderer";
import SmoothScroll from "@/components/SmoothScroll";

export async function generateStaticParams() {
  const paths = await getPagePaths();
  return paths.map((slug) => ({
    slug: slug === "/" ? [] : slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug: slugArr } = await params;
  const slug = slugArr && slugArr.length > 0 ? slugArr.join("/") : "/";
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return genMeta(page.seo);
}

export default async function PageRoute({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug: slugArr } = await params;
  const slug = slugArr && slugArr.length > 0 ? slugArr.join("/") : "/";
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  return (
    <>
      {page.enableSmoothScroll && <SmoothScroll />}
      {page.seo?.schemaMarkup && renderJsonLd(page.seo.schemaMarkup)}
      <main id="main-content">
        <SectionRenderer sections={page.sections} />
      </main>
    </>
  );
}
