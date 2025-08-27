import React from "react";
import { Search } from "lucide-react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actionButtons?: React.ReactNode;
  className?: string;
  isFixed?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  searchPlaceholder,
  searchValue,
  onSearchChange,
  actionButtons,
  className = "",
  isFixed = false,
}) => {
  const fixedClasses = isFixed 
    ? "fixed top-20 left-0 right-0 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 z-40" 
    : "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700";

  return (
    <div className={`${fixedClasses} ${className}`}>
      <div className="p-4">       
        {(title || subtitle) && (
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-300 mt-1">{subtitle}</p>
            )}
          </div>
        )}
        
        {(searchPlaceholder || actionButtons) && (
          <div className="flex justify-between items-center">            
            {searchPlaceholder && (
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue || ""}
                  onChange={onSearchChange}
                  className="pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            )}           
            {actionButtons && (
              <div className="flex items-center space-x-3">
                {actionButtons}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;