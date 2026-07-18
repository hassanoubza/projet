"use client";

import React, { useState } from "react";
import FaqItem from "@/components/ui/FaqItem";



const FAQ_IDS = [
  {
    q: "What is the best time to visit Morocco?",
    a: "The best time to visit Morocco is during spring (March to May) and autumn (September to November) when the weather is pleasant for exploring cities, deserts, and mountains.",
  },

  {
    q: "Is Morocco safe for tourists?",
    a: "Yes, Morocco is considered a safe destination for travelers. Our local guides provide support throughout the journey and ensure a comfortable and secure experience.",
  },

  {
    q: "Do I need a visa to travel to Morocco?",
    a: "Many travelers can visit Morocco without a visa for stays up to 90 days. Visa requirements depend on your nationality, so we recommend checking before your trip.",
  },

  {
    q: "Can I customize my Morocco tour itinerary?",
    a: "Yes, we specialize in private and tailor-made Morocco tours. You can customize destinations, activities, accommodation, and travel duration according to your preferences.",
  },

  {
    q: "How do I travel between Moroccan cities during the tour?",
    a: "Our tours include comfortable private transportation with experienced local drivers. We organize transfers between Marrakech, Fes, the Sahara Desert, Chefchaouen, and other destinations.",
  },

  {
    q: "How can I book a Morocco tour and make payment?",
    a: "You can contact us directly to choose your preferred tour. After confirming availability, we will guide you through the booking process and secure payment options.",
  },
];



function FAQ(): React.JSX.Element {
    
  const [openId, setOpenId] = useState<string | null>("");

  return (
    <section
      className="bg-background px-4 py-4 text-foreground sm:px-6 lg:px-8 lg:py-12"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-6xl">
       

        <div className="text-center">
          <h2
            id="faq-title"
            className="mt-3 text-2xl font-extrabold leading-[1.15] tracking-tight text-heading sm:text-3xl lg:text-4xl"
          >
            Frequently Asked Questions
            <span className="text-gold-soft">  About Morocco</span>
          </h2>
        </div>

    
    
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {FAQ_IDS.map((faqId) => (
            <div key={faqId.a} className="h-fit">
              <FaqItem
                question={faqId.q}
                answer={faqId.a}
                isOpen={openId === faqId.a}
                onClick={() => setOpenId(openId === faqId.a ? null : faqId.a)}
              />
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}

export default FAQ;
