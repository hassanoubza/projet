import { ChevronDown } from "lucide-react";

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
};


export default function FaqItem({
  question,
  answer,
  isOpen,
  onClick,
}: FaqItemProps) {
  return (
    <div className=" overflow-hidden   rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-md">
      <button  type="button"  onClick={onClick}  aria-expanded={isOpen}
        className=" flex w-full items-center justify-between gap-6 px-6 pt-4 text-left transition hover:bg-muted/60 " >
        <span
          className="text-base font-semibold leading-6 text-heading sm:text-lg
      "
        >
          {question}
        </span>

        <span
          className={` flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground  shadow-sm transition-all  duration-300 ${isOpen ? "rotate-180 bg-primary-hover" : "rotate-0"}`}
          aria-hidden="true"
        >
          <ChevronDown
            className=" size-4  transition "
          />
        </span>
      </button>

      {/* ANSWER */}

      <div
        className={` grid  transition-all duration-300 ease-in-out  ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} `}  >
        <div className=" overflow-hidden px-6 pb-6 " >
          <div
            className=" border-t border-border   pt-4 "  >
            <p className="text-sm leading-7 text-text-secondary sm:text-base">
              {answer}
            </p>
          </div>
        </div>
      </div>

      {/* SEO FALLBACK */}

      <noscript>
        <div className="px-6 text-sm text-text-secondary">{answer}</div>
      </noscript>
    </div>
  );
}
