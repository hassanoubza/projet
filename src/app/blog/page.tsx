import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  getBlogPosts,
  getFeaturedImage,
  getPostCategories,
  getPostTags,
  htmlToText,
} from "@/lib/wordpress";



export const metadata: Metadata = {
  title: "Morocco Travel Blog",
  description:
    "Discover Marrakech travel guides, Morocco travel tips, inspiring stories and practical resources for planning your next adventure.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Morocco Travel Blog | Trips to Marrakech",
    description:
      "Discover Marrakech travel guides, Morocco travel tips and practical advice for planning your journey.",
    url: "/blog",
    type: "website",
  },
};



function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}



export default async function BlogPage(): Promise<React.JSX.Element> {
  const posts = await getBlogPosts(20);

  
  return (
    <section className="bg-background px-4 pb-10 pt-10 text-foreground sm:px-6 lg:px-8">
      <section className="mx-auto max-w-7xl">
        <section className="mx-auto max-w-3xl text-center">
          <h1 className="mt-3 text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Morocco Travel <span className="text-primary">Blog</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-text-secondary">
            A travel blog featuring inspiring stories, destination guides, tips
            and resources to help you explore Morocco and plan your next
            adventure.
          </p>
        </section>

        {posts.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-border bg-card p-10 text-center">
            <h2 className="text-xl font-bold text-heading">
              No articles published yet
            </h2>

            <p className="mt-2 text-text-secondary">
              New Morocco travel guides will appear here after they are
              published in WordPress.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid auto-rows-fr grid-cols-1 items-stretch gap-x-16 gap-y-14 lg:grid-cols-2">
            {posts.map((post) => {
              const title = htmlToText(post.title.rendered);
              const excerpt = htmlToText(post.excerpt.rendered);
              const image = getFeaturedImage(post);
              const category = getPostCategories(post)[0];
              const tags = getPostTags(post).slice(0, 5);

              return (
                <article key={post.id} className="group h-full">
                  <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch">
                    <Link
                      href={`/blog/${post.slug}`}
                      aria-label={`Read ${title}`}
                      className="relative block aspect-[16/10] w-full overflow-hidden bg-surface-soft md:aspect-auto md:h-full md:min-h-[360px]"
                    >
                      {image ? (
                        <Image
                          src={image.source_url}
                          alt={image.alt_text || title}
                          fill
                          sizes="(max-width: 767px) 100vw, 50vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center px-5 text-center text-sm text-text-muted">
                          No featured image
                        </div>
                      )}
                    </Link>

                    <div className="flex h-full min-w-0 flex-col">
                      <div className="flex min-h-5 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-secondary">
                        <time dateTime={post.date}>
                          {formatDate(post.date)}
                        </time>

                        {category && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="line-clamp-1">
                              {category.name}
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="mt-3 line-clamp-2 min-h-[3.5rem] text-2xl font-bold leading-tight text-heading">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="transition hover:text-primary"
                        >
                          {title}
                        </Link>
                      </h2>

                      <p className="mt-3 line-clamp-4 min-h-[7rem] text-base leading-7 text-text-secondary">
                        {excerpt}
                      </p>

                      <div className="mt-auto min-h-[5rem] pt-5">
                        {tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <span
                                key={tag.id}
                                className="bg-surface-soft px-3 py-1.5 text-sm text-text-secondary"
                              >
                                {tag.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </section>
  );
}
