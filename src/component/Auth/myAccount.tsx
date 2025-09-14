import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../reuseable/Layout";
import { IMAGE_BASE_URL } from "../../config/apiRoutes";
import {
  User,
  Edit,
  Mail,
  Phone,
  Building,
  Calendar,
  UserCircle,
} from "lucide-react";
import { getUserProfileRequest } from "../../redux/actions/authActions";
import type { RootState } from "../../redux/reducers/rootReducers";

const MyAccount: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    if (!profile) {
      dispatch(getUserProfileRequest());
    }
  }, [profile, dispatch]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const DetailItem: React.FC<{
    icon: React.ElementType;
    label: string;
    value?: string;
  }> = ({ icon: Icon, label, value }) => (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-base font-medium text-gray-900">{value || "N/A"}</p>
      </div>
    </div>
  );

  if (isLoading || !profile) {
    return (
      <Layout title="My Account">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gyay-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="My Account" subtitle="View and manage your profile details">
      <div className="p-4">
        <div className="max-w-full mx-auto bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6 flex justify-between items-start">
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                {profile?.user?.profilePic ? (
                  <img
                    src={`${IMAGE_BASE_URL}/profile/${profile?.user?.profilePic}`}
                    alt={profile?.user?.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User className="w-10 h-10 text-gray-500" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.user?.name}
                </h1>
                <p className="text-md text-gray-600">{profile?.user?.email}</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${profile?.user?.is_active
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {profile?.user?.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate("/edit-profile")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>

          <div className="border-t border-gray-200">
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <DetailItem
                icon={Mail}
                label="Email Address"
                value={profile?.user?.email}
              />
              <DetailItem
                icon={Phone}
                label="Mobile Number"
                value={profile?.user?.mobile}
              />
              <DetailItem
                icon={User}
                label="Username"
                value={profile?.user?.username}
              />
              <DetailItem
                icon={UserCircle}
                label="User ID"
                value={profile?.user?.id}
              />
              <DetailItem
                icon={Building}
                label="Role"
                value={profile?.user?.role?.name}
              />
              <DetailItem
                icon={Calendar}
                label="Joined On"
                value={formatDate(profile?.user?.createdAt)}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyAccount;