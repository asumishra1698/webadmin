import React from "react";
import { TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import totalvisitorsIcons from "../../assets/icons/totalvisitors.png";
import activtagsIcon from "../../assets/icons/activtags.png";
import expiredtagsIcon from "../../assets/icons/expiredtags.png";
import sitewisefootfallIcon from "../../assets/icons/sitewisefootfall.png";

const DashboardStats: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div
        className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 cursor-pointer"
        onClick={() => navigate("/visits")}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 text-xs sm:text-sm font-medium">
            Total Users
          </h3>
          <div className="p-2 sm:p-3 bg-red-100 rounded-full">
            <img
              src={totalvisitorsIcons}
              alt="Total Users"
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
          </div>
        </div>
        <div className="mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            3,847
          </span>
        </div>
        <div className="flex items-center text-green-600 text-xs sm:text-sm">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span>12% from last month</span>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 text-xs sm:text-sm font-medium">
            Active Products
          </h3>
          <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
            <img
              src={activtagsIcon}
              alt="Active Products"
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
          </div>
        </div>
        <div className="mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            1,264
          </span>
        </div>
        <div className="flex items-center text-green-600 text-xs sm:text-sm">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span>8.3% from last month</span>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 text-xs sm:text-sm font-medium">
            Total Orders
          </h3>
          <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
            <img
              src={expiredtagsIcon}
              alt="Total Orders"
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
          </div>
        </div>
        <div className="mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            586
          </span>
        </div>
        <div className="flex items-center text-red-600 text-xs sm:text-sm">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 rotate-180" />
          <span>4.2% from last month</span>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-gray-600 text-xs sm:text-sm font-medium">
            Site-wise Footfall
          </h3>
          <div className="p-2 sm:p-3 bg-green-100 rounded-full">
            <img
              src={sitewisefootfallIcon}
              alt="Site-wise Footfall"
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
          </div>
        </div>
        <div className="mb-2">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">
            12
          </span>
        </div>
        <div className="flex items-center text-green-600 text-xs sm:text-sm">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span>2 new sites added</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
