import type { ActivityFaqItem } from "@/components/section/activities/activity.types";

interface ActivityFaqProps {
  items: ActivityFaqItem[];
}

export default function ActivityFaq({
  items,
}: ActivityFaqProps): React.JSX.Element {
  return (
    <div className="mt-8 divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left">
            <span className="text-base font-semibold text-heading sm:text-lg">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-primary transition group-open:rotate-45"
            >
              +
            </span>
          </summary>

          <p className="max-w-3xl pb-6 pr-12 text-sm leading-7 text-text-secondary sm:text-base">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
