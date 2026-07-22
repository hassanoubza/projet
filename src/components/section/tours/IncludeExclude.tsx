import { CheckCircle2, XCircle } from "lucide-react";

type IncludedExcludedProps = {
  included: string[];
  excluded: string[];
  label: string;
};



export default function IncludedExcluded({included,excluded, label,}: IncludedExcludedProps) {
  return (
    <section aria-labelledby="included-excluded-heading" className="mx-auto">


      <h2
        id="included-excluded-heading"
        className="text-2xl font-extrabold text-heading sm:text-3xl"
      >
        {label}
      </h2>

      <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-4">
          <h3 className="text-base font-bold text-heading">Included</h3>

          <ul className="mt-4 space-y-3.5">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-sm leading-6 text-text-secondary sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-border bg-surface-soft p-6 sm:p-8">
          <h3 className="text-base font-bold text-heading">Not Included</h3>

          <ul className="mt-4 space-y-3.5">
            {excluded.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-text-muted"
                  aria-hidden="true"
                />
                <span className="text-sm leading-6 text-text-secondary sm:text-base">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
