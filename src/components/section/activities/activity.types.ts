export interface ActivityTimelineItem {
  step: string;
  title: string;
  description: string;
}

export interface ActivityPracticalItem {
  label: string;
  value: string;
}

export interface ActivityFaqItem {
  question: string;
  answer: string;
}

export interface ActivitySeo {
  title: string;
  description: string;
}

export interface MarrakechActivity {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  eyebrow: string;
  duration: string;
  location: string;
  pickup: string;
  format: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  overview: string[];
  highlights: string[];
  timeline: ActivityTimelineItem[];
  included: string[];
  excluded: string[];
  practicalInformation: ActivityPracticalItem[];
  faq: ActivityFaqItem[];
  seo: ActivitySeo;
  featured: boolean;
}
