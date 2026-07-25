import { htmlToText } from "@/lib/day-trips";

export interface BeforeYouGoItem {
  title: string;
  description: string;
}

interface InformationBeforeYouGoProps {
  items: BeforeYouGoItem[];
  label?: string;
}

export function parseBeforeYouGo(value: string | null | undefined,): BeforeYouGoItem[] {

  if (!value) {
    return [];
  }

  const sections = value.split(/<h[2-4][^>]*>/i).slice(1);

  return sections
    .map((section) => {
      const parts = section.split(/<\/h[2-4]>/i);

      const title = htmlToText(parts[0] ?? "");
      const description = htmlToText(parts.slice(1).join(" "));

      return {
        title,
        description,
      };
    })
    .filter((item) => item.title && item.description);
}



export default function InformationBeforeYouGo({items,label = "Information Before You Go",}: InformationBeforeYouGoProps): React.JSX.Element | null {


  if (items.length === 0) {
    return null;
  }

  return (
    <section id="before-you-go" className="bg-surface-soft">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Prepare your visit
          </p>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-heading sm:text-4xl">
            {label}
          </h2>

          <p className="mt-4 text-base leading-8 text-text-secondary">
            Practical details to help you prepare comfortably and understand
            what to expect during the excursion.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {items.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="border-l-2 border-primary pl-5"
            >
              <h3 className="text-xl font-bold text-heading">{item.title}</h3>

              <p className="mt-3 text-base leading-8 text-text-secondary">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
