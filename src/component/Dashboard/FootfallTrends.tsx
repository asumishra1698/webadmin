import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type FootfallTrendsProps = {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  getCurrentData: () => Array<{ day: string; visitors: number }>;
};

const FootfallTrends: React.FC<FootfallTrendsProps> = ({
  selectedPeriod,
  setSelectedPeriod,
  getCurrentData,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
        Daily Footfall Trends
      </h3>
      <div className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
        <button
          onClick={() => setSelectedPeriod("daily")}
          className={`px-2 sm:px-3 py-1 rounded ${
            selectedPeriod === "daily"
              ? "text-blue-600 font-medium bg-blue-50 dark:bg-blue-900"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          Daily
        </button>
        <button
          onClick={() => setSelectedPeriod("weekly")}
          className={`px-2 sm:px-3 py-1 rounded ${
            selectedPeriod === "weekly"
              ? "text-blue-600 font-medium bg-blue-50 dark:bg-blue-900"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          Weekly
        </button>
        <button
          onClick={() => setSelectedPeriod("monthly")}
          className={`px-2 sm:px-3 py-1 rounded ${
            selectedPeriod === "monthly"
              ? "text-blue-600 font-medium bg-blue-50 dark:bg-blue-900"
              : "text-gray-400 dark:text-gray-500"
          }`}
        >
          Monthly
        </button>
      </div>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={getCurrentData()}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" stroke="#666" fontSize={10} />
        <YAxis stroke="#666" fontSize={10} />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--tw-bg-opacity,1) #fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            color: "#111827",
          }}
          wrapperStyle={{
            color: "inherit",
          }}
        />
        <Line
          type="monotone"
          dataKey="visitors"
          stroke="#EF4444"
          strokeWidth={2}
          dot={{ fill: "#EF4444", strokeWidth: 2, r: 3 }}
          activeDot={{ r: 5, stroke: "#EF4444", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default FootfallTrends;