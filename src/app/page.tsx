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
import {
  getDepartureCityBySlug,
  getTourCards,
  type PaginatedTourCards,
} from "@/lib/tours";


export const revalidate = 3600;

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
