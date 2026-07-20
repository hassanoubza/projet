export interface WordPressRendered {
  rendered: string;
  protected?: boolean;
}

export interface WordPressAuthor {
  id: number;
  name: string;
  slug: string;
  link: string;
}

export interface WordPressTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: "category" | "post_tag";
}

export interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width?: number;
    height?: number;
  };
}

export interface WordPressPost {
  id: number;
  slug: string;
  status: "publish";
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  title: WordPressRendered;
  excerpt: WordPressRendered;
  content: WordPressRendered;
  _embedded?: {
    author?: WordPressAuthor[];
    "wp:featuredmedia"?: WordPressMedia[];
    "wp:term"?: WordPressTerm[][];
  };
}

export interface WordPressBlogCard {
  id: number;
  slug: string;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: WordPressMedia[];
    "wp:term"?: WordPressTerm[][];
  };
}

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL?.replace(/\/$/, "");

function getWordPressApiUrl(): string {
  if (!WORDPRESS_API_URL) {
    throw new Error(
      "WORDPRESS_API_URL is missing from the environment variables.",
    );
  }

  return WORDPRESS_API_URL;
}

export function htmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&#(\d+);/g, (_, code: string) =>
      String.fromCodePoint(Number(code)),
    )
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

export function getFeaturedImage(post: WordPressPost): WordPressMedia | null {
  return post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
}

export function getPostAuthor(post: WordPressPost): WordPressAuthor | null {
  return post._embedded?.author?.[0] ?? null;
}

export function getPostTerms(post: WordPressPost): WordPressTerm[] {
  return post._embedded?.["wp:term"]?.flat() ?? [];
}

export function getPostCategories(post: WordPressPost): WordPressTerm[] {
  return getPostTerms(post).filter((term) => term.taxonomy === "category");
}

export function getPostTags(post: WordPressPost): WordPressTerm[] {
  return getPostTerms(post).filter((term) => term.taxonomy === "post_tag");
}

export function getPostDescription(post: WordPressPost): string {
  const excerpt = htmlToText(post.excerpt?.rendered ?? "");

  if (excerpt) {
    return excerpt.slice(0, 180);
  }

  return htmlToText(post.content?.rendered ?? "").slice(0, 180);
}

export async function getBlogPosts(limit = 12): Promise<WordPressPost[]> {
  const query = new URLSearchParams({
    _embed: "1",
    status: "publish",
    orderby: "date",
    order: "desc",
    per_page: String(limit),
  });

  const response = await fetch(
    `${getWordPressApiUrl()}/posts?${query.toString()}`,
    {
      next: {
        revalidate: 300,
        tags: ["wordpress-blog-posts"],
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Unable to fetch WordPress posts. Status: ${response.status}`,
    );
  }

  return (await response.json()) as WordPressPost[];
}

export async function getTopBlogPosts(limit = 4): Promise<WordPressBlogCard[]> {
  const query = new URLSearchParams({
    status: "publish",
    orderby: "date",
    order: "desc",
    per_page: String(limit),
    _embed: "wp:featuredmedia,wp:term",
    _fields: "id,slug,date,title,excerpt,_links,_embedded",
  });

  const response = await fetch(
    `${getWordPressApiUrl()}/posts?${query.toString()}`,
    {
      next: {
        revalidate: 300,
        tags: ["wordpress-blog-posts"],
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Unable to fetch top WordPress posts. Status: ${response.status}`,
    );
  }

  return (await response.json()) as WordPressBlogCard[];
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<WordPressPost | null> {
  const query = new URLSearchParams({
    slug,
    _embed: "1",
    status: "publish",
  });

  const response = await fetch(
    `${getWordPressApiUrl()}/posts?${query.toString()}`,
    {
      next: {
        revalidate: 300,
        tags: ["wordpress-blog-posts", `wordpress-blog-post-${slug}`],
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Unable to fetch the WordPress post. Status: ${response.status}`,
    );
  }

  const posts = (await response.json()) as WordPressPost[];

  return posts[0] ?? null;
}

interface WordPressPostSlug {
  slug: string;
}

export async function getBlogPostSlugs(): Promise<string[]> {
  const query = new URLSearchParams({
    status: "publish",
    per_page: "100",
    _fields: "slug",
  });

  const response = await fetch(
    `${getWordPressApiUrl()}/posts?${query.toString()}`,
    {
      next: {
        revalidate: 300,
        tags: ["wordpress-blog-posts"],
      },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Unable to fetch WordPress post slugs. Status: ${response.status}`,
    );
  }

  const posts = (await response.json()) as WordPressPostSlug[];

  return posts.map((post) => post.slug);
}