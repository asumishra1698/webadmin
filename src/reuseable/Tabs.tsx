import React from "react";

interface Tab {
  label: string;
  value: string;
  onClick: () => void;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab }) => (
  <div className="flex flex-wrap items-center justify-between border-b border-gray-200 dark:border-gray-700 gap-4 mb-4">
    <div className="flex items-center space-x-6">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={tab.onClick}
          className={`text-sm font-medium pb-2 cursor-pointer transition-colors ${
            activeTab === tab.value
              ? "text-red-500 border-b-2 border-gray-500 dark:border-gray-400"
              : "text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
);

export default Tabs;
