import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import type { DayTripDetails } from "@/lib/day-trips";

interface DayTripHeroProps {
  dayTrip: DayTripDetails;
}

export default function DayTripHero({
  dayTrip,
}: DayTripHeroProps): React.JSX.Element {
  const title = dayTrip.title || "Morocco Day Trip";
  const coverImage = dayTrip.featuredImage;
  const duration = dayTrip.duration || "Full-day experience";
  const startLocation = dayTrip.startLocation || "Marrakech";
  const endLocation = dayTrip.endLocation || startLocation;

  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div className="relative h-[62vh] min-h-[460px] w-full sm:h-[72vh] sm:min-h-[540px]">
        {coverImage?.url ? (
          <Image
            src={coverImage.url}
            alt={coverImage.alt || title}
            fill
            preload
            quality={85}
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <p className="text-sm font-medium text-text-muted">
              Morocco Day Trip
            </p>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/15 to-black/5" />
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 sm:pb-12 lg:px-8 lg:pb-16">
          <div className="max-w-5xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-white/80">
              Private Morocco Day Trip
            </p>

            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-white drop-shadow-sm sm:text-4xl lg:text-6xl">
              {title}
            </h1>

            <div className="mt-5 flex flex-col gap-3 text-sm font-medium text-white/90 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:text-base">
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5 shrink-0" aria-hidden="true" />
                {duration}
              </span>

              <span className="flex items-start gap-2 sm:items-center">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0"
                  aria-hidden="true"
                />

                <span>
                  {startLocation} <span aria-hidden="true">→</span>{" "}
                  {endLocation}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
