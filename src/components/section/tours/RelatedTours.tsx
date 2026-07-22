import TourCard from "@/components/section/tours/TourCard";
import type { WordPressTourCard } from "@/lib/tours";

interface RelatedToursProps {
  tours: WordPressTourCard[];
  label?: string;
}

export default function RelatedTours({ tours,label = "Related Desert Tours",}: RelatedToursProps): React.JSX.Element | null {


  if (tours.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="related-tours-heading"
      className="w-full bg-background"
    >
      <div className="max-w-3xl">
        <h2
          id="related-tours-heading"
          className="mt-3 text-3xl font-extrabold leading-tight text-heading sm:text-4xl"
        >
          {label}
        </h2>

        <p className="mt-4 text-base leading-7 text-text-secondary">
          Explore other private Morocco journeys with similar desert landscapes,
          routes and experiences.
        </p>
      </div>

      <div className="mt-10 grid auto-rows-fr grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {tours.map((tour, index) => (
          <TourCard key={tour.id} tour={tour} preloadImage={index === 0} />
        ))}
      </div>
    </section>
  );
}
