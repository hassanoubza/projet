import React from "react";
import {
  Sparkles,
  Mountain,
  Landmark,
  Sun,
  Moon,
  Camera,
  Compass,
  Tent,
  type LucideIcon,
} from "lucide-react";

type HighlightsProps = {
  highlights: string[];
};

const ICON_CYCLE: LucideIcon[] = [
  Mountain,
  Landmark,
  Compass,
  Tent,
  Sun,
  Moon,
  Camera,
  Sparkles,
];

export default function Highlights({
  highlights,
  label,
}: HighlightsProps & { label: string }) {
  if (highlights.length === 0) return null;

  return (
    <section aria-labelledby="highlights-heading" className="mx-auto">
      <h2
        id="highlights-heading"
        className="text-2xl font-extrabold text-heading sm:text-3xl"
      >
        {label}
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((highlight, index) => {
          const Icon = ICON_CYCLE[index % ICON_CYCLE.length];

          return (
            <article
              key={highlight}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-muted text-gold-soft">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>

              <h3 className="pt-1.5 text-sm font-semibold leading-snug text-heading">
                {highlight}
              </h3>
            </article>
          );
        })}
      </div>
    </section>
  );
}
