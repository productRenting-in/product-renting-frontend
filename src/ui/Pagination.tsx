import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  className = "",
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;
    if (currentPage <= 3) return pages.slice(0, 5);
    if (currentPage >= totalPages - 2)
      return pages.slice(totalPages - 5);
    return pages.slice(currentPage - 3, currentPage + 2);
  };

  return (
    <div className={`join ${className}`}>
      {showFirstLast && currentPage > 1 && (
        <button
          className="join-item btn btn-sm"
          onClick={() => onPageChange(1)}
        >
          First
        </button>
      )}
      <button
        className="join-item btn btn-sm"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {getVisiblePages().map((page) => (
        <button
          key={page}
          className={`join-item btn btn-sm ${
            page === currentPage ? "btn-active" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="join-item btn btn-sm"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      {showFirstLast && currentPage < totalPages && (
        <button
          className="join-item btn btn-sm"
          onClick={() => onPageChange(totalPages)}
        >
          Last
        </button>
      )}
    </div>
  );
};

export default Pagination;

