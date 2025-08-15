import React from "react";
import {
  Clock,
  Settings,
  Mail,
  Bell,
  Smartphone,
  ChevronRight,
} from "lucide-react";
type QuickSettingsProps = {
  emailReportEnabled: boolean;
  setEmailReportEnabled: (val: boolean) => void;
  expiryAlertsEnabled: boolean;
  setExpiryAlertsEnabled: (val: boolean) => void;
  mobileNotificationsEnabled: boolean;
  setMobileNotificationsEnabled: (val: boolean) => void;
};
const QuickSettings: React.FC<QuickSettingsProps> = ({
  emailReportEnabled,
  setEmailReportEnabled,
  expiryAlertsEnabled,
  setExpiryAlertsEnabled,
  mobileNotificationsEnabled,
  setMobileNotificationsEnabled,
}) => (
  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
      Quick Settings
    </h3>
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-xs sm:text-sm font-medium text-gray-700">
          Tag Validity Setting
        </span>
        <span className="text-xs sm:text-sm text-red-600 font-medium">
          Edit
        </span>
      </div>
      <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2 sm:mr-3" />
          <span className="text-xs sm:text-sm font-medium text-gray-900">
            Default: 60 Days
          </span>
        </div>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
      </div>
    </div>
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-xs sm:text-sm font-medium text-gray-700">
          Site Settings Access
        </span>
        <span className="text-xs sm:text-sm text-red-600 font-medium">
          Manage
        </span>
      </div>
      <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 mr-2 sm:mr-3" />
          <span className="text-xs sm:text-sm font-medium text-gray-900">
            12 Sites Configured
          </span>
        </div>
        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
      </div>
    </div>
    <div>
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-xs sm:text-sm font-medium text-gray-700">
          Notification Settings
        </span>
        <span className="text-xs sm:text-sm text-red-600 font-medium">
          Configure
        </span>
      </div>
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mr-2 sm:mr-3" />
            <span className="text-xs sm:text-sm text-gray-900">
              Daily Email Report
            </span>
          </div>
          <button
            onClick={() => setEmailReportEnabled(!emailReportEnabled)}
            className={`w-9 h-5 sm:w-11 sm:h-6 rounded-full relative transition-colors duration-200 ${
              emailReportEnabled ? "bg-green-500" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                emailReportEnabled
                  ? "translate-x-4 sm:translate-x-5"
                  : "translate-x-1"
              }`}
            ></div>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mr-2 sm:mr-3" />
            <span className="text-xs sm:text-sm text-gray-900">
              Tag Expiry Alerts
            </span>
          </div>
          <button
            onClick={() => setExpiryAlertsEnabled(!expiryAlertsEnabled)}
            className={`w-9 h-5 sm:w-11 sm:h-6 rounded-full relative transition-colors duration-200 ${
              expiryAlertsEnabled ? "bg-green-500" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                expiryAlertsEnabled
                  ? "translate-x-4 sm:translate-x-5"
                  : "translate-x-1"
              }`}
            ></div>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Smartphone className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600 mr-2 sm:mr-3" />
            <span className="text-xs sm:text-sm text-gray-900">
              Mobile Notifications
            </span>
          </div>
          <button
            onClick={() =>
              setMobileNotificationsEnabled(!mobileNotificationsEnabled)
            }
            className={`w-9 h-5 sm:w-11 sm:h-6 rounded-full relative transition-colors duration-200 ${
              mobileNotificationsEnabled ? "bg-green-500" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${
                mobileNotificationsEnabled
                  ? "translate-x-4 sm:translate-x-5"
                  : "translate-x-1"
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default QuickSettings;
