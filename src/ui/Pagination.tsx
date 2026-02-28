export interface PaginationProps {
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
  className = ""
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const visiblePages = () => {
    if (totalPages <= 7) return pages;
    if (currentPage <= 4) return pages.slice(0, 5);
    if (currentPage >= totalPages - 3) return pages.slice(-5);
    return pages.slice(currentPage - 3, currentPage + 2);
  };

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <div className={`join ${className}`}>
      {showFirstLast && currentPage > 1 && (
        <button type="button" className="btn btn-sm join-item" onClick={() => goTo(1)}>
          First
        </button>
      )}
      <button
        type="button"
        className="btn btn-sm join-item"
        disabled={currentPage === 1}
        onClick={() => goTo(currentPage - 1)}
      >
        «
      </button>
      {visiblePages().map(page => (
        <button
          key={page}
          type="button"
          className={`btn btn-sm join-item ${page === currentPage ? "btn-active" : ""}`}
          onClick={() => goTo(page)}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="btn btn-sm join-item"
        disabled={currentPage === totalPages}
        onClick={() => goTo(currentPage + 1)}
      >
        »
      </button>
      {showFirstLast && currentPage < totalPages && (
        <button type="button" className="btn btn-sm join-item" onClick={() => goTo(totalPages)}>
          Last
        </button>
      )}
    </div>
  );
};

export default Pagination;
