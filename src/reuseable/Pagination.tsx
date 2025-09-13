import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  limits?: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  limit,
  setPage,
  setLimit,
  limits = [10, 25, 50, 100],
}) => (
  <div className="fixed bottom-0 right-0 w-full bg-white border-t border-gray-200 flex justify-end items-center px-6 py-3 gap-4 z-30">
    <div className="flex items-center">
      <label className="mr-2 text-sm font-medium text-gray-700">
        Rows per page:
      </label>
      <select
        value={limit}
        onChange={(e) => {
          setPage(1);
          setLimit(Number(e.target.value));
        }}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      >
        {limits.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </div>
    {totalPages > 1 && (
      <div className="flex items-center">
        <button
          className="px-3 py-1 rounded border mr-2 disabled:opacity-50 bg-[#DA0808] text-white hover:bg-red-700"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span className="mx-2 text-sm font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded border ml-2 disabled:opacity-50 bg-[#DA0808] text-white hover:bg-red-700"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    )}
  </div>
);

export default Pagination;