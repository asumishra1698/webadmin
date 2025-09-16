import React, { useState, useEffect, useMemo } from "react";
import Layout from "../../reuseable/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ImageModal, { useImageModal } from "../../reuseable/ImageModal";
import Swal from "sweetalert2";
import {
    getBrokersRequest,
    approveBrokerRequest,
    rejectBrokerRequest,
    exportBrokerDataRequest,
} from "../../redux/actions/brokerActions";
import type { RootState } from "../../redux/store";
import fillterIcon from "../../assets/icons/fillters.png";
import csvIcon from "../../assets/icons/csv.png";
import { Plus, Eye, Edit, User, CheckCircle, X, Trash2 } from "lucide-react";
import { useDebounce } from "../../reuseable/useDebounce";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";

const projects = ["Skyline Residency", "Palm Greens", "Sunshine Towers"];
const statuses = ["Active", "Inactive", "Pending", "Approved", "Rejected"];

const ManageBrokers: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { modal, openModal, closeModal } = useImageModal();
    const { brokers, loading } = useSelector((state: RootState) => state.brokers);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const [activeTab, setActiveTab] = useState<
        "registered" | "approval" | "rejected"
    >("registered");

    const [showFilters, setShowFilters] = useState(false);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
        from: "",
        to: "",
    });

    const selectedTags = [
        selectedProject && { label: `Project: ${selectedProject}`, key: "project" },
        dateRange.from &&
        dateRange.to && {
            label: `Date: ${dateRange.from} - ${dateRange.to}`,
            key: "date",
        },
        selectedStatus && { label: `Status: ${selectedStatus}`, key: "status" },
    ].filter(Boolean);

    const handleRemoveTag = (key: string) => {
        if (key === "project") setSelectedProject(null);
        if (key === "date") setDateRange({ from: "", to: "" });
        if (key === "status") setSelectedStatus(null);
    };

    const handleClearAll = () => {
        setSelectedProject(null);
        setSelectedStatus(null);
        setDateRange({ from: "", to: "" });
    };

    const pagination = useSelector((state: RootState) => ({
        total: state.brokers.total,
        page: state.brokers.page,
        limit: state.brokers.limit,
        totalPages: state.brokers.totalPages,
    }));

    // Tab status mapping
    const tabStatusMap: Record<typeof activeTab, string> = {
        registered: "approved",
        approval: "pending",
        rejected: "rejected",
    };

    useEffect(() => {
        dispatch(
            getBrokersRequest({
                page,
                limit,
                search: debouncedSearchTerm,
                status: tabStatusMap[activeTab],
                project: selectedProject || "",
                filterStatus: selectedStatus || "",
                fromDate: dateRange.from,
                toDate: dateRange.to,
            })
        );
    }, [
        dispatch,
        page,
        limit,
        debouncedSearchTerm,
        selectedStatus,
        selectedProject,
        dateRange,
        activeTab,
    ]);

    const getStatusColor = useMemo(
        () => (status: string) => {
            switch (status.toLowerCase()) {
                case "approved":
                    return "bg-green-100 text-green-800";
                case "pending":
                    return "bg-yellow-100 text-yellow-800";
                case "rejected":
                    return "bg-red-100 text-red-800";
                case "active":
                    return "bg-green-100 text-green-800";
                case "inactive":
                    return "bg-gray-100 text-gray-800";
                default:
                    return "bg-gray-100 text-gray-800";
            }
        },
        []
    );

    const exportBrokers = () => {
        dispatch(exportBrokerDataRequest({}));
    };

    const handleAddNewBroker = () => {
        navigate("/brokers/add-new-broker");
    };

    const handleApprove = (id: string) => {
        dispatch(approveBrokerRequest(id));
    };

    const handleReject = (id: string) => {
        dispatch(rejectBrokerRequest(id));
    };

    const handleDeleteBroker = (brokerId: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to delete this broker?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DA0808",
            cancelButtonColor: "#6B7280",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({ type: "DELETE_BROKER_REQUEST", payload: brokerId });
            }
        });
    };

    const actionButtons = useMemo(
        () => (
            <>
                <button
                    onClick={handleAddNewBroker}
                    className="flex items-center px-4 py-2.5 bg-[#FFE5E5] text-[#DA0808] rounded-xl hover:bg-red-600 hover:text-white transition-colors font-medium border border-red-500"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Broker
                </button>
                <button
                    onClick={exportBrokers}
                    className="flex items-center px-4 py-2.5 bg-[#14133B] text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
                >
                    <img src={csvIcon} alt="CSV" className="w-5 h-5 mr-2" />
                    Export CSV
                </button>
                <button
                    className="flex items-center px-4 py-2.5 bg-[#DA0808] text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                    onClick={() => setShowFilters((prev) => !prev)}
                >
                    <img src={fillterIcon} alt="Filter" className="w-5 h-5 mr-2" />
                    Advanced Filters
                </button>
            </>
        ),
        [exportBrokers]
    );

    const tableRows = brokers.map((item: any) => ({
        _id: item._id,
        photo:
            item.documents?.find((doc: any) => doc.type === "owner_photo")?.url ||
            item.profile_picture ||
            "",
        name: item.broker_name || "",
        brokerId: item.broker_code || "",
        mobile: item.mobile_number || "",
        email: item.email_address || "",
        rmName:
            item.sales_rm_id && typeof item.sales_rm_id === "object"
                ? item.sales_rm_id.full_name
                : "",
        sales_rm_id: item.sales_rm_id || null,
        company: item.company_name || "",
        companytype: item.company_type?.name || "",
        company_mobile_number: item.company_mobile_number || "",
        ownerName: item.owner_name || "",
        conversion: "0%",
        visitors: item.visitor_count || "0",
        rera: item.rera_number || "",
        status: item.status || "",
        address: item.office_address
            ? [
                item.office_address.line1,
                item.office_address.city,
                item.office_address.state,
                item.office_address.zip,
            ]
                .filter(Boolean)
                .join(", ")
            : "",
    }));

    useDocumentMeta({
        title: "Brokers",
        description: "Manage and track your broker network performance",
    });

    return (
        <Layout
            title="Brokers"
            subtitle="Manage and track your broker network performance"
            searchPlaceholder="Search by Name, Phone Number, or Email"
            searchValue={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            actionButtons={actionButtons}
            isHeaderFixed={true}
        >
            <div className="p-4">
                {/* Selected filter tags */}
                <div className="flex items-center gap-2 mb-0 flex-wrap">
                    {selectedTags.map((tag: any) => (
                        <span
                            key={tag.key}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full flex items-center gap-2 text-sm"
                        >
                            {tag.label}
                            <button
                                className="ml-1 text-gray-500 hover:text-red-500"
                                onClick={() => handleRemoveTag(tag.key)}
                            >
                                <X size={16} />
                            </button>
                        </span>
                    ))}
                    {selectedTags.length > 0 && (
                        <button
                            className="ml-2 text-red-500 underline text-sm"
                            onClick={handleClearAll}
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Inline Advanced Filter Form above table */}
                {showFilters && (
                    <div className="bg-white rounded-lg p-6 mb-6 shadow border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Advanced Filters</h2>
                            <button
                                className="text-gray-500 hover:text-red-500"
                                onClick={() => setShowFilters(false)}
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Project Dropdown */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Project / Site
                                </label>
                                <select
                                    value={selectedProject || ""}
                                    onChange={(e) => setSelectedProject(e.target.value)}
                                    className="w-full border px-3 py-2 rounded-lg"
                                >
                                    <option value="">Select Project</option>
                                    {projects.map((proj) => (
                                        <option key={proj} value={proj}>
                                            {proj}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Date Range */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Date Range
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="date"
                                        value={dateRange.from}
                                        onChange={(e) =>
                                            setDateRange((prev) => ({
                                                ...prev,
                                                from: e.target.value,
                                            }))
                                        }
                                        className="border px-3 py-2 rounded-lg w-1/2"
                                    />
                                    <input
                                        type="date"
                                        value={dateRange.to}
                                        onChange={(e) =>
                                            setDateRange((prev) => ({
                                                ...prev,
                                                to: e.target.value,
                                            }))
                                        }
                                        className="border px-3 py-2 rounded-lg w-1/2"
                                    />
                                </div>
                            </div>
                            {/* Status Dropdown */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    value={selectedStatus || ""}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full border px-3 py-2 rounded-lg"
                                >
                                    <option value="">All Statuses</option>
                                    {statuses.map((stat) => (
                                        <option key={stat} value={stat}>
                                            {stat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                className="px-4 py-2 rounded-lg border"
                                onClick={handleClearAll}
                            >
                                Reset Filters
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-[#DA0808] text-white"
                                onClick={() => setShowFilters(false)}
                            >
                                Apply Filters
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex items-center border-b mb-4">
                    <button
                        className={`px-4 py-2 font-medium ${activeTab === "registered"
                            ? "text-[#DA0808] border-b-2 border-[#DA0808]"
                            : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("registered")}
                    >
                        Approved
                    </button>
                    <button
                        className={`px-4 py-2 font-medium ml-4 relative ${activeTab === "approval" ? "text-[#DA0808]" : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("approval")}
                    >
                        Pending
                        {activeTab === "approval" && (
                            <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#DA0808] rounded"></span>
                        )}
                    </button>
                    <button
                        className={`px-4 py-2 font-medium ml-4 relative ${activeTab === "rejected" ? "text-red-600" : "text-gray-500"
                            }`}
                        onClick={() => setActiveTab("rejected")}
                    >
                        Rejected
                        {activeTab === "rejected" && (
                            <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-red-600 rounded"></span>
                        )}
                    </button>
                </div>

                {/* Single table for all tabs */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-20">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                                    PHOTO
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                                    BROKER
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                                    Sales RM
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                                    COMPANY
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                                    RERA
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                                    STATUS
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                                    CONVERSION
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                                    VISITORS
                                </th>
                                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tableRows.map((row) => (
                                <tr
                                    key={row._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-4 px-6">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                            <img
                                                src={
                                                    row.photo ||
                                                    "https://www.iqsetters.com/assets/iqsetters_logo_small_new.png"
                                                }
                                                alt={row.name}
                                                className="w-full h-full object-cover"
                                                onClick={() => openModal(row.photo, row.name)}
                                            />
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div
                                            className="font-medium text-[#14133B] whitespace-nowrap hover:text-red-600 cursor-pointer transition-colors"
                                            onClick={() =>
                                                navigate(`/brokers/broker-detail/${row._id}`)
                                            }
                                        >
                                            {row.name}
                                            <span className="block text-xs text-gray-500 mt-1">
                                                {row.brokerId}
                                            </span>
                                            <span className="block text-xs text-gray-500 mt-1 lowercase">
                                                {row.email}
                                            </span>
                                            <span className="block text-xs text-gray-500 mt-1 lowercase">
                                                {row.mobile}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="font-medium text-[#14133B] whitespace-nowrap">
                                            {row.rmName}
                                            {row.sales_rm_id &&
                                                typeof row.sales_rm_id === "object" && (
                                                    <>
                                                        <span className="block text-xs text-gray-500 mt-1 lowercase">
                                                            {row.sales_rm_id.email_address}
                                                        </span>
                                                        <span className="block text-xs text-gray-500 mt-1">
                                                            {row.sales_rm_id.mobile_number}
                                                        </span>
                                                    </>
                                                )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        {row.company}
                                        <span className="block text-xs text-gray-500 mt-1">
                                            {row.ownerName}
                                        </span>
                                        <span className="block text-xs text-gray-500 mt-1">
                                            {row.companytype}
                                        </span>
                                        <span className="block text-xs text-gray-500 mt-1">
                                            {row.address}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">{row.rera}</td>
                                    <td className="py-4 px-6">
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                row.status
                                            )}`}
                                        >
                                            {row.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">{row.conversion}</td>
                                    <td className="py-4 px-6">{row.visitors}</td>

                                    <td className="py-4 px-6">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() =>
                                                    navigate(`/brokers/broker-detail/${row._id}`)
                                                }
                                                className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                                                title="View Details"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    navigate(`/brokers/edit-broker/${row._id}`)
                                                }
                                                className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
                                                title="Edit Broker"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBroker(row._id)}
                                                className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                                                title="Delete Broker"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            {activeTab === "approval" && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(row._id)}
                                                        className="p-1 text-white bg-green-500 hover:bg-green-600 rounded transition-colors rounded-full"
                                                        title="Approve Broker"
                                                    >
                                                        <CheckCircle className="w-3 h-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(row._id)}
                                                        className="p-1 text-white bg-red-500 hover:bg-red-600 rounded transition-colors rounded-full"
                                                        title="Reject Broker"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="fixed bottom-0 right-0 w-full bg-white border-t border-gray-200 flex justify-end items-center px-6 py-3 gap-4 z-30">
                    {/* Limit Selector */}
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
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    {/* Pagination Controls */}
                    {pagination.totalPages > 1 && (
                        <div className="flex items-center">
                            <button
                                className="px-3 py-1 rounded border mr-2 disabled:opacity-50 bg-[#DA0808] text-white hover:bg-red-700"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                Prev
                            </button>
                            <span className="mx-2 text-sm font-medium">
                                Page {pagination.page} of {pagination.totalPages}
                            </span>
                            <button
                                className="px-3 py-1 rounded border ml-2 disabled:opacity-50 bg-[#DA0808] text-white hover:bg-red-700"
                                disabled={page === pagination.totalPages}
                                onClick={() => setPage(page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>

                {!loading && brokers.length === 0 && (
                    <div className="py-12 text-center">
                        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No brokers found
                        </h3>
                        <p className="text-gray-600">
                            Try adjusting your search criteria or add a new broker.
                        </p>
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

export default ManageBrokers;