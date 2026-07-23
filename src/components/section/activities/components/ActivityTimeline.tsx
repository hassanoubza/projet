import type { ActivityTimelineItem } from "@/components/section/activities/activity.types";

interface ActivityTimelineProps {
  items: ActivityTimelineItem[];
}

export default function ActivityTimeline({
  items,
}: ActivityTimelineProps): React.JSX.Element {
  return (
    <div className="mt-8">
      {items.map((item, index) => (
        <article
          key={item.step}
          className="relative grid gap-5 pb-10 pl-16 last:pb-0"
        >
          {index < items.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute left-[23px] top-12 h-[calc(100%-2rem)] w-px bg-border"
            />
          ) : null}

          <span className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
            {item.step}
          </span>

          <div>
            <h3 className="text-lg font-bold text-heading">{item.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-heading">
              {item.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
