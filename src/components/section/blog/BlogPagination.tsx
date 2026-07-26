import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
}

function getPageUrl(page: number): string {
  return page === 1 ? "/blog" : `/blog/page/${page}`;
}

export default function BlogPagination({ currentPage,totalPages,}: BlogPaginationProps): React.JSX.Element | null {

  if (totalPages <= 1) {
    return null;
  }

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const baseButtonClasses ="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold text-heading transition hover:border-primary hover:text-primary";

  const disabledButtonClasses ="inline-flex min-h-11 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-border bg-surface-soft px-5 text-sm font-semibold text-text-muted opacity-60";

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-8"
    >
      {hasPreviousPage ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          rel="prev"
          className={baseButtonClasses}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledButtonClasses}>
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Previous
        </span>
      )}

      <p className="text-center text-sm font-medium text-text-secondary">
        Page <span className="font-bold text-heading">{currentPage}</span> of{" "}
        <span className="font-bold text-heading">{totalPages}</span>
      </p>

      {hasNextPage ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          rel="next"
          className={baseButtonClasses}
        >
          Next
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledButtonClasses}>
          Next
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
