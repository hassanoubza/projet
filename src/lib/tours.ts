import "server-only";
import { cache } from "react";
import { TourItineraryItem } from "@/components/section/tours/types";

export interface WordPressRendered {
  rendered: string;
  protected?: boolean;
}

export interface TourFeaturedMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_type?: string;
  mime_type?: string;
  media_details?: {
    width?: number;
    height?: number;
    sizes?: Record<
      string,
      {
        width?: number;
        height?: number;
        source_url?: string;
      }
    >;
  };
}

export interface TourTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: "departure-city" | "tour-tag" | string;
}

export interface AcfTourImage {
  ID: number;
  id: number;
  title: string;
  filename: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  mime_type: string;
  sizes?: Record<string, string | number>;
}

export interface TourCardAcf {
  duration: string;
  start_location: string;
  end_location: string;
  price_from: string;
  currency: string;
  group_size: string;
}

export interface TourDetailsAcf extends TourCardAcf {
  overview: string;
  highlights: string;
  included: string;
  excluded: string;
  itinerary: string;
  faq: string;
  map_embed_url: string;
  related_tours: number[] | string | false;
  tour_image_2: AcfTourImage | false;
  tour_image_3: AcfTourImage | false;
  tour_image_4: AcfTourImage | false;
  seo_title: string;
  seo_description: string;
}

interface TourEmbedded {
  "wp:featuredmedia"?: TourFeaturedMedia[];
  "wp:term"?: TourTerm[][];
}

export interface WordPressTourCard {
  id: number;
  slug: string;
  title: WordPressRendered;
  excerpt: WordPressRendered;
  featured_media: number;
  departure_city: number[];
  tour_tags: number[];
  acf: TourCardAcf;
  _embedded?: {
    "wp:featuredmedia"?: TourFeaturedMedia[];
    "wp:term"?: TourTerm[][];
  };
}

export interface WordPressTourDetails {
  id: number;
  date: string;
  modified: string;
  slug: string;
  status: "publish" | string;
  type: string;
  link: string;
  title: WordPressRendered;
  excerpt: WordPressRendered;
  featured_media: number;
  departure_city: number[];
  tour_tags: number[];
  acf: TourDetailsAcf;
  _embedded?: TourEmbedded;
}

