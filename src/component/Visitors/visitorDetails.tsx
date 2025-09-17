import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../reuseable/Layout";
import callIcon from "../../assets/icons/call.png";
import emailIcon from "../../assets/icons/email.png";
import { useDispatch, useSelector } from "react-redux";
import QrModal from "./QrModal";
import ImageModal, { useImageModal } from "../../reuseable/ImageModal";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";
import { formatDate } from "../../reuseable/formatDate";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import {
    fetchVisitorByIdRequest,
    fetchVisitorHistoryRequest,
    fetchVisitorTagHistoryRequest,
} from "../../redux/actions/visitorActions";
import { useDebounce } from "../../reuseable/useDebounce";

import type { RootState } from "../../redux/reducers/rootReducers";
import VisitHistoryTable from "./visitHistory";
import TagHistory from "./tagHistory";
const tabOptions = [
    { key: "visit-history", label: "Visit History" },
    { key: "tag-history", label: "Tag History" },
];
const VisitorDetails: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const dispatch = useDispatch();
    const { modal, openModal, closeModal } = useImageModal();
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [modalOpen, setModalOpen] = useState(false);
    const [visitHistoryModalOpen, setVisitHistoryModalOpen] = useState(false);
    const [selectedVisitHistory, setSelectedVisitHistory] = useState<any[]>([]);
    const [selectedVisit, setSelectedVisit] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [activeTab, setActiveTab] = useState<"visit-history" | "tag-history">(
        "visit-history"
    );

    const visitor = useSelector(
        (state: RootState) => state.visitors.currentVisitor
    );
    const visitorHistory = useSelector(
        (state: RootState) => state.visitors.visitorHistory || []
    );
    const tagHistoryData = useSelector(
        (state: RootState) => state.visitors.visitorTagHistory || []
    );
    const visitorHistoryTotal = useSelector(
        (state: RootState) => state.visitors.total || 0
    );
    const visitHistory = useSelector(
        (state: RootState) => state.visits.visitHistory || []
    );

    const totalPages = Math.ceil(visitorHistoryTotal / rowsPerPage);

    useEffect(() => {
        dispatch({ type: "CLEAR_VISITOR_DATA" });
        if (id) {
            dispatch(fetchVisitorByIdRequest(id));
            if (activeTab === "visit-history") {
                dispatch(
                    fetchVisitorHistoryRequest({
                        id,
                        page,
                        limit: rowsPerPage,
                        search: debouncedSearchTerm,
                    })
                );
            } else if (activeTab === "tag-history") {
                dispatch(
                    fetchVisitorTagHistoryRequest({
                        id,
                        page,
                        limit: rowsPerPage,
                        search: debouncedSearchTerm,
                    })
                );
            }
        }
    }, [dispatch, id, page, rowsPerPage, debouncedSearchTerm, activeTab]);

    useEffect(() => {
        if (visitHistoryModalOpen && selectedVisit) {
            setSelectedVisitHistory(Array.isArray(visitHistory) ? visitHistory : []);
        }
    }, [visitHistory, visitHistoryModalOpen, selectedVisit]);

    const visitorProfile = useMemo(() => {
        if (!visitor) return null;
        const firstHistory = visitorHistory[0] || {};
        return {
            id: visitor._id,
            name: visitor.name,
            phone: visitor.mobile,
            email: visitor.email,
            source: visitor.source_type?.name || "-",
            visitor_photo_url: visitor.visitor_photo_url,
            visitor_code: visitor.visitor_code || "-",
            visit_datetime: visitor.latest_visit?.visit_datetime
                ? new Date(visitor.latest_visit.visit_datetime).toLocaleString()
                : "-",
            totalVisits: visitor.total_visits_count || visitorHistory.length || 0,
            broker:
                firstHistory.broker?.broker_name ||
                firstHistory.tag_with_broker?.broker_id?.broker_name ||
                "-",
            valid_until: firstHistory.tag_with_broker?.valid_until
                ? new Date(firstHistory.tag_with_broker.valid_until).toLocaleString()
                : "N/A",
            project:
                firstHistory.project?.project_name ||
                firstHistory.project_id?.project_name ||
                "-",
            rmName:
                firstHistory.sales_rm?.full_name ||
                firstHistory.sales_rm_id?.full_name ||
                "-",
            developer:
                firstHistory.project?.developer ||
                firstHistory.project_id?.developer ||
                "-",
            latest_visit:
                firstHistory.latest_visit?.latest_visit ||
                firstHistory.latest_visit_id?.latest_visit ||
                "-",
        };
    }, [visitor, visitorHistory]);

    useDocumentMeta({
        title: visitorProfile?.name || "Visitor Details",
        description: `Details for visitor ${visitorProfile?.name || ""}`,
    });

    return (
        <Layout
            title="Visitor Details"
            subtitle="View and manage visitor information"
            showBackButton={true}
            backButtonLink="/visitors"
        >
            <div className="p-6">
                {visitorProfile && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-wrap items-start justify-between gap-6">
                        <div className="flex flex-col items-center text-center w-[250px]">
                            <img
                                src={visitorProfile.visitor_photo_url}
                                alt={visitorProfile.name}
                                className="w-28 h-28 rounded-full object-cover mb-4"
                                onClick={() =>
                                    openModal(
                                        visitorProfile.visitor_photo_url,
                                        visitorProfile.name
                                    )
                                }
                            />
                            <h1 className="text-2xl font-bold text-gray-900 mb-3">
                                {visitorProfile.name}
                            </h1>
                            <div className="flex items-center justify-center mb-2">
                                <span className="mr-2">
                                    <img src={callIcon} alt="Call Icon" />
                                </span>
                                <span>{visitorProfile.phone}</span>
                            </div>
                            <div className="flex items-center justify-center">
                                <span className="mr-2">
                                    <img src={emailIcon} alt="Email Icon" />
                                </span>
                                <span>{visitorProfile.email}</span>
                            </div>
                        </div>
                        <div className="flex-grow">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-sm">
                                <div>
                                    <span className="text-gray-500 block">Source</span>
                                    <span className="font-semibold text-red-500">
                                        {visitorProfile.source}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">Broker Name</span>
                                    <span className="font-semibold text-gray-800">
                                        {visitorProfile.broker}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">
                                        Project / Site Name
                                    </span>
                                    <span className="font-semibold text-gray-800">
                                        {visitorProfile.project}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">Developer</span>
                                    <span className="font-semibold text-gray-800">
                                        {visitorProfile.developer}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">Sales RM Name</span>
                                    <span className="font-semibold text-gray-800">
                                        {visitorProfile.rmName}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">VISITOR CODE</span>
                                    <span className="font-semibold text-gray-800">
                                        {visitorProfile.visitor_code}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">latest_visit</span>
                                    <span className="font-semibold text-gray-800">
                                        {visitorProfile.latest_visit &&
                                            visitorProfile.latest_visit !== "-"
                                            ? formatDate(visitorProfile.latest_visit?.latest_visit)
                                            : "-"}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-500 block">Total Visits</span>
                                    <span className="font-semibold text-gray-800">
                                        {visitorProfile.totalVisits}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <QrModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    visit={selectedVisit}
                />

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4 mb-20">
                    <div className="flex flex-wrap items-center justify-between p-4 border-b border-gray-200 gap-4">
                        <div className="flex items-center space-x-6">
                            {tabOptions.map((tab) => (
                                <button
                                    key={tab.key}
                                    className={`text-sm font-medium pb-2 border-b-2 transition-colors ${activeTab === tab.key
                                            ? "text-red-500 border-red-500"
                                            : "text-gray-500 border-transparent"
                                        }`}
                                    onClick={() =>
                                        setActiveTab(tab.key as "visit-history" | "tag-history")
                                    }
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        {(activeTab === "visit-history" || activeTab === "tag-history") && (
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={
                                        activeTab === "visit-history"
                                            ? "Search by Name, Phone Number, Email or Tag ID"
                                            : "Search by Broker, RM, Project, Mobile, Email"
                                    }
                                    className="pl-10 pr-4 py-4 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent w-80"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>

                    {activeTab === "visit-history" && (
                        <VisitHistoryTable
                            filteredHistory={visitorHistory}
                            openModal={openModal}
                            setSelectedVisit={setSelectedVisit}
                            setModalOpen={setModalOpen}
                            page={page}
                            setPage={setPage}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            totalPages={totalPages}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            setVisitHistoryModalOpen={setVisitHistoryModalOpen}
                            setSelectedVisitHistory={setSelectedVisitHistory}
                            visitHistory={visitHistory}
                        />
                    )}
                    {activeTab === "tag-history" && (
                        <TagHistory
                            tagHistory={tagHistoryData}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            page={page}
                            setPage={setPage}
                            rowsPerPage={rowsPerPage}
                            setRowsPerPage={setRowsPerPage}
                            totalPages={totalPages}
                        />
                    )}
                </div>
            </div>

            <ImageModal
                isOpen={modal.isOpen}
                src={modal.src}
                alt={modal.alt}
                onClose={closeModal}
            />

            {visitHistoryModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
                    onClick={() => setVisitHistoryModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-7xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Activity</h2>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setVisitHistoryModalOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                        <table className="w-full text-sm text-left border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border">Action</th>
                                    <th className="py-2 px-4 border">Actor</th>
                                    <th className="py-2 px-4 border">From</th>
                                    <th className="py-2 px-4 border">To</th>
                                    <th className="py-2 px-4 border">Performed By</th>
                                    <th className="py-2 px-4 border">Note</th>
                                    <th className="py-2 px-4 border">Status</th>
                                    <th className="py-2 px-4 border">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedVisitHistory.map((Item: any) => (
                                    <tr key={Item._id}>
                                        <td className="py-2 px-4 border whitespace-nowrap">
                                            {Item.action}
                                        </td>
                                        <td className="py-2 px-4 border whitespace-nowrap">
                                            {Item.actor_user_id?.full_name || "-"}
                                        </td>
                                        <td className="py-2 px-4 border whitespace-nowrap">
                                            {Item.from_user_id?.full_name || "-"}
                                        </td>
                                        <td className="py-2 px-4 border whitespace-nowrap">
                                            {Item.to_user_id?.full_name || "-"}
                                        </td>
                                        <td className="py-2 px-4 border whitespace-nowrap">
                                            {Item.performed_by?.full_name || "-"}
                                        </td>
                                        <td className="py-2 px-4 border">
                                            {Item.note || "-"}
                                        </td>
                                        <td className="py-2 px-4 border whitespace-nowrap text-center">
                                            {Item.status === "completed" ? (
                                                <FaCheckCircle
                                                    className="text-green-500 inline-block"
                                                    title="Completed"
                                                />
                                            ) : (
                                                <FaTimesCircle
                                                    className="text-red-500 inline-block"
                                                    title={Item.status}
                                                />
                                            )}
                                        </td>
                                        <td className="py-2 px-4 border whitespace-nowrap">
                                            {Item.createdAt ? formatDate(Item.createdAt) : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </Layout>
    );
};
export default VisitorDetails;