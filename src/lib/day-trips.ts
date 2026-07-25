import { cache } from "react";
import "server-only";

const DAY_TRIPS_REVALIDATE = 300;
const WORDPRESS_MAX_PER_PAGE = 100;

function getWordPressApiUrl(): string {
  const wordpressApiUrl = process.env.WORDPRESS_API_URL?.trim();

  if (!wordpressApiUrl) {
    throw new Error("Missing WORDPRESS_API_URL environment variable.");
  }

  return wordpressApiUrl.replace(/\/+$/, "");
}

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

interface WordPressRenderedValue {
  rendered: string;
  protected?: boolean;
}

interface WordPressMediaSize {
  source_url: string;
  width: number;
  height: number;
}

interface WordPressMediaDetails {
  width?: number;
  height?: number;
  sizes?: Record<string, WordPressMediaSize>;
}

interface WordPressMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: WordPressMediaDetails;
}

interface WordPressEmbeddedMedia extends WordPressMedia {
  caption?: WordPressRenderedValue;
}

interface WordPressEmbeddedResources {
  "wp:featuredmedia"?: WordPressEmbeddedMedia[];
}

interface WordPressAcfImage {
  ID?: number;
  id?: number;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: Record<string, string>;
}

type WordPressAcfImageValue = number | WordPressAcfImage | false | null | "";

type WordPressRelatedDayTrips = number[] | number | string | false | null;

interface WordPressDayTripCardAcf {
  duration?: string | null;
  start_location?: string | null;
  end_location?: string | null;
}

interface WordPressDayTripDetailsAcf extends WordPressDayTripCardAcf {
  overview?: string | null;
  highlights?: string | null;
  why_this_day_trip?: string | null;
  information_before_you_go?: string | null;
  faq?: string | null;
  map_embed_url?: string | null;
  related_day_trips?: WordPressRelatedDayTrips;
  seo_title?: string | null;
  seo_description?: string | null;
  day_trip_image_2?: WordPressAcfImageValue;
  day_trip_image_3?: WordPressAcfImageValue;
  day_trip_image_4?: WordPressAcfImageValue;
}

interface WordPressDayTripCardResponse {
  id: number;
  slug: string;
  title: WordPressRenderedValue;
  excerpt: WordPressRenderedValue;
  featured_media: number;
  "day-trip-departure-cities"?: number[];
  acf?: WordPressDayTripCardAcf;
  _embedded?: WordPressEmbeddedResources;
}

interface WordPressDayTripDetailsResponse extends Omit<
  WordPressDayTripCardResponse,
  "acf"
> {
  date?: string;
  modified?: string;
  tour_tags?: number[];
  acf?: WordPressDayTripDetailsAcf;
}

