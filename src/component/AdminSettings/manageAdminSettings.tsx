import React, { useState } from "react";
import {
  Mail,
  Bell,
  MapPin,
  Plus,
  X,
  ChevronDown,
  ArrowRight,
  List,
} from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "../../reuseable/Layout";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";

interface EmailRecipient {
  email: string;
  type: "admin" | "broker";
}

interface AdminSettingsData {
  defaultTagDuration: number;
  allowOverride: boolean;
  dailyEmailReport: boolean;
  tagExpiryAlerts: {
    broker: boolean;
    admin: boolean;
  };
  mobileNotifications: boolean;
  emailRecipients: EmailRecipient[];
  gpsRadius: number;
  sitesConfigured: number;
}

const ManageAdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<AdminSettingsData>({
    defaultTagDuration: 60,
    allowOverride: true,
    dailyEmailReport: true,
    tagExpiryAlerts: {
      broker: true,
      admin: true,
    },
    mobileNotifications: true,
    emailRecipients: [
      { email: "admin@realestam.com", type: "admin" },
      { email: "manager@realestam.com", type: "broker" },
    ],
    gpsRadius: 200,
    sitesConfigured: 12,
  });

  const [newEmail, setNewEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Duration options
  const durationOptions = [
    { value: 30, label: "30 Days" },
    { value: 60, label: "60 Days" },
    { value: 90, label: "90 Days" },
    { value: 120, label: "120 Days" },
    { value: 180, label: "180 Days" },
  ];

  const handleSettingChange = (key: keyof AdminSettingsData, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTagExpiryChange = (type: "broker" | "admin", value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      tagExpiryAlerts: {
        ...prev.tagExpiryAlerts,
        [type]: value,
      },
    }));
  };

  const addEmailRecipient = () => {
    if (newEmail && newEmail.includes("@")) {
      const newRecipient: EmailRecipient = {
        email: newEmail,
        type: "admin",
      };

      setSettings((prev) => ({
        ...prev,
        emailRecipients: [...prev.emailRecipients, newRecipient],
      }));

      setNewEmail("");
    }
  };

  const removeEmailRecipient = (emailToRemove: string) => {
    setSettings((prev) => ({
      ...prev,
      emailRecipients: prev.emailRecipients.filter(
        (recipient) => recipient.email !== emailToRemove
      ),
    }));
  };

  useDocumentMeta({
    title: `Admin Settings`,
    description:
      "Manage admin settings and configurations across your organization",
  });

  return (
    <Layout
      title="Admin Settings"
      subtitle="Manage system preferences, tag duration access control etc."
      isHeaderFixed={true}
    >
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center mb-6">
            Default Tag Duration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Left Column: Default Validity Period */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Default Validity Period{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DA0808] focus:border-[#DA0808]"
                >
                  <span className="text-sm text-gray-700">
                    {
                      durationOptions.find(
                        (opt) => opt.value === settings.defaultTagDuration
                      )?.label
                    }
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    {durationOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          handleSettingChange(
                            "defaultTagDuration",
                            option.value
                          );
                          setIsDropdownOpen(false);
                        }}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                This setting applies to all newly created visitor tags
              </p>
            </div>

            {/* Right Column: Allow Override */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  Allow Override by Sales Team
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Sales team can modify tag duration when creating
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer mt-1">
                <input
                  type="checkbox"
                  checked={settings.allowOverride}
                  onChange={(e) =>
                    handleSettingChange("allowOverride", e.target.checked)
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <Bell className="mr-2 h-5 w-5 text-[#DA0808]" />
            Notification Preferences
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Daily Email Report
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.dailyEmailReport}
                    onChange={(e) =>
                      handleSettingChange("dailyEmailReport", e.target.checked)
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>

              {/* Tag Expiry Alerts */}
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Tag Expiry Alerts
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600">Broker</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.tagExpiryAlerts.broker}
                        onChange={(e) =>
                          handleTagExpiryChange("broker", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-600">Admin</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.tagExpiryAlerts.admin}
                        onChange={(e) =>
                          handleTagExpiryChange("admin", e.target.checked)
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Mobile Notifications */}
              <div className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Mobile Notifications
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.mobileNotifications}
                    onChange={(e) =>
                      handleSettingChange(
                        "mobileNotifications",
                        e.target.checked
                      )
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>

            {/* Right Column: Email Recipients */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Email Recipients
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {settings.emailRecipients.map((recipient, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 px-2 py-1 rounded-md"
                  >
                    <span className="text-sm text-gray-700">
                      {recipient.email}
                    </span>
                    <button
                      onClick={() => removeEmailRecipient(recipient.email)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Add new email address"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#DA0808] focus:border-[#DA0808]"
                />
                <button
                  onClick={addEmailRecipient}
                  className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-900 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                All notifications will be sent to the recipients listed above
              </p>
            </div>
          </div>
        </div>

        {/* Project/Site Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-[#DA0808]" />
            Project/Site Settings
          </h2>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {settings.sitesConfigured}
                </div>
                <div className="text-sm text-gray-600">Sites Configured</div>
              </div>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors">
                Manage Sites
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GPS Radius
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={settings.gpsRadius}
                    onChange={(e) =>
                      handleSettingChange("gpsRadius", parseInt(e.target.value))
                    }
                    className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#DA0808] focus:border-[#DA0808]"
                  />
                  <span className="text-sm text-gray-600">meters</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manage Master Lists */}
        <Link to="/admin-settings/master-lists" className="block">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors rounded-md p-2 -m-2">
              <div className="flex items-center space-x-3">
                <List className="h-5 w-5 text-[#DA0808]" />
                <span className="text-lg font-semibold text-gray-900">
                  Manage Master Lists
                </span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </Link>
        <Link to="/faqs" className="block">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors rounded-md p-2 -m-2">
              <div className="flex items-center space-x-3">
                <List className="h-5 w-5 text-[#DA0808]" />
                <span className="text-lg font-semibold text-gray-900">
                  Manage FAQ
                </span>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default ManageAdminSettings;