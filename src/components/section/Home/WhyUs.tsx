import React from "react";
import Image from "next/image";

function WhyUs(): React.JSX.Element {
  return (
    <section
      className="relative overflow-hidden bg-background px-4 py-4 text-foreground sm:px-6 lg:px-8"
      aria-labelledby="why-us-title"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em]  text-primary">
            Your Local Morocco Expert
          </p>

          <h2
            id="why-us-title"
            className="mt-4 text-3xl font-bold leading-tight text-heading sm:text-4xl lg:text-5xl"
          >
            Experience Authentic Morocco With{" "}
            <span className="text-primary">Hassan</span>
          </h2>
        </div>

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
              Meet Hassan, a passionate local guide and professional driver with
              years of experience exploring Morocco. Based between Marrakech and
              the desert regions, he knows the country s hidden landscapes,
              traditional villages and authentic cultural experiences.
              <br />
              <br />
              From the colorful streets of Marrakech to the breathtaking Atlas
              Mountains and the golden dunes of the Sahara Desert, Hassan
              creates private journeys designed around comfort, safety and
              discovery.
              <br />
              <br />
              His local knowledge, friendly personality and attention to every
              detail allow travelers to experience Morocco beyond the usual
              tourist routes and create memories that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyUs;
