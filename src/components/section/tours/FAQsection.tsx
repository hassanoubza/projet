import { htmlToText } from "@/lib/wordpress";
import type { TourFaqItem } from "./types";



export function parseTourFaq(faqHtml: string | null | undefined,): TourFaqItem[] {

  if (!faqHtml) {
    return [];
  }

  const faqItems: TourFaqItem[] = [];

  const faqPattern = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3\b|$)/gi;

  for (const match of faqHtml.matchAll(faqPattern)) {
    const question = htmlToText(match[1]);
    const answer = htmlToText(match[2]);

    if (question && answer) {
      faqItems.push({
        question,
        answer,
      });
    }
  }

  return faqItems;
}



type FAQSectionProps = {
  faq: TourFaqItem[];
};



export default function FAQSection({ faq,label,}: FAQSectionProps & { label: string }) {


  if (faq.length === 0) return null;

  return (
    <section
      aria-labelledby="faq-heading"className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-4 lg:px-8 lg:py-6">
        <div className="max-w-2xl">
          <h2
            id="faq-heading"
            className="mt-3 text-3xl font-extrabold leading-tight text-primary sm:text-4xl"
          >
            {label}
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 lg:grid-cols-2">
          {faq.map((item, index) => (
            <article
              key={`${item.question}-${index}`}
              className="group rounded-xl border border-border px-3 py-3 transition duration-500 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-sm sm:px-6 sm:py-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/25 text-sm font-extrabold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-6 text-heading transition group-hover:text-primary sm:text-xl">
                    {item.question}
                  </h3>

                  <p className="mt-3 text-lg leading-7 text-text-secondary sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
