interface WhyThisDayTripProps {
  reasons: string[];
  label?: string;
}

export default function WhyThisDayTrip({ reasons,label = "Why Choose This Day Trip",}: WhyThisDayTripProps): React.JSX.Element | null {


  if (reasons.length === 0) {
    return null;
  }

  return (
    <section id="why-this-day-trip" className="bg-surface-soft">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Your experience
          </p>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-heading sm:text-4xl">
            {label}
          </h2>

          <p className="mt-4 text-base leading-8 text-text-secondary">
            A carefully planned experience combining comfortable transport,
            local scenery and enough flexibility to enjoy the day at your own
            pace.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {reasons.map((reason, index) => (
            <article
              key={`${reason}-${index}`}
              className="flex items-start gap-4 rounded-[6px] border border-border bg-card p-5"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </div>

              <p className="pt-1 text-base font-medium leading-7 text-heading">
                {reason}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
