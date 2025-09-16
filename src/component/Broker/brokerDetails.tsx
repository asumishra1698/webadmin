import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../reuseable/Layout";
import callIcon from "../../assets/icons/call.png";
import emailIcon from "../../assets/icons/email.png";
import ImageModal, { useImageModal } from "../../reuseable/ImageModal";
import { formatDate } from "../../reuseable/formatDate";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";
import {
  Edit,
  Users,
  TrendingUp,
  TrendingDown,
  // BadgePercent,
  Search,
  Clock,
  Tag,
} from "lucide-react";
import {
  getBrokerByIdRequest,
  referedVisitorsByBrokerRequest,
  getBrokerKpiRequest,
} from "../../redux/actions/brokerActions";
import type { RootState } from "../../redux/store";

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const baseClasses =
    "px-3 py-1 text-xs font-semibold rounded-full inline-block";
  switch (status?.toLowerCase()) {
    case "completed":
      return (
        <span className={`${baseClasses} bg-green-100 text-green-700`}>
          Completed
        </span>
      );
    case "converted":
      return (
        <span className={`${baseClasses} bg-green-100 text-green-700`}>
          Converted
        </span>
      );
    case "missed":
      return (
        <span className={`${baseClasses} bg-red-100 text-red-700`}>Missed</span>
      );
    case "in progress":
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>
          In Progress
        </span>
      );
    case "cancelled":
      return (
        <span className={`${baseClasses} bg-gray-200 text-gray-700`}>
          cancelled
        </span>
      );
    default:
      return <span className={baseClasses}>{status || "N/A"}</span>;
  }
};

const BrokerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modal, openModal, closeModal } = useImageModal();

  const {
    selectedBroker: brokerData,
    loading,
    referredVisitors,
  } = useSelector((state: RootState) => state.brokers);

  const { kpi } = useSelector((state: RootState) => state.brokers);

  const kpiStats = [
    {
      title: "Total Visitors",
      value: kpi?.totals?.total_visitors ?? "N/A",
      change: (kpi?.deltas_vs_last_month?.total_visitors_pct ?? 0) + "%",
      changeType:
        (kpi?.deltas_vs_last_month?.total_visitors_pct ?? 0) >= 0
          ? "increase"
          : "decrease",
      Icon: Users,
      color: "text-red-500",
      bgColor: "bg-red-100",
    },
    {
      title: "Active Tags",
      value: kpi?.totals?.active_tags ?? "N/A",
      change: (kpi?.deltas_vs_last_month?.active_tags_pct ?? 0) + "%",
      changeType:
        (kpi?.deltas_vs_last_month?.active_tags_pct ?? 0) >= 0
          ? "increase"
          : "decrease",
      Icon: Tag,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      title: "Expired Tags",
      value: kpi?.totals?.expired_tags ?? "N/A",
      change: (kpi?.deltas_vs_last_month?.expired_tags_pct ?? 0) + "%",
      changeType:
        (kpi?.deltas_vs_last_month?.expired_tags_pct ?? 0) >= 0
          ? "increase"
          : "decrease",
      Icon: Clock,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    // {
    //   title: "Conversions",
    //   value: kpi?.totals?.conversions ?? "N/A", // अगर conversions data मिलता है तो यहाँ से आ सकता है
    //   change: (kpi?.deltas_vs_last_month?.conversions_pct ?? 0) + "%",
    //   changeType:
    //     (kpi?.deltas_vs_last_month?.conversions_pct ?? 0) >= 0
    //       ? "increase"
    //       : "decrease",
    //   Icon: BadgePercent,
    //   color: "text-green-500",
    //   bgColor: "bg-green-100",
    // },
  ];

  useDocumentMeta({
    title: brokerData?.broker_name
      ? `${brokerData.broker_name} - Broker Details`
      : "Broker Details",
    description: brokerData?.broker_name
      ? `Details and performance overview of broker ${brokerData.broker_name}.`
      : "Broker Details",
  });

  useEffect(() => {
    if (id) {
      dispatch(getBrokerByIdRequest(id));
      dispatch(getBrokerKpiRequest(id));
      dispatch(
        referedVisitorsByBrokerRequest({
          brokerId: id,
        })
      );
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
        </div>
      </Layout>
    );
  }

  if (!brokerData) {
    return (
      <Layout title="Error" showBackButton={true} backButtonLink="/brokers">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Broker Not Found</h2>
          <p>The broker you are looking for does not exist.</p>
          <Link
            to="/brokers"
            className="text-red-500 hover:underline mt-4 inline-block"
          >
            Go back to brokers list
          </Link>
        </div>
      </Layout>
    );
  }

  const ownerPhotoUrl =
    brokerData.documents?.find((doc: any) => doc.type === "owner_photo")?.url ||
    "";

  return (
    <Layout title="Broker Details" showBackButton={true} backButtonLink={-1}>
      <div className="p-6">
        {/* Broker Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col-xl sm:flex-row items-center gap-4">
          <div className="text-center flex-shrink-0 w-[250px]">
            <img
              src={
                ownerPhotoUrl && ownerPhotoUrl.trim() !== ""
                  ? ownerPhotoUrl
                  : "https://www.iqsetters.com/assets/iqsetters_logo_small_new.png"
              }
              alt={brokerData.broker_name}
              className="w-40 h-40 rounded-full object-cover mx-auto border-2 border-gray-200"
              onClick={() =>
                openModal(
                  ownerPhotoUrl ||
                  "https://www.iqsetters.com/assets/iqsetters_logo_small_new.png",
                  brokerData.broker_name
                )
              }
            />
            <h1 className="text-xl font-bold text-gray-900 mt-4">
              {brokerData.broker_name}
            </h1>
            <div className="flex items-center justify-center text-gray-600 mt-2 text-sm">
              <img src={callIcon} alt="Call Icon" className="mr-2" />
              <span>{brokerData.mobile_number}</span>
            </div>
            <div className="flex items-center justify-center text-gray-600 mt-1 text-sm">
              <img src={emailIcon} alt="Email Icon" className="mr-2" />
              <span>{brokerData.email_address}</span>
            </div>
          </div>

          {/* Center: Details Grid */}
          <div className="flex-grow grid grid-cols-3 gap-x-2 gap-y-6 pt-2">
            <div>
              <span className="text-gray-500 block text-sm">Broker Code</span>
              <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full mt-1">
                {brokerData.broker_code || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-sm">Company Type</span>
              <span className="font-bold text-gray-800 block mt-1">
                {brokerData.company_type?.name || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-sm">RERA Number</span>
              <span className="font-bold text-gray-800 block mt-1">
                {brokerData.rera_number || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-sm">Status</span>
              <span
                className={`inline-block text-xs font-semibold px-4 py-1 rounded-full mt-1 capitalize ${brokerData.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                  }`}
              >
                {brokerData.status === "approved"
                  ? "Approved"
                  : brokerData.status || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-sm">Owner Name</span>
              <span className="font-bold text-gray-800 block mt-1">
                {brokerData.owner_name || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-sm">Company Name</span>
              <span className="font-bold text-gray-800 block mt-1">
                {brokerData.company_name || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-sm">Category</span>
              <span className="font-bold text-gray-800 block mt-1">
                {typeof brokerData.company_type?.category === "string"
                  ? brokerData.company_type.category
                  : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-sm">
                Office Address
              </span>
              <span className="font-bold text-gray-800 block mt-1">
                {[
                  brokerData.office_address?.line1,
                  brokerData.office_address?.city,
                  brokerData.office_address?.state,
                ]
                  .filter(
                    (part) => typeof part === "string" && part.trim() !== ""
                  )
                  .join(" ") || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block text-sm">
                Registration Date
              </span>
              <span className="font-bold text-gray-800 block mt-1">
                {brokerData.createdAt
                  ? formatDate(brokerData.createdAt)
                  : "N/A"}
              </span>
            </div>
            <div className="flex justify-end col-span-3">
              <button
                onClick={() =>
                  navigate(`/brokers/broker-team/${brokerData._id}`)
                }
                className="bg-[#DA0808] text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition-colors"
              >
                <span>View Team Members</span>
              </button>
              <button
                onClick={() =>
                  navigate(`/brokers/edit-broker/${brokerData._id}`)
                }
                className="bg-[#14133B] text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-gray-900 transition-colors ml-4"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        </div>
        {/* Performance Overview */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 mt-4">
            Performance Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {kpiStats.map((stat) => (
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
                    className={`flex items-center text-sm mt-2 ${stat.changeType === "increase"
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
        {/* Broker Documents Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(brokerData.documents) &&
              brokerData.documents.length > 0 ? (
              brokerData.documents.map((doc: any, index: number) => (
                <div
                  key={doc._id || index}
                  className="border border-gray-200 rounded-lg p-4 flex items-start gap-4 hover:shadow transition-shadow"
                >
                  <img
                    src={doc.url}
                    alt={doc.name}
                    className="w-16 h-16 object-cover rounded border"
                    onClick={() => openModal(doc.url, doc.name)}
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-gray-700 font-semibold capitalize">
                        {doc.type.replace(/_/g, " ")}
                      </p>
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline mt-2"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">
                No documents uploaded.
              </p>
            )}
          </div>
        </div>
        {/* Visitors Referred Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-4">
          <div className="flex flex-wrap items-center justify-between p-4 border-b border-gray-200 gap-4">
            <h2 className="text-xl font-bold text-gray-800">
              Visitors Referred
            </h2>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Name, Phone Number, Email"
                className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg w-full sm:w-72 focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-3">Visitor Name</th>
                  <th className="px-6 py-3">Visit Date & Time</th>
                  <th className="px-6 py-3">Project</th>
                  <th className="px-6 py-3">Visit Status</th>
                  {/* <th className="px-6 py-3">Conversion</th> */}
                  <th className="px-6 py-3">Tag Validity</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(referredVisitors) &&
                  referredVisitors.length > 0 ? (
                  referredVisitors.map((log, idx) => (
                    <tr
                      key={log.visitor?._id || idx}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              typeof log.visitor?.visitor_photo_url === "string"
                                ? log?.visitor?.visitor_photo_url
                                : "https://www.iqsetters.com/assets/iqsetters_logo_small_new.png"
                            }
                            alt={
                              typeof log.visitor?.name === "string"
                                ? log?.visitor.name
                                : "N/A"
                            }
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            {typeof log.visitor?.name === "string"
                              ? log?.visitor.name
                              : "N/A"}
                            <div className="text-xs text-gray-500">
                              {typeof log.visitor?.visitor_code === "string"
                                ? log.visitor?.visitor_code
                                : "N/A"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {typeof log.visitor?.mobile === "string"
                                ? log.visitor?.mobile
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {log?.visitor?.createdAt
                          ? formatDate(log.visitor.createdAt)
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        <div>
                          {typeof log.project?.project_name === "string"
                            ? log?.project?.project_name
                            : "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={log.latest_visit?.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          Start date{" "}
                          {log?.tag?.tag_start_date
                            ? formatDate(log.tag.tag_start_date)
                            : "N/A"}
                        </div>
                        <div>
                          End date{" "}
                          {log?.tag?.tag_expiry_date
                            ? formatDate(log.tag.tag_expiry_date)
                            : "N/A"}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500">
                      No visitor referred yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <ImageModal
          isOpen={modal.isOpen}
          src={modal.src}
          alt={modal.alt}
          onClose={closeModal}
        />
      </div>
    </Layout>
  );
};
export default BrokerDetails;