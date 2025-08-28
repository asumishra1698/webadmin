import React from "react";

interface TablePaginationProps {
  page: number;
  pages: number;
  total: number;
  limit: number;
  limitOptions: number[];
  onLimitChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onPageChange: (newPage: number) => void;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  page,
  pages,
  total,
  limit,
  limitOptions,
  onLimitChange,
  onPageChange,
}) => (
  <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
    <div className="flex flex-col md:flex-row justify-between items-center px-6 py-3 max-w-full mx-auto">
      <span className="text-sm text-gray-700 dark:text-gray-300 mb-2 md:mb-0"></span>
      <div className="flex gap-2 items-center">
        <strong className="text-[#000000] dark:text-gray-100">
          Page {page}
        </strong>{" "}
        <span className="dark:text-gray-100">of </span>
        <strong className="dark:text-gray-100">{pages}</strong> &nbsp;{" "}
        <span className="dark:text-gray-100">|&nbsp;</span>
        <span className="text-gray-500 dark:text-gray-400">Total:</span>{" "}
        <strong className="dark:text-gray-100">{total}</strong>
        <label
          className="text-sm text-gray-600 dark:text-gray-300 mr-2"
          htmlFor="limit-select"
        >
          Rows per page:
        </label>
        <select
          id="limit-select"
          value={limit}
          onChange={onLimitChange}
          className="px-2 py-1 rounded border bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-100"
          style={{ minWidth: 60 }}
        >
          {limitOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <button
          className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-gray-600 dark:hover:bg-gray-800 transition disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-gray-600 dark:hover:bg-gray-800 transition disabled:opacity-50"
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  </div>
);

export default TablePagination;
