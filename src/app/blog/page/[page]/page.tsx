import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import BlogArchive from "@/components/section/blog/BlogArchive";

export const revalidate = 86400;

interface PaginatedBlogPageProps {
  params: Promise<{
    page: string;
  }>;
}

function parsePage(value: string): number | null {
  if (!/^\d+$/.test(value)) {
    return null;
  }

  const page = Number.parseInt(value, 10);

  return Number.isInteger(page) && page > 0 ? page : null;
}


export async function generateMetadata({params,}: PaginatedBlogPageProps): Promise<Metadata> {
  const { page } = await params;
  const currentPage = parsePage(page);

  if (!currentPage) {
    return {};
  }

  return {
    title: `Morocco Travel Blog – Page ${currentPage}`,
    description: `Browse page ${currentPage} of the Trips To Marrakech blog for Morocco destination guides, travel tips and inspiring stories.`,
    alternates: {
      canonical: `/blog/page/${currentPage}`,
    },
    openGraph: {
      title: `Morocco Travel Blog – Page ${currentPage} | Trips To Marrakech`,
      description:
        "Browse Morocco destination guides, Marrakech travel tips and practical resources.",
      url: `/blog/page/${currentPage}`,
      type: "website",
    },
  };
}



export default async function PaginatedBlogPage({params,}: PaginatedBlogPageProps): Promise<React.JSX.Element> {

  const { page } = await params;
  const currentPage = parsePage(page);

  if (!currentPage) {
    notFound();
  }

  if (currentPage === 1) {
    redirect("/blog");
  }

  return <BlogArchive currentPage={currentPage} />;
}