export interface DayTripDepartureCity {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface DayTripImage {
  id: number;
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
}

export interface DayTripCard {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  duration: string;
  startLocation: string;
  endLocation: string;
  departureCityIds: number[];
  featuredImage: DayTripImage | null;
}

export interface DayTripDetails extends DayTripCard {
  date: string;
  modified: string;
  overview: string;
  highlights: string;
  whyThisDayTrip: string;
  informationBeforeYouGo: string;
  faq: string;
  mapEmbedUrl: string;
  relatedDayTripIds: number[];
  seoTitle: string;
  seoDescription: string;
  tourTagIds: number[];
  galleryImages: DayTripImage[];
}

export interface DayTripsByDepartureCity {
  city: DayTripDepartureCity;
  dayTrips: DayTripCard[];
}

/* -------------------------------------------------------------------------- */
/*                                  HELPERS                                   */
/* -------------------------------------------------------------------------- */

export function htmlToText(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#8217;|&rsquo;/gi, "’")
    .replace(/&#038;|&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
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

export function normalizeRelatedDayTripIds(
  value: WordPressRelatedDayTrips | undefined,
): number[] {
  if (Array.isArray(value)) {
    return Array.from(
      new Set(
        value.filter((id): id is number => Number.isInteger(id) && id > 0),
      ),
    );
  }

  if (typeof value === "number") {
    return Number.isInteger(value) && value > 0 ? [value] : [];
  }

  if (typeof value === "string" && value.trim()) {
    const ids = value
      .split(",")
      .map((item) => Number(item.trim()))
      .filter((id) => Number.isInteger(id) && id > 0);

    return Array.from(new Set(ids));
  }

  return [];
}

/**
 * Protects the frontend if iframe attributes were accidentally stored
 * after the Google Maps URL inside the ACF field.
 */
export function normalizeMapEmbedUrl(value: string | null | undefined): string {
  if (!value) {
    return "";
  }

  return value.trim().split('"')[0]?.trim() ?? "";
}

async function throwWordPressError(
  response: Response,
  context: string,
): Promise<never> {
  let responseBody = "";

  try {
    responseBody = await response.text();
  } catch {
    responseBody = "";
  }

  throw new Error(
    `${context} failed with status ${response.status}. ${
      responseBody || response.statusText
    }`,
  );
}

// get the featured image for a day trip card, if available
function getFeaturedImage(
  dayTrip: WordPressDayTripCardResponse,
): DayTripImage | null {
  const media = dayTrip._embedded?.["wp:featuredmedia"]?.[0];

  if (!media?.source_url) {
    return null;
  }

  return {
    id: media.id,
    url: media.source_url,
    alt: media.alt_text.trim() || htmlToText(dayTrip.title.rendered),
    width: media.media_details?.width ?? null,
    height: media.media_details?.height ?? null,
  };
}

function mapDayTripCard(dayTrip: WordPressDayTripCardResponse): DayTripCard {
  return {
    id: dayTrip.id,
    slug: dayTrip.slug,
    title: htmlToText(dayTrip.title.rendered),
    excerpt: htmlToText(dayTrip.excerpt.rendered),
    duration: dayTrip.acf?.duration?.trim() ?? "",
    startLocation: dayTrip.acf?.start_location?.trim() ?? "",
    endLocation: dayTrip.acf?.end_location?.trim() ?? "",
    departureCityIds: dayTrip["day-trip-departure-cities"] ?? [],
    featuredImage: getFeaturedImage(dayTrip),
  };
}

function shuffleArray<T>(items: T[]): T[] {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems;
}

/* -------------------------------------------------------------------------- */
/*                              MEDIA RESOLUTION                              */
/* -------------------------------------------------------------------------- */

const getWordPressMediaById = cache(
  async (mediaId: number): Promise<DayTripImage | null> => {
    if (!Number.isInteger(mediaId) || mediaId <= 0) {
      return null;
    }

    const query = new URLSearchParams({
      _fields: "id,source_url,alt_text,media_details",
    });

    const response = await fetch(
      `${getWordPressApiUrl()}/media/${mediaId}?${query.toString()}`,
      {
        next: {
          revalidate: DAY_TRIPS_REVALIDATE,
          tags: ["wordpress-day-trip-images", `wordpress-media-${mediaId}`],
        },
      },
    );

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      await throwWordPressError(
        response,
        `Fetching WordPress media ${mediaId}`,
      );
    }

    const media = (await response.json()) as WordPressMedia;

    if (!media.source_url) {
      return null;
    }

    return {
      id: media.id,
      url: media.source_url,
      alt: media.alt_text?.trim() ?? "",
      width: media.media_details?.width ?? null,
      height: media.media_details?.height ?? null,
    };
  },
);

async function resolveAcfImage(
  value: WordPressAcfImageValue | undefined,
  fallbackAlt: string,
): Promise<DayTripImage | null> {
  if (!value) {
    return null;
  }

  if (typeof value === "number") {
    const image = await getWordPressMediaById(value);

    if (!image) {
      return null;
    }

    return {
      ...image,
      alt: image.alt || fallbackAlt,
    };
  }

  const imageId = Number(value.id ?? value.ID ?? 0);

  if (value.url) {
    return {
      id: imageId,
      url: value.url,
      alt: value.alt?.trim() || fallbackAlt,
      width: typeof value.width === "number" ? value.width : null,
      height: typeof value.height === "number" ? value.height : null,
    };
  }

  if (imageId > 0) {
    const image = await getWordPressMediaById(imageId);

    if (!image) {
      return null;
    }

    return {
      ...image,
      alt: image.alt || fallbackAlt,
    };
  }

  return null;
}

/* -------------------------------------------------------------------------- */
/*                            CARD COLLECTION QUERY                           */
/* -------------------------------------------------------------------------- */

interface DayTripCardPageResult {
  records: WordPressDayTripCardResponse[];
  totalItems: number;
  totalPages: number;
}

async function getDayTripCardPage(
  page: number,
): Promise<DayTripCardPageResult> {
  const query = new URLSearchParams({
    status: "publish",
    page: String(page),
    per_page: String(WORDPRESS_MAX_PER_PAGE),
    orderby: "date",
    order: "desc",
    acf_format: "standard",
    _embed: "wp:featuredmedia",
    _fields:
      "id,slug,title,excerpt,featured_media,day-trip-departure-cities,acf,_links,_embedded",
  });

  const response = await fetch(
    `${getWordPressApiUrl()}/day-trips?${query.toString()}`,
    {
      next: {
        revalidate: DAY_TRIPS_REVALIDATE,
        tags: ["wordpress-day-trips", "wordpress-day-trip-cards"],
      },
    },
  );

  if (!response.ok) {
    await throwWordPressError(response, `Fetching day-trip card page ${page}`);
  }

  const records = (await response.json()) as WordPressDayTripCardResponse[];

  return {
    records,
    totalItems: Number(response.headers.get("X-WP-Total") ?? records.length),
    totalPages: Math.max(
      1,
      Number(response.headers.get("X-WP-TotalPages") ?? 1),
    ),
  };
}

/**
 * Minimal card query.
 *
 * Used by:
 * - /day-trips
 * - grouped sections by departure city
 * - home page random cards
 */
export const getAllDayTripCards = cache(async (): Promise<DayTripCard[]> => {
  const firstPage = await getDayTripCardPage(1);

  if (firstPage.totalPages <= 1) {
    return firstPage.records.map(mapDayTripCard);
  }

  const remainingPages = await Promise.all(
    Array.from({ length: firstPage.totalPages - 1 }, (_, index) =>
      getDayTripCardPage(index + 2),
    ),
  );

  const allRecords = [
    ...firstPage.records,
    ...remainingPages.flatMap((pageResult) => pageResult.records),
  ];

  const uniqueRecords = Array.from(
    new Map(allRecords.map((dayTrip) => [dayTrip.id, dayTrip])).values(),
  );

  return uniqueRecords.map(mapDayTripCard);
});

/* -------------------------------------------------------------------------- */
/*                          DEPARTURE CITY QUERIES                            */
/* -------------------------------------------------------------------------- */

export const getDayTripDepartureCities = cache(
  async (): Promise<DayTripDepartureCity[]> => {
    const query = new URLSearchParams({
      per_page: "100",
      hide_empty: "true",
      orderby: "name",
      order: "asc",
      _fields: "id,name,slug,description,count",
    });

    const response = await fetch(
      `${getWordPressApiUrl()}/day-trip-departure-cities?${query.toString()}`,
      {
        next: {
          revalidate: DAY_TRIPS_REVALIDATE,
          tags: ["wordpress-day-trip-departure-cities"],
        },
      },
    );

    if (!response.ok) {
      await throwWordPressError(response, "Fetching day-trip departure cities");
    }

    return (await response.json()) as DayTripDepartureCity[];
  },
);

export const getDayTripDepartureCityBySlug = cache(
  async (slug: string): Promise<DayTripDepartureCity | null> => {
    const normalizedSlug = slug;

    if (!normalizedSlug) {
      return null;
    }

    const query = new URLSearchParams({
      slug: normalizedSlug,
      per_page: "1",
      _fields: "id,name,slug,description,count",
    });

    const response = await fetch(
      `${getWordPressApiUrl()}/day-trip-departure-cities?${query.toString()}`,
      {
        next: {
          revalidate: DAY_TRIPS_REVALIDATE,
          tags: [
            "wordpress-day-trip-departure-cities",
            `wordpress-day-trip-city-${normalizedSlug}`,
          ],
        },
      },
    );

    if (!response.ok) {
      await throwWordPressError(
        response,
        `Fetching day-trip departure city ${normalizedSlug}`,
      );
    }

    const cities = (await response.json()) as DayTripDepartureCity[];

    return cities[0] ?? null;
  },
);

/**
 * Query 1:
 * Returns card-only data grouped by Day Trip departure city.
 */
export const getDayTripCardsGroupedByDepartureCity = cache(
  async (): Promise<DayTripsByDepartureCity[]> => {
    const [cities, dayTrips] = await Promise.all([
      getDayTripDepartureCities(),
      getAllDayTripCards(),
    ]);

    return cities
      .map((city) => ({
        city,
        dayTrips: dayTrips.filter((dayTrip) =>
          dayTrip.departureCityIds.includes(city.id),
        ),
      }))
      .filter((section) => section.dayTrips.length > 0);
  },
);

/**
 * Query 2:
 * Retrieves all details for /day-trips/[slug].
 */
export const getDayTripBySlug = cache(
  async (slug: string): Promise<DayTripDetails | null> => {
    const normalizedSlug = slug.trim();

    if (!normalizedSlug) {
      return null;
    }

    const query = new URLSearchParams({
      slug: normalizedSlug,
      status: "publish",
      per_page: "1",
      acf_format: "standard",
      _embed: "wp:featuredmedia",
      _fields:
        "id,date,modified,slug,title,excerpt,featured_media,day-trip-departure-cities,tour_tags,acf,_links,_embedded",
    });

    const response = await fetch(
      `${getWordPressApiUrl()}/day-trips?${query.toString()}`,
      {
        next: {
          revalidate: DAY_TRIPS_REVALIDATE,
          tags: ["wordpress-day-trips", `wordpress-day-trip-${normalizedSlug}`],
        },
      },
    );

    if (!response.ok) {
      await throwWordPressError(
        response,
        `Fetching day trip ${normalizedSlug}`,
      );
    }

    const records =
      (await response.json()) as WordPressDayTripDetailsResponse[];

    const dayTrip = records[0];

    if (!dayTrip) {
      return null;
    }

    const card = mapDayTripCard(dayTrip);
    const title = card.title;
    const acf = dayTrip.acf ?? {};

    const galleryImageValues = [
      acf.day_trip_image_2,
      acf.day_trip_image_3,
      acf.day_trip_image_4,
    ];

    const resolvedGalleryImages = await Promise.all(
      galleryImageValues.map((image, index) =>
        resolveAcfImage(image, `${title} gallery image ${index + 2}`),
      ),
    );

    return {
      ...card,
      date: dayTrip.date ?? "",
      modified: dayTrip.modified ?? "",
      overview: acf.overview ?? "",
      highlights: acf.highlights ?? "",
      whyThisDayTrip: acf.why_this_day_trip ?? "",
      informationBeforeYouGo: acf.information_before_you_go ?? "",
      faq: acf.faq ?? "",
      mapEmbedUrl: normalizeMapEmbedUrl(acf.map_embed_url),
      relatedDayTripIds: normalizeRelatedDayTripIds(acf.related_day_trips),
      seoTitle: acf.seo_title?.trim() || title,
      seoDescription: acf.seo_description?.trim() || card.excerpt,
      tourTagIds: dayTrip.tour_tags ?? [],
      galleryImages: resolvedGalleryImages.filter(
        (image): image is DayTripImage => image !== null,
      ),
    };
  },
);

/**
 * Useful for generateStaticParams() in /day-trips/[slug].
 */
export const getDayTripSlugs = cache(async (): Promise<string[]> => {
  const cards = await getAllDayTripCards();

  return cards.map((dayTrip) => dayTrip.slug.trim()).filter(Boolean);
});

/* -------------------------------------------------------------------------- */
/*                            RANDOM HOME QUERY                               */
/* -------------------------------------------------------------------------- */

/**
 * Query 3:
 * Returns random card-only records for the home page.
 */
export async function getRandomDayTripCards(limit = 3): Promise<DayTripCard[]> {
  const safeLimit = Number.isInteger(limit) && limit > 0 ? limit : 3;

  const dayTrips = await getAllDayTripCards();

  return shuffleArray(dayTrips).slice(0, Math.min(safeLimit, dayTrips.length));
}

// get day trip by Id

export async function getDayTripsByIds(
  ids: number[],
  excludeDayTripId?: number,
): Promise<DayTripCard[]> {
  const normalizedIds = Array.from(
    new Set(ids.filter((id) => Number.isInteger(id) && id > 0)),
  );

  if (normalizedIds.length === 0) {
    return [];
  }

  const dayTrips = await getAllDayTripCards();
  const positionById = new Map(normalizedIds.map((id, index) => [id, index]));

  return dayTrips
    .filter(
      (dayTrip) =>
        normalizedIds.includes(dayTrip.id) && dayTrip.id !== excludeDayTripId,
    )
    .sort((firstDayTrip, secondDayTrip) => {
      const firstPosition =
        positionById.get(firstDayTrip.id) ?? Number.MAX_SAFE_INTEGER;
      const secondPosition =
        positionById.get(secondDayTrip.id) ?? Number.MAX_SAFE_INTEGER;

      return firstPosition - secondPosition;
    });
}



// get tags
export interface DayTripTag {
  id: number;
  name: string;
  slug: string;
}

export async function getDayTripTagsByIds(
  ids: number[],
): Promise<DayTripTag[]> {
  const normalizedIds = Array.from(
    new Set(ids.filter((id) => Number.isInteger(id) && id > 0)),
  );

  if (normalizedIds.length === 0) {
    return [];
  }

  const query = new URLSearchParams({
    include: normalizedIds.join(","),
    per_page: String(normalizedIds.length),
    orderby: "include",
    _fields: "id,name,slug",
  });

  const response = await fetch(
    `${getWordPressApiUrl()}/tour_tags?${query.toString()}`,
    {
      next: {
        revalidate: DAY_TRIPS_REVALIDATE,
        tags: [
          "wordpress-day-trip-tags",
          ...normalizedIds.map((id) => `wordpress-day-trip-tag-${id}`),
        ],
      },
    },
  );

  if (!response.ok) {
    await throwWordPressError(response, "Fetching day-trip tags");
  }

  return (await response.json()) as DayTripTag[];
}