"use client";
import FaqItem from '@/components/ui/FaqItem';
import { useState } from 'react';



const FAQS = [
  {
    question: "What is the best time to visit Marrakech and Morocco?",
    answer:
      "The best time to visit Marrakech and Morocco is during spring (March to May) and autumn (September to November) when temperatures are pleasant for exploring cities, deserts and mountains. Summer is ideal for coastal destinations, while winter offers a perfect opportunity to discover the Sahara Desert and enjoy mild weather in Marrakech.",
  },
  {
    question: "Is Marrakech safe for tourists?",
    answer:
      "Yes, Marrakech is considered one of the safest tourist destinations in Morocco. Millions of visitors travel every year to explore its medina, markets, historical monuments and cultural attractions. Like any major city, travelers should simply follow common precautions and respect local customs.",
  },
  {
    question: "How many days do you need in Marrakech?",
    answer:
      "Most travelers spend between 3 and 5 days in Marrakech to experience its main attractions, including Jemaa el-Fna square, the souks, Bahia Palace, Majorelle Garden and traditional riads. Marrakech is also the perfect starting point for day trips to the Atlas Mountains, Agafay Desert and Essaouira.",
  },
  {
    question: "What are the best things to do in Marrakech?",
    answer:
      "The best things to do in Marrakech include exploring the historic medina, visiting traditional souks, discovering Moroccan architecture, enjoying local cuisine, experiencing a desert adventure, visiting the Atlas Mountains and discovering authentic cultural experiences with local guides.",
  },
  {
    question: "How far is the Sahara Desert from Marrakech?",
    answer:
      "The Sahara Desert is approximately 560 kilometers from Marrakech. Most travelers visit the famous Merzouga dunes through a 3-day or 4-day Morocco desert tour, crossing the Atlas Mountains, visiting ancient kasbahs and experiencing camel trekking and overnight desert camps.",
  },
  {
    question: "What are the must-see places in Morocco?",
    answer:
      "Morocco offers a wide variety of destinations including Marrakech, Fes, Chefchaouen, Casablanca, Essaouira, the Atlas Mountains and the Sahara Desert. Each region offers unique experiences, from historic medinas and cultural heritage to breathtaking landscapes and traditional Moroccan hospitality.",
  },
  {
    question: "Do I need a private tour guide in Morocco?",
    answer:
      "A private tour guide can greatly improve your Morocco experience by helping you discover hidden places, understand local history and culture, avoid tourist traps and enjoy a personalized itinerary based on your interests, travel style and schedule.",
  },
  {
    question: "Why choose Marrakech for a Morocco vacation?",
    answer:
      "Marrakech is one of Morocco's most popular destinations because it combines history, culture, adventure and hospitality. Its location makes it an ideal base for exploring the Atlas Mountains, desert landscapes, traditional villages and many unforgettable Moroccan experiences.",
  },
];



function FAQTourist() {
    const [openId, setOpenId] = useState<number | null>(-1);
    
  return (
    <div className="bg-background px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-2">
        {FAQS.map((faq, index) => (
          <div key={faq.question} className="h-fit">
            <FaqItem
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === index}
              onClick={() => setOpenId(openId === index ? null : index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQTourist