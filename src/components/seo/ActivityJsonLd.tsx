
type ActivityJsonLdProps = {
  activity: {
    title: string;
    slug: string;
    shortTitle: string;
    category: string;
    duration: string;
    location: string;
    image: string;
    imageAlt: string;
    excerpt: string;
    included: string[];
    faq: { question: string; answer: string }[];
    seo: { title: string; description: string };
  };
};



const SITE_URL = "https://www.tripstomarrakech.com";

export default function ActivityJsonLd({ activity }: ActivityJsonLdProps) {
  const pageUrl = `${SITE_URL}/activities/${activity.slug}`;
  const imageUrl = activity.image.startsWith("http") ? activity.image: `${SITE_URL}${activity.image}`;

  const touristTripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: activity.title,
    description: activity.excerpt,
    url: pageUrl,
    image: imageUrl,
    touristType: "Leisure",
    provider: {
      "@type": "TravelAgency",
      name: "Trips To Marrakech",
      url: SITE_URL,
    },
    itinerary: {
      "@type": "ItemList",
      itemListElement: activity.included.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item,
      })),
    },
    touristTripLocation: {
      "@type": "Place",
      name: activity.location,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: activity.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Marrakech Activities",
        item: `${SITE_URL}/marrakech-activities`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: activity.shortTitle,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
