import Image from "next/image";
import Link from "next/link";
import {
  getBlogPosts,
  getFeaturedImage,
  getPostCategories,
  getPostTags,
  htmlToText,
} from "@/lib/wordpress";

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function TopBlogs(): Promise<React.JSX.Element | null> {
  const posts = await getBlogPosts(4);

  if (posts.length === 0) {
    return null;
  }


  return (
    <section className=" text-foreground">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold leading-tight text-heading">
            Top <span className="text-primary">Blog</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
            Discover our latest Morocco travel guides, cultural stories and
            practical advice for planning an unforgettable journey.
          </p>
        </header>

        <div className="mt-12 grid auto-rows-fr grid-cols-1 items-stretch gap-x-8 gap-y-12 lg:grid-cols-2">
          {posts.map((post) => {
            const title = htmlToText(post.title.rendered);
            const excerpt = htmlToText(post.excerpt.rendered);
            const image = getFeaturedImage(post);
            const category = getPostCategories(post)[0];
            const tags = getPostTags(post).slice(0, 3);

            return (
              <article key={post.id} className="group h-full">
                <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] sm:items-stretch">
                  <Link
                    href={`/blog/${post.slug}`}
                    aria-label={`Read ${title}`}
                    className="relative block aspect-[4/3] w-full overflow-hidden rounded-xl sm:aspect-auto sm:h-full sm:min-h-[330px]"
                  >
                    {image ? (
                      <Image
                        src={image.source_url}
                        alt={image.alt_text || title}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 45vw, 26vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center border border-border px-5 text-center text-sm text-text-muted">
                        No featured image
                      </div>
                    )}
                  </Link>

                  <div className="flex h-full min-w-0 flex-col py-1">
                    <div className="flex min-h-6 flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-secondary">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>

                      {category && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="line-clamp-1">{category.name}</span>
                        </>
                      )}
                    </div>

                    <h3 className="mt-4 line-clamp-2 text-2xl font-bold leading-tight text-heading sm:min-h-[3.75rem]">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="transition duration-300 hover:text-primary"
                      >
                        {title}
                      </Link>
                    </h3>

                    <p className="mt-4 line-clamp-4 text-base leading-7 text-text-secondary sm:min-h-[7rem]">
                      {excerpt}
                    </p>

                    <div className="mt-auto pt-5">
                      {tags.length > 0 && (
                        <div className="flex min-h-[4.5rem] flex-wrap content-start gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag.id}
                              className="border border-border px-3 py-1.5 text-xs font-medium text-text-secondary"
                            >
                              {tag.name}
                            </span>
                          ))}
                        </div>
                      )}

                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-heading transition hover:text-primary"
                      >
                        Read article
                        <span
                          aria-hidden="true"
                          className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center border-b border-heading px-1 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary"
          >
            Explore all travel stories
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
