import Link from "next/link";
import TourCard from "@/components/section/tours/TourCard";
import type { getTourCards } from "@/lib/tours";

type TourResult = Awaited<ReturnType<typeof getTourCards>>;

interface ToursFromMarrakechProps {
  tourResult: TourResult;
  cityName: string;
}

export default function ToursFromMarrakech({ tourResult,cityName,}: ToursFromMarrakechProps): React.JSX.Element {

  
  return (
    <section className="bg-background text-foreground">
      <section id="city-tours" aria-labelledby="city-tours-heading">
        <div className="mx-auto max-w-7xl  px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
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
