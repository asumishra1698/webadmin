import React, { useState, useMemo } from "react";
import Layout from "../../reuseable/Layout";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash2, X, CheckCircle, User, Plus } from "lucide-react";
import csvIcon from "../../assets/icons/csv.png";

// Dummy data for pages
type PageDocument = {
  type: string;
  url: string;
};

const staticPages = [
  {
    _id: "1",
    page_name: "Home",
    page_code: "PG001",
    meta_title: "Home",
    meta_description: "Welcome to our homepage",
    author_name: "Rajiv Sharma",
    status: "active",
    banner_picture: "https://randomuser.me/api/portraits/women/2.jpg",
    documents: [
      {
        type: "owner_photo",
        url: "https://randomuser.me/api/portraits/women/2.jpg",
      },
    ] as PageDocument[],
  },
  {
    _id: "2",
    page_name: "About",
    page_code: "PG002",
    meta_title: "About Us",
    meta_description: "Learn more about our company",
    author_name: "Priya Singh",
    status: "pending",
    banner_picture: "https://randomuser.me/api/portraits/women/2.jpg",
    documents: [
      {
        type: "owner_photo",
        url: "https://randomuser.me/api/portraits/women/2.jpg",
      },
    ] as PageDocument[],
  },
];

const ManagePages: React.FC = () => {
  const navigate = useNavigate();

  const [pages, setPages] = useState(staticPages);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");  

  const getStatusColor = useMemo(
    () => (status: string) => {
      switch (status.toLowerCase()) {
        case "approved":
        case "active":
          return "bg-green-100 text-green-800";
        case "pending":
          return "bg-yellow-100 text-yellow-800";
        case "rejected":
        case "inactive":
          return "bg-red-100 text-red-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    },
    []
  );

  const handleDeletePage = (pageId: string) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      setPages((prev) => prev.filter((p) => p._id !== pageId));
    }
  };

  const handleAddNewPage = () => {
    navigate("/pages/add-new-page");
  };

  const exportPages = () => {
    alert("Exporting pages as CSV (static demo)");
  };

  const actionButtons = useMemo(
    () => (
      <>
        <button
          onClick={handleAddNewPage}
          className="flex items-center px-4 py-2.5 bg-[#e5e5e5] text-[#000000] rounded-xl hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Page
        </button>
        <button
          onClick={exportPages}
          className="flex items-center px-4 py-2.5 bg-[#14133B] text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
        >
          <img src={csvIcon} alt="CSV" className="w-5 h-5 mr-2" />
          Export CSV
        </button>       
      </>
    ),
    [exportPages]
  );

  return (
    <Layout
      title="Pages"
      subtitle="Manage and track your pages performance"
      searchValue={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      searchPlaceholder="Search by Page Name"
      actionButtons={actionButtons}
      isHeaderFixed={true}
    >
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-20">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                  Banner
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                  Page Name
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                  Meta Title
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                  Meta Description
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                  Author Name
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pages.map((pageItem) => (
                <tr
                  key={pageItem._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                      <img
                        src={
                          pageItem.documents?.find(
                            (doc) => doc.type === "owner_photo"
                          )?.url ||
                          pageItem.banner_picture ||
                          "https://www.iqsetters.com/assets/iqsetters_logo_small_new.png"
                        }
                        alt={pageItem.page_name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className="font-medium text-[#14133B] whitespace-nowrap hover:text-red-600 cursor-pointer transition-colors"
                      onClick={() =>
                        navigate(`/pages/page-detail/${pageItem._id}`)
                      }
                    >
                      {pageItem.page_name}
                      <span className="block text-xs text-gray-500">
                        {pageItem.page_code}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-gray-900 whitespace-nowrap">
                      {pageItem.meta_title}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-gray-900 whitespace-nowrap">
                      {pageItem.meta_description}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="text-gray-900 whitespace-nowrap">
                      {pageItem.author_name}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        pageItem.status
                      )}`}
                    >
                      {pageItem.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/pages/page-detail/${pageItem._id}`)
                        }
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          navigate(`/pages/edit-page/${pageItem._id}`)
                        }
                        className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
                        title="Edit Page"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePage(pageItem._id)}
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                        title="Delete Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {pageItem.status === "pending" && (
                        <>
                          <button
                            className="p-1 text-white bg-green-500 hover:bg-green-600 rounded transition-colors rounded-full"
                            title="Approve Page"
                          >
                            <CheckCircle className="w-3 h-3" />
                          </button>
                          <button
                            className="p-1 text-white bg-red-500 hover:bg-gray-600 rounded transition-colors rounded-full"
                            title="Reject Page"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!loading && pages.length === 0 && (
            <div className="py-12 text-center">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No pages found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or add a new page.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ManagePages;
