import Link from "next/link";
import { notFound } from "next/navigation";
import TourCard from "@/components/section/tours/TourCard";
import { getDepartureCityBySlug, getTourCards, htmlToText } from "@/lib/tours";



export default async function DepartureCityPage(): Promise<React.JSX.Element> {

  const departureCity = await getDepartureCityBySlug("marrakech");

  if (!departureCity) {
    notFound();
  }

  const tourResult = await getTourCards({
    page: 1,
    perPage:6,
    departureCityId: departureCity.id,
  });

  const cityName = htmlToText(departureCity.name);



  return (
    <section className="bg-background text-foreground">
      <section
        id="city-tours"
        aria-labelledby="city-tours-heading"
        className=""
      >
        <div className="mx-auto max-w-7xl  px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <header className="mb-10 flex flex-col items-center text-center sm:mb-12">
            <h2
              id="city-tours-heading"
              className="mt-3 max-w-3xl font-serif text-3xl font-semibold leading-tight text-heading sm:text-4xl lg:text-5xl"
            >
              Start Your Journey from{" "}
              <span className="text-primary"> {cityName}</span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
              Travel from {cityName} to the Sahara Desert, the Atlas Mountains,
              historic kasbahs and some of Morocco&apos;s most remarkable
              destinations.
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
    </section>
  );
}
