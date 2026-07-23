import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import {
  getFeaturedActivity,
  marrakechActivities,
} from "@/components/section/activities/activity.data";

export default function MarrakechActivitiesPreview(): React.JSX.Element {
  const featuredActivity = getFeaturedActivity();

  const secondaryActivities = marrakechActivities.filter((activity) => activity.id !== featuredActivity.id).slice(0, 3);

  return (
    <section className="bg-background text-foreground ">
      <div className="mx-auto max-w-7xl  px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <header className="mb-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Things to do in Marrakech
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-heading sm:text-4xl lg:text-5xl">
              Marrakech experiences worth making time for
            </h2>
          </div>

          <Link
            href="/marrakech-activities"
            className="inline-flex min-h-9 w-fit shrink-0 items-center justify-center rounded-full border border-primary px-6 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
          >
            View all activities
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(360px,0.85fr)]">
          <article className="group">
            <Link
              href={`/activities/${featuredActivity.slug}`}
              className="relative block aspect-[16/10] overflow-hidden rounded-[1rem] bg-muted"
            >
              <Image
                src={featuredActivity.image}
                alt={featuredActivity.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

              <span className="absolute left-5 top-5 rounded-full bg-background/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-primary backdrop-blur-md">
                Featured activity
              </span>

              <div className="absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/80">
                  {featuredActivity.category}
                </p>

                <h3 className="mt-2 max-w-2xl font-serif text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
                  {featuredActivity.title}
                </h3>
              </div>
            </Link>

            <div className="px-1 pt-6">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-text-muted sm:text-sm">
                <span className="inline-flex items-center gap-2">
                  <Clock3 aria-hidden="true" className="h-4 w-4 text-primary" />
                  {featuredActivity.duration}
                </span>

                <span className="inline-flex items-center gap-2">
                  <MapPin aria-hidden="true" className="h-4 w-4 text-primary" />
                  {featuredActivity.location}
                </span>
              </div>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-heading sm:text-gl">
                {featuredActivity.excerpt}
              </p>
            </div>
          </article>



          <div className="divide-y divide-border">
            {secondaryActivities.map((activity) => (
              <article
                key={activity.id}
                className="group py-4 first:pt-0 last:pb-0"
              >
                <Link
                  href={`/activities/${activity.slug}`}
                  className="grid gap-5 sm:grid-cols-[190px_minmax(0,1fr)] lg:grid-cols-[180px_minmax(0,1fr)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                    <Image
                      src={activity.image}
                      alt={activity.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, 190px"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex min-w-0 flex-col justify-center">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                      {activity.category}
                    </p>

                    <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-heading transition group-hover:text-primary sm:text-2xl">
                      {activity.shortTitle}
                    </h3>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-text-secondary">
                      {activity.excerpt}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-primary"
                        />
                        {activity.duration}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <MapPin
                          aria-hidden="true"
                          className="h-3.5 w-3.5 text-primary"
                        />
                        {activity.location}
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
