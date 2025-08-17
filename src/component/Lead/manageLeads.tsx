import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../reuseable/Layout";
import { Download, Eye, Trash2, User } from "lucide-react";
import { getLeadRequest } from "../../redux/actions/leadsAction";
import type { RootState } from "../../redux/reducers/rootReducers";

const ManageLeads: React.FC = () => {
  const dispatch = useDispatch();
  const leads = useSelector((state: RootState) => state.leads.leads);
  const loading = useSelector((state: RootState) => state.leads.loading);
  const pagination = useSelector((state: RootState) => state.leads.pagination);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const limitOptions = [5, 10, 20, 50, 100];

  useEffect(() => {
    dispatch(getLeadRequest({ page, limit, search: searchTerm }));
  }, [dispatch, page, limit, searchTerm]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const actionButtons = useMemo(
    () => (
      <button
        type="button"
        className="flex items-center px-4 py-2.5 bg-[#FFE5E5] text-[#DA0808] rounded-xl hover:bg-red-600 hover:text-white transition-colors font-medium border border-red-500"
        onClick={() => {
          // Export leads as CSV
          if (!leads || leads.length === 0) return;
          const csvRows = [
            ["Name", "Email", "Number", "City", "Message", "Date"],
            ...leads.map((lead: any) => [
              `"${lead.name}"`,
              `"${lead.email}"`,
              `"${lead.number}"`,
              `"${lead.city}"`,
              `"${lead.message}"`,
              `"${new Date(lead.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}"`,
            ]),
          ];
          const csvContent = csvRows.map((row) => row.join(",")).join("\n");
          const blob = new Blob([csvContent], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "leads.csv";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }}
      >
        <Download className="w-4 h-4" />
        Export All Leads
      </button>
    ),
    [leads]
  );

  return (
    <Layout
      title="Manage Leads"
      subtitle="View and manage your leads"
      searchValue={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      searchPlaceholder="Search by Name, Email, City..."
      actionButtons={actionButtons}
      isHeaderFixed={true}
    >
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-20">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA0808]"></div>
              <span className="ml-4 text-gray-600">Loading...</span>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    NAME
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    EMAIL
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    NUMBER
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    CITY
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    MESSAGE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    DATE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads && leads.length > 0 ? (
                  leads.map((lead: any) => (
                    <tr
                      key={lead._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-[#14133B] whitespace-nowrap">
                        {lead.name}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">{lead.email}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{lead.number}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{lead.city}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{lead.message}</td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                            title="Delete"
                            // onClick={() => handleDeleteLead(lead._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>
                      <div className="py-12 text-center">
                        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No leads found
                        </h3>
                        <p className="text-gray-600">
                          Try searching or check back later.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-3 max-w-full mx-auto">
          <span className="text-sm text-gray-700 mb-2 md:mb-0"></span>
          <div className="flex gap-2 items-center">
            <strong className="text-[#DA0808]">
              Page {pagination?.page || page}
            </strong>{" "}
            of <strong>{pagination?.pages || 1}</strong> &nbsp;|&nbsp;
            <span className="text-gray-500">Total Leads:</span>{" "}
            <strong>{pagination?.total || 0}</strong>
            <label
              className="text-sm text-gray-600 mr-2"
              htmlFor="limit-select"
            >
              Rows per page:
            </label>
            <select
              id="limit-select"
              value={limit}
              onChange={(e) => {
                setPage(1);
                setLimit(Number(e.target.value));
              }}
              className="px-2 py-1 rounded border bg-gray-100 text-gray-700"
              style={{ minWidth: 60 }}
            >
              {limitOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button
              className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-red-600 transition disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-red-600 transition disabled:opacity-50"
              disabled={page >= (pagination?.pages || 1)}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageLeads;
