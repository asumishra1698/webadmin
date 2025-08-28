import React from "react";

interface Column {
  key: string;
  header: string;
  className?: string;
  render?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  actions?: (row: any) => React.ReactNode;
  rowKey?: string;
  emptyText?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  actions,
  rowKey = "_id",
  emptyText = "No data found",
}) => (
  <table className="w-full">
    <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <tr>
        {columns.map((col) => (
          <th
            key={col.key}
            className={`text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase ${
              col.className || ""
            }`}
          >
            {col.header}
          </th>
        ))}
        {actions && (
          <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
            ACTION
          </th>
        )}
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {data.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length + (actions ? 1 : 0)}
            className="py-12 text-center text-gray-600 dark:text-gray-400"
          >
            {emptyText}
          </td>
        </tr>
      ) : (
        data.map((row) => (
          <tr
            key={row[rowKey]}
            className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className={`py-4 px-6 whitespace-nowrap ${
                  col.className || ""
                } text-gray-900 dark:text-gray-100`}
              >
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
            {actions && <td className="py-4 px-6">{actions(row)}</td>}
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default DataTable;
