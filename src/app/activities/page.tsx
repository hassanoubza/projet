import type { Metadata } from "next";
import ActivityFeatureCard from "@/components/section/activities/components/ActivityFeatureCard";
import {
  marrakechActivities,
} from "@/components/section/activities/activity.data";
import InstagramSection from "@/components/ui/Instgramme";
import ContactAdventure from "@/components/ui/ContactAdventure";



export const metadata: Metadata = {
  title: "Marrakech Activities and Local Experiences",
  description:
    "Choose from an Agafay sunset dinner, hot air balloon flight, private Marrakech Medina tour and traditional Moroccan cooking class.",
  alternates: {
    canonical: "/marrakech-activities",
  },
  openGraph: {
    title: "Marrakech Activities and Local Experiences",
    description:
      "Meaningful ways to spend your time in Marrakech, from desert evenings and balloon flights to guided walks and Moroccan cooking.",
    images: [
      {
        url: "/images/activities/agafay-desert-sunset.jpg",
        alt: "Sunset dinner in the Agafay Desert near Marrakech",
      },
    ],
  },
};

export default function MarrakechActivitiesPage(): React.JSX.Element {


  return (
    <section className="bg-background text-foreground">
      <section className="px-4 pb-14 pt-16 sm:px-6 sm:pb-16 sm:pt-20 lg:px-8 lg:pt-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Marrakech activities
            </p>

            <h1 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.08] text-heading sm:text-5xl lg:text-6xl">
              Make room for something memorable in Marrakech.
            </h1>
          </div>

          <p className="max-w-xl text-sm leading-7 text-text-secondary sm:text-base lg:pb-2">
            Step beyond the usual sightseeing route with a desert evening, a
            sunrise flight, a guided walk through the medina or a hands-on
            Moroccan cooking session.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          {marrakechActivities.map((activity, index) => (
            <ActivityFeatureCard
              key={activity.id}
              activity={activity}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </section>
      <ContactAdventure />
      <InstagramSection />
    </section>
  );
}
