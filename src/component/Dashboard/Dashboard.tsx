import React, { useState, useEffect } from "react";
import Layout from "../../reuseable/Layout";
import DashboardStats from "./DashboardStats";
import FootfallTrends from "./FootfallTrends";
import TagForecast from "./TagForecast";
import ProjectPerformanceTable from "./ProjectPerformanceTable";
import QuickSettings from "./QuickSettings";
import RecentActivity from "./RecentActivity";

const Dashboard: React.FC = () => {
  type Activity = {
    id: number;
    message: string;
    timestamp: string;
    type: string;
  };
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("daily");
  const [emailReportEnabled, setEmailReportEnabled] = useState(true);
  const [expiryAlertsEnabled, setExpiryAlertsEnabled] = useState(true);
  const [mobileNotificationsEnabled, setMobileNotificationsEnabled] =
    useState(false);

  const dailyTrendsData = [
    { day: "Mon", visitors: 120 },
    { day: "Tue", visitors: 150 },
    { day: "Wed", visitors: 180 },
    { day: "Thu", visitors: 165 },
    { day: "Fri", visitors: 200 },
    { day: "Sat", visitors: 240 },
    { day: "Sun", visitors: 190 },
  ];
  const weeklyTrendsData = [
    { day: "Week 1", visitors: 850 },
    { day: "Week 2", visitors: 920 },
    { day: "Week 3", visitors: 1100 },
    { day: "Week 4", visitors: 980 },
  ];
  const monthlyTrendsData = [
    { day: "Jan", visitors: 3200 },
    { day: "Feb", visitors: 3800 },
    { day: "Mar", visitors: 4200 },
    { day: "Apr", visitors: 3900 },
    { day: "May", visitors: 4500 },
    { day: "Jun", visitors: 4100 },
  ];
  const getCurrentData = () => {
    switch (selectedPeriod) {
      case "weekly":
        return weeklyTrendsData;
      case "monthly":
        return monthlyTrendsData;
      default:
        return dailyTrendsData;
    }
  };
  const visitorsBreakdownData = [
    { name: "Active", value: 45, color: "#1E3A8A" },
    { name: "Expiring in 7 Days", value: 25, color: "#F59E0B" },
    { name: "Expiring in 30 Days", value: 20, color: "#3B82F6" },
    { name: "Expired", value: 10, color: "#EF4444" },
  ];
  const projectPerformanceData = [
    {
      name: "Skyline Heights",
      location: "Mumbai",
      visitors: 1356,
      brokers: 36,
      conversion: 24.5,
      locationColor: "bg-blue-100 text-blue-800",
    },
    {
      name: "Green Valley",
      location: "Pune",
      visitors: 1356,
      brokers: 36,
      conversion: 24.5,
      locationColor: "bg-green-100 text-green-800",
    },
    {
      name: "Urban Square",
      location: "Banglore",
      visitors: 1356,
      brokers: 36,
      conversion: 24.5,
      locationColor: "bg-purple-100 text-purple-800",
    },
    {
      name: "Coastal Breeze",
      location: "Noida",
      visitors: 1356,
      brokers: 36,
      conversion: 24.5,
      locationColor: "bg-yellow-100 text-yellow-800",
    },
    {
      name: "Metro Heights",
      location: "Delhi",
      visitors: 1356,
      brokers: 36,
      conversion: 24.5,
      locationColor: "bg-red-100 text-red-800",
    },
    {
      name: "Urban Square",
      location: "Mumbai",
      visitors: 1356,
      brokers: 36,
      conversion: 24.5,
      locationColor: "bg-blue-100 text-blue-800",
    },
    {
      name: "Green Valley",
      location: "Mumbai",
      visitors: 1356,
      brokers: 36,
      conversion: 24.5,
      locationColor: "bg-blue-100 text-blue-800",
    },
  ];
  useEffect(() => {
    const loadDashboardData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setRecentActivities([
        {
          id: 1,
          message: "New Broker Rahul Sharma Registered",
          timestamp: "10 minutes ago",
          type: "broker",
        },
        {
          id: 2,
          message: "25 New Tags Issued At Skyline Heights",
          timestamp: "1 hour ago",
          type: "tags_issued",
        },
        {
          id: 3,
          message: "12 Tags Expired At Green Valley",
          timestamp: "2 hour ago",
          type: "tags_expired",
        },
        {
          id: 4,
          message: "Monthly Report For June 2025 is Ready",
          timestamp: "3 hours ago",
          type: "report",
        },
      ]);
      setLoading(false);
    };
    loadDashboardData();
  }, []);
  const getActivityDotColor = (type: string) => {
    switch (type) {
      case "broker":
        return "bg-blue-500";
      case "tags_issued":
        return "bg-green-500";
      case "tags_expired":
        return "bg-yellow-500";
      case "report":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-500"></div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="p-3 sm:p-6 bg-gray-50 min-h-screen">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Overview
          </h1>
          <div className="flex items-center mt-2 text-xs sm:text-sm text-gray-600">
            <span>Real-time visitor management statistics</span>
          </div>
        </div>
        <DashboardStats />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <FootfallTrends
            selectedPeriod={selectedPeriod}
            setSelectedPeriod={setSelectedPeriod}
            getCurrentData={getCurrentData}
          />
          <TagForecast visitorsBreakdownData={visitorsBreakdownData} />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 sm:gap-6">
          <ProjectPerformanceTable
            projectPerformanceData={projectPerformanceData}
          />
          <div className="space-y-3 sm:space-y-6">
            <QuickSettings
              emailReportEnabled={emailReportEnabled}
              setEmailReportEnabled={setEmailReportEnabled}
              expiryAlertsEnabled={expiryAlertsEnabled}
              setExpiryAlertsEnabled={setExpiryAlertsEnabled}
              mobileNotificationsEnabled={mobileNotificationsEnabled}
              setMobileNotificationsEnabled={setMobileNotificationsEnabled}
            />
            <RecentActivity
              recentActivities={recentActivities}
              getActivityDotColor={getActivityDotColor}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;