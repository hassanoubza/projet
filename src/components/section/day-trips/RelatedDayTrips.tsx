import DayTripCard from "@/components/section/day-trips/DayTripCard";
import type { DayTripCard as DayTripCardData } from "@/lib/day-trips";

interface RelatedDayTripsProps {
  dayTrips: DayTripCardData[];
  label?: string;
}

export default function RelatedDayTrips({dayTrips,label = "Related Day Trips",}: RelatedDayTripsProps): React.JSX.Element | null {

  if (dayTrips.length === 0) {
    return null;
  }

  return (
    <section id="related-day-trips" className="bg-surface-soft">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Continue exploring
          </p>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-heading sm:text-4xl">
            {label}
          </h2>

          <p className="mt-4 text-base leading-8 text-text-secondary">
            Compare other private excursions and choose the experience that best
            matches your interests and travel schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          {dayTrips.map((dayTrip, index) => (
            <DayTripCard
              key={dayTrip.id}
              dayTrip={dayTrip}
              preloadImage={index < 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
