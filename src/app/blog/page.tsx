import type { Metadata } from "next";
import BlogArchive from "@/components/section/blog/BlogArchive";

export const metadata: Metadata = {
  title: "Morocco Travel Blog",
  description:
    "Explore Morocco travel guides, Marrakech tips, destination stories and practical advice for planning an unforgettable journey.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Morocco Travel Blog | Trips To Marrakech",
    description:
      "Explore Marrakech travel guides, Morocco travel tips and practical advice for planning your journey.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage(): React.JSX.Element {
  return <BlogArchive currentPage={1} />;
}
