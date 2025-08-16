import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Layout from "../../reuseable/Layout";
import { Plus, X, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogCategoryRequest,
  deleteBlogCategoryRequest,
  getBlogCategoryRequest,
} from "../../redux/actions/blogActions";

const manageBlogCategory: React.FC = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all blogs" | "category" | "tag">(
    "category"
  );
  const [limit, setLimit] = useState(10);

  // Redux state for paginated categories
  const {
    categories = [],
    totalCategories = 0,
    page = 1,
    pages = 1,
    loading,
    error,
  } = useSelector((state: any) => {
    const catState = state.blog?.categories || {};
    return {
      categories: Array.isArray(catState.categories) ? catState.categories : [],
      totalCategories: catState.totalCategories || 0,
      page: catState.page || 1,
      pages: catState.pages || 1,
      limit: catState.limit || 10,
      loading: state.blog?.loading,
      error: state.blog?.error,
    };
  });

  useEffect(() => {
    dispatch(getBlogCategoryRequest({ page: 1, limit, search: "" }));
  }, [dispatch, limit]);

  // Search handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(
      getBlogCategoryRequest({ page: 1, limit, search: e.target.value })
    );
  };

  // Pagination handler
  const handlePageChange = (newPage: number) => {
    dispatch(
      getBlogCategoryRequest({ page: newPage, limit, search: searchTerm })
    );
  };

  // Limit handler
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    dispatch(
      getBlogCategoryRequest({
        page: 1,
        limit: Number(e.target.value),
        search: searchTerm,
      })
    );
  };

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
    if (!categoryName.trim()) {
      alert("Category name is required");
      return;
    }

    dispatch(
      createBlogCategoryRequest({ name: categoryName, parent: parentCategory })
    );
    setCategoryName("");
    setParentCategory("");
    setShowModal(false);
  };

  const handleEdit = (id: string) => {
    alert(`Edit category: ${id}`);
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DA8708",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBlogCategoryRequest(id));
        Swal.fire("Deleted!", "Category has been deleted.", "success");
      }
    });
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
      onSearchChange={handleSearchChange}
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
              Tags
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
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                    POST COUNT
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                    CREATED AT
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase whitespace-nowrap">
                    UPDATED AT
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-4 text-gray-500 text-center">
                      No categories found.
                    </td>
                  </tr>
                ) : (
                  categories.map((cat: any) => (
                    <tr
                      key={cat._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 whitespace-nowrap">{cat.name}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{cat.slug}</td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {cat.parent ? cat.parent.name : "-"}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">{cat.postCount || 0}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{formatDate(cat.createdAt)}</td>
                      <td className="py-4 px-6 whitespace-nowrap">{formatDate(cat.updatedAt)}</td>
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
          {/* Pagination Controls */}
          <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-center px-6 py-3 max-w-full mx-auto">
              <span className="text-sm text-gray-700 mb-2 md:mb-0"></span>
              <div className="flex gap-2 items-center">
                Total Categories: <strong>{totalCategories}</strong>
                <strong className="text-[#DA8708]">Page {page}</strong> of{" "}
                <strong>{pages}</strong> &nbsp;|&nbsp;
                <label
                  className="text-sm text-gray-600 mr-2"
                  htmlFor="limit-select"
                >
                  Rows per page:
                </label>
                <select
                  id="limit-select"
                  value={limit}
                  onChange={handleLimitChange}
                  className="px-2 py-1 rounded border bg-gray-100 text-gray-700"
                  style={{ minWidth: 60 }}
                >
                  {[5, 10, 20, 50, 100].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <button
                  className="px-4 py-2 rounded-lg border bg-yellow-500 text-white hover:bg-yellow-600 transition disabled:opacity-50"
                  disabled={page <= 1}
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 rounded-lg border bg-yellow-500 text-white hover:bg-yellow-600 transition disabled:opacity-50"
                  disabled={page >= pages}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
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
                    Parent Category
                  </label>
                  <select
                    value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                    className="border px-3 py-2 rounded w-full mb-4"
                  >
                    <option value="">Select Parent Category</option>
                    {categories.map((cat: any) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
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
