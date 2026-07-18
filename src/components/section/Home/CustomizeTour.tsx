"use client";

import { useState } from "react";
import { MapPin, Users, Clock, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CustomizeTour() {
  const [city, setCity] = useState("Marrakech");
  const [travelers, setTravelers] = useState(2);
  const [duration, setDuration] = useState("Any duration");


  const whatsappNumber = "212600000000";

  const whatsappMessage = `Hello Trips to Marrakech,

    I would like to customize a private Morocco tour.

    Departure city: ${city}
    Number of travelers: ${travelers}
    Duration: ${duration}

    Could you please send me more information and help me plan my trip?

    Thank you.`;

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className=" mx-auto max-w-7xl">
        <div className="mx-auto grid w-full max-w-6xl gap-4 lg:grid-cols-2 lg:items-center">
          {/* LEFT CONTENT */}
        
          <div>
            <p className="text-center sm:text-start text-sm sm:text-lg font-bold uppercase tracking-[0.25em] text-heading-soft  ">
              Customize Your Private Tour
            </p>

            <h2 className=" mt-4 max-w-xl text-3xl font-bold text-center sm:text-start  leading-tight  text-heading  sm:text-4xl  ">
              Create your perfect
              <span className="block text-primary">
                Morocco travel experience
              </span>
            </h2>

            <p className="mt-5 max-w-xl  text-base text-center sm:text-start  leading-8 text-text-secondary">
              Tell us where you want to go, how long you want to travel and how
              many people are joining. Our local experts will design a private
              itinerary around your expectations.
            </p>

            <div className="mt-4  sm:mt-8  flex gap-1 sm:gap-3">
              <div className=" rounded-full border border-border px-2 sm:px-4 py-2 text-sm text-text-secondary ">
                Private Tours
              </div>

              <div className="  rounded-full  border border-border px-2 sm:px-4  py-2  text-sm  text-text-secondary ">
                Local Guides
              </div>

              <div className="  rounded-full  border border-border px-2  sm:px-4  py-2  text-sm  text-text-secondary">
                Flexible Plans
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="p-2 sm:p-5 ">
            <div className=" grid gap-4">
              <div className=" rounded-xl border border-border px-4 py-3 transition focus-within:border-primary ">
                <label className="  text-xs  text-text-muted ">
                  Departure City
                </label>

                <div className=" mt-2 flex items-center gap-3  ">
                  <MapPin className="h-5 w-5 text-gold" />

                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-transparent text-sm
                    font-semibold
                    text-heading
                    outline-none
                    "
                  >
                    <option>Marrakech</option>
                    <option>Agadir</option>
                    <option>Fes</option>
                    <option>Casablanca</option>
                    <option>Tangier</option>
                  </select>
                </div>
              </div>

              {/* TRAVELERS */}
              <div className=" rounded-xl border border-border px-4 py-3 transition focus-within:border-primary ">
                <label className="  text-xs  text-text-muted">Travelers</label>

                <div className=" mt-2 flex items-center gap-3 ">
                  <Users className="h-5 w-5 text-gold" />

                  <input
                    type="number"
                    min={1}
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    className=" w-full bg-transparent text-sm
                    font-semibold text-heading outline-none "
                  />
                </div>
              </div>

              {/* DURATION */}
              <div
                className="
                rounded-xl
                border border-border
                px-4
                py-3
                transition
                focus-within:border-primary
                "
              >
                <label
                  className="
                  text-xs
                  text-text-muted
                "
                >
                  Duration
                </label>

                <div
                  className="
                  mt-2
                  flex
                  items-center
                  gap-3
                "
                >
                  <Clock className="h-5 w-5 text-gold" />

                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="
                    w-full
                    bg-transparent
                    text-sm
                    font-semibold
                    text-heading
                    outline-none
                    "
                  >
                    <option>Any duration</option>

                    <option>3 Days</option>
                    <option>4 Days</option>
                    <option>5 Days</option>
                    <option>6 Days</option>
                    <option>7+ Days</option>
                  </select>
                </div>
              </div>

              {/* BUTTONS */}
              <div
                className="mt-3 flex flex-col gap-3 sm:flex-row "  >
                <Link
                  href="/contact"
                  className="
                  inline-flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-primary
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-primary-foreground
                  transition
                  hover:bg-primary-hover
                  "
                >
                  Customize Tour
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={whatsappUrl}
                  className="
                  inline-flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  border border-border
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-heading
                  transition
                  hover:border-gold
                  "
                >
                  <MessageCircle className="h-4 w-4 text-gold" />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
