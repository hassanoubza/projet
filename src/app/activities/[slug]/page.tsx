import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ActivityFaq from "@/components/section/activities/components/ActivityFaq";
import ActivityTimeline from "@/components/section/activities/components/ActivityTimeline";
import {
  getActivityBySlug,
  getActivitySlugs,
} from "@/components/section/activities/activity.data";
import { Check, X } from "lucide-react";
import ContactAdventure from "@/components/ui/ContactAdventure";
import InstagramSection from "@/components/ui/Instgramme";


interface ActivityDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return getActivitySlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ActivityDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);

  if (!activity) {
    return {};
  }

  return {
    title: activity.seo.title,
    description: activity.seo.description,
    alternates: {
      canonical: `/marrakech-activities/${activity.slug}`,
    },
    openGraph: {
      title: activity.seo.title,
      description: activity.seo.description,
      images: [
        {
          url: activity.image,
          alt: activity.imageAlt,
        },
      ],
    },
  };
}

export default async function ActivityDetailsPage({params,}: ActivityDetailsPageProps): Promise<React.JSX.Element> {

  const { slug } = await params;
  const activity = getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  return (
    <section className="bg-background text-foreground">
      <section className="px-4 pb-6 pt-8 sm:px-6 sm:pb-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-text-muted"
          >
            <Link href="/" className="transition hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/activities" className="transition hover:text-primary">
              Marrakech activities
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-heading">{activity.shortTitle}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(480px,1.1fr)] lg:items-center">
            <div className="py-4 lg:pr-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
                {activity.eyebrow}
              </p>

              <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.08] text-heading sm:text-5xl lg:text-6xl">
                {activity.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-heading sm:text-lg">
                {activity.excerpt}
              </p>

              <Link
                href={`/contact`}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover"
              >
                Check availability
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden  lg:aspect-[5/4]">
              <Image
                src={activity.image}
                alt={activity.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid border border-border bg-surface-soft  max-w-6xl divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          <div className="py-6 sm:px-6 text-center sm:first:pl-0">
            <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
              Duration
            </p>
            <p className="mt-2 font-semibold text-heading">
              {activity.duration}
            </p>
          </div>

          <div className="py-6 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
              Location
            </p>
            <p className="mt-2 font-semibold text-heading">
              {activity.location}
            </p>
          </div>

          <div className="py-6 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
              Activity style
            </p>
            <p className="mt-2 font-semibold text-heading">{activity.format}</p>
          </div>

          <div className="py-6 sm:px-6 sm:last:pr-0">
            <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
              Pickup
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-heading">
              {activity.pickup}
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              The experience
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-heading sm:text-4xl">
              What makes this time well spent
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-heading sm:text-lg">
            {activity.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>


      <section className="bg-surface-soft px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              At a glance
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-heading sm:text-4xl">
              Reasons to choose this activity
            </h2>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {activity.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-4 border-b border-border pb-4 text-xl leading-7 text-heading"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary"
                  />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              How it unfolds
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-heading sm:text-4xl">
              From beginning to end
            </h2>

            <ActivityTimeline items={activity.timeline} />
          </div>
        </div>
      </section>



      <section className="px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="max-w-2xl">
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-heading sm:text-4xl">
              What is covered
            </h2>

            <p className="mt-4 text-sm leading-7 text-text-secondary sm:text-base">
              A clear overview of the services included in the experience and
              the items you should plan separately.
            </p>
          </header>

          <div className="grid border-y border-border lg:grid-cols-2 lg:divide-x lg:divide-border">
            <article className="py-8 lg:pr-12">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                    Included
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-heading sm:text-2xl">
                    Part of your experience
                  </h3>
                </div>

                <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-primary/10 px-3 text-xs font-bold text-primary">
                  {activity.included.length}
                </span>
              </div>

              <ul>
                {activity.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-b border-border/70 py-4 last:border-b-0"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={2.5}
                      />
                    </span>

                    <span className="text-sm leading-7 text-heading sm:text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="py-8 lg:pl-12">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-text-muted">
                    Not included
                  </p>

                  <h3 className="mt-2 text-xl font-semibold text-heading sm:text-2xl">
                    Plan these separately
                  </h3>
                </div>

                <span className="inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-muted px-3 text-xs font-bold text-text-muted">
                  {activity.excluded.length}
                </span>
              </div>

              <ul>
                {activity.excluded.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-4 border-b border-border/70 py-4 last:border-b-0"
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-text-muted">
                      <X
                        aria-hidden="true"
                        className="h-4 w-4"
                        strokeWidth={2.25}
                      />
                    </span>

                    <span className="text-sm leading-7 text-heading sm:text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 pb-6 sm:px-6 sm:pb-10 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Before you go
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-heading sm:text-4xl">
              Useful details
            </h2>
          </header>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {activity.practicalInformation.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                  {item.label}
                </p>
                <p className="mt-3 text-sm leading-7 text-text-secondary">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-soft px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <header className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Questions before booking
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-heading sm:text-4xl">
              Frequently asked questions
            </h2>
          </header>
          <ActivityFaq items={activity.faq} />
        </div>
      </section>

      <ContactAdventure />
      <InstagramSection />
    </section>
  );
}
