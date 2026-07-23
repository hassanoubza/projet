import FAQ from "@/components/section/Home/FAQ";
import InstagramSection from "@/components/ui/Instgramme";
import Hero from "@/components/section/Home/Hero";
import WhyUs from "@/components/section/Home/WhyUs";
import CustomizeTour from "@/components/section/Home/CustomizeTour";
import TopBlogs from "@/components/section/Home/Topblogs";
import Tourmarakech from "@/components/section/Home/Tourmarakech";
import { getBlogPosts, htmlToText } from "@/lib/wordpress";
import { getDepartureCityBySlug, getTourCards } from "@/lib/tours";
import { notFound } from "next/navigation";
import MarrakechActivitiesPreview from "@/components/section/Home/MarrakechActivitiesPreview";

export const revalidate = 300;

export default async function Home(): Promise<React.JSX.Element> {
  const postsPromise = getBlogPosts(4);

  const departureCity = await getDepartureCityBySlug("marrakech");

  if (!departureCity) {
    notFound();
  }

  const [tourResult, posts] = await Promise.all([
    getTourCards({
      page: 1,
      perPage: 6,
      departureCityId: departureCity.id,
    }),
    postsPromise,
  ]);

  const cityName = htmlToText(departureCity.name);

  return (
    <>
      <Hero />
      <CustomizeTour />
      <WhyUs />
      <Tourmarakech tourResult={tourResult} cityName={cityName} />
      <MarrakechActivitiesPreview />
      <TopBlogs posts={posts} />
      <InstagramSection />
      <FAQ />
    </>
  );
}
