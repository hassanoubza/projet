import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {getDayTripBySlug,getDayTripsByIds,htmlToText,linesToArray,getDayTripTagsByIds, getDayTripSlugs} from "@/lib/day-trips";
import Mapgps from "@/components/ui/Mapgps";
import InstagramSection from "@/components/ui/Instgramme";
import ContactAdventure from "@/components/ui/ContactAdventure";
import type { TourDetailImage } from "@/components/section/tours/types";
import Gallery from "@/components/section/tours/Gallery";
import Highlights from "@/components/section/tours/Highlites";
import FAQSection, {parseTourFaq,} from "@/components/section/tours/FAQsection";
import Overview from "@/components/section/tours/Overview";
import WhyThisDayTrip from "@/components/section/day-trips/WhyThisDayTrip";
import InformationBeforeYouGo, { parseBeforeYouGo,} from "@/components/section/day-trips/InformationBeforeYouGo";
import RelatedDayTrips from "@/components/section/day-trips/RelatedDayTrips";
import DayTripHero from "@/components/section/day-trips/DayTripHero";
import TourInquiryForm from "@/components/section/tours/TourInquiryForm";


interface DayTripPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const revalidate = 300;
export const dynamicParams = true;


export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getDayTripSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}


function getSiteUrl(): string { 
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!siteUrl) {
    throw new Error("Missing SITE_URL environment variable.");
  }

  return siteUrl.replace(/\/+$/, "");
}


export async function generateMetadata({ params,}: DayTripPageProps): Promise<Metadata> {


  const { slug } = await params;
  const dayTrip = await getDayTripBySlug(slug);

  if (!dayTrip) {
    return {
      title: "Day Trip Not Found",
      description: "The requested Morocco day trip could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const wordpressTags = await getDayTripTagsByIds(dayTrip.tourTagIds);

  const title = dayTrip.seoTitle?.trim() || dayTrip.title || "Morocco Day Trip";

  const description = dayTrip.seoDescription?.trim() || dayTrip.excerpt || `Explore ${dayTrip.title}, including itinerary details, highlights, practical information and frequently asked questions.`;

  const canonicalUrl = `${getSiteUrl()}/day-trips/${dayTrip.slug}`;

  const tagNames = wordpressTags.map((tag) => htmlToText(tag.name)).filter(Boolean);


  const keywords = Array.from(
    new Set([
      dayTrip.title,
      ...tagNames,
      "Morocco day trips",
      "Marrakech day trips",
      "private Morocco day trip",
    ]),
  );


  const featuredImage = dayTrip.featuredImage?.url
    ? {
        url: dayTrip.featuredImage.url,
        alt: dayTrip.featuredImage.alt || dayTrip.title,
        ...(dayTrip.featuredImage.width
          ? {
              width: dayTrip.featuredImage.width,
            }
          : {}),
        ...(dayTrip.featuredImage.height
          ? {
              height: dayTrip.featuredImage.height,
            }
          : {}),
      }
    : undefined;

   return {
    title,
    description,
    keywords,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "article",
      locale: "en_US",
      url: canonicalUrl,
      siteName: "Trips to Marrakech",
      title,
      description,
      publishedTime: dayTrip.date || undefined,
      modifiedTime: dayTrip.modified || undefined,
      section: "Morocco Day Trips",
      tags: tagNames,
      images: featuredImage ? [featuredImage] : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: featuredImage ? [featuredImage.url] : undefined,
    },
  };
}




export default async function DayTripPage({params,}: DayTripPageProps): Promise<React.JSX.Element> {


  const { slug } = await params;
  const dayTrip = await getDayTripBySlug(slug);


  if (!dayTrip) {
    notFound();
  }

  const dayTripTitle = dayTrip.title || "Day Trip";
  const highlights = linesToArray(dayTrip.highlights);
  const overview = htmlToText(dayTrip.overview);
  const whyThisDayTrip = linesToArray(dayTrip.whyThisDayTrip);
  const informationBeforeYouGo = parseBeforeYouGo(dayTrip.informationBeforeYouGo,);
  const faqItems = parseTourFaq(dayTrip.faq);
  const featuredImage = dayTrip.featuredImage;
  const galleryImages = dayTrip.galleryImages ?? [];

  const relatedDayTrips = await getDayTripsByIds(
    dayTrip.relatedDayTripIds,
    dayTrip.id,
  );

  const images: TourDetailImage[] = [
    featuredImage?.url
      ? {
          id: featuredImage.id,
          image_url: featuredImage.url,
          alt: featuredImage.alt || dayTripTitle,
        }
      : null,
    ...galleryImages.map((image) => ({
      id: image.id,
      image_url: image.url,
      alt: image.alt || dayTripTitle,
    })),
  ].filter((image): image is TourDetailImage => image !== null);

  return (
    <section className="bg-surface-soft">
      <DayTripHero dayTrip={dayTrip} />

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-16">
          <div className="min-w-0 py-4">
            <div id="overview" className="scroll-mt-16 mb-4">
              <Overview overview={overview} label="Overview" />
            </div>
            <Highlights highlights={highlights} label="Day Trip Highlights" />
          </div>

          <aside className="w-full lg:sticky lg:top-32">
            <TourInquiryForm tourTitle={dayTripTitle} tourSlug={dayTrip.slug} />
          </aside>
        </div>
      </section>

      <WhyThisDayTrip
        reasons={whyThisDayTrip}
        label="Why Choose This Day Trip"
      />

      <InformationBeforeYouGo
        items={informationBeforeYouGo}
        label="Information Before You Go"
      />

      <FAQSection faq={faqItems} label="Frequently Asked Questions" />

      <Gallery
        images={images}
        tourTitle={dayTripTitle}
        label="Day Trip Gallery"
      />

      {dayTrip.mapEmbedUrl ? (
        <section id="location" className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mb-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Trip route
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-heading sm:text-4xl">
                Route and Location
              </h2>
            </div>

            <Mapgps trip={{ map_url: dayTrip.mapEmbedUrl }} />
          </div>
        </section>
      ) : null}

      <RelatedDayTrips dayTrips={relatedDayTrips} />

      <ContactAdventure />

      <InstagramSection />
    </section>
  );
}
