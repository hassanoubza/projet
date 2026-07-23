import Image from "next/image";
import Link from "next/link";
import type { MarrakechActivity } from "@/components/section/activities/activity.types";

interface ActivityFeatureCardProps {
  activity: MarrakechActivity;
  reverse?: boolean;
}

export default function ActivityFeatureCard({
  activity,
  reverse = false,
}: ActivityFeatureCardProps): React.JSX.Element {
  return (
    <article className="group overflow-hidden rounded-[1rem] border border-border bg-card transition duration-300 hover:border-primary/30">
      <div className="grid lg:grid-cols-2">
        <div
          className={`flex flex-col justify-center p-4 sm:p-6 lg:p-8 ${reverse ? "lg:order-2" : ""}`}
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              {activity.category}
            </span>

            <span className="text-xs font-medium text-text-muted">
              {activity.duration}
            </span>
          </div>

          <h2 className="mt-5 max-w-xl font-serif text-3xl font-semibold leading-tight text-heading transition group-hover:text-primary sm:text-4xl">
            {activity.title}
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-text-secondary sm:text-base">
            {activity.excerpt}
          </p>

          <dl className="mt-7 grid gap-5 border-y border-border py-5 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
                Location
              </dt>

              <dd className="mt-1 text-sm font-semibold text-heading">
                {activity.location}
              </dd>
            </div>

            <div>
              <dt className="text-xs font-bold uppercase tracking-[0.15em] text-text-muted">
                Activity style
              </dt>

              <dd className="mt-1 text-sm font-semibold text-heading">
                {activity.format}
              </dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Link
              href={`/activities/${activity.slug}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
            >
              View activity
              <span
                aria-hidden="true"
                className="ml-2 transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            <Link
              href={`/contact`}
              className="inline-flex min-h-12 items-center justify-center text-sm font-semibold text-heading transition hover:text-primary"
            >
              Check availability
            </Link>
          </div>
        </div>

        <Link
          href={`/activities/${activity.slug}`}
          aria-label={`View ${activity.title}`}
          className={`relative min-h-[330px] overflow-hidden sm:min-h-[420px] lg:min-h-[520px] ${reverse ? "lg:order-1" : ""}`}
        >
          <Image
            src={activity.image}
            alt={activity.imageAlt}
            fill
            priority={activity.featured}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition duration-700 group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </Link>
      </div>
    </article>
  );
}
