import Link from "next/link";
import DayTripCard from "@/components/section/day-trips/DayTripCard";
import { getRandomDayTripCards } from "@/lib/day-trips";

interface TopDayTripsProps {
  limit?: number;
}

export default async function TopDayTrips({limit = 3,}: TopDayTripsProps): Promise<React.JSX.Element | null> {
  const dayTrips = await getRandomDayTripCards(limit);

  if (dayTrips.length === 0) {
    return null;
  }

  return (
    <section className="bg-background py-4 sm:py-6 lg:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl text-center sm:text-left">
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-heading sm:text-4xl lg:text-5xl">
              Top <span className="text-primary"> Day Trips</span> in Morocco
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary">
              Escape the city for a full-day journey through waterfalls,
              mountain valleys, historic villages and Morocco’s Atlantic coast.
            </p>
          </div>

          <Link
            href="/day-trips"
            className="inline-flex min-h-11 w-fit items-center justify-center rounded-xl border border-primary px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            View all day trips
            <span aria-hidden="true" className="ml-2">
              →
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {dayTrips.map((dayTrip, index) => (
            <DayTripCard
              key={dayTrip.id}
              dayTrip={dayTrip}
              preloadImage={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
