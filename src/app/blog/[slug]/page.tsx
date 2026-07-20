import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getBlogPostSlugs,
  getBlogPosts,
  getFeaturedImage,
  getPostAuthor,
  getPostCategories,
  getPostDescription,
  getPostTags,
  htmlToText,
} from "@/lib/wordpress";
import ReseauxSociaux from "@/components/ui/ReseauxSociaux";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}



export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getBlogPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}



function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function removeImagesFromContent(html: string): string {
  return html
    .replace(
      /<figure\b[^>]*class=(["'])[^"']*\bwp-block-image\b[^"']*\1[^>]*>[\s\S]*?<\/figure>/gi,
      "",
    )
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<p\b[^>]*>\s*<\/p>/gi, "")
    .trim();
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = htmlToText(post.title.rendered);
  const description = getPostDescription(post);
  const image = getFeaturedImage(post);
  const author = getPostAuthor(post);
  const categories = getPostCategories(post).map((category) => category.name);
  const tags = getPostTags(post).map((tag) => tag.name);
  const keywords = Array.from(new Set([...tags, ...categories]));

  return {
    title,
    description,
    keywords,
    authors: [
      {
        name: author?.name || "Trips to Marrakech",
      },
    ],
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      siteName: "Trips to Marrakech",
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [author?.name || "Trips to Marrakech"],
      tags: keywords,
      images: image
        ? [
            {
              url: image.source_url,
              alt: image.alt_text || title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image.source_url] : undefined,
    },
  };
}



export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<React.JSX.Element> {
  const { slug } = await params;

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const latestPosts = await getBlogPosts(6);
  const otherPosts = latestPosts.filter((latestPost) => latestPost.id !== post.id).slice(0, 4);

  const title = htmlToText(post.title.rendered);
  const description = getPostDescription(post);
  const image = getFeaturedImage(post);
  const author = getPostAuthor(post);
  const category = getPostCategories(post)[0];
  const tags = getPostTags(post);
  const articleUrl = `https://tripstomarrakech.com/blog/${post.slug}`;
  const contentWithoutImages = removeImagesFromContent(post.content.rendered);


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: image ? [image.source_url] : undefined,
    datePublished: post.date,
    dateModified: post.modified,
    mainEntityOfPage: articleUrl,
    author: {
      "@type": "Person",
      name: author?.name || "Trips to Marrakech",
    },
    publisher: {
      "@type": "Organization",
      name: "Trips to Marrakech",
      url: "https://tripstomarrakech.com",
    },
  };

  return (
    <section className="bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <article>
        <section className="relative isolate flex min-h-[560px] w-full items-end overflow-hidden sm:min-h-[620px] lg:h-[74vh] lg:max-h-[780px]">
          {image ? (
            <Image
              src={image.source_url}
              alt={image.alt_text || title}
              fill
              preload
              sizes="100vw"
              quality={80}
              className="object-cover object-center"
            />
          ) : (
            <div className="absolute inset-0 bg-heading" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center text-sm font-semibold text-white/90 transition hover:text-white"
            >
              ← Back to blog
            </Link>

            <div className="mt-5">
              {category && (
                <span className="inline-flex rounded-full border border-white/30 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  {category.name}
                </span>
              )}
            </div>

            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              {description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/75">
              <span>By {author?.name || "Trips to Marrakech"}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </div>
        </section>

        <section className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
            <div className="min-w-0">
              <div
                className="max-w-4xl text-base leading-8 text-text-secondary sm:text-lg sm:leading-9 [&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:transition [&_a:hover]:text-primary-hover [&_blockquote]:my-10 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:px-6 [&_blockquote]:py-5 [&_h2]:mb-5 [&_h2]:mt-14 [&_h2]:scroll-mt-28 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-heading [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:scroll-mt-28 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:leading-tight [&_h3]:text-heading [&_li]:mb-3 [&_ol]:my-7 [&_ol]:list-decimal [&_ol]:pl-7 [&_p]:mb-7 [&_strong]:font-semibold [&_strong]:text-heading [&_ul]:my-7 [&_ul]:list-disc [&_ul]:pl-7"
                dangerouslySetInnerHTML={{ __html: contentWithoutImages }}
              />

              {tags.length > 0 && (
                <div className="mt-14 max-w-3xl border-t border-border pt-8">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-heading">
                    Related topics
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag.id}
                        className="rounded-full border border-border px-4 py-2 text-sm font-medium text-text-secondary"
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-14 max-w-3xl border-t border-border pt-8">
                <Link
                  href="/blog"
                  className="inline-flex min-h-11 items-center font-semibold text-heading transition hover:text-primary"
                >
                  ← Explore more travel stories
                </Link>
              </div>
            </div>

            <aside className="space-y-10 lg:sticky lg:top-26">
              {otherPosts.length > 0 && (
                <section>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <h2 className="text-2xl font-bold text-heading">
                      More Blogs
                    </h2>

                    <Link
                      href="/blog"
                      className="text-sm font-semibold text-primary transition hover:text-primary-hover"
                    >
                      View all
                    </Link>
                  </div>

                  <div className="divide-y divide-border">
                    {otherPosts.map((otherPost) => {
                      const otherTitle = htmlToText(otherPost.title.rendered);
                      const otherImage = getFeaturedImage(otherPost);
                      const otherCategory = getPostCategories(otherPost)[0];

                      return (
                        <article key={otherPost.id} className="py-3 first:pt-4">
                          <Link
                            href={`/blog/${otherPost.slug}`}
                            className="group grid grid-cols-[120px_minmax(0,1fr)] gap-4"
                          >
                            <div className="relative aspect-square overflow-hidden rounded-xl">
                              {otherImage ? (
                                <Image
                                  src={otherImage.source_url}
                                  alt={otherImage.alt_text || otherTitle}
                                  fill
                                  sizes="88px"
                                  className="object-cover transition duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="h-full w-full border border-border" />
                              )}
                            </div>

                            <div className="min-w-0">
                              {otherCategory && (
                                <p className="line-clamp-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                                  {otherCategory.name}
                                </p>
                              )}

                              <h3 className="mt-2 line-clamp-3 text-2xl font-bold leading-snug text-heading transition group-hover:text-primary">
                                {otherTitle}
                              </h3>

                              <time
                                dateTime={otherPost.date}
                                className="mt-2 block text-xs text-text-secondary"
                              >
                                {formatDate(otherPost.date)}
                              </time>
                            </div>
                          </Link>
                        </article>
                      );
                    })}
                  </div>
                </section>
              )}

              <section className="border-t border-border">
                <div className="flex justify-center">
                  <ReseauxSociaux />
                </div>
                <p className="text-sm pt-4 font-semibold uppercase tracking-[0.15em] text-primary">
                  Plan your journey
                </p>

                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  Explore private tours, Sahara journeys and personalized
                  experiences designed around your interests.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-flex min-h-11 items-center border-b border-heading text-sm font-semibold text-heading transition hover:border-primary hover:text-primary"
                >
                  Start planning your trip
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Link>
              </section>
            </aside>
          </div>
        </section>
      </article>
    </section>
  );
}
