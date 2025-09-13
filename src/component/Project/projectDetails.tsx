import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { formatDate } from "../../reuseable/formatDate";

import {
  getProjectByIdRequest,
  getVisitorsByProjectRequest,
  getBrokerByProjectIdRequest,
} from "../../redux/actions/projectActions";
import ImageModal, { useImageModal } from "../../reuseable/ImageModal";
import VideoModal from "../../reuseable/VideoModal";

import type { RootState } from "../../redux/reducers/rootReducers";
import Layout from "../../reuseable/Layout";
import map from "../../assets/icons/map.png";
import { FileText, Video } from "lucide-react";

import {
  Edit,
  Users,
  Tag,
  Clock,
  TrendingUp,
  TrendingDown,
  Search,
  User,
  BadgePercent,
} from "lucide-react";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";

const performanceStats = [
  {
    title: "Total Visitors",
    value: "3,847",
    change: "+12%",
    changeType: "increase",
    Icon: Users,
    color: "text-red-500",
    bgColor: "bg-red-100",
  },
  {
    title: "Active Tags",
    value: "1,264",
    change: "+8.3%",
    changeType: "increase",
    Icon: Tag,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    title: "Expired Tags",
    value: "586",
    change: "-4.2%",
    changeType: "decrease",
    Icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Conversions",
    value: "17",
    change: "+8.3%",
    changeType: "increase",
    Icon: BadgePercent,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
];

const ProjectDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const projectId = pathSegments[pathSegments.length - 1];
  const dispatch = useDispatch();
  const { modal, openModal, closeModal } = useImageModal();
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    src: "",
    alt: "",
  });
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [unitTypeName, setUnitTypeName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [commissionRM, setCommissionRM] = useState("");
  const [commissionBroker, setCommissionBroker] = useState("");

  const { currentProject, visitors, brokers, loading } = useSelector(
    (state: RootState) => state.projects
  );

  useEffect(() => {
    if (projectId) {
      dispatch(getProjectByIdRequest(projectId));
      dispatch(getVisitorsByProjectRequest(projectId));
      dispatch(getBrokerByProjectIdRequest(projectId));
    }
  }, [dispatch, projectId]);

  const [activeTab, setActiveTab] = useState<"visitors" | "brokers">(
    "visitors"
  );

  const visitorLogs = Array.isArray(visitors)
    ? visitors.map((v: any, idx: number) => ({
        id: v._id || idx + 1,
        name: v.name || "-",
        mobile: v.mobile || "-",
        email: v.email || "-",
        visitorId: v.visitor_code || "-",
        date: v.createdAt ? new Date(v.createdAt).toLocaleDateString() : "-",
        time: v.createdAt ? new Date(v.createdAt).toLocaleTimeString() : "-",
        tagSource: v.source_type?.name,
        visitStatus: v.source_type?.is_active === true ? "Success" : "Pending",
        avatar:
          v.visitor_photo_url || `https://i.pravatar.cc/150?img=${idx + 1}`,
      }))
    : [];

  const assignedBrokers = Array.isArray(brokers)
    ? brokers.map((b: any, idx: number) => ({
        id: b._id || idx + 1,
        name: b.broker_name || "-",
        email: b.email_address || "-",
        mobile: b.mobile_number || "-",
        address: b.office_address
          ? `${b.office_address.line1 || ""}, ${b.office_address.city || ""}, ${
              b.office_address.state || ""
            } ${b.office_address.zip || ""}`
          : "-",
        brokercode: b.broker_code || "-",
        company: b.company_name || "-",
        rera_number: b.rere_number || "-",
        owner_name: b.owner_name || "-",
        is_active: b.user_id.is_active,
        avatar:
          (Array.isArray(b.documents)
            ? b.documents.find((doc: any) => doc.type === "owner_photo")?.url
            : undefined) ||
          `https://i.pravatar.cc/150?u=${b.broker_name || idx + 1}`,
      }))
    : [];

  useDocumentMeta({
    title: `${currentProject?.project_name || "Project Details"}`,
    description: "Manage projects and their details across your organization",
  });

  if (loading) {
    return (
      <Layout>
        <div className="text-center text-gray-500">Loading...</div>
      </Layout>
    );
  }
  if (!currentProject) {
    return (
      <Layout>
        <div className="text-center text-gray-500">
          No project details available
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Project Details"
      showBackButton={true}
      backButtonLink="/projects"
    >
      <div className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-wrap items-start justify-between gap-6">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center text-center w-[250px] relative">
              <img
                src={
                  (Array.isArray(currentProject.media)
                    ? currentProject.media.find(
                        (m: any) => m.doc_type === "image"
                      )?.img_url
                    : undefined) ||
                  "https://www.iqsetters.com/assets/iqsetters_logo_small_new.png"
                }
                alt={currentProject.project_name}
                className="w-28 h-28 rounded-full object-cover"
                onClick={() =>
                  openModal(
                    (Array.isArray(currentProject.media)
                      ? currentProject.media.find(
                          (m: any) => m.doc_type === "image"
                        )?.img_url
                      : undefined) ||
                      "https://www.iqsetters.com/assets/iqsetters_logo_small_new.png",
                    currentProject.project_name
                  )
                }
              />
              <span
                className={`absolute top-1 left-1 text-white text-xs font-bold px-2 py-1 rounded-full ${
                  currentProject.is_active ? "bg-green-500" : "bg-red-600"
                }`}
              >
                {currentProject.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 w-64 break-words text-center mt-2">
              {currentProject.project_name}
            </h1>
            <div className="flex items-center text-gray-500 mt-1 w-64 break-words justify-center text-center">
              <img src={map} alt="sitewisefootfall" />
              &nbsp;
              <span>
                {currentProject.city}, {currentProject.state}
              </span>
            </div>
          </div>
          <div className="flex-grow">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4 text-sm">
              <div>
                <span className="text-gray-500 block">Project Code</span>
                <span className="font-semibold text-gray-800">
                  {currentProject.project_code}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Category</span>
                <span className="font-semibold text-gray-800">
                  {currentProject.project_type?.name}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Developer</span>
                <span className="font-semibold text-gray-800">
                  {currentProject.developer}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Project Start Date</span>
                <span className="font-semibold text-gray-800">
                  {currentProject.project_start_date
                    ? formatDate(currentProject.project_start_date)
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">
                  Project Completion Date
                </span>
                <span className="font-semibold text-gray-800">
                  {currentProject.project_completion_date
                    ? formatDate(currentProject.project_completion_date)
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Created On</span>
                <span className="font-semibold text-gray-800">
                  {currentProject.created_on_date
                    ? formatDate(currentProject.created_on_date)
                    : "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Contact Person</span>
                <span className="font-semibold text-gray-800">
                  {currentProject.contact_person || "N/A"}
                  <div className="text-xs text-gray-500 mt-1">
                    {currentProject.contact_number || "N/A"} |{" "}
                    {currentProject.contact_email || "N/A"}
                  </div>
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Location</span>
                <span className="font-semibold text-gray-800">
                  {currentProject.address || "N/A"}
                </span>
                <span className="text-xs text-gray-500 block mt-1">
                  {currentProject.city}, {currentProject.state}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Created By</span>
                <span className="font-semibold text-gray-800">
                  Admin
                  {/* {currentProject.created_by || "N/A"} */}
                </span>
              </div>

              <div className="flex justify-end col-span-3">
                <button
                  onClick={() => setShowUnitModal(true)}
                  className="bg-[#DA0808] text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition-colors"
                >
                  <span>Add Unit Types</span>
                </button>
                <button
                  onClick={() =>
                    navigate(`/projects/edit-project/${currentProject._id}`)
                  }
                  className="bg-[#14133B] text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition-colors ml-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4 mt-4">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Media</h2>
          <div className="flex flex-wrap gap-4">
            {Array.isArray(currentProject.media) &&
            currentProject.media.length > 0 ? (
              currentProject.media.map((item: any) => (
                <div
                  key={item._id}
                  className="w-32 h-32 border rounded flex items-center justify-center overflow-hidden bg-gray-50 relative"
                >
                  {item.doc_type === "image" ||
                  item.doc_type === "floorPlanImg" ? (
                    <img
                      src={item.img_url}
                      alt={item.description}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => openModal(item.img_url, item.description)}
                    />
                  ) : item.doc_type === "video" ||
                    item.doc_type === "workThroughVideo" ? (
                    <div
                      className="w-full h-full flex items-center justify-center cursor-pointer relative"
                      onClick={() =>
                        setVideoModal({
                          isOpen: true,
                          src: item.img_url,
                          alt: item.description,
                        })
                      }
                      title={item.description}
                    >
                      <video
                        src={item.img_url}
                        className="w-full h-full object-cover"
                        preload="metadata"
                        style={{ pointerEvents: "none" }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Video className="w-14 h-14 text-white bg-black bg-opacity-60 rounded-full p-2" />
                      </span>
                    </div>
                  ) : (
                    <a
                      href={item.img_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-full flex items-center justify-center"
                      title={item.description}
                    >
                      <FileText className="w-10 h-10 text-red-600" />
                    </a>
                  )}
                </div>
              ))
            ) : (
              <span className="font-semibold text-gray-800">
                No media available
              </span>
            )}
          </div>
        </div>

        {/* Performance Overview */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-4">
            Performance Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {performanceStats.map((stat) => (
              <div
                key={stat.title}
                className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-start justify-between"
              >
                <div>
                  <p className="text-gray-500">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <div
                    className={`flex items-center text-sm mt-2 ${
                      stat.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.changeType === "increase" ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span>{stat.change} from last month</span>
                  </div>
                </div>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visitor Logs & Brokers Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
          <div className="flex flex-wrap items-center justify-between p-4 border-b border-gray-200 gap-4">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab("visitors")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === "visitors"
                    ? "border-b-2 border-red-500 text-red-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <Clock className="h-4 w-4" /> Visitor Logs
              </button>
              <button
                onClick={() => setActiveTab("brokers")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === "brokers"
                    ? "border-b-2 border-red-500 text-red-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                <User className="h-4 w-4" /> Assigned Brokers
              </button>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Name, Phone Number, Email"
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg w-full sm:w-72 focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {activeTab === "visitors" ? (
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                  <tr>
                    <th className="px-6 py-3">Visitor Name</th>
                    <th className="px-6 py-3">Phone Number</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Visit Date & Time</th>
                    <th className="px-6 py-3">Tag Source</th>
                    <th className="px-6 py-3">Visit Status</th>
                  </tr>
                </thead>
                <tbody>
                  {visitorLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <img
                            src={log.avatar}
                            alt={log.name}
                            className="w-8 h-8 rounded-full object-cover"
                            onClick={() => openModal(log.avatar, log.name)}
                          />
                          <div>
                            {log.name}
                            <div className="text-xs text-gray-500">
                              {log.visitorId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {log.mobile || "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {log.email || "-"}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {log.date}
                        <br />
                        {log.time}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {log.tagSource}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full inline-block ${
                            log.visitStatus === "Success"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {log.visitStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                  <tr>
                    <th className="px-6 py-3">Broker Name</th>
                    <th className="px-6 py-3">Contact</th>
                    <th className="px-6 py-3">Company</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(assignedBrokers) &&
                  assignedBrokers.length > 0 ? (
                    assignedBrokers.map((brokers) => (
                      <tr
                        key={brokers.id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          <div className="flex items-center gap-3">
                            <img
                              src={brokers.avatar}
                              alt={brokers.name}
                              className="w-8 h-8 rounded-full object-cover"
                              onClick={() =>
                                openModal(brokers.avatar, brokers.name)
                              }
                            />
                            <div>
                              {brokers.name}
                              <div className="text-xs text-gray-500">
                                {brokers.brokercode}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {brokers.email}
                          <br />
                          <span className="text-xs text-gray-500">
                            {brokers.mobile}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {brokers.company} - {brokers.owner_name}
                          <br />
                          <span className="text-xs text-gray-500">
                            {brokers.rera_number}
                          </span>
                          <br />
                          <span className="text-xs text-gray-500">
                            {brokers.address}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-gray-600">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              brokers.is_active
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {brokers.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-6 py-8 text-center text-gray-500 font-semibold"
                      >
                        No brokers found for this project
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {showUnitModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                  onClick={() => setShowUnitModal(false)}
                >
                  <X size={24} />
                </button>
                <h2 className="text-lg font-bold mb-6 text-gray-800">
                  Add Unit Type
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setShowUnitModal(false);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Type Name
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Unit Type"
                      value={unitTypeName}
                      onChange={(e) => setUnitTypeName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Unit Price
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Unit Price (₹)"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Commission Rate For RM (%)
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Commission"
                      value={commissionRM}
                      onChange={(e) => setCommissionRM(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Commission Rate For Broker (%)
                    </label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter Commission"
                      value={commissionBroker}
                      onChange={(e) => setCommissionBroker(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold"
                      onClick={() => setShowUnitModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-lg bg-[#14133B] text-white font-semibold"
                    >
                      Save Unit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        <ImageModal
          isOpen={modal.isOpen}
          src={modal.src}
          alt={modal.alt}
          onClose={closeModal}
        />
        {videoModal.isOpen && (
          <VideoModal
            isOpen={videoModal.isOpen}
            src={videoModal.src}
            alt={videoModal.alt}
            onClose={() => setVideoModal({ isOpen: false, src: "", alt: "" })}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProjectDetails;