import FAQ from "@/components/section/Home/FAQ";
import InstagramSection from "@/components/ui/Instgramme";
import Hero from "@/components/section/Home/Hero";
import WhyUs from "@/components/section/Home/WhyUs";
import CustomizeTour from "@/components/section/Home/CustomizeTour";
import TopBlogs from "@/components/section/Home/Topblogs";
import Tourmarakech from "@/components/section/Home/Tourmarakech";
import MarrakechActivitiesPreview from "@/components/section/Home/MarrakechActivitiesPreview";
import TopDayTrips from "@/components/section/Home/TopDayTrips";

import { getTopBlogPosts, htmlToText } from "@/lib/wordpress";
import {getDepartureCityBySlug,getTourCards,type PaginatedTourCards,} from "@/lib/tours";


export const revalidate = 3600;

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Morocco Tours & Marrakech Day Trips",

  description: "Book private Morocco tours & Marrakech day trips with local experts. Custom Sahara Desert journeys, Atlas Mountains excursions & tailored itineraries.",

  applicationName: "Trips To Marrakech",

  keywords: [
    "trips to Marrakech",
    "private Morocco tours",
    "Marrakech tours",
    "Marrakech day trips",
    "Sahara Desert tours",
    "Merzouga desert tours",
    "Atlas Mountains excursions",
    "Morocco private driver",
    "Morocco travel agency",
    "custom Morocco itinerary",
    "tours from Marrakech",
    "Morocco desert trips",
  ],

  authors: [
    {
      name: "Trips To Marrakech",
      url: "https://www.tripstomarrakech.com",
    },
  ],

  creator: "Trips To Marrakech",
  publisher: "Trips To Marrakech",

  category: "Travel",

  alternates: {
    canonical: "https://www.tripstomarrakech.com/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",

    url: "https://www.tripstomarrakech.com/",

    siteName: "Trips To Marrakech",

    title: "Private Morocco Tours & Marrakech Day Trips | Trips To Marrakech",

    description:
      "Explore Morocco through private tours, Marrakech excursions, Sahara Desert adventures and personalized itineraries created by local experts.",

    images: [
      {
        url: "https://www.tripstomarrakech.com/images/marakechh.jpeg",
        width: 1200,
        height: 630,
        alt: "Private Morocco tours and Marrakech day trips with Trips To Marrakech",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Private Morocco Tours & Marrakech Day Trips | Trips To Marrakech",

    description:
      "Plan private Morocco tours, Sahara Desert journeys, Marrakech day trips and customized itineraries with local travel experts.",

    images: ["https://www.tripstomarrakech.com/images/marakechh.jpeg"],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};



const HOME_TOURS_PER_PAGE = 6;

function createEmptyTourResult(): PaginatedTourCards {
  return {
    tours: [],
    totalTours: 0,
    totalPages: 1,
    currentPage: 1,
    perPage: HOME_TOURS_PER_PAGE,
  };
}

export default async function Home(): Promise<React.JSX.Element> {


  const [posts, departureCity] = await Promise.all([
    getTopBlogPosts(4),
    getDepartureCityBySlug("marrakech"),
  ]);

  const tourResult = departureCity ? await getTourCards({ page: 1, perPage: HOME_TOURS_PER_PAGE, departureCityId: departureCity.id,}) : createEmptyTourResult();

  const cityName = departureCity ? htmlToText(departureCity.name) : "Marrakech";

  return (
    <>
      <Hero />
      <CustomizeTour />
      <WhyUs />

      <Tourmarakech tourResult={tourResult} cityName={cityName} />

      <MarrakechActivitiesPreview />
      <TopDayTrips limit={3} />
      <TopBlogs posts={posts} />
      <InstagramSection />
      <FAQ />
    </>
  );
}
