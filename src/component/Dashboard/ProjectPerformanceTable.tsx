import React from "react";
import { Eye, Edit, Search } from "lucide-react";

type ProjectPerformance = {
  name: string;
  location: string;
  visitors: number;
  brokers: number;
  conversion: number;
  locationColor: string;
};

type ProjectPerformanceTableProps = {
  projectPerformanceData: ProjectPerformance[];
};

const ProjectPerformanceTable: React.FC<ProjectPerformanceTableProps> = ({
  projectPerformanceData,
}) => (
  <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
        Site/Project Performance
      </h3>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-3 h-3 sm:w-4 sm:h-4" />
          <input
            type="text"
            placeholder="Search Projects"
            className="w-full sm:w-auto pl-8 sm:pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
        </div>
        <button className="text-red-600 dark:text-red-400 text-xs sm:text-sm font-medium whitespace-nowrap">
          View All Projects →
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-700">
            <th className="text-left py-2 sm:py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              NAME
            </th>
            <th className="text-left py-2 sm:py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              LOCATION
            </th>
            <th className="text-left py-2 sm:py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              VISITORS
            </th>
            <th className="text-left py-2 sm:py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              BROKERS
            </th>
            <th className="text-left py-2 sm:py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              CONVERSION
            </th>
            <th className="text-left py-2 sm:py-3 text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {projectPerformanceData.map((project, index) => (
            <tr
              key={index}
              className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <td className="py-3 sm:py-4">
                <span className="font-medium text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                  {project.name}
                </span>
              </td>
              <td className="py-3 sm:py-4">
                <span
                  className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${project.locationColor}`}
                >
                  {project.location}
                </span>
              </td>
              <td className="py-3 sm:py-4 text-gray-900 dark:text-gray-100 font-medium text-xs sm:text-sm">
                {project.visitors.toLocaleString()}
              </td>
              <td className="py-3 sm:py-4 text-gray-900 dark:text-gray-100 font-medium text-xs sm:text-sm">
                {project.brokers}
              </td>
              <td className="py-3 sm:py-4">
                <span className="text-green-600 dark:text-green-400 font-medium text-xs sm:text-sm">
                  {project.conversion}%
                </span>
              </td>
              <td className="py-3 sm:py-4">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <button className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button className="p-1 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 rounded">
                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProjectPerformanceTable;