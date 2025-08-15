import React, { useState, useEffect, useRef, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ArrowLeft, Search, User } from "lucide-react";
import { getUserProfileRequest } from "../redux/actions/authActions";

import {
  BsPersonCircle,
  BsBoxArrowRight,
  BsBell,
  BsSun,
  BsMoon,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { IMAGE_BASE_URL } from "../config/apiRoutes";

interface LayoutProps {
  children: ReactNode;
  header?: ReactNode;
  title?: string;
  subtitle?: string;
  // New props for search and actions
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actionButtons?: React.ReactNode;
  isHeaderFixed?: boolean;
  showBackButton?: boolean;
  backButtonLink?: string;
}

const SIDEBAR_WIDTH = "16rem";
const COLLAPSED_SIDEBAR_WIDTH = "5rem";
const HEADER_HEIGHT = 72;

const Layout: React.FC<LayoutProps> = ({
  children,
  header,
  title,
  subtitle,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  actionButtons,
  isHeaderFixed = false,
  showBackButton = false,
  backButtonLink,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const profile = useSelector((state: RootState) => state.auth.user);
  console.log("Profile Data:", profile);

  useEffect(() => {
    dispatch(getUserProfileRequest());
  }, []);

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifButtonRef = useRef<HTMLButtonElement>(null);
  const notifDropdownRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const getPageTitle = () => {
    if (title) return title;

    const path = location.pathname;
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/pages":
        return "Pages";
      case "/blogs":
        return "Blogs";
      case "/services":
        return "Services";
      case "/reports":
        return "Reports & Analytics";
      case "/team":
        return "Team";
      case "/admin-settings":
        return "Admin Settings";
      case "/support-tickets":
        return "Support Tickets";
      case "/faqs":
        return "Faq's";
      default:
        return "Admin Panel";
    }
  };

  const getPageSubtitle = () => {
    if (subtitle) return subtitle;
    const path = location.pathname;
    switch (path) {
      case "/visitors":
        return "Track and manage property visitors";
      case "/brokers":
        return "Manage your real estate broker network";
      case "/projects":
        return "Manage real estate site data across sales network";
      case "/reports":
        return "Analyze performance and generate insights";
      case "/team":
        return "Manage team members and permissions";
      case "/admin-settings":
        return "Configure system settings and preferences";
      case "/support-tickets":
        return "Handle customer support requests";
      case "/faqs":
        return "Frequently Asked Questions";
      default:
        return "";
    }
  };

  const notifications = [
    {
      id: 1,
      user: "Admin",
      message: "Your profile has been updated.",
      time: "2 min ago",
      avatar:
        "https://ui-avatars.com/api/?name=Admin&background=e74c3c&color=fff",
    },
    {
      id: 2,
      user: "Support",
      message: "New support ticket assigned.",
      time: "10 min ago",
      avatar:
        "https://ui-avatars.com/api/?name=Support&background=e74c3c&color=fff",
    },
    {
      id: 3,
      user: "System",
      message: "System maintenance scheduled.",
      time: "1 hour ago",
      avatar:
        "https://ui-avatars.com/api/?name=System&background=e74c3c&color=fff",
    },
  ];

  // Dropdown close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        isNotifOpen &&
        notifDropdownRef.current &&
        !notifDropdownRef.current.contains(event.target as Node) &&
        notifButtonRef.current &&
        !notifButtonRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNotifOpen, isDropdownOpen]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const leftOffset = isCollapsed ? COLLAPSED_SIDEBAR_WIDTH : SIDEBAR_WIDTH;
  const headerWidth = `calc(100% - ${leftOffset})`;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  const handleMyProfile = () => navigate("/my-account");

  const handleChangePin = () => {
    console.log("Change PIN clicked");
  };

  const hasSearchOrActions = searchPlaceholder || actionButtons;
  const extraHeaderHeight = hasSearchOrActions ? 70 : 0;
  const totalHeaderHeight = HEADER_HEIGHT + extraHeaderHeight;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div className="flex-1 flex flex-col">
        <header
          className="p-4 flex justify-between items-center bg-white border-b border-gray-200 fixed z-30 top-0"
          style={{
            left: leftOffset,
            right: 0,
            height: HEADER_HEIGHT,
            width: headerWidth,
            transition: "left 0.3s, width 0.3s",
          }}
        >
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={() =>
                  backButtonLink ? navigate(backButtonLink) : navigate(-1)
                }
                className="mr-2 p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className={!showBackButton ? "pl-4" : ""}>
              <h1 className="text-xl font-semibold text-gray-900">
                {getPageTitle()}
              </h1>
              <p className="text-sm text-gray-600 mt-0.5">
                {getPageSubtitle()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <BsSun className="h-5 w-5" />
              ) : (
                <BsMoon className="h-5 w-5" />
              )}
            </button>
            <div className="relative">
              <button
                ref={notifButtonRef}
                onClick={() => setIsNotifOpen((open) => !open)}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 relative"
                title="Notifications"
                aria-label="Notifications"
              >
                <BsBell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#DA0808] rounded-full border-2 border-white dark:border-gray-800"></span>
                )}
              </button>
              {isNotifOpen && (
                <div
                  ref={notifDropdownRef}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-[#14133B] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden animate-fade-in-up"
                >
                  <div className="p-4 border-b dark:border-gray-700 font-semibold text-gray-800 dark:text-gray-100">
                    Notifications
                  </div>
                  <ul className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <li className="p-4 text-gray-500 dark:text-gray-400 text-center">
                        No notifications
                      </li>
                    ) : (
                      notifications.map((notif) => (
                        <li
                          key={notif.id}
                          className="flex items-start gap-3 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        >
                          <img
                            src={notif.avatar}
                            alt={notif.user}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-800 dark:text-gray-100">
                              {notif.user}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300 text-sm">
                              {notif.message}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {notif.time}
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                  <button
                    className="w-full py-2 text-center text-[#e74c3c] dark:text-[#e74c3c] font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    onClick={() => setIsNotifOpen(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button
                className="flex items-center space-x-3 cursor-pointer p-1 pr-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                onClick={() => setIsDropdownOpen((o) => !o)}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
                aria-label="Profile menu"
                tabIndex={0}
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  {profile?.user?.profilePic ? (
                    <img
                      src={`${IMAGE_BASE_URL}/profile/${profile?.user?.profilePic}`}
                      alt={profile?.user?.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div className="text-left hidden sm:block">
                  <div className="font-semibold text-sm text-gray-800 dark:text-gray-100">
                    {profile?.user?.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {profile?.user?.email}
                  </div>
                </div>
              </button>
              <div
                className={`absolute right-0 mt-2 w-60 bg-white dark:bg-[#14133B] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 transition-all duration-200 ease-in-out transform ${
                  isDropdownOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
                tabIndex={-1}
              >
                <button
                  onClick={handleMyProfile}
                  className="flex items-center w-full py-2 px-4 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <BsPersonCircle className="w-5 h-5 text-gray-600 dark:text-gray-100" />
                  <span className="ml-3">My Profile</span>
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleChangePin();
                  }}
                  className="flex items-center w-full py-2 px-4 text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <BsPersonCircle className="w-5 h-5 text-gray-600 dark:text-gray-100" />
                  <span className="ml-3">Change Pin</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full py-2 px-4 bg-[#DA0808] text-white rounded hover:bg-red-600"
                >
                  <BsBoxArrowRight className="w-5 h-5 text-white" />
                  <span className="ml-3">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {hasSearchOrActions && (
          <div
            className={`${isHeaderFixed ? "fixed" : "sticky"} z-20 bg-gray-100`}
            style={{
              top: HEADER_HEIGHT,
              left: leftOffset,
              right: 0,
              width: headerWidth,
              transition: "left 0.3s, width 0.3s",
            }}
          >
            <div className="p-4">
              <div className="flex justify-between items-center">
                {/* Search */}
                {searchPlaceholder && (
                  <div className="relative max-w-xl">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder={searchPlaceholder}
                      value={searchValue || ""}
                      onChange={onSearchChange}
                      className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-[410px]"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                {actionButtons && (
                  <div className="flex items-center space-x-3">
                    {actionButtons}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Legacy header support */}
        {header && (
          <div
            className="fixed z-10 dark:bg-gray-900"
            style={{
              top: totalHeaderHeight,
              left: leftOffset,
              right: 0,
              width: headerWidth,
              transition: "left 0.3s, width 0.3s",
            }}
          >
            {header}
          </div>
        )}

        {/* Main Content */}
        <main
          className="flex-1 p-0 bg-gray-100 dark:bg-gray-900"
          style={{
            marginLeft: leftOffset,
            paddingTop: header
              ? totalHeaderHeight + HEADER_HEIGHT
              : isHeaderFixed && hasSearchOrActions
              ? totalHeaderHeight
              : HEADER_HEIGHT,
            transition: "margin-left 0.3s, padding-top 0.3s",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
