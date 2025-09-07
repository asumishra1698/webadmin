import type { Dispatch, SetStateAction } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import dashboardIcon from "../assets/icons/dashboard.png";
import visitorsIcon from "../assets/icons/visitors.png";
import brokersIcon from "../assets/icons/brokers.png";
import projectsIcon from "../assets/icons/projects.png";
import reportsIcon from "../assets/icons/reports.png";
import teamIcon from "../assets/icons/team.png";
import settingsIcon from "../assets/icons/settings.png";
import supportIcon from "../assets/icons/support.png";
import financeCommissionIcon from "../assets/icons/finance.png";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const handleCollapseToggle = () => setIsCollapsed((prev) => !prev);

  const isActive = (paths: string | string[]) => {
    if (Array.isArray(paths)) {
      return paths.some((p) => currentPath.startsWith(p));
    }
    return currentPath === paths || currentPath.startsWith(paths + "/");
  };

  const menuItems = [
    { icon: dashboardIcon, label: "Dashboard", path: "/dashboard" },
    { icon: visitorsIcon, label: "Pages", path: "/pages" },
    { icon: brokersIcon, label: "Blogs", path: ["/blogs", "/blog-category", "/blog-tag"] },
    { icon: projectsIcon, label: "Services", path: "/services" },
    { icon: projectsIcon, label: "Products", path: ["/products", "/product-categories", "/product-tags", "/product-brands"], },
    { icon: projectsIcon, label: "Leads", path: "/leads" },
    { icon: reportsIcon, label: "Reports & Analytics", path: "/reports" },
    { icon: teamIcon, label: "Team", path: "/team" },
    {
      icon: financeCommissionIcon,
      label: "Finance & Commission",
      path: "/finance-commission",
    },
    { icon: settingsIcon, label: "Admin Settings", path: "/admin-settings" },
    { icon: supportIcon, label: "Support Tickets", path: "/support-tickets" },
    { icon: supportIcon, label: "Logs", path: "/logs" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full flex flex-col transition-all duration-300 z-50 ${isCollapsed ? "w-18" : "w-64"
        } bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow`}
    >
      <button
        onClick={handleCollapseToggle}
        className="absolute bottom-6 -right-3 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
      >
        {isCollapsed ? (
          <ArrowRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        ) : (
          <ArrowLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <img
            src="https://gonardweb.com/wp-content/uploads/2025/08/fav.png"
            alt="logo"
            className={`w-10 h-auto transition-all duration-200 ${isCollapsed ? "block" : "hidden"
              }`}
          />
          {!isCollapsed && (
            <span className="text-xl font-bold">
              {/* Show dark logo for dark theme, white logo for light theme */}
              <img
                src="https://gonardweb.com/wp-content/uploads/2025/08/gonardwebdark.png"
                alt="logo"
                width="140px"
                className="block dark:hidden"
              />
              <img
                src="https://gonardweb.com/wp-content/uploads/2023/02/gonardwebwhite.png"
                alt="logo"
                width="140px"
                className="hidden dark:block"
              />
            </span>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item, index) => {
            return (
              <li key={index}>
                <Link to={Array.isArray(item.path) ? item.path[0] : item.path}
                  className={`flex items-center px-4 py-4 rounded-lg transition-all duration-200 group ${isActive(item.path)
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-100 border-r-2 border-gray-500 dark:border-gray-700"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
                    }`}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-auto h-auto flex-shrink-0"
                  />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
