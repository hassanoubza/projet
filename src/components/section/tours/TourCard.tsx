import Image from "next/image";
import Link from "next/link";
import {
  getTourDepartureCity,
  getTourFeaturedImage,
  htmlToText,
  type WordPressTourCard,
} from "@/lib/tours";

interface TourCardProps {
  tour: WordPressTourCard;
  preloadImage?: boolean;
}


export default function TourCard({tour,preloadImage = false,}: TourCardProps): React.JSX.Element {


  const title = htmlToText(tour.title.rendered);
  const excerpt = htmlToText(tour.excerpt.rendered);
  const image = getTourFeaturedImage(tour);
  const departureCity = getTourDepartureCity(tour);
  const tourUrl = `/tours/${tour.slug}`;



  return (
    <article className="group flex h-full flex-col rounded-[6px] overflow-hidden bg-card transition duration-300 hover:shadow-lg">
      <Link  href={tourUrl} aria-label={`View ${title}`}
        className="relative block aspect-[18/10] overflow-hidden bg-surface-soft"
      >
        {image ? (
          <Image
            src={image.source_url}
            alt={image.alt_text || title}
            fill
            preload={preloadImage}
            quality={85}
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-sm font-medium text-text-muted">
            Morocco Tour
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />

        {tour.acf.duration && (
          <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground shadow-sm">
            {tour.acf.duration}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Private Morocco tour
        </p>

        <h2 className="mt-3 line-clamp-2 min-h-[3.5rem] text-2xl font-bold leading-tight text-heading transition group-hover:text-primary">
          <Link href={tourUrl}>{title}</Link>
        </h2>

        {excerpt && (
          <p className="mt-4 line-clamp-3 min-h-[5.25rem] text-sm leading-7 text-text-secondary">
            {excerpt}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-4">
          <div className="min-w-0">
            {departureCity ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                  Start from
                </p>
                <p className="mt-1 text-xl font-bold text-heading">
                  {departureCity.name}
                </p>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                  Tour type
                </p>
                <p className="mt-1 text-sm font-bold text-heading">
                  Private journey
                </p>
              </>
            )}
          </div>

          <Link
            href={tourUrl}
            aria-label={`View details for ${title}`}
            className="inline-flex min-h-11 shrink-0 rounded-xl items-center justify-center bg-primary px-4 py-2 text-sm font-bold text-primary-foreground transition hover:bg-primary-hover"
          >
            Details
            <span
              aria-hidden="true"
              className="ml-2 transition-transform duration-300"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
