import React, { useState, useEffect } from "react";
import Layout from "../../reuseable/Layout";
import sitewisefootfallIcon from "../../assets/icons/sitewisefootfall.png";
import expiredtagsIcon from "../../assets/icons/expiredtags.png";
import activtagsIcon from "../../assets/icons/activtags.png";
import totalvisitorsIcons from "../../assets/icons/totalvisitors.png";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  Filter,
  ChevronDown,
} from "lucide-react";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";

interface ProjectData {
  id: number;
  name: string;
  location: string;
  visitors: number;
  brokers: number;
  conversion: number;
  cvr: string;
  icon: string;
}

const ManageReports: React.FC = () => {
  useDocumentMeta({
    title: `Manage Reports`,
    description: "Manage reports and their details across your organization",
  });
  const [loading, setLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState("This Month");
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [activeTab, setActiveTab] = useState("Project Reports");

  // Sample data for charts
  const monthlyFootfallData = [
    { month: "Jan", visitors: 120 },
    { month: "Feb", visitors: 150 },
    { month: "Mar", visitors: 180 },
    { month: "Apr", visitors: 220 },
    { month: "May", visitors: 250 },
    { month: "Jun", visitors: 280 },
    { month: "Jul", visitors: 310 },
    { month: "Aug", visitors: 290 },
    { month: "Sep", visitors: 320 },
    { month: "Oct", visitors: 350 },
    { month: "Nov", visitors: 280 },
    { month: "Dec", visitors: 300 },
  ];

  const tagDistributionData = [
    { name: "Active", value: 45, color: "#3B82F6" },
    { name: "Expiring in 7 Days", value: 25, color: "#F59E0B" },
    { name: "Expiring in 30 Days", value: 20, color: "#10B981" },
    { name: "Expired", value: 10, color: "#EF4444" },
  ];

  const projectsData: ProjectData[] = [
    {
      id: 1,
      name: "The Pinnacle",
      location: "Mumbai",
      visitors: 2564,
      brokers: 35,
      conversion: 16.2,
      cvr: "42 mins",
      icon: "🏢",
    },
    {
      id: 2,
      name: "Green Valley",
      location: "Pune",
      visitors: 2100,
      brokers: 28,
      conversion: 18.7,
      cvr: "38 mins",
      icon: "🌿",
    },
    {
      id: 3,
      name: "Urban Heights",
      location: "Bangalore",
      visitors: 1850,
      brokers: 32,
      conversion: 21.8,
      cvr: "51 mins",
      icon: "🏙️",
    },
    {
      id: 4,
      name: "Skyline Residency",
      location: "Delhi",
      visitors: 1650,
      brokers: 22,
      conversion: 15.3,
      cvr: "45 mins",
      icon: "🏗️",
    },
    {
      id: 5,
      name: "Urban Heights",
      location: "Noida",
      visitors: 1400,
      brokers: 19,
      conversion: 14.6,
      cvr: "49 mins",
      icon: "🏙️",
    },
    {
      id: 6,
      name: "Green Valley",
      location: "Gurgaon",
      visitors: 1200,
      brokers: 17,
      conversion: 16.7,
      cvr: "36 mins",
      icon: "🌿",
    },
    {
      id: 7,
      name: "The Pinnacle",
      location: "Chennai",
      visitors: 980,
      brokers: 15,
      conversion: 18.2,
      cvr: "32 mins",
      icon: "🏢",
    },
  ];

  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    loadData();
  }, []);

  const getLocationColor = (location: string) => {
    const colors: { [key: string]: string } = {
      Mumbai: "bg-blue-100 text-blue-800",
      Pune: "bg-green-100 text-green-800",
      Bangalore: "bg-purple-100 text-purple-800",
      Delhi: "bg-red-100 text-red-800",
      Noida: "bg-yellow-100 text-yellow-800",
      Gurgaon: "bg-indigo-100 text-indigo-800",
      Chennai: "bg-pink-100 text-pink-800",
    };
    return colors[location] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">           
        <div className="rounded-xl mb-4">
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">
                Date Range
              </span>
              <div className="relative">
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                >
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Last 3 Months</option>
                  <option>Last 6 Months</option>
                  <option>This Year</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">Project</span>
              <div className="relative">
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 min-w-[140px]"
                >
                  <option>All Projects</option>
                  <option>The Pinnacle</option>
                  <option>Green Valley</option>
                  <option>Urban Heights</option>
                  <option>Skyline Residency</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors h-fit">
              <Filter className="w-4 h-4" />
              Apply Filters
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600 text-xs sm:text-sm font-medium">
                Total Visitors
              </h3>
              <div className="p-2 sm:p-3 bg-red-100 rounded-full">
                <img
                  src={totalvisitorsIcons}
                  alt="Total Visitors"
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
                Active Tags
              </h3>
              <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
                <img
                  src={activtagsIcon}
                  alt="Active Tags"
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
                Expired Tags
              </h3>
              <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
                <img
                  src={expiredtagsIcon}
                  alt="Expired Tags"
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
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
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
     
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Monthly Visitor Footfall
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <button className="text-blue-600 font-medium">Daily</button>
                <button className="text-gray-400">Weekly</button>
                <button className="text-gray-400">Monthly</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyFootfallData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#EF4444", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Tag Distribution Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Tag Distribution
            </h3>
            <div className="flex items-center justify-between">
              <ResponsiveContainer width="60%" height={250}>
                <PieChart>
                  <Pie
                    data={tagDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {tagDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="w-40 space-y-3">
                {tagDistributionData.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <div className="text-sm text-gray-600">{item.name}</div>
                      <div className="text-sm font-medium text-gray-900">
                        {item.value}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("Project Reports")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "Project Reports"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Project Reports
              </button>
              <button
                onClick={() => setActiveTab("Broker Performance")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "Broker Performance"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Broker Performance
              </button>
            </div>
          </div>

          {/* Project Reports Table */}
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 text-xs font-medium text-gray-600 uppercase tracking-wide">
                      PROJECT NAME
                    </th>
                    <th className="text-left py-3 text-xs font-medium text-gray-600 uppercase tracking-wide">
                      VISITORS
                    </th>
                    <th className="text-left py-3 text-xs font-medium text-gray-600 uppercase tracking-wide">
                      BROKERS VISITED
                    </th>
                    <th className="text-left py-3 text-xs font-medium text-gray-600 uppercase tracking-wide">
                      CONVERSIONS
                    </th>
                    <th className="text-left py-3 text-xs font-medium text-gray-600 uppercase tracking-wide">
                      AVG. VISIT DURATION
                    </th>
                    <th className="text-left py-3 text-xs font-medium text-gray-600 uppercase tracking-wide">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {projectsData.map((project) => (
                    <tr
                      key={project.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{project.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">
                              {project.name}
                            </div>
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getLocationColor(
                                project.location
                              )}`}
                            >
                              {project.location}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-900 font-medium">
                        {project.visitors.toLocaleString()}
                      </td>
                      <td className="py-4 text-gray-900 font-medium">
                        {project.brokers}
                      </td>
                      <td className="py-4">
                        <span className="text-green-600 font-medium">
                          {project.conversion}%
                        </span>
                      </td>
                      <td className="py-4 text-gray-600">{project.cvr}</td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageReports;