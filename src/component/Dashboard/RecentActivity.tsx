import React from "react";
type Activity = {
  id: number;
  message: string;
  timestamp: string;
  type: string;
};

type RecentActivityProps = {
  recentActivities: Activity[];
  getActivityDotColor: (type: string) => string;
};
const RecentActivity: React.FC<RecentActivityProps> = ({
  recentActivities,
  getActivityDotColor,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex items-center justify-between mb-3 sm:mb-4">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
        Recent Activity
      </h3>
      <button className="text-red-600 dark:text-red-400 text-xs sm:text-sm font-medium">
        View All →
      </button>
    </div>
    <div className="space-y-3 sm:space-y-4">
      {recentActivities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start space-x-2 sm:space-x-3"
        >
          <div
            className={`w-2 h-2 rounded-full mt-1 sm:mt-2 ${getActivityDotColor(
              activity.type
            )}`}
          ></div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight">
              {activity.message}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RecentActivity;