import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { parseTourFaq } from "@/components/section/tours/FAQsection";


import {
  getTourBySlug,
  getToursByIds,
  normalizeRelatedTourIds,
  getTourFeaturedImage,
  htmlToText,
  parseTourItinerary,
  getTourTags,
  getTourSlugs,
  linesToArray,
} from "@/lib/tours";



import Mapgps from "@/components/ui/Mapgps";
import Overview from "@/components/section/tours/Overview";
import IncludedExcluded from "@/components/section/tours/IncludeExclude";
import TourHero from "@/components/section/tours/Hero";
import { TourDetailImage } from "@/components/section/tours/types";
import Gallery from "@/components/section/tours/Gallery";
import TourInquiryForm from "@/components/section/tours/TourInquiryForm";
import FAQSection from "@/components/section/tours/FAQsection";
import Itinerary from "@/components/section/tours/Itenerary";
import Highlights from "@/components/section/tours/Highlites";
import ContactAdventure from "@/components/ui/ContactAdventure";
import RelatedTours from "@/components/section/tours/RelatedTours";
import InstagramSection from "@/components/ui/Instgramme";


type Props = {
  params: Promise<{ slug: string }>;
};


export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const slugs = await getTourSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}


const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tripstomarrakech.com").replace(/\/$/, "");


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return {
      title: "Tour Not Found",
      description: "The requested Morocco tour could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const tourTitle = htmlToText(tour.title.rendered);

  const title = htmlToText(tour.acf.seo_title) || tourTitle;

  const description = htmlToText(tour.acf.seo_description) || htmlToText(tour.excerpt.rendered).slice(0, 160) || `Discover ${tourTitle}, a private Morocco tour with carefully planned destinations and authentic experiences.`;

  const tourTags = getTourTags(tour);

  const keywords = Array.from(new Set(tourTags.map((tag) => htmlToText(tag.name)).filter(Boolean)),);


  const featuredImage = getTourFeaturedImage(tour);
  const canonicalUrl = `${SITE_URL}/tours/${tour.slug}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Trips to Marrakech",
      type: "website",
      locale: "en_US",
      images: featuredImage?.source_url
        ? [
            {
              url: featuredImage.source_url,
              width: featuredImage.media_details?.width || 1200,
              height: featuredImage.media_details?.height || 630,
              alt: featuredImage.alt_text || tourTitle,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: featuredImage?.source_url ? [featuredImage.source_url] : [],
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
  };
}



async function page({ params }: Props): Promise<React.JSX.Element> {
  const { slug } = await params;

  const tourdetails = await getTourBySlug(slug);

  if (!tourdetails) {
    notFound();
  }

  const faqItems = parseTourFaq(tourdetails.acf.faq);
  const overview = htmlToText(tourdetails.acf.overview);
  const included = linesToArray(tourdetails.acf.included);
  const excluded = linesToArray(tourdetails.acf.excluded);
  const itinerary = parseTourItinerary(tourdetails.acf.itinerary);

  const tourTitle = htmlToText(tourdetails.title.rendered);
  const featuredImage = getTourFeaturedImage(tourdetails);

  const highlights = linesToArray(tourdetails.acf.highlights);

  const relatedTourIds = normalizeRelatedTourIds(tourdetails.acf.related_tours);
  const relatedTours = await getToursByIds(relatedTourIds);
  const filteredRelatedTours = relatedTours.filter((tour) => tour.id !== tourdetails.id);

  const images: TourDetailImage[] = [
    featuredImage?.source_url
      ? {
          id: featuredImage.id,
          image_url: featuredImage.source_url,
          alt: featuredImage.alt_text || tourTitle,
        }
      : null,
    tourdetails.acf.tour_image_2
      ? {
          id: tourdetails.acf.tour_image_2.id,
          image_url: tourdetails.acf.tour_image_2.url,
          alt: tourdetails.acf.tour_image_2.alt || tourTitle,
        }
      : null,
    tourdetails.acf.tour_image_3
      ? {
          id: tourdetails.acf.tour_image_3.id,
          image_url: tourdetails.acf.tour_image_3.url,
          alt: tourdetails.acf.tour_image_3.alt || tourTitle,
        }
      : null,
    tourdetails.acf.tour_image_4
      ? {
          id: tourdetails.acf.tour_image_4.id,
          image_url: tourdetails.acf.tour_image_4.url,
          alt: tourdetails.acf.tour_image_4.alt || tourTitle,
        }
      : null,
  ].filter((image): image is TourDetailImage => image !== null);




  return (
    <section className="bg-background text-foreground">
      <TourHero tour={tourdetails} />


      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,1fr)_390px] xl:gap-16">
          <div className="min-w-0">
            <div id="overview" className="scroll-mt-28">
              <Overview overview={overview} label="Overview" />
            </div>

            <div id="itinerary" className=" sm:py-10">
              <Itinerary itinerary={itinerary} label="Tour Itinerary" />
            </div>

            <Highlights highlights={highlights} label="Tour Highlights" />

            <div id="included" className=" sm:pt-6">
              <IncludedExcluded
                included={included}
                excluded={excluded}
                label="Included & Excluded"
              />
            </div>
          </div>

          <aside className="w-full lg:sticky lg:top-24">
            <TourInquiryForm
              tourTitle={tourTitle}
              tourSlug={tourdetails.slug}
            />
          </aside>
        </div>
      </section>

      <Gallery images={images} tourTitle={tourTitle} label="Tour Gallery" />
      <FAQSection faq={faqItems} label="Frequently Asked Questions" />

      {tourdetails.acf.map_embed_url ? (
        <section id="location" className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 lg:px-8 lg:py-10">
            <div className="mb-8 max-w-3xl">
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-primary sm:text-4xl">
                Route and Location
              </h2>
            </div>

            <Mapgps trip={{ map_url: tourdetails.acf.map_embed_url }} />
          </div>
        </section>
      ) : null}

      {filteredRelatedTours.length > 0 ? (
        <section className=" bg-background">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <RelatedTours
              tours={filteredRelatedTours}
              label="Related Desert Tours"
            />
          </div>
        </section>
      ) : null}

      <ContactAdventure />
      <InstagramSection />
    </section>
  );
}

export default page;
