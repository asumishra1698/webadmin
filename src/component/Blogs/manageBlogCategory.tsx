import React, { useEffect, useState } from "react";
import Layout from "../../reuseable/Layout";
import { Plus, X, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategoryRequest } from "../../redux/actions/blogActions";

const manageBlogCategory: React.FC = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all blogs" | "category" | "tag" | "sub category"
  >("category");

  const categories = useSelector((state: any) => state.blog?.categories || []);
  const loading = useSelector((state: any) => state.blog?.loading);
  const error = useSelector((state: any) => state.blog?.error);

  useEffect(() => {
    dispatch(getBlogCategoryRequest());
  }, [dispatch]);

  const filteredCategories = categories.filter((cat: any) => {
    const parentName = cat.parent?.name || "";
    return (
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const actionButtons = (
    <button
      onClick={() => setShowModal(true)}
      className="flex items-center px-4 py-2.5 bg-[#FFF7E5] text-[#DA8708] rounded-xl hover:bg-yellow-600 hover:text-white transition-colors font-medium border border-yellow-500"
    >
      <Plus className="w-4 h-4 mr-2" />
      Create Category
    </button>
  );

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch create category action here if needed
    setCategoryName("");
    setShowModal(false);
  };

  const handleEdit = (id: string) => {
    alert(`Edit category: ${id}`);
  };

  const handleDelete = (id: string) => {
    alert(`Delete category: ${id}`);
  };

  // Helper to format date
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString();
  };

  return (
    <Layout
      title="Category Management"
      subtitle="Manage all categories here"
      searchValue={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      searchPlaceholder="Search Category"
      actionButtons={actionButtons}
      isHeaderFixed={true}
    >
      <div className="p-4">
        <div className="flex flex-wrap items-center justify-between border-b border-gray-200 gap-4 mb-4">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => {
                setActiveTab("all blogs");
                Navigate("/blogs");
              }}
              className={`text-sm font-medium pb-2 cursor-pointer transition-colors ${
                activeTab === "all blogs"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              All Blogs
            </button>
            <button
              onClick={() => {
                setActiveTab("category");
                Navigate("/blog-category");
              }}
              className={`text-sm font-medium pb-2 cursor-pointer transition-colors ${
                activeTab === "category"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Category
            </button>
            <button
              onClick={() => {
                setActiveTab("tag");
                Navigate("/blog-tag");
              }}
              className={`text-sm font-medium pb-2 cursor-pointer transition-colors ${
                activeTab === "tag"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Tag
            </button>
            <button
              onClick={() => {
                setActiveTab("sub category");
                Navigate("/blog-sub-category");
              }}
              className={`text-sm font-medium pb-2 cursor-pointer transition-colors ${
                activeTab === "sub category"
                  ? "text-red-500 border-b-2 border-red-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Sub Category
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-20">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA8708]"></div>
              <span className="ml-4 text-gray-600">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-red-500 p-8 text-center">{error}</div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    NAME
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    SLUG
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    PARENT
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    CREATED AT
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    UPDATED AT
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-4 text-gray-500 text-center">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((cat: any) => (
                    <tr
                      key={cat._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">{cat.name}</td>
                      <td className="py-4 px-6">{cat.slug}</td>
                      <td className="py-4 px-6">
                        {cat.parent ? cat.parent.name : "-"}
                      </td>
                      <td className="py-4 px-6">{formatDate(cat.createdAt)}</td>
                      <td className="py-4 px-6">{formatDate(cat.updatedAt)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
                            title="Edit"
                            onClick={() => handleEdit(cat._id)}
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                            title="Delete"
                            onClick={() => handleDelete(cat._id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                  onClick={() => setShowModal(false)}
                >
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-semibold mb-4">Create Category</h2>
                <form onSubmit={handleAddCategory}>
                  <label className="block mb-2 font-medium">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className="border px-3 py-2 rounded w-full mb-4"
                    placeholder="Enter category name"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default manageBlogCategory;
