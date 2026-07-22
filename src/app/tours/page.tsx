import type { Metadata } from "next";
import type React from "react";
import TourCard from "@/components/section/tours/TourCard";
import { getAllTourCards, getDepartureCities, htmlToText } from "@/lib/tours";
import Image from "next/image";
import ContactAdventure from "@/components/ui/ContactAdventure";
import InstagramSection from "@/components/ui/Instgramme";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Morocco Private Tours",
  description:
    "Explore private Morocco tours from Marrakech, Fes, Casablanca, Agadir and other destinations, including Sahara desert journeys and cultural experiences.",
  keywords: [
    "Morocco private tours",
    "Marrakech desert tours",
    "Fes desert tours",
    "Morocco Sahara tours",
    "Merzouga desert tours",
    "Morocco itineraries",
  ],
  alternates: {
    canonical: "/tours",
  },
  openGraph: {
    title: "Morocco Private Tours | Trips to Marrakech",
    description:
      "Discover private Morocco tours, Sahara desert adventures and tailor-made journeys with experienced local professionals.",
    url: "/tours",
    type: "website",
    siteName: "Trips to Marrakech",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morocco Private Tours | Trips to Marrakech",
    description:
      "Discover private Morocco tours, Sahara desert adventures and tailor-made journeys across Morocco.",
  },
};



const preferredCityOrder = [
  "marrakech",
  "fes",
  "casablanca",
  "tangier",
  "agadir",
];



export default async function ToursPage(): Promise<React.JSX.Element> {


  const [allTours, departureCities] = await Promise.all([
    getAllTourCards(),
    getDepartureCities(),
  ]);

  

  const sortedCities = [...departureCities].sort((firstCity, secondCity) => {
    
    const firstPosition = preferredCityOrder.indexOf(firstCity.slug);
    const secondPosition = preferredCityOrder.indexOf(secondCity.slug);

    if (firstPosition === -1 && secondPosition === -1) {
      return firstCity.name.localeCompare(secondCity.name);
    }

    if (firstPosition === -1) {
      return 1;
    }

    if (secondPosition === -1) {
      return -1;
    }

    return firstPosition - secondPosition;
  });



  const citySections = sortedCities.map((city) => {
      const tours = allTours.filter((tour) => { const departureCityIds = Array.isArray(tour.departure_city) ? tour.departure_city : [];
        return departureCityIds.includes(city.id);
      });

      return {
        city,
        tours,
      };
    }).filter((section) => section.tours.length > 0);


  const knownDepartureCityIds = new Set(departureCities.map((city) => city.id));


  const unassignedTours = allTours.filter((tour) => { const departureCityIds = Array.isArray(tour.departure_city) ? tour.departure_city : [];
    return (
      departureCityIds.length === 0 ||
      !departureCityIds.some((cityId) => knownDepartureCityIds.has(cityId))
    );
  });


  return (
    <section className="bg-background text-foreground">


      <section className="bg-background">
        <div className="mx-auto grid min-h-[700px] max-w-6xl grid-cols-1 items-center gap-10 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.9fr)] lg:gap-16 lg:px-8 lg:py-10">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary">
              Trips to Marrakech
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-heading sm:text-5xl lg:text-6xl">
              Explore All Our
              <span className="block text-primary">Morocco Tours</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-text-secondary sm:text-lg">
              Discover private desert journeys, cultural experiences and
              tailor-made tours departing from Morocco&apos;s most popular
              cities.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:ml-auto">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/og-image.jpg"
                alt="Camel caravan crossing the Sahara Desert in Morocco"
                fill
                preload
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>



      {citySections.length > 0 ? (
        <div>
          {citySections.map(({ city, tours }, sectionIndex) => {

            const cityName = htmlToText(city.name);
            const cityDescription = htmlToText(city.description);

            return (
              <section key={city.id} id={city.slug} aria-labelledby={`${city.slug}-heading`}
                className="scroll-mt-10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10"
              >
                <div className="mx-auto max-w-7xl">
                  <header className="mb-10 flex flex-col items-center text-center sm:mb-12">
                    <h2
                      id={`${city.slug}-heading`}
                      className="text-3xl font-extrabold leading-tight text-heading sm:text-4xl"
                    >
                      {cityName}
                    </h2>

                    <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
                      {cityDescription ||
                        `Explore our popular private tours and desert journeys starting in ${cityName}.`}
                    </p>
                  </header>

                  <div className="grid auto-rows-fr grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
                    {tours.map((tour, tourIndex) => (
                      <TourCard
                        key={tour.id}
                        tour={tour}
                        preloadImage={sectionIndex === 0 && tourIndex < 3}
                      />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-extrabold text-heading">
              No tours available
            </h2>

            <p className="mt-4 leading-7 text-text-secondary">
              There are currently no published tours connected to a departure
              city.
            </p>
          </div>
        </section>
      )}




      {unassignedTours.length > 0 ? (
        <section
          id="other-tours"
          aria-labelledby="other-tours-heading"
          className="scroll-mt-24 border-b border-border px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <header className="mb-9 max-w-3xl sm:mb-10">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                More journeys
              </p>

              <h2
                id="other-tours-heading"
                className="mt-2 text-3xl font-extrabold leading-tight text-heading sm:text-4xl"
              >
                Other Morocco Tours
              </h2>

              <p className="mt-3 text-sm leading-7 text-text-secondary sm:text-base">
                Explore additional private tours and travel experiences
                available across Morocco.
              </p>
            </header>

            <div className="grid auto-rows-fr grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
              {unassignedTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} preloadImage={false} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

    <ContactAdventure />
    <InstagramSection />
    </section>
  );
}
