import Image from "next/image";
import Link from "next/link";
import type { DayTripCard as DayTripCardData } from "@/lib/day-trips";

interface DayTripCardProps {
  dayTrip: DayTripCardData;
  departureCityName?: string;
  preloadImage?: boolean;
}

export default function DayTripCard({
  dayTrip,
  departureCityName,
  preloadImage = false,
}: DayTripCardProps): React.JSX.Element {
  const dayTripUrl = `/day-trips/${dayTrip.slug}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[6px] bg-card transition duration-300 hover:shadow-lg">
      <Link
        href={dayTripUrl}
        aria-label={`View ${dayTrip.title}`}
        className="relative block aspect-[18/10] overflow-hidden bg-surface-soft"
      >
        {dayTrip.featuredImage ? (
          <Image
            src={dayTrip.featuredImage.url}
            alt={dayTrip.featuredImage.alt || dayTrip.title}
            fill
            preload={preloadImage}
            quality={85}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm font-medium text-text-muted">
            Morocco Day Trip
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />

        {dayTrip.duration && (
          <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm">
            {dayTrip.duration}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Private Morocco day trip
        </p>

        <h2 className="mt-3 line-clamp-2 min-h-[3.5rem] text-2xl font-bold leading-tight text-heading transition group-hover:text-primary">
          <Link href={dayTripUrl}>{dayTrip.title}</Link>
        </h2>

        {dayTrip.excerpt && (
          <p className="mt-4 line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-text-secondary">
            {dayTrip.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-4">
          <div className="min-w-0">
            {departureCityName ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                  Start from
                </p>

                <p className="mt-1 text-xl font-bold text-heading">
                  {departureCityName}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                  Trip type
                </p>

                <p className="mt-1 text-sm font-bold text-heading">
                  Private day trip
                </p>
              </>
            )}
          </div>

          <Link
            href={dayTripUrl}
            aria-label={`View details for ${dayTrip.title}`}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover"
          >
            Details
            <span
              aria-hidden="true"
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
