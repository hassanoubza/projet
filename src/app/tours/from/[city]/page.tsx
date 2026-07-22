import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TourCard from "@/components/section/tours/TourCard";
import { getDepartureCities, getDepartureCityBySlug, getTourCards, htmlToText } from "@/lib/tours";
import ContactAdventure from "@/components/ui/ContactAdventure";
import InstagramSection from "@/components/ui/Instgramme";


export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Array<{ city: string }>> {
  const cities = await getDepartureCities();

  return cities.filter((city) => city.slug && city.count > 0).map((city) => ({city: city.slug,}));
}


interface DepartureCityPageProps {
  params: Promise<{
    city: string;
  }>;
}

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tripstomarrakech.com").replace(/\/$/, "");


const CITY_HERO_IMAGES: Record<string, string> = {
  marrakech: "/images/og-image.jpg",
  fes: "/images/fes.jpeg",
  casablanca: "/images/casablanca.jpeg",
  tangier: "/images/tanger.jpeg",
  agadir: "/images/agadir.jpeg",
};


function getCityHeroImage(citySlug: string): string {
  return CITY_HERO_IMAGES[citySlug] ?? "/images/og-image.jpg";
}


export async function generateMetadata({ params,}: DepartureCityPageProps): Promise<Metadata> {

  const { city } = await params;
  const departureCity = await getDepartureCityBySlug(city);

  if (!departureCity) {
    return {
      title: "Departure City Not Found",
      description: "The requested departure city could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const cityName = htmlToText(departureCity.name);

  const description = htmlToText(departureCity.description).slice(0, 160) || `Discover private tours, Sahara desert journeys and cultural experiences departing from ${cityName}, Morocco.`;

  const canonicalUrl = `${SITE_URL}/tours/from/${departureCity.slug}`;
  const heroImage = getCityHeroImage(departureCity.slug);

  return {
    title: `Tours from ${cityName}`,
    description,
    keywords: [
      `Tours from ${cityName}`,
      `${cityName} desert tours`,
      `${cityName} private tours`,
      `${cityName} Sahara tours`,
      `${cityName} day trips`,
      "Morocco private tours",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Tours from ${cityName} | Trips to Marrakech`,
      description,
      url: canonicalUrl,
      siteName: "Trips to Marrakech",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: heroImage,
          alt: `Private tours from ${cityName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Tours from ${cityName} | Trips to Marrakech`,
      description,
      images: [heroImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}




export default async function DepartureCityPage({params,}: DepartureCityPageProps): Promise<React.JSX.Element> {

  const { city } = await params;

  const departureCity = await getDepartureCityBySlug(city);

  if (!departureCity) {
    notFound();
  }

  const tourResult = await getTourCards({page: 1,perPage: 100,departureCityId: departureCity.id,});

  const cityName = htmlToText(departureCity.name);

  const cityDescription = htmlToText(departureCity.description) || `Discover private desert tours, cultural journeys and authentic experiences departing from ${cityName}.`;

  const heroImage = getCityHeroImage(departureCity.slug);

  return (
    <section className="bg-background text-foreground">


      <section className="bg-background">
        <div className="mx-auto grid min-h-[680px] max-w-7xl grid-cols-1 items-center gap-12 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1fr)] lg:gap-10 lg:px-8 lg:py-10">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
              Trips to Marrakech
            </p>

            <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-heading sm:text-5xl lg:text-6xl">
              Explore Our Tours
              <span className="block text-primary">From {cityName}</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-text-secondary sm:text-lg">
              {cityDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Contact Us
              </a>

              <Link
                href="/tours"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-border px-7 py-3 text-sm font-bold text-heading transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                View all Morocco tours
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[580px] lg:mx-0 lg:ml-auto">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={heroImage}
                alt={`Morocco tours departing from ${cityName}`}
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 580px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="city-tours"
        aria-labelledby="city-tours-heading"
        className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <header className="mb-10 flex flex-col items-center text-center sm:mb-12">
            <h2
              id="city-tours-heading"
              className="font-serif text-3xl font-semibold leading-tight text-heading sm:text-4xl"
            >
              Discover {cityName}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
              Explore private tours and carefully planned journeys departing
              from {cityName}.
            </p>

            <p className="mt-3 text-sm font-semibold text-primary">
              {tourResult.totalTours}{" "}
              {tourResult.totalTours === 1
                ? "tour available"
                : "tours available"}
            </p>
          </header>

          {tourResult.tours.length > 0 ? (
            <div className="grid auto-rows-fr grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {tourResult.tours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} preloadImage={index < 3} />
              ))}
            </div>
          ) : (
            <div className="border-y border-border py-20 text-center">
              <h2 className="text-2xl font-bold text-heading">
                No tours available from {cityName}
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-text-secondary">
                There are currently no published tours connected to this
                departure city.
              </p>

              <Link
                href="/tours"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover"
              >
                Explore all tours
              </Link>
            </div>
          )}
        </div>
      </section>
      <ContactAdventure />
      <InstagramSection />
    </section>
  );
}
