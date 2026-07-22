"use client";

import { useState } from "react";
import { ChevronDown, Clock, MapPin } from "lucide-react";
import type { TourItineraryItem } from "./types";

interface ItineraryProps {
  itinerary: TourItineraryItem[];
  label?: string;
}

export default function Itinerary({
  itinerary,
  label = "Tour Itinerary",
}: ItineraryProps): React.JSX.Element | null {
  const [openIndex, setOpenIndex] = useState<number | null>(-1);

  if (itinerary.length === 0) {
    return null;
  }

  function toggleDay(index: number): void {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  }

  return (
    <section
      aria-labelledby="itinerary-heading"
      className="w-full bg-background"
    >
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-soft">
          Day by Day
        </span>
        <h2
          id="itinerary-heading"
          className="mt-2 text-3xl font-extrabold leading-tight text-heading sm:text-4xl"
        >
          {label}
        </h2>
      </div>

      <div className="relative mt-8">
        {/* Continuous vertical line connecting all days */}
        <div
          className="absolute left-6 top-6 bottom-6 w-px bg-border sm:left-7"
          aria-hidden="true"
        />

        <div className="space-y-3">
          {itinerary.map((item, index) => {
            const isOpen = openIndex === index;
            const contentId = `itinerary-day-${index + 1}`;
            const isLast = index === itinerary.length - 1;

            return (
              <article key={`${item.day}-${item.title}`} className="relative">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggleDay(index)}
                  className={`group relative z-10 grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 rounded-xl border bg-background px-4 py-5 text-left transition-all duration-300 sm:gap-5 sm:px-6 sm:py-6 ${
                    isOpen
                      ? "border-primary/50 shadow-sm"
                      : "border-border hover:border-primary/40 hover:shadow-sm"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-sm font-extrabold transition-all duration-300 sm:h-14 sm:w-14 ${
                      isOpen
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-heading group-hover:border-primary group-hover:text-primary"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="min-w-0">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                        {item.day}
                      </span>

                      {(item.distance || item.time_on_road) && (
                        <span
                          className="hidden h-1 w-1 rounded-full bg-border sm:block"
                          aria-hidden="true"
                        />
                      )}

                      {item.distance && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted">
                          <MapPin
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-primary"
                          />
                          {item.distance}
                        </span>
                      )}

                      {item.time_on_road && (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-muted">
                          <Clock
                            aria-hidden="true"
                            className="h-3.5 w-3.5 text-primary"
                          />
                          {item.time_on_road}
                        </span>
                      )}
                    </span>

                    <span
                      className={`mt-1.5 block text-base font-bold leading-snug transition-colors duration-300 sm:text-lg lg:text-xl ${
                        isOpen
                          ? "text-primary"
                          : "text-heading group-hover:text-primary"
                      }`}
                    >
                      {item.title}
                    </span>
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-10 sm:w-10 ${
                      isOpen
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-text-muted group-hover:border-primary group-hover:text-primary"
                    }`}
                  >
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 transition-transform duration-300 sm:h-5 sm:w-5 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </button>

                <div
                  id={contentId}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="ml-[3.25rem] mr-1 border-l border-border/70 py-4 pl-6 sm:ml-[3.75rem]">
                      <p className="max-w-3xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {!isLast && <div className="h-3" />}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
