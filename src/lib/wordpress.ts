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

export interface WordPressPostPreview {
  id: number;
  slug: string;
  date: string;
  title: WordPressRendered;
  excerpt: WordPressRendered;
  _embedded?: {
    author?: WordPressAuthor[];
    "wp:featuredmedia"?: WordPressMedia[];
    "wp:term"?: WordPressTerm[][];
  };
}


export interface WordPressPost extends WordPressPostPreview {
  status: "publish";
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  content: WordPressRendered;
}

export type WordPressBlogCard = WordPressPostPreview;


export interface PaginatedBlogPosts {
  posts: WordPressPost[];
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}


const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL?.replace(/\/$/, "");

function getWordPressApiUrl(): string {
  if (!WORDPRESS_API_URL) {
    console.warn("WORDPRESS_API_URL is missing from environment variables");

    return "";
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



export function getFeaturedImage(
  post: WordPressPostPreview,
): WordPressMedia | null {
  return post._embedded?.["wp:featuredmedia"]?.[0] ?? null;
}

export function getPostTerms(post: WordPressPostPreview): WordPressTerm[] {
  return post._embedded?.["wp:term"]?.flat() ?? [];
}

export function getPostCategories(post: WordPressPostPreview): WordPressTerm[] {
  return getPostTerms(post).filter((term) => term.taxonomy === "category");
}

export function getPostTags(post: WordPressPostPreview): WordPressTerm[] {
  return getPostTerms(post).filter((term) => term.taxonomy === "post_tag");
}

export function getPostAuthor(
  post: WordPressPostPreview,
): WordPressAuthor | null {
  return post._embedded?.author?.[0] ?? null;
}

export function getPostDescription(post: WordPressPost): string {
  const excerpt = htmlToText(post.excerpt?.rendered ?? "");

  if (excerpt) {
    return excerpt.slice(0, 180);
  }

  return htmlToText(post.content?.rendered ?? "").slice(0, 180);
}




export async function getBlogPosts(page = 1,perPage = 6,): Promise<PaginatedBlogPosts> {

  
  const safePage = Math.max(1, Math.trunc(page));
  const safePerPage = Math.min(100, Math.max(1, Math.trunc(perPage)));

  const emptyResult: PaginatedBlogPosts = {
    posts: [],
    totalPosts: 0,
    totalPages: 1,
    currentPage: safePage,
    perPage: safePerPage,
  };

  try {
    const apiUrl = getWordPressApiUrl();

    if (!apiUrl) {
      console.warn("WordPress API URL is unavailable.");
      return emptyResult;
    }

    const query = new URLSearchParams({
      _embed: "1",
      status: "publish",
      orderby: "date",
      order: "desc",
      page: String(safePage),
      per_page: String(safePerPage),
    });

    const response = await fetch(`${apiUrl}/posts?${query.toString()}`, {
      next: {
        revalidate: 86400,
        tags: ["wordpress-blog-posts"],
      },
    });

    if (!response.ok) {
      console.error(
        `Unable to fetch WordPress posts. Status: ${response.status}`,
      );

      return emptyResult;
    }

    const posts = (await response.json()) as WordPressPost[];

    return {
      posts,
      totalPosts: Number(response.headers.get("X-WP-Total") ?? 0),
      totalPages: Number(response.headers.get("X-WP-TotalPages") ?? 1),
      currentPage: safePage,
      perPage: safePerPage,
    };
  } catch (error) {
    console.error("WordPress posts fetching error:", error);
    return emptyResult;
  }
}

// get top blog posts

export async function getTopBlogPosts(limit = 4): Promise<WordPressBlogCard[]> {
  try {
    const safeLimit = Math.min(20, Math.max(1, Math.trunc(limit)));

    const apiUrl = getWordPressApiUrl();

    if (!apiUrl) {
      console.error(
        "Cannot fetch top blog posts: WordPress API URL is missing.",
      );

      return [];
    }

    const query = new URLSearchParams({
      status: "publish",
      orderby: "date",
      order: "desc",
      per_page: String(safeLimit),
      _embed: "wp:featuredmedia,wp:term",
      _fields: "id,slug,date,title,excerpt,_links,_embedded",
    });

    const response = await fetch(`${apiUrl}/posts?${query.toString()}`, {
      next: {
        revalidate: 86400,
        tags: ["wordpress-blog-posts"],
      },
    });

    if (!response.ok) {
      console.error(
        `Unable to fetch top WordPress posts. Status: ${response.status}`,
      );

      return [];
    }

    const posts = (await response.json()) as WordPressBlogCard[];

    return Array.isArray(posts) ? posts : [];
  } catch (error) {
    console.error(
      "Top WordPress posts fetching error:",
      error instanceof Error ? error.message : error,
    );

    return [];
  }
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
        revalidate: 86400,
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
        revalidate: 86400,
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