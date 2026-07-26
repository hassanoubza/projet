import React from "react";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import ContactForm from "@/components/section/contact/ContactForm";


export const metadata: Metadata = {
  title: "Contact Trips To Marrakech | Plan Your Morocco Journey",

  description:
    "Contact Trips To Marrakech to plan your private Morocco tour. Tell us your travel dates, destinations and preferences. Our local team will help you create a personalized Morocco itinerary.",

  keywords: [
    "luxury private tours morocco",
    "Marrakech travel agency",
    "private tour guide morocco",
    "sahara desert tours morocco",
    "day trips from Marrakech",
  ],

  alternates: {
    canonical: "https://www.tripstomarrakech.com/contact",
  },

  openGraph: {
    title: "Contact Trips To Marrakech | Create Your Perfect Morocco Tour",

    description:
      "Get in touch with our local Morocco travel team and design a private tour including Marrakech, Sahara Desert, Atlas Mountains and coastal destinations.",

    url: "https://www.tripstomarrakech.com/contact",

    siteName: "Trips To Marrakech",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "https://www.tripstomarrakech.com/images/marrakech-hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Contact Trips To Marrakech for private Morocco tours",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Contact Trips To Marrakech | Private Morocco Tours",

    description:
      "Plan your Morocco journey with our local travel experts. Contact us for private tours, day trips and customized itineraries.",

    images: ["https://www.tripstomarrakech.com/images/marrakech-hero.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",

  "@type": "ContactPage",

  "@id": "https://www.tripstomarrakech.com/contact#contact",

  url: "https://www.tripstomarrakech.com/contact",

  name: "Contact Trips To Marrakech",

  description:
    "Contact Trips To Marrakech to plan private Morocco tours, Marrakech excursions, Sahara desert trips and customized itineraries.",

  mainEntity: {
    "@type": "TravelAgency",

    "@id": "https://www.tripstomarrakech.com/#organization",

    name: "Trips To Marrakech",

    url: "https://www.tripstomarrakech.com",

    logo: {
      "@type": "ImageObject",

      url: "https://www.tripstomarrakech.com/logo.png",
    },

    image: {
      "@type": "ImageObject",

      url: "https://www.tripstomarrakech.com/images/marrakech-hero.jpeg",
    },

    description:
      "Trips To Marrakech offers private Morocco tours, Marrakech day trips, Sahara desert experiences and customized travel itineraries.",

    email: "info@tripstomarrakech.com",

    telephone: "+212643577845",

    address: {
      "@type": "PostalAddress",

      addressCountry: "MA",

      addressRegion: "Marrakech-Safi",

      addressLocality: "Marrakech",
    },

    areaServed: [
      {
        "@type": "City",
        name: "Marrakech",
      },
      {
        "@type": "Country",
        name: "Morocco",
      },
    ],

    sameAs: [
      "https://www.instagram.com/tripstomarrakech?igsh=MXE2b3d1YWFlZGhjcA%3D%3D&utm_source=qr",
    ],

    contactPoint: {
      "@type": "ContactPoint",

      contactType: "customer service",

      email: "info@tripstomarrakech.com",

      telephone: "+212643577845",

      availableLanguage: ["English", "French", "Arabic"],
    },
  },
};


const WHATSAPP_NUMBER = "212643577845";


export default function ContactPage(): React.JSX.Element {

  return (
    <>
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    <section className="bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8 lg:py-16">
      <section className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Contact Us
          </p>

          <h1 className="mt-3 text-3xl font-bold text-heading sm:text-4xl">
            Let&apos;s Plan Your Morocco Journey
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-text-secondary">
            Tell us about your travel plans and our local team will help you
            create a private Morocco tour designed around you.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* FORM */}
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-heading">
              Send us a message
            </h2>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Fill in the form and continue the conversation directly on
              WhatsApp.
            </p>

           <ContactForm />
          </div>

          {/* CONTACT INFORMATION */}
          <aside className="relative flex min-h-full flex-col overflow-hidden rounded-xl bg-secondary p-7 text-secondary-foreground shadow-sm sm:p-9">
            <div className="relative">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold-muted">
                Your Morocco Travel Concierge
              </p>

              <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight sm:text-4xl">
                From your first idea to a journey designed around you.
              </h2>

              <p className="mt-5 max-w-md text-base leading-8 text-secondary-foreground/75">
                Share your travel plans and let our local team transform them
                into a clear, comfortable and authentic Morocco itinerary.
              </p>
            </div>

            <div className="relative mt-9 space-y-7">
              <div className="grid grid-cols-[44px_1fr] gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-foreground/15 bg-secondary-foreground/5">
                  <MessageCircle className="h-5 w-5 text-gold-muted" />
                </div>

                <div className="border-b border-secondary-foreground/10 pb-7">
                  <h3 className="mt-1 text-lg font-bold">
                    Tell us about your trip
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-secondary-foreground/70">
                    Share your dates, preferred destinations, group size and
                    travel style.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[44px_1fr] gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-secondary-foreground/15 bg-secondary-foreground/5">
                  <Sparkles className="h-5 w-5 text-gold-muted" />
                </div>
                <div>
                  <h3 className="mt-1 text-lg font-bold">
                    Travel with confidence
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-secondary-foreground/70">
                    Enjoy local assistance, private transport and a journey
                    organized around you.
                  </p>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-between rounded-xl bg-primary px-5 py-4 font-bold text-primary-foreground transition hover:bg-primary-hover"
            >
              <span className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5" />
                Start on WhatsApp
              </span>

              <ArrowUpRight className="h-5 w-5" />
            </a>
          </aside>
        </div>
      </section>
    </section>
    </>
  );
}
