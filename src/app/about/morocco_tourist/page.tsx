import React from "react";
import Image from "next/image";
import Link from "next/link";
import carte from "@/../public/images/carte.webp";
import drapeaux from "@/../public/images/drapaux.webp";
import InstagramSection from "@/components/ui/Instgramme";
import FAQTourist from "@/components/section/tours/FAQTourist";


const HIGHLIGHTS = [
  {
    title: "Imperial Cities",
    description:
      "Explore Marrakech, Fes, Rabat and Meknes, where ancient medinas, royal palaces and centuries of history create unforgettable experiences.",
  },
  {
    title: "Sahara Desert Adventures",
    description:
      "Experience the magic of Merzouga with camel trekking, desert camps, traditional music and unforgettable nights under the stars.",
  },
  {
    title: "Atlas Mountains",
    description:
      "Discover breathtaking valleys, Berber villages and spectacular landscapes through authentic mountain experiences.",
  },
  {
    title: "Rich Moroccan Culture",
    description:
      "From colorful souks and traditional crafts to Moroccan cuisine and warm hospitality, every corner tells a story.",
  },
];



function AboutMoroccoTouristPage(): React.JSX.Element {
  return (
    <section className="bg-background text-foreground">
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="/images/marakechh.jpeg"
          alt="Beautiful landscape of Morocco"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-gold-muted">
              Explore Morocco
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              Discover <span className="text-primary-foreground">Morocco</span>
              <span className="block text-gold-muted">
                Culture, Landscapes & Authentic Experiences
              </span>
            </h1>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-white">
              Discover a country where ancient traditions meet breathtaking
              landscapes, from{" "}
              <a
                href="https://en.wikipedia.org/wiki/Marrakesh"
                target="_blank"
                rel="noopener noreferrer"
              >
                Marrakech
              </a>{" "}
              and Fes to the Sahara Desert and the Atlas Mountains.
            </p>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-surface-soft py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-heading sm:text-4xl">
              What Makes Morocco a{" "}
              <span className="text-primary">Dream Destination?</span>
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
              Ancient cities, dramatic mountains, golden Sahara dunes and rich
              cultural traditions make Morocco an unforgettable destination for
              every kind of traveler.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold text-heading">{item.title}</h3>

                <p className="mt-3 leading-7 text-text-secondary">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-heading sm:text-4xl">
          Morocco: A Land of Timeless Beauty, Culture and Adventure
        </h2>

        <p className="mt-6 text-lg leading-8 text-text-secondary">
          Located in the northwestern corner of Africa, Morocco is one of the
          world's most fascinating travel destinations. Bordered by both the
          Atlantic Ocean and the Mediterranean Sea, the country offers an
          extraordinary diversity of landscapes, from golden Sahara Desert dunes
          and the majestic Atlas Mountains to picturesque coastal towns and lush
          green valleys. This remarkable diversity allows visitors to experience
          multiple climates, cultures and adventures within a single journey.
        </p>

        <p className="mt-6 text-lg leading-8 text-text-secondary">
          Morocco is home to more than <strong>38 million people</strong> and
          has a history spanning thousands of years. The country has been shaped
          by Amazigh, Arab, African, Andalusian and European civilizations,
          creating a unique cultural identity found nowhere else in the world.
          Travelers can discover vibrant souks, centuries-old medinas,
          magnificent mosques, ancient kasbahs, royal palaces and traditional
          villages where local customs continue to be preserved across
          generations.
        </p>

        <h3 className="mt-12 text-2xl font-bold text-heading">
          A Country Rich in History and UNESCO Heritage
        </h3>

        <p className="mt-6 text-lg leading-8 text-text-secondary">
          Morocco proudly preserves some of the most remarkable historical sites
          in North Africa. The country is home to{" "}
          <strong>nine UNESCO World Heritage Sites</strong>, including the
          ancient Medina of Fes, the historic Medina of Marrakech, the Roman
          ruins of Volubilis, the fortified village of Ait Ben Haddou and the
          imperial city of Meknes. These landmarks reflect Morocco's rich
          architectural heritage and attract millions of visitors every year who
          wish to experience authentic history and culture.
        </p>

        <h3 className="mt-12 text-2xl font-bold text-heading">
          Tourism: One of Morocco s Strongest Economic Pillars
        </h3>

        <p className="mt-6 text-lg leading-8 text-text-secondary">
          Tourism plays a vital role in Morocco s economy. The country welcomed
          approximately{" "}
          <strong>19.8 million international visitors in 2025</strong>, making
          it one of Africa s leading tourist destinations. Tourism contributes
          significantly to the national economy, generating billions of Moroccan
          dirhams each year while supporting millions of jobs across
          hospitality, transportation, handicrafts, gastronomy and local
          services.
        </p>

        <p className="mt-6 text-lg leading-8 text-text-secondary">
          Visitors are drawn by Morocco s unique combination of imperial cities,
          desert adventures, mountain landscapes, Atlantic beaches and authentic
          cultural experiences. Destinations such as Marrakech, Fes,
          Chefchaouen, Casablanca, Essaouira, Agadir and Merzouga have become
          internationally recognized for their history, hospitality and
          unforgettable scenery.
        </p>

        <h3 className="mt-12 text-2xl font-bold text-heading">
          Football and the 2030 FIFA World Cup
        </h3>

        <p className="mt-6 text-lg leading-8 text-text-secondary">
          Football occupies a special place in Moroccan culture. The national
          team, known as the <strong>Atlas Lions</strong>, made history during
          the
          <strong> FIFA World Cup Qatar 2022</strong> by becoming the first
          African and Arab nation to reach the tournament s semi-finals. This
          historic achievement inspired millions of football fans around the
          world and further strengthened Morocco s international reputation.
        </p>

        <p className="mt-6 text-lg leading-8 text-text-secondary">
          Looking ahead, Morocco will co-host the
          <strong> FIFA World Cup 2030</strong> alongside Spain and Portugal.
          The tournament is accelerating investments in transportation, modern
          stadiums, airports, high-speed rail, hotels and tourism
          infrastructure. These developments are expected to improve
          accessibility throughout the country while creating new opportunities
          for international visitors long after the competition concludes.
        </p>

        <h3 className="mt-12 text-2xl font-bold text-heading">
          Why Travelers Fall in Love with Morocco
        </h3>

        <p className="mt-6 text-lg leading-8 text-text-secondary">
          Whether exploring the colorful streets of Marrakech, wandering through
          the ancient medina of Fes, hiking in the Atlas Mountains, relaxing on
          the Atlantic coast or spending a magical night beneath the stars in
          the Sahara Desert, every journey through Morocco offers unforgettable
          memories. Combined with world-renowned hospitality, flavorful cuisine,
          vibrant traditions and breathtaking landscapes, Morocco continues to
          rank among the world's most captivating travel destinations and
          remains an exceptional choice for cultural tours, luxury holidays,
          family vacations and adventure travel.
        </p>

        <h3 className="mt-12 text-2xl font-bold text-heading">
          {" "}
          Discover Marrakech Marrakech, the Vibrant Heart of Moroccan
          Tourism{" "}
        </h3>

        <div className="mt-6 space-y-5 text-base leading-8 text-text-secondary sm:text-lg">
          <p>
            Marrakech is one of Morocco&apos;s most iconic travel destinations,
            known for its historic medina, ochre-colored walls and lively
            atmosphere. Founded nearly a thousand years ago, the city combines
            imperial history, traditional Moroccan culture and modern tourism,
            making it an essential stop for travelers exploring Morocco.
          </p>

          <p>
            At the heart of the city, Jemaa el-Fna square comes alive with local
            food stalls, musicians, storytellers and traditional performers.
            Nearby, the narrow streets of the Marrakech souks are filled with
            spices, handmade carpets, leather goods, lanterns, ceramics and
            other examples of Moroccan craftsmanship.
          </p>

          <p>
            Marrakech also preserves an exceptional architectural heritage.
            Visitors can explore the Koutoubia Mosque, Bahia Palace, the Saadian
            Tombs and Ben Youssef Madrasa, as well as peaceful gardens and
            traditional riads decorated with carved wood, zellige tiles and
            elegant courtyards.
          </p>

          <p>
            Beyond the medina, Marrakech is a convenient starting point for
            discovering the Atlas Mountains, Ourika Valley, Agafay Desert,
            Ouzoud Waterfalls and Essaouira. This central location makes the
            city ideal for private Morocco tours, cultural visits and day trips
            into some of the country&apos;s most beautiful landscapes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-12 mt-12">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={drapeaux}
              alt="Moroccan flags representing Morocco culture and national identity"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 50vw"
              className="rounded-lg object-contain"
            />
          </div>

          <div className="relative w-full aspect-[4/3]">
            <Image
              src={carte}
              alt="Map of Morocco showing major tourist regions and destinations"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      </section>

      <section className="px-6 pb-10  text-center">
        <h2 className="text-3xl font-bold text-heading sm:text-4xl">
          Ready to Explore Morocco?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-text-secondary">
          Join Trips to Marrakech for private tours, desert adventures and
          authentic Moroccan experiences designed around your journey.
        </p>

        <Link
          href="/tours"
          className="mt-8 inline-flex rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground transition hover:bg-primary-hover"
        >
          Explore Our Tours
        </Link>
      </section>

      <InstagramSection />
      <FAQTourist />
    </section>
  );
}

export default AboutMoroccoTouristPage;
