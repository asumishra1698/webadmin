import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../../reuseable/Layout";
import fillterIcon from "../../assets/icons/fillters.png";
import csvIcon from "../../assets/icons/csv.png";
import { Eye, Edit, User, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import ImageModal, { useImageModal } from "../../reuseable/ImageModal";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";
import {
    fetchVisitorsRequest,
    exportVisitorDataRequest,
} from "../../redux/actions/visitorActions";
import { useDebounce } from "../../reuseable/useDebounce";

const ManageVisitors: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { modal, openModal, closeModal } = useImageModal();
    const { visitors, total = 0 } = useSelector((state: any) => state.visitors);

    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [statusFilter] = useState("all");
    const [brokerName] = useState("");
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        dispatch(
            fetchVisitorsRequest({
                page,
                limit: rowsPerPage,
                broker_name: brokerName,
                search: debouncedSearchTerm,
                status: statusFilter === "all" ? "" : statusFilter,
            })
        );
    }, [
        dispatch,
        brokerName,
        page,
        rowsPerPage,
        debouncedSearchTerm,
        statusFilter,
    ]);

    const totalPages = Math.ceil(total / rowsPerPage);

    const mappedVisitors = useMemo(() => {
        let filtered = visitors || [];
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter((visitor: any) => {
                const name = visitor.visitor?.name || visitor.name || "";
                const email = visitor.visitor?.email || visitor.email || "";
                const mobile = visitor.visitor?.mobile || visitor.mobile || "";
                return (
                    name.toLowerCase().includes(searchLower) ||
                    email.toLowerCase().includes(searchLower) ||
                    mobile.includes(searchTerm)
                );
            });
        }
        if (statusFilter !== "all") {
            filtered = filtered.filter(
                (visitor: any) =>
                    visitor.status === statusFilter ||
                    visitor.visitor?.status === statusFilter
            );
        }
        return filtered.map((visitor: any) => ({
            _id: visitor._id,
            name: visitor.visitor?.name || visitor.name || "N/A",
            email: visitor.visitor?.email || visitor.email || "N/A",
            mobile: visitor.visitor?.mobile || visitor.mobile || "N/A",
            visitor_photo_url:
                visitor.visitor?.visitor_photo_url || visitor.visitor_photo_url || "",
            visitor_code: visitor.visitor?.visitor_code || visitor.visitor_code || "",
            source_type: visitor.source_type || {},
            project_name:
                visitor.project?.project_name || visitor.project_name || "N/A",
            status: visitor.status || "N/A",
        }));
    }, [visitors, searchTerm, statusFilter]);

    useDocumentMeta({
        title: "Visitors",
        description: "View and manage all visitor records across projects",
    });

    const handleViewVisitor = (visitor: any) => {
        navigate(`/visitors/visitors-details/${visitor._id}`);
    };

    const handleEditVisitor = (visitor: any) => {
        navigate(`/visitors/edit-visitor/${visitor._id}`);
    };

    const handleExportCSV = () => {
        dispatch(exportVisitorDataRequest({}));
    };

    const actionButtons = useMemo(
        () => (
            <>
                <button
                    type="button"
                    className="flex items-center px-4 py-2.5 bg-[#14133B] text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
                    onClick={handleExportCSV}
                >
                    <img src={csvIcon} alt="CSV" className="w-5 h-5 mr-2" />
                    Export CSV
                </button>
                <button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="flex items-center px-4 py-2.5 bg-[#DA0808] text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                    <img src={fillterIcon} alt="Filter" className="w-5 h-5 mr-2" />
                    Advanced Filters
                </button>
            </>
        ),
        [showAdvancedFilters]
    );

    // if (isLoading) {
    //   return (
    //     <Layout>
    //       <div className="flex items-center justify-center h-full">
    //         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
    //       </div>
    //     </Layout>
    //   );
    // }

    return (
        <Layout
            title="Visitors"
            subtitle="View and manage all visitor records across projects"
            searchPlaceholder="Search by Name, Phone Number, Email or Tag ID"
            searchValue={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            actionButtons={actionButtons}
            isHeaderFixed={true}
        >
            <div className="p-4">
                {showAdvancedFilters && (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Project / Site */}
                            <div>
                                <label className="block text-sm font-bold text-[#14133B] mb-1">
                                    Project / Site
                                </label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:ring-red-500 focus:border-red-500">
                                        <option>Skyline Residency</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            {/* Date Range */}
                            <div>
                                <label className="block text-sm font-bold text-[#14133B] mb-1">
                                    Date Range
                                </label>
                                <div className="flex space-x-2">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        placeholderText="mm/dd/yyyy"
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-red-500 focus:border-red-500"
                                        dateFormat="MM/dd/yyyy"
                                    />
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={startDate || undefined}
                                        placeholderText="mm/dd/yyyy"
                                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-red-500 focus:border-red-500"
                                        dateFormat="MM/dd/yyyy"
                                    />
                                </div>
                            </div>
                            {/* Visitor Source */}
                            <div>
                                <label className="block text-sm font-bold text-[#14133B] mb-1">
                                    Visitor Source
                                </label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:ring-red-500 focus:border-red-500">
                                        <option>All Sources</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            {/* Broker Name */}
                            <div>
                                <label className="block text-sm font-bold text-[#14133B] mb-1">
                                    Broker Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search Broker"
                                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-red-500 focus:border-red-500"
                                />
                            </div>
                            {/* Sales Rep */}
                            <div>
                                <label className="block text-sm font-bold text-[#14133B] mb-1">
                                    Sales Rep
                                </label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:ring-red-500 focus:border-red-500">
                                        <option>All Sales Reps</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            {/* Tag Status */}
                            <div>
                                <label className="block text-sm font-bold text-[#14133B] mb-1">
                                    Tag Status
                                </label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:ring-red-500 focus:border-red-500">
                                        <option>All Statuses</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            {/* Visit Type */}
                            <div>
                                <label className="block text-sm font-bold text-[#14133B] mb-1">
                                    Visit Type
                                </label>
                                <div className="relative">
                                    <select className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:ring-red-500 focus:border-red-500">
                                        <option>Select Type</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end items-center mt-6 space-x-3">
                            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium">
                                Reset Filters
                            </button>
                            <button className="px-6 py-2 bg-[#DA0808] text-white rounded-md hover:bg-red-700 font-medium">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}

                {/* Visitors Table */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-20">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
                                    PHOTO
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
                                    NAME
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
                                    MOBILE
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
                                    EMAIL
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
                                    SOURCE
                                </th>
                                {/* <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
                  PROJECT NAME
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
                  TAG STATUS
                </th> */}
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wide">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {mappedVisitors.map((visitor: any) => (
                                <tr
                                    key={visitor._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    {/* Photo */}
                                    <td className="py-4 px-6">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                            {visitor.visitor_photo_url ? (
                                                <img
                                                    src={visitor.visitor_photo_url}
                                                    alt={visitor.name}
                                                    className="w-full h-full object-cover"
                                                    onClick={() =>
                                                        openModal(visitor.visitor_photo_url, visitor.name)
                                                    }
                                                />
                                            ) : (
                                                <User className="w-6 h-6 text-gray-600" />
                                            )}
                                        </div>
                                    </td>
                                    {/* Name */}
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div
                                            className="font-medium text-gray-900 hover:text-red-600 cursor-pointer transition-colors"
                                            onClick={() => handleViewVisitor(visitor)}
                                        >
                                            {visitor.name}
                                            <div className="text-xs text-gray-500 mt-1">
                                                {visitor.visitor_code}
                                            </div>
                                        </div>
                                    </td>
                                    {/* Mobile */}
                                    <td className="py-4 px-6">
                                        <div className="text-gray-900 whitespace-nowrap">
                                            {visitor.mobile}
                                        </div>
                                    </td>
                                    {/* Email */}
                                    <td className="py-4 px-6">
                                        <div className="text-gray-900 whitespace-nowrap">
                                            {visitor.email}
                                        </div>
                                    </td>
                                    {/* Source */}
                                    <td className="py-4 px-6">
                                        <span
                                            className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${visitor.source_type?.name === "Broker"
                                                    ? "bg-red-100 text-red-600"
                                                    : visitor.source_type?.name === "Direct"
                                                        ? "bg-blue-100 text-blue-600"
                                                        : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {visitor.source_type?.name || "N/A"}
                                        </span>
                                    </td>
                                    {/* Project Name */}
                                    {/* <td className="py-4 px-6">
                    <div className="text-gray-900 whitespace-nowrap">
                      {visitor.project_name}
                    </div>
                  </td> */}
                                    {/* Tag Status */}
                                    {/* <td className="py-4 px-6">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${
                        visitor.source_type_id?.is_active === true
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {visitor.source_type_id?.is_active === true
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td> */}
                                    {/* Actions */}
                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleViewVisitor(visitor)}
                                                className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleEditVisitor(visitor)}
                                                className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
                                                title="Edit Visitor"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Empty State */}
                {mappedVisitors.length === 0 && (
                    <div className="py-12 text-center">
                        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No visitors found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search criteria or add new visitors.
                        </p>
                    </div>
                )}
            </div>
            {/* Pagination & Limit Controls - Fixed Bottom */}
            <div className="fixed bottom-0 right-0 w-full bg-white border-t border-gray-200 flex justify-end items-center px-6 py-3 gap-4 z-30">
                {/* Limit Selector */}
                <div className="flex items-center">
                    <label className="mr-2 text-sm font-medium text-gray-700">
                        Rows per page:
                    </label>
                    <select
                        value={rowsPerPage}
                        onChange={(e) => {
                            setPage(1);
                            setRowsPerPage(Number(e.target.value));
                        }}
                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                </div>
                {/* Pagination Controls */}
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

            <ImageModal
                isOpen={modal.isOpen}
                src={modal.src}
                alt={modal.alt}
                onClose={closeModal}
            />
        </Layout>
    );
};

export default ManageVisitors;