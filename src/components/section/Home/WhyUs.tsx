import React from "react";
import Image from "next/image";

function WhyUs(): React.JSX.Element {
  return (
    <section
      className="relative overflow-hidden bg-background px-4 py-4 text-foreground sm:px-6 lg:px-8"
      aria-labelledby="why-us-title"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-bold text-center uppercase tracking-[0.25em] text-primary">
          Private Tours, Day Trips & Desert Experiences
        </p>

        <h2
          id="why-us-title"
          className="mt-4 text-3xl text-center font-bold leading-tight text-heading sm:text-4xl lg:text-5xl"
        >
          The Finest Way To Discover
          <span className="text-primary"> Morocco</span>
        </h2>

        {/* CONTENT */}
        <div className="mt-14 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          {/* IMAGE */}
          <div className="relative min-h-105 overflow-hidden border border-border bg-card">
            <Image
              src="/personel/hassan.jpeg"
              alt="Hassan, local Morocco tour guide with travelers"
              fill
              quality={80}
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* TEXT */}
          <div className="flex flex-col justify-center">
            <p className="text-base leading-8 text-text-secondary sm:text-lg">
              At Trips to Marrakech, we curate exceptional private journeys for
              travelers seeking comfort, authenticity, and unforgettable
              moments. From the vibrant energy of Marrakech to the majestic
              Atlas Mountains, the Atlantic coastline, and the golden dunes of
              the Sahara Desert, every experience is designed with elegance,
              exclusivity, and attention to detail.
              <br />
              <br />
              Our collection of private tours, luxury day trips, and handpicked
              activities allows you to explore Morocco at your own pace. Enjoy
              personalized itineraries, premium transportation, knowledgeable
              local guides, and unique experiences that reveal the country s
              rich culture, breathtaking landscapes, and hidden treasures.
              <br />
              <br />
              Beyond our curated experiences, our travel blog offers expert
              insights, destination guides, and insider recommendations to
              inspire your next Moroccan adventure. With local expertise and a
              commitment to excellence, Trips to Marrakech transforms every
              journey into a refined and memorable experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
