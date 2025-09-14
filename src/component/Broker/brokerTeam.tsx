import React, { useEffect } from "react";
import Layout from "../../reuseable/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Eye } from "lucide-react";
import {
  getBrokerTeamRequest,
  updateBrokerTeamMemberStatusRequest,
} from "../../redux/actions/brokerActions";
import type { RootState } from "../../redux/store";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";

const BrokerTeam: React.FC = () => {
  const dispatch = useDispatch();

  const { team = [], loading } = useSelector(
    (state: RootState) => state.brokers
  );

  useDocumentMeta({
    title: "Broker Team",
    description: "Manage and view the team members of the broker",
  });

  const { brokerId } = useParams<{ brokerId: string }>();

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
    { value: "disabled", label: "Disabled" },
  ];

const handleStatusChange = (memberId: string, newStatus: string) => {
  if (!brokerId) return;
  dispatch(
    updateBrokerTeamMemberStatusRequest(brokerId, { memberId, status: newStatus })
  );
};

  useEffect(() => {
    if (brokerId) {
      dispatch(getBrokerTeamRequest(brokerId));
    }
  }, [dispatch, brokerId]);
 

  if (!brokerId) {
    return (
      <Layout title="Broker Team" subtitle="No broker ID provided">
        <div className="p-4">
          <p className="text-red-500">No broker ID provided in the URL.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Broker Team"
      subtitle="View broker's team members"
      showBackButton={true}
      backButtonLink={-1}
    >
      <div className="p-4">
        <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-6">PHOTO</th>
                <th className="py-3 px-6">NAME</th>
                <th className="py-3 px-6">EMAIL</th>
                <th className="py-3 px-6">MOBILE</th>
                <th className="py-3 px-6">USERNAME</th>
                <th className="py-3 px-6">STATUS</th>
                <th className="py-3 px-6">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : team.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    No team members found.
                  </td>
                </tr>
              ) : (
                team.map((member: any) => (
                  <tr key={member._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={
                          member.profile_picture ||
                          "https://www.iqsetters.com/assets/iqsetters_logo_small_new.png"
                        }
                        alt={member.full_name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-[#14133B]">
                      {member.full_name}
                    </td>
                    <td className="px-6 py-4">{member.email_address}</td>
                    <td className="px-6 py-4">{member.mobile_number}</td>
                    <td className="px-6 py-4">{member.user_name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === "active"
                            ? "bg-green-100 text-green-700"
                            : member.status === "pending"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {member.status.charAt(0).toUpperCase() +
                          member.status.slice(1)}
                      </span>
                      {/* Status toolkit dropdown */}
                      <select
                        value={member.status}
                        onChange={(e) =>
                          handleStatusChange(member._id, e.target.value)
                        }
                        className="ml-2 px-2 py-1 rounded border text-xs"
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default BrokerTeam;