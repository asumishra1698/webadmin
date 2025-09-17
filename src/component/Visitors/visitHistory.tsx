import React from "react";
import { QrCode } from "lucide-react";
import { formatDate } from "../../reuseable/formatDate";
import Pagination from "../../reuseable/Pagination";
import { Eye } from "lucide-react";
import { fetchVisitHistoryRequest } from "../../redux/actions/visitsActions";
import { useDispatch } from "react-redux";

interface VisitHistoryTableProps {
    filteredHistory: any[];
    openModal: (src: string, alt?: string) => void;
    setSelectedVisit: (visit: any) => void;
    setModalOpen: (open: boolean) => void;
    page: number;
    setPage: (page: number) => void;
    rowsPerPage: number;
    setRowsPerPage: (rows: number) => void;
    totalPages: number;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    setSelectedVisitHistory: (history: any[]) => void;
    setVisitHistoryModalOpen: (open: boolean) => void;
    visitHistory: any[];
}

const VisitHistoryTable: React.FC<VisitHistoryTableProps> = ({
    filteredHistory,
    openModal,
    setSelectedVisit,
    setModalOpen,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalPages,
    setSelectedVisitHistory,
    setVisitHistoryModalOpen,
    visitHistory,
}) => {
    const dispatch = useDispatch();
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                        <tr>
                            <th className="px-6 py-3 whitespace-nowrap">Visitor Pic</th>
                            <th className="px-6 py-3 whitespace-nowrap">Visit Date & Time</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Project</th>
                            <th className="px-6 py-3">Broker/Direct</th>
                            <th className="px-6 py-3">Sales RM</th>
                            <th className="px-6 py-3 whitespace-nowrap">Remarks</th>
                            <th className="px-6 py-3 whitespace-nowrap">Tag Staus</th>
                            <th className="px-6 py-3 whitespace-nowrap">QR Code</th>
                            <th className="px-6 py-3 whitespace-nowrap">
                                Activity
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredHistory.map((visit: any) => (
                            <tr
                                key={visit._id}
                                className="bg-white border-b hover:bg-gray-50"
                            >
                                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                    {visit.visitor_id?.visitor_photo_url ? (
                                        <img
                                            src={visit.visitor_id.visitor_photo_url}
                                            alt={visit.visitor_id?.name || "Capture"}
                                            className="w-12 h-12 rounded-full object-cover"
                                            onClick={() =>
                                                openModal(
                                                    visit.visitor_id?.visitor_photo_url,
                                                    visit.visitor_id?.name
                                                )
                                            }
                                        />
                                    ) : (
                                        "-"
                                    )}
                                </td>
                                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                    {visit.visit_datetime
                                        ? formatDate(visit.visit_datetime)
                                        : "-"}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {visit.project?.address || visit.project_id?.address || "-"}
                                </td>
                                <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {/* Project Image */}
                                        {visit.project_id?.media &&
                                            Array.isArray(visit.project_id.media) &&
                                            visit.project_id.media.find(
                                                (m: any) => m.doc_type === "image"
                                            ) ? (
                                            <img
                                                src={
                                                    visit.project_id.media.find(
                                                        (m: any) => m.doc_type === "image"
                                                    ).img_url
                                                }
                                                alt={visit.project_id?.project_name}
                                                className="w-10 h-10 object-cover rounded-full"
                                                onClick={() =>
                                                    openModal(
                                                        visit.project_id.media.find(
                                                            (m: any) => m.doc_type === "image"
                                                        ).img_url,
                                                        visit.project_id?.project_name
                                                    )
                                                }
                                            />
                                        ) : (
                                            <span className="text-gray-400">No Image</span>
                                        )}
                                        {/* Project Name & City */}
                                        <div>
                                            <div>
                                                {visit.project?.project_name ||
                                                    visit.project_id?.project_name ||
                                                    "-"}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {visit.project?.city || visit.project_id?.city || "-"}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <span className="font-semibold text-gray-900">
                                            {visit.tag_with_broker?.broker_id?.broker_name ||
                                                "Direct"}
                                        </span>
                                        <div className="mt-1 text-xs text-gray-500">
                                            {visit.tag_with_broker?.broker_id?.broker_code}
                                        </div>
                                    </div>
                                    <div className="mt-1 text-xs text-gray-500">
                                        {visit.tag_with_broker?.broker_id?.mobile_number}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {visit.tag_with_broker?.broker_id?.email_address}
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <span
                                        className={`inline-block w-3 h-3 rounded-full ${visit.sales_rm_id?.is_active === true
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                            }`}
                                        title={
                                            visit.sales_rm_id?.is_active === true ? "true" : "false"
                                        }
                                    ></span>
                                    &nbsp;
                                    {visit.full_name || visit.sales_rm_id?.full_name || "-"}
                                    <div className="mt-1">
                                        <div className="text-xs text-gray-500">
                                            {visit.sales_rm_id?.mobile_number || "-"}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {visit.sales_rm_id?.email_address || "-"}
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="text-gray-600">
                                        {visit.remarks || "N/A"}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {visit.status === "scheduled" && (
                                        <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-xs">
                                            Scheduled
                                        </span>
                                    )}
                                    {visit.status === "completed" && (
                                        <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold text-xs">
                                            Completed
                                        </span>
                                    )}
                                    {visit.status === "cancelled" && (
                                        <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold text-xs">
                                            Canceled
                                        </span>
                                    )}
                                    {!["scheduled", "completed", "cancelled"].includes(
                                        visit.status
                                    ) && (
                                            <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-semibold text-xs">
                                                N/A
                                            </span>
                                        )}
                                </td>
                                <td className="px-6 py-4">
                                    {visit.status === "scheduled" && (
                                        <button
                                            className="bg-gray-800 text-white font-semibold px-3 py-1 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition-colors"
                                            onClick={() => {
                                                setSelectedVisit(visit);
                                                setModalOpen(true);
                                            }}
                                        >
                                            <QrCode className="w-5 h-5" />
                                            <span className="text-xs">QR</span>
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    <div className="mt-1">
                                        <button
                                            type="button"
                                            className="mt-2 text-gray-500 hover:text-gray-700"
                                            onClick={() => {
                                                dispatch(fetchVisitHistoryRequest(visit._id));
                                                setSelectedVisit(visit);
                                                setVisitHistoryModalOpen(true);
                                                setSelectedVisitHistory(visitHistory);
                                            }}
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredHistory.length === 0 && (
                <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">No visits found</div>
                    <div className="text-sm text-gray-500">
                        Try adjusting your search criteria
                    </div>
                </div>
            )}

            <Pagination
                page={page}
                totalPages={totalPages}
                limit={rowsPerPage}
                setPage={setPage}
                setLimit={setRowsPerPage}
            />
        </div>
    );
};

export default VisitHistoryTable;