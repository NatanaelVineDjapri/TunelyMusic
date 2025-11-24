import React from "react";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage, totalPages }) => {
  return (
    <div className="d-flex justify-content-center mt-3 flex-wrap gap-2 bg-white p-3 rounded-4">
      <button
        className="btn btn-outline-success"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => {
        const pageNum = i + 1;
        if (
          pageNum <= 3 ||
          (pageNum >= page - 2 && pageNum <= page + 2) ||
          pageNum > totalPages - 3
        ) {
          return (
            <button
              key={i}
              className={`btn ${pageNum === page ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </button>
          );
        }
        if (i === 3 || i === totalPages - 4) return <span key={i}>...</span>;
        return null;
      })}

      <button
        className="btn btn-outline-success"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
