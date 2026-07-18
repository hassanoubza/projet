import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Watsap from "@/components/ui/Watsap";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Trips to Marrakech | Morocco Tours & Desert Adventures",
    template: "%s | Trips to Marrakech",
  },

  description:
    "Discover unforgettable Morocco experiences with Trips to Marrakech. Explore Marrakech, Sahara Desert tours, cultural trips, private excursions, and authentic Moroccan adventures.",

  keywords: [
    "Morocco tours",
    "Marrakech tours",
    "Marrakech desert tours",
    "Sahara Desert trip",
    "Morocco private tours",
    "Morocco travel agency",
    "Marrakech excursions",
    "Luxury Morocco travel",
    "Trips to Marrakech",
  ],

  authors: [
    {
      name: "Trips to Marrakech",
    },
  ],

  creator: "Trips to Marrakech",

  metadataBase: new URL("https://tripstomarrakech.com"),

  openGraph: {
    type: "website",

    locale: "en_US",

    url: "https://tripstomarrakech.com",

    title: "Trips to Marrakech | Explore Morocco with Local Experts",

    description:
      "Book unforgettable Marrakech tours, Sahara Desert adventures, and authentic Morocco experiences with local travel experts.",

    siteName: "Trips to Marrakech",

    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trips to Marrakech - Morocco Tours",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Trips to Marrakech | Morocco Tours & Adventures",

    description:
      "Explore Marrakech, Sahara Desert, and Morocco's most beautiful destinations.",

    images: ["/images/og-image.jpg"],
  },

  robots: {
    index: true,

    follow: true,

    googleBot: {
      index: true,
      follow: true,
    },
  },
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body
        className="min-h-screen flex flex-col bg-background text-foreground "
      >
        <Header />
        <main className=" flex-1 w-full ">
          {children}
        </main>
        <Footer />
        <Watsap />
      </body>
    </html>
  );
}
