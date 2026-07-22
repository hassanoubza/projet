export type TourFaqItem = {
  question: string;
  answer: string;
};

export type TourItineraryItem = {
  day: string;
  title: string;
  description: string;
  distance?: string;
  time_on_road?: string;
};

export interface TourDetailImage {
  id: number;
  image_url: string;
  alt: string;
}