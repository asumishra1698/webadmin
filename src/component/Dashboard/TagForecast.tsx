import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
type VisitorsBreakdownItem = {
  name: string;
  value: number;
  color: string;
};

type TagForecastProps = {
  visitorsBreakdownData: VisitorsBreakdownItem[];
};

const TagForecast: React.FC<TagForecastProps> = ({ visitorsBreakdownData }) => (
  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
      Tag Validity & Expiry Forecast
    </h3>
    <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
      <ResponsiveContainer width="100%" height={200} className="lg:w-3/5">
        <PieChart>
          <Pie
            data={visitorsBreakdownData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {visitorsBreakdownData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="w-full lg:w-2/5 space-y-2 sm:space-y-3">
        {visitorsBreakdownData.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3"
              style={{ backgroundColor: item.color }}
            />
            <div>
              <span className="text-xs sm:text-sm text-gray-600 block">
                {item.name}
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-900">
                {item.value}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default TagForecast;
