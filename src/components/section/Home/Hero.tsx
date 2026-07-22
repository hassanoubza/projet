import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";




export default async function Hero(): Promise<React.JSX.Element> {
  return (
    <section
      className="relative flex min-h-[calc(100vh-150px)] w-full items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <Image
        src="/images/marakech.jpeg"
        alt="Place Jemaa el-Fna animée au coucher du soleil, Marrakech"
        fill
        preload
        sizes="100vw"
        quality={75}
        className="object-cover"
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center px-4 text-center">
        {/* TITLE */}
        <h1
          id="hero-title"
          className="
            text-2xl mt-10 sm:text-5xl lg:text-6xl
            font-extrabold leading-tight
            text-heading dark:text-white
          "
        >
          Morocco Private Tours with
          <span className="block text-text-main">Trips to Marrakech</span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-6 max-w-2xl font-bold text-base sm:text-xl text-white/90">
          Discover Morocco with expert local guides. Enjoy private tours from
          Marrakech to the Sahara Desert, Merzouga, Atlas Mountains, Fes and
          Chefchaouen with authentic experiences and tailor-made travel
          itineraries.
        </p>

        {/* BUTTONS */}
        <div className="mt-12 flex items-center gap-1 lg:gap-3 flex-row sm:flex-wrap">
          <Link
            href="/tours"
            className=" inline-flex items-center gap-1 lg:gap-2 rounded-full bg-primary p-2 lg:px-6 lg:py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover "
          >
            Explore Morocco Tours
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/contact"
            className=" inline-flex items-center rounded-full border border-primary/30 bg-card p-2 lg:px-6 lg:py-3 text-sm font-semibold text-heading transition hover:border-primary  hover:bg-gold-muted "
          >
            Customize Your Journey
          </Link>
        </div>
      </div>
    </section>
  );
}
