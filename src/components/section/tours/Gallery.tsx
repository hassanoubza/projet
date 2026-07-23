import Image from "next/image";
import type { TourDetailImage } from "./types";

interface PhotoMosaicProps {
  images: TourDetailImage[];
  tourTitle: string;
  label?: string;
}

export default function PhotoMosaic({images,tourTitle,label = "Tour Gallery",}: PhotoMosaicProps): React.JSX.Element | null {


  if (images.length === 0) {
    return null;
  }


  const galleryImages = images.slice(0, 4);


  return (
    <section aria-labelledby="mosaic-heading" className="bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 sm:py-8 lg:px-8">


        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="mosaic-heading"
              className="text-3xl font-extrabold leading-tight text-primary sm:text-4xl"
            >
              {label}
            </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:h-[620px] lg:grid-cols-3 lg:grid-rows-3">
          {galleryImages.map((image, index) => {
            const isMainImage = index === 0;

            return (
              <figure
                key={`${image.id}-${image.image_url}`}
                className={`group relative overflow-hidden rounded-2xl ${isMainImage ? "h-80 sm:col-span-2 sm:h-[460px] lg:col-span-2 lg:row-span-3 lg:h-full" : "h-64 sm:h-72 lg:col-span-1 lg:row-span-1 lg:h-full"}`}
              >
                <Image
                  src={image.image_url}
                  alt={image.alt || tourTitle}
                  fill
                  preload={isMainImage}
                  quality={70}
                  sizes={
                    isMainImage
                      ? "(max-width: 639px) 100vw, (max-width: 1023px) 100vw, 66vw"
                      : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {isMainImage ? (
                  <figcaption className="absolute bottom-5 left-5 right-5 text-sm font-semibold text-white drop-shadow-sm">
                    {image.alt || tourTitle}
                  </figcaption>
                ) : null}
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
