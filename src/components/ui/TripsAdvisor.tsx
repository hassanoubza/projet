"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiTripadvisor } from "react-icons/si";
import ArticleTripAdvisor from "./ArticleTripAdvisor";



const REVIEWS = [
  {
    name: "Emily Carter",
    title: "The best way to discover Morocco",
    text: "Our trip from Marrakech to the Sahara Desert was absolutely incredible. Everything was perfectly organized, from the transportation to the accommodations. Our guide was friendly, knowledgeable, and always made sure we were comfortable. I highly recommend this tour to anyone visiting Morocco.",
  },
  {
    name: "Daniel Thompson",
    title: "An unforgettable Sahara adventure",
    text: "This was one of the best travel experiences we've ever had. The desert camp was beautiful, the camel ride at sunset was unforgettable, and every stop along the route offered something unique. The entire team was professional and welcoming from start to finish.",
  },
  {
    name: "Sofia Martínez",
    title: "Excellent service and authentic experiences",
    text: "We wanted to experience the real Morocco, and this tour delivered exactly that. The itinerary was well planned, the hotels were comfortable, and our guide shared fascinating stories about Moroccan culture and history. Everything exceeded our expectations.",
  },
  {
    name: "Michael Johnson",
    title: "Professional, reliable, and well organized",
    text: "Booking was easy and communication was excellent before our arrival. The vehicle was modern and comfortable, and every destination was worth visiting. The Atlas Mountains, Merzouga, and the Sahara Desert were truly breathtaking. We would definitely book again.",
  },
  {
    name: "Olivia Brown",
    title: "A memorable journey through Morocco",
    text: "From the first day to the last, everything was smooth and enjoyable. The landscapes were stunning, the local hospitality was amazing, and our guide made the experience even more special. This tour gave us memories that will last a lifetime.",
  },
] as const;


const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g293734-d34332055-Reviews-Treck_To_Morocco-Marrakech_Marrakech_Safi.html";




export default function TripAdvisorReviews(): React.JSX.Element {


  const [activeIndex, setActiveIndex] = useState(0);

  const visibleReviews = [ REVIEWS[activeIndex],  REVIEWS[(activeIndex + 1) % REVIEWS.length],  REVIEWS[(activeIndex + 2) % REVIEWS.length],];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? REVIEWS.length - 1 : current - 1,
    );
  };


  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % REVIEWS.length);
  };

  return (
    <section
      className="bg-background px-4 py-6 text-foreground sm:px-6 lg:px-8"
      aria-labelledby="tripadvisor-reviews-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="tripadvisor-reviews-title"
            className="font-serif text-3xl font-bold leading-tight text-heading sm:text-3xl lg:text-4xl"
          >
            What Our Travelers Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
            Real experiences from real travelers who have explored Morocco with
            us
          </p>
        </div>

        <div className="mt-8">
          <div className="relative">
            {/* Left button - desktop only */}
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-5 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-heading transition hover:border-gold-soft hover:text-gold-soft lg:flex"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>



            <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleReviews.map((review, index) => (
                <ArticleTripAdvisor
                  key={`${review.name}-${review.title}`}
                  review={review}
                  index={index}
                />
              ))}
            </div>

            {/* Right button - desktop only */}
            <button
              type="button"
              aria-label="Next reviews"
              onClick={goToNext}
              className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 translate-x-5 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card text-heading transition hover:border-gold-soft hover:text-gold-soft lg:flex"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile / tablet controls */}
          <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
            <button
              type="button"
              aria-label="Previous reviews"
              onClick={goToPrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-heading shadow-sm transition hover:border-gold-soft hover:text-gold-soft"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <span className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              Reviews
            </span>

            <button
              type="button"
              aria-label="Next reviews"
              onClick={goToNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-heading shadow-sm transition hover:border-gold-soft hover:text-gold-soft"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={TRIPADVISOR_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-sm font-extrabold text-text-main shadow-sm transition-colors hover:bg-muted hover:text-gold-soft"
          >
            <span>View all reviews</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-foreground/15 text-accent-foreground ring-1 ring-accent-foreground/25 sm:h-8 sm:w-8">
              <SiTripadvisor
                className="h-4 w-4 opacity-90"
                aria-hidden="true"
              />
            </span>
          </a>
        </div>


      </div>
    </section>
  );
}
