import React from "react";
import Layout from "../../reuseable/Layout";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Calendar,
  TrendingUp,
  TrendingDown,
  Ticket as TicketIcon,
  CircleDot,
  Loader,
  CheckCircle,
} from "lucide-react";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";

interface Ticket {
  id: number;
  raisedBy: {
    name: string;
    role: string;
    avatar: string;
  };
  subject: string;
  category: string;
  status: "Open" | "In Progress" | "Resolved";
  createdOn: string;
  updatedOn: string;
}

const ticketsData: Ticket[] = [
  {
    id: 1,
    raisedBy: {
      name: "Robert Fox",
      role: "Reception",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    subject: "Access card not working for new broker",
    category: "Application Lag",
    status: "Open",
    createdOn: "24/07/2025",
    updatedOn: "24/07/2025",
  },
  {
    id: 2,
    raisedBy: {
      name: "Devon Lane",
      role: "Broker",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    subject: "Access card not working for new broker",
    category: "Application Lag",
    status: "In Progress",
    createdOn: "24/07/2025",
    updatedOn: "24/07/2025",
  },
  {
    id: 3,
    raisedBy: {
      name: "Jenny Wilson",
      role: "Reception",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    subject: "Access card not working for new broker",
    category: "Application Lag",
    status: "Open",
    createdOn: "24/07/2025",
    updatedOn: "24/07/2025",
  },
  {
    id: 4,
    raisedBy: {
      name: "Brooklyn Simmons",
      role: "Reception",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    subject: "Access card not working for new broker",
    category: "Application Lag",
    status: "In Progress",
    createdOn: "24/07/2025",
    updatedOn: "24/07/2025",
  },
  {
    id: 5,
    raisedBy: {
      name: "Eleanor Pena",
      role: "Broker",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    subject: "Access card not working for new broker",
    category: "Application Lag",
    status: "Resolved",
    createdOn: "24/07/2025",
    updatedOn: "24/07/2025",
  },
  {
    id: 6,
    raisedBy: {
      name: "Wade Warren",
      role: "Broker",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    subject: "Access card not working for new broker",
    category: "Application Lag",
    status: "Open",
    createdOn: "24/07/2025",
    updatedOn: "24/07/2025",
  },
  {
    id: 7,
    raisedBy: {
      name: "Leslie Alexander",
      role: "Broker",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    subject: "Access card not working for new broker",
    category: "Application Lag",
    status: "Resolved",
    createdOn: "24/07/2025",
    updatedOn: "24/07/2025",
  },
  {
    id: 8,
    raisedBy: {
      name: "Devon Lane",
      role: "Broker",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    subject: "Access card not working for new broker",
    category: "Application Lag",
    status: "In Progress",
    createdOn: "24/07/2025",
    updatedOn: "24/07/2025",
  },
];

const StatCard: React.FC<{
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
  icon: React.ReactNode;
  iconBgColor: string;
}> = ({ title, value, trend, trendDirection, icon, iconBgColor }) => {
  const trendColor =
    trendDirection === "up"
      ? "text-green-600"
      : trendDirection === "down"
      ? "text-red-600"
      : "text-gray-500";
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-gray-600 text-xs sm:text-sm font-medium">
          {title}
        </h3>
        <div className={`p-2 sm:p-3 ${iconBgColor} rounded-full`}>{icon}</div>
      </div>
      <div className="mb-2">
        <span className="text-2xl sm:text-3xl font-bold text-gray-900">
          {value}
        </span>
      </div>
      <div className={`flex items-center text-xs sm:text-sm ${trendColor}`}>
        {trendDirection === "up" && (
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
        )}
        {trendDirection === "down" && (
          <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
        )}
        <span>{trend}</span>
      </div>
    </div>
  );
};

const getStatusBadge = (status: Ticket["status"]) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-medium rounded-full";
  switch (status) {
    case "Open":
      return (
        <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
          {status}
        </span>
      );
    case "In Progress":
      return (
        <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
          {status}
        </span>
      );
    case "Resolved":
      return (
        <span className={`${baseClasses} bg-green-100 text-green-800`}>
          {status}
        </span>
      );
  }
};

const ManageSupportTickets: React.FC = () => {
  useDocumentMeta({
    title: `Manage Support Tickets`,
    description:
      "Manage support tickets and their details across your organization",
  });
  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Tickets"
            value="200"
            trend="12% from last month"
            trendDirection="up"
            icon={<TicketIcon className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" />}
            iconBgColor="bg-red-100"
          />
          <StatCard
            title="Open Tickets"
            value="140"
            trend="8.3% from last month"
            trendDirection="up"
            icon={<CircleDot className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500" />}
            iconBgColor="bg-blue-100"
          />
          <StatCard
            title="In Progress"
            value="130"
            trend="4.2% from last month"
            trendDirection="down"
            icon={<Loader className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500" />}
            iconBgColor="bg-yellow-100"
          />
          <StatCard
            title="Resolved"
            value="12"
            trend="2 new sites added"
            trendDirection="up"
            icon={
              <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-green-500" />
            }
            iconBgColor="bg-green-100"
          />
        </div>

        {/* Filters and Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 w-full sm:w-64"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <select className="appearance-none bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[140px]">
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
              <div className="relative">
                <button className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 min-w-[140px]">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Date Range</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-3 font-medium text-gray-600 uppercase tracking-wider">
                    Raised By
                  </th>
                  <th className="text-left p-3 font-medium text-gray-600 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="text-left p-3 font-medium text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left p-3 font-medium text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left p-3 font-medium text-gray-600 uppercase tracking-wider">
                    Created On
                  </th>
                  <th className="text-left p-3 font-medium text-gray-600 uppercase tracking-wider">
                    Updated On
                  </th>
                  <th className="text-left p-3 font-medium text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ticketsData.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={ticket.raisedBy.avatar}
                          alt={ticket.raisedBy.name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-800">
                            {ticket.raisedBy.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {ticket.raisedBy.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-gray-700">{ticket.subject}</td>
                    <td className="p-3 text-gray-700">{ticket.category}</td>
                    <td className="p-3">{getStatusBadge(ticket.status)}</td>
                    <td className="p-3 text-gray-700">{ticket.createdOn}</td>
                    <td className="p-3 text-gray-700">{ticket.updatedOn}</td>
                    <td className="p-3">
                      <Link to={`/support-tickets/detail/${ticket.id}`}>
                        <button className="bg-gray-800 text-white px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-gray-900 transition-colors">
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageSupportTickets;