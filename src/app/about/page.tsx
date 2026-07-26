import Image from "next/image";
import ContactAdventure from "@/components/ui/ContactAdventure";
import InstagramSection from "@/components/ui/Instgramme";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About Trips To Marrakech | Local Morocco Travel Experts",

  description:
    "Learn about Trips To Marrakech, a local Morocco travel company creating private tours, authentic experiences and customized itineraries across Marrakech, the Atlas Mountains, Sahara Desert and beyond.",

  keywords: [
    "Trips To Marrakech",
    "Morocco travel company",
    "Marrakech travel agency",
    "local Morocco guides",
    "private Morocco tours",
    "custom Morocco itineraries",
    "Marrakech excursions",
    "Sahara Desert tours",
    "Atlas Mountains tours",
  ],

  alternates: {
    canonical: "https://www.tripstomarrakech.com/about",
  },

  openGraph: {
    title: "About Trips To Marrakech | Your Local Morocco Travel Partner",

    description:
      "Meet the local team behind private Morocco tours and authentic travel experiences. Explore Marrakech, the Sahara Desert, Atlas Mountains and Morocco's hidden gems with local experts.",

    url: "https://www.tripstomarrakech.com/about",

    siteName: "Trips To Marrakech",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "https://www.tripstomarrakech.com/personel/hassan.jpeg",

        width: 1200,

        height: 630,

        alt: "Local Morocco travel guide from Trips To Marrakech",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "About Trips To Marrakech | Local Morocco Travel Experts",

    description:
      "Discover the story behind Trips To Marrakech and our passion for creating authentic private journeys throughout Morocco.",

    images: ["https://www.tripstomarrakech.com/personel/hassan.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};



export default function AboutPage(): React.JSX.Element {
  return (
    <section className="bg-background text-foreground">
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-heading sm:text-5xl">
              About <span className="text-primary">Trips to Marrakech</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-text-secondary">
              Meet the local travel team behind Trips To Marrakech, creating
              private Morocco tours, authentic cultural experiences and
              personalized journeys across Marrakech, the Atlas Mountains,
              Sahara Desert and Morocco’s most beautiful destinations.
            </p>
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative min-h-[420px] overflow-hidden rounded-xl bg-card shadow-sm sm:min-h-[520px]">
              <Image
                src="/personel/hassan.jpeg"
                alt="Local Morocco travel guide from Trips To Marrakech"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-6 space-y-5 text-base leading-8 text-text-secondary sm:text-lg">
              <p>
                Welcome to Trips to Marrakech, a local travel company dedicated
                to creating authentic and memorable journeys throughout Morocco.
                We help travelers discover Marrakech, the Atlas Mountains, the
                Sahara Desert and Morocco’s most beautiful destinations.
              </p>

              <p>
                Our team combines local knowledge, professional service and
                genuine Moroccan hospitality. Every journey is carefully planned
                according to your travel dates, interests, group size and
                preferred level of comfort.
              </p>

              <p>
                From exploring the lively souks and historical monuments of
                Marrakech to discovering traditional Berber villages, desert
                landscapes and the Atlantic coast, we create private experiences
                that go beyond the usual tourist routes.
              </p>

              <p>
                Our goal is simple: to make your journey comfortable, safe and
                unforgettable while helping you experience the real culture,
                landscapes and traditions of Morocco.
              </p>
            </div>
          </div>
        </div>
      </section>
      <InstagramSection />
      <ContactAdventure />
    </section>
  );
}
