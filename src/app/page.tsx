import FAQ from "@/components/section/Home/FAQ";
import InstagramSection from "@/components/ui/Instgramme";
import Hero from "@/components/section/Home/Hero";
import WhyUs from "@/components/section/Home/WhyUs";
import CustomizeTour from "@/components/section/Home/CustomizeTour";
import TopBlogs from "@/components/section/Home/Topblogs";
import Tourmarakech from "@/components/section/Home/Tourmarakech";


export default function Home() {


  return (
    <>
      <Hero />
      <CustomizeTour />
      <WhyUs />
      <Tourmarakech />
      <TopBlogs />
      <InstagramSection />
      <FAQ />
    </>
  );
}