export interface PaginatedTourCards {
  tours: WordPressTourCard[];
  totalTours: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export interface GetTourCardsOptions {
  page?: number;
  perPage?: number;
  departureCityId?: number;
}

function getWordPressApiUrl(): string {
  const apiUrl = process.env.WORDPRESS_API_URL?.trim();

  if (!apiUrl) {
    throw new Error(
      "WORDPRESS_API_URL is missing from the environment variables.",
    );
  }

  return apiUrl.replace(/\/$/, "");
}

async function throwWordPressError(
  response: Response,
  requestName: string,
): Promise<never> {
  const responseBody = await response.text();

  throw new Error(
    `${requestName} failed with status ${response.status}. ${responseBody.slice(0, 300)}`,
  );
}

/**
 * Query 1:
 * Returns lightweight data for tour cards.
 *
 * Supports:
 * - pagination
 * - filtering by departure city
 * - featured image
 * - departure city and tour tags
 */

export async function getTourCards({
  page = 1,
  perPage = 20,
  departureCityId,
}: GetTourCardsOptions = {}): Promise<PaginatedTourCards> {
  const safePage = Math.max(1, Math.trunc(page));
  const safePerPage = Math.min(100, Math.max(1, Math.trunc(perPage)));

  const query = new URLSearchParams({
    status: "publish",
    page: String(safePage),
    per_page: String(safePerPage),
    orderby: "date",
    order: "desc",
    _embed: "wp:featuredmedia,wp:term",
    acf_format: "standard",
    _fields: [
      "id",
      "slug",
      "title",
      "excerpt",
      "featured_media",
      "departure_city",
      "tour_tags",
      "acf.duration",
      "acf.start_location",
      "acf.end_location",
      "acf.price_from",
      "acf.currency",
      "acf.group_size",
      "_links",
      "_embedded",
    ].join(","),
  });

  if (
    typeof departureCityId === "number" &&
    Number.isInteger(departureCityId) &&
    departureCityId > 0
  ) {
    query.set("departure_city", String(departureCityId));
  }

  const response = await fetch(
    `${getWordPressApiUrl()}/tours?${query.toString()}`,
    {
      next: {
        revalidate: 300,
        tags: ["wordpress-tours", "wordpress-tour-cards"],
      },
    },
  );

  if (!response.ok) {
    await throwWordPressError(response, "Fetching tour cards");
  }

  const tours = (await response.json()) as WordPressTourCard[];

  return {
    tours,
    totalTours: Number(response.headers.get("X-WP-Total") ?? 0),
    totalPages: Number(response.headers.get("X-WP-TotalPages") ?? 1),
    currentPage: safePage,
    perPage: safePerPage,
  };
}


/**
 * Query 2:
 * Returns the complete tour using its slug.
 *
 * The React cache wrapper prevents duplicate work when this function is used
 * in both generateMetadata() and the page component during the same render.
 */

export const getTourBySlug = cache(
  async (slug: string): Promise<WordPressTourDetails | null> => {
    const normalizedSlug = slug.trim();

    if (!normalizedSlug) {
      return null;
    }

    const query = new URLSearchParams({
      slug: normalizedSlug,
      status: "publish",
      per_page: "1",
      _embed: "1",
      acf_format: "standard",
    });

    const response = await fetch(
      `${getWordPressApiUrl()}/tours?${query.toString()}`,
      {
        next: {
          revalidate: 300,
          tags: ["wordpress-tours", `wordpress-tour-${normalizedSlug}`],
        },
      },
    );

    if (!response.ok) {
      await throwWordPressError(response, "Fetching tour details");
    }

    const tours = (await response.json()) as WordPressTourDetails[];

    return tours[0] ?? null;
  },
);



export function getTourFeaturedImage(
  tour: WordPressTourCard | WordPressTourDetails,
): TourFeaturedMedia | null {
  return tour._embedded?.["wp:featuredmedia"]?.[0] ?? null;
}

export function getTourTerms(
  tour: WordPressTourCard | WordPressTourDetails,
): TourTerm[] {
  return tour._embedded?.["wp:term"]?.flat() ?? [];
}

export function getTourDepartureCity(
  tour: WordPressTourCard | WordPressTourDetails,
): TourTerm | null {
  return (
    getTourTerms(tour).find((term) => term.taxonomy === "departure-city") ??
    null
  );
}

export function getTourTags(
  tour: WordPressTourCard | WordPressTourDetails,
): TourTerm[] {
  return getTourTerms(tour).filter((term) => term.taxonomy === "tour-tag");
}

export function linesToArray(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }
  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeRelatedTourIds(
  value: number[] | string | false | null | undefined,
): number[] {
  return Array.isArray(value) ? value : [];
}

export function htmlToText(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "’")
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// departure cities

export interface DepartureCity {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export async function getDepartureCities(): Promise<DepartureCity[]> {
  const query = new URLSearchParams({
    per_page: "100",
    orderby: "name",
    order: "asc",
    hide_empty: "true",
  });

  const response = await fetch(
    `${getWordPressApiUrl()}/departure_city?${query.toString()}`,
    {
      next: {
        revalidate: 300,
        tags: ["wordpress-departure-cities"],
      },
    },
  );

  if (!response.ok) {
    await throwWordPressError(response, "Fetching departure cities");
  }

  return (await response.json()) as DepartureCity[];
}

// itinerary parsing

export function parseTourItinerary(
  itineraryHtml: string | null | undefined,
): TourItineraryItem[] {
  if (!itineraryHtml) {
    return [];
  }

  const itineraryItems: TourItineraryItem[] = [];
  const dayPattern = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3\b|$)/gi;

  for (const [index, match] of Array.from(
    itineraryHtml.matchAll(dayPattern),
  ).entries()) {
    const completeHeading = htmlToText(match[1]);
    const description = htmlToText(match[2]);

    const headingMatch = completeHeading.match(/^(Day\s+\d+)\s*:\s*(.+)$/i);

    const day = headingMatch?.[1] ?? `Day ${index + 1}`;
    const title = headingMatch?.[2] ?? completeHeading;

    if (!title || !description) {
      continue;
    }

    itineraryItems.push({
      day,
      title,
      description,
    });
  }

