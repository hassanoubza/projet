import Image, { type StaticImageData } from "next/image";
import { FaInstagram } from "react-icons/fa";
import React from "react";

import photo1 from "@/../public/personel/hassan.jpeg";
import photo2 from "@/../public/personel/marakech.jpeg";
import photo3 from "@/../public/personel/ourika.jpeg";
import photo4 from "@/../public/personel/desert.jpeg";

type Photo = {
  id: number;
  src: StaticImageData;
  alt: string;
};


const photos: Photo[] = [
  {
    id: 1,
    src: photo1,
    alt: "Hassan, local Marrakech tour guide, with travelers",
  },
  {
    id: 2,
    src: photo2,
    alt: "Private Marrakech city tour experience",
  },
  {
    id: 3,
    src: photo3,
    alt: "Ourika Valley day trip from Marrakech",
  },
  {
    id: 4,
    src: photo4,
    alt: "Sahara Desert landscape near Marrakech",
  },
];

export default async function InstagramSection(): Promise<React.JSX.Element> {

  return (
    <section className="bg-background px-2 py-6 text-center sm:px-4 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-heading sm:text-4xl">
          Follow Our Journey
        </h2>

        <p className="mx-auto mt-4 max-w-6xl text-base leading-7 text-text-secondary sm:text-lg sm:leading-8">
          Discover Marrakech through our lens — from thrilling Sahara Desert
          adventures in Merzouga to the vibrant souks and hidden gems of the Red
          City. As a licensed local tour operator, we craft private, tailor-made
          tours and day trips across Marrakech, Fes, Chefchaouen and the Atlas
          Mountains, blending authentic Moroccan culture with personalized,
          hassle-free travel experiences.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="relative aspect-4/5 overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="lazy"
                quality={60}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-sm font-extrabold text-text-main shadow-sm transition-colors hover:bg-muted hover:text-gold-soft"
        >
          <FaInstagram className="h-5 w-5" />
            Follow us on Instagram
        </a>
      </div>
    </section>
  );
}
