import type { MetadataRoute } from "next";

import { getDayTripSlugs } from "@/lib/day-trips";
import { getTourSlugs } from "@/lib/tours";
import { getBlogPostSlugs } from "@/lib/wordpress";

export const revalidate = 3600;

const FALLBACK_SITE_URL = "https://www.tripstomarrakech.com";

const STATIC_PATHS = [
  "",
  "/activities",
  "/tours",
  "/day-trips",
  "/blog",
  "/about",
  "/about/morocco_tourist",
  "/contact",
] as const;

const TOUR_DEPARTURE_PATHS = [
  "/tours/from/marrakech",
  "/tours/from/fes",
  "/tours/from/casablanca",
  "/tours/from/tangier",
  "/tours/from/agadir",
] as const;

const ACTIVITY_SLUGS = [
  "marrakech-hot-air-balloon-flight",
  "agafay-desert-sunset-dinner",
  "half-day-guided-marrakech-medina-tour",
  "traditional-moroccan-cooking-class-marrakech",
] as const;

function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL
  ).replace(/\/+$/, "");
}

function normalizeSlugs(slugs: string[]): string[] {
  return Array.from(
    new Set(
      slugs
        .map((slug) => slug.trim().replace(/^\/+|\/+$/g, ""))
        .filter((slug) => slug.length > 0),
    ),
  );
}

function getSlugsFromResult(
  result: PromiseSettledResult<string[]>,
  label: string,
): string[] {
  if (result.status === "fulfilled") {
    return normalizeSlugs(result.value);
  }

  console.error(`[Sitemap] Unable to retrieve ${label}:`, result.reason);

  return [];
}

function removeDuplicateUrls(
  entries: MetadataRoute.Sitemap,
): MetadataRoute.Sitemap {
  return Array.from(
    new Map(entries.map((entry) => [entry.url, entry])).values(),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const [tourSlugsResult, dayTripSlugsResult, blogSlugsResult] =
    await Promise.allSettled([
      getTourSlugs(),
      getDayTripSlugs(),
      getBlogPostSlugs(),
    ]);

  const tourSlugs = getSlugsFromResult(tourSlugsResult, "tour slugs");

  const dayTripSlugs = getSlugsFromResult(dayTripSlugsResult, "day-trip slugs");

  const blogSlugs = getSlugsFromResult(blogSlugsResult, "blog slugs");

  const staticPages: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${siteUrl}${path}`,
  }));

  const tourDeparturePages: MetadataRoute.Sitemap = TOUR_DEPARTURE_PATHS.map(
    (path) => ({
      url: `${siteUrl}${path}`,
    }),
  );

  const tourPages: MetadataRoute.Sitemap = tourSlugs.map((slug) => ({
    url: `${siteUrl}/tours/${slug}`,
  }));

  const dayTripPages: MetadataRoute.Sitemap = dayTripSlugs.map((slug) => ({
    url: `${siteUrl}/day-trips/${slug}`,
  }));

  const activityPages: MetadataRoute.Sitemap = ACTIVITY_SLUGS.map((slug) => ({
    url: `${siteUrl}/activities/${slug}`,
  }));

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
  }));

  return removeDuplicateUrls([
    ...staticPages,
    ...tourDeparturePages,
    ...tourPages,
    ...dayTripPages,
    ...activityPages,
    ...blogPages,
  ]);
}
