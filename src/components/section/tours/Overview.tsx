import React from "react";

type OverviewProps = {
  overview: string | undefined;
  label: string;
};

export default function Overview({ overview, label }: OverviewProps) {
  return (
    <section aria-labelledby="overview-heading" className="mx-auto max-w-7xl">
      <div className="">
        <h2
          id="overview-heading"
          className="text-2xl font-extrabold text-heading sm:text-3xl"
        >
          {label}
        </h2>

        <p className="mt-5 max-w-4xl text-base leading-8 text-text-secondary sm:text-lg">
          {overview}
        </p>
      </div>
    </section>
  );
}
