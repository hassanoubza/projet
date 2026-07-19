import Image from "next/image";
import ContactAdventure from "@/components/ui/ContactAdventure";
import InstagramSection from "@/components/ui/Instgramme";



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
              Meet the local team behind authentic private tours and
              unforgettable travel experiences in Marrakech and across Morocco.
            </p>
          </div>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative min-h-[420px] overflow-hidden rounded-xl bg-card shadow-sm sm:min-h-[520px]">
              <Image
                src="/personel/hassan.jpeg"
                alt="Local guide from Trips to Marrakech"
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
