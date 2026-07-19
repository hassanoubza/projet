import React from "react";
import { SiTripadvisor } from "react-icons/si";

const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g293734-d34332055-Reviews-Treck_To_Morocco-Marrakech_Marrakech_Safi.html";




function ArticleTripAdvisor({ review, index,}: {
  review: { name: string; title: string; text: string };
  index: number;
}): React.JSX.Element {
  return (
    <article
      key={`${review.name}-${review.title}`}
      className={`group rounded-xl bg-card p-6 shadow-sm ring-1 ring-border transition-all duration-300 hover:shadow-lg sm:p-7 ${
        index === 1 ? "hidden sm:block" : ""
      } ${index === 2 ? "hidden lg:block" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-heading">{review.name}</h3>

          <div className="flex items-center gap-2">
            <div className="flex text-gold">★★★★★</div>

            <span className="text-sm font-medium text-foreground">
              Verified Review
            </span>
          </div>
        </div>

        <a
          href={TRIPADVISOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read ${review.name}'s verified review on TripAdvisor`}
          className="  flex h-11 w-11 items-center justify-center rounded-full border border-gold  bg-primary  transition hover:scale-105 hover:border-gold hover:bg-primary-hover"
        >
          <SiTripadvisor
            className="h-5 w-5 text-[#34E0A1]"
            aria-hidden="true"
          />
        </a>
      </div>

      <h4 className="mt-5 text-lg font-bold leading-snug text-text-main">
        {review.title}
      </h4>

      <p className="mt-3 line-clamp-4 text-sm leading-7 text-text-secondary">
        {review.text}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
        <a
          href={TRIPADVISOR_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Read ${review.name}'s verified review on TripAdvisor`}
          className="text-sm font-semibold text-heading-soft transition-colors hover:text-gold-soft"
        >
          Read on Tripadvisor
        </a>

        <span className="h-1.5 w-1.5 rounded-full bg-gold-soft/70 transition-transform duration-300 group-hover:scale-150" />
      </div>
    </article>
  );
}

export default ArticleTripAdvisor;