  return itineraryItems;
}

// WhatsApp link generation
export function createTourWhatsAppHref(
  tourTitle: string,
  tourSlug: string,
): string | undefined {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(
    /\D/g,
    "",
  );

  if (!phoneNumber) {
    return undefined;
  }

  const message = `Hello, I would like to check availability for the tour "${tourTitle}". Tour page: https://tripstomarrakech.com/tours/${tourSlug}`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

// getcard tour by id
export async function getToursByIds(
  ids: number[],
): Promise<WordPressTourCard[]> {
  const validIds = ids.filter((id) => Number.isInteger(id) && id > 0);

  if (validIds.length === 0) {
    return [];
  }

  const query = new URLSearchParams({
    status: "publish",
    include: validIds.join(","),
    orderby: "include",
    per_page: String(Math.min(validIds.length, 100)),
    _embed: "wp:featuredmedia,wp:term",
    acf_format: "standard",
    _fields: [
      "id",
      "slug",
      "title",
      "excerpt",
      "featured_media",
      "departure_city",
      "tour_tags",
      "acf.duration",
      "acf.start_location",
      "acf.end_location",
      "acf.price_from",
      "acf.currency",
      "acf.group_size",
      "_links",
      "_embedded",
    ].join(","),
  });

  const response = await fetch(
    `${getWordPressApiUrl()}/tours?${query.toString()}`,
    {
      next: {
        revalidate: 300,
        tags: ["wordpress-tours", "wordpress-related-tours"],
      },
    },
  );

  if (!response.ok) {
    await throwWordPressError(response, "Fetching related tours");
  }

  return (await response.json()) as WordPressTourCard[];
}

// getALL tours

export async function getAllTourCards(): Promise<WordPressTourCard[]> {
  const firstPage = await getTourCards({
    page: 1,
    perPage: 100,
  });

  if (firstPage.totalPages <= 1) {
    return firstPage.tours;
  }

  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
      getTourCards({
        page: index + 2,
        perPage: 100,
      }),
    ),
  );

  const allTours = [firstPage, ...remainingPages].flatMap(
    (result) => result.tours,
  );

  return Array.from(new Map(allTours.map((tour) => [tour.id, tour])).values());
}

//get all tours by departure city slug

export async function getDepartureCityBySlug(
  slug: string,
): Promise<DepartureCity | null> {
  const normalizedSlug = slug.trim().toLowerCase();

  if (!normalizedSlug || !/^[a-z0-9-]+$/.test(normalizedSlug)) {
    return null;
  }

  const departureCities = await getDepartureCities();

  return (
    departureCities.find(
      (city) => city.slug.trim().toLowerCase() === normalizedSlug,
    ) ?? null
  );
}

//get all tours slugs

export async function getTourSlugs(): Promise<string[]> {
  const firstPageQuery = new URLSearchParams({
    status: "publish",
    page: "1",
    per_page: "100",
    _fields: "slug",
  });

  const firstResponse = await fetch(
    `${getWordPressApiUrl()}/tours?${firstPageQuery.toString()}`,
    {
      next: {
        revalidate: 300,
        tags: ["wordpress-tour-slugs"],
      },
    },
  );

  if (!firstResponse.ok) {
    await throwWordPressError(firstResponse, "Fetching tour slugs");
  }

  const firstPage = (await firstResponse.json()) as Array<{
    slug: string;
  }>;

  const totalPages = Math.max(
    1,
    Number(firstResponse.headers.get("X-WP-TotalPages") ?? 1),
  );

  if (totalPages === 1) {
    return firstPage.map((tour) => tour.slug.trim()).filter(Boolean);
  }

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, async (_, index) => {
      const page = index + 2;

      const query = new URLSearchParams({
        status: "publish",
        page: String(page),
        per_page: "100",
        _fields: "slug",
      });

      const response = await fetch(
        `${getWordPressApiUrl()}/tours?${query.toString()}`,
        {
          next: {
            revalidate: 300,
            tags: ["wordpress-tour-slugs"],
          },
        },
      );

      if (!response.ok) {
        await throwWordPressError(response, `Fetching tour slugs page ${page}`);
      }

      return (await response.json()) as Array<{
        slug: string;
      }>;
    }),
  );

  const allTours = [...firstPage, ...remainingPages.flat()];

  return Array.from(
    new Set(allTours.map((tour) => tour.slug.trim()).filter(Boolean)),
  );
}