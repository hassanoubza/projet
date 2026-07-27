import DayTripCard from "@/components/section/day-trips/DayTripCard";
import { getDayTripCardsGroupedByDepartureCity } from "@/lib/day-trips";
import type { Metadata } from "next";

export const revalidate = 300;


export const metadata: Metadata = {
  title: "Morocco Day Trips & Excursions | Trips To Marrakech",

  description:
    "Discover private Morocco day trips from Marrakech and other major cities. Explore Essaouira, Ouzoud Waterfalls, Ourika Valley, Ait Ben Haddou and more with comfortable transport and flexible itineraries.",

  alternates: {
    canonical: "https://www.tripstomarrakech.com/day-trips",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.tripstomarrakech.com/day-trips",
    siteName: "Trips To Marrakech",

    title: "Morocco Day Trips & Excursions | Trips To Marrakech",

    description:
      "Explore private day trips from Marrakech and other Moroccan cities, including Essaouira, Ouzoud Waterfalls, Ourika Valley and Ait Ben Haddou.",

    images: [
      {
        url: "https://www.tripstomarrakech.com/images/marakech.jpeg",
        width: 1200,
        height: 630,
        alt: "Private Morocco day trips and excursions from Marrakech",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Morocco Day Trips & Excursions | Trips To Marrakech",

    description:
      "Discover private full-day excursions from Marrakech and other Moroccan cities with flexible itineraries and comfortable transport.",

    images: ["https://www.tripstomarrakech.com/images/marakech.jpeg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "Travel",
};





export default async function DayTripsPage(): Promise<React.JSX.Element> {
  const citySections = await getDayTripCardsGroupedByDepartureCity();

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="mb-14 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Day Trips in Morocco
          </p>

          <h1 className="mt-3 text-4xl font-bold leading-tight text-heading sm:text-5xl">
            Day Trips from Morocco’s Main Cities
          </h1>

          <p className="mt-5 text-base leading-8 text-text-secondary">
            Explore private full-day excursions from Marrakech and other
            Moroccan cities, with flexible itineraries and comfortable
            transport.
          </p>
        </header>

        {citySections.length > 0 ? (
          <div className="space-y-20">
            {citySections.map(({ city, dayTrips }) => (
              <section
                key={city.id}
                aria-labelledby={`day-trips-from-${city.slug}`}
              >
                <div className="mb-8 flex items-end justify-between gap-6  pb-5">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary">
                      Departure city
                    </p>

                    <h2
                      id={`day-trips-from-${city.slug}`}
                      className="mt-2 text-3xl font-bold text-heading"
                    >
                      Day Trips from {city.name}
                    </h2>
                  </div>

                  <p className="hidden text-sm font-medium text-text-muted sm:block">
                    {dayTrips.length}{" "}
                    {dayTrips.length === 1 ? "day trip" : "day trips"}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
                  {dayTrips.map((dayTrip, index) => (
                    <DayTripCard
                      key={dayTrip.id}
                      dayTrip={dayTrip}
                      departureCityName={city.name}
                      preloadImage={index < 3}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card px-6 py-16 text-center">
            <h2 className="text-2xl font-bold text-heading">
              No day trips available
            </h2>

            <p className="mt-3 text-text-secondary">
              New day trips will be added soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
