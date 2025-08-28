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
import TablePagination from "../../reuseable/TablePagination";
import Tabs from "../../reuseable/Tabs";
import DataTable from "../../reuseable/DataTable";
import { formatDate } from "../../reuseable/formatDate";

const manageBlogCategory: React.FC = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const limitOptions = [10, 20, 50, 100];
  const [activeTab, setActiveTab] = useState<"all blogs" | "category" | "tag">(
    "category"
  );
  const {
    categories = [],
    totalCategories = 0,
    page = 1,
    pages = 1,
    limit = 10,
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
        <Tabs
          tabs={[
            {
              label: "All Blogs",
              value: "all blogs",
              onClick: () => {
                setActiveTab("all blogs");
                Navigate("/blogs");
              },
            },
            {
              label: "Category",
              value: "category",
              onClick: () => {
                setActiveTab("category");
                Navigate("/blog-category");
              },
            },
            {
              label: "Tags",
              value: "tag",
              onClick: () => {
                setActiveTab("tag");
                Navigate("/blog-tag");
              },
            },
          ]}
          activeTab={activeTab}
        />
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-20">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA8708] dark:border-yellow-400"></div>
              <span className="ml-4 text-gray-600 dark:text-gray-300">
                Loading...
              </span>
            </div>
          ) : error ? (
            <div className="text-red-500 dark:text-red-400 p-8 text-center">
              {error}
            </div>
          ) : (
            <DataTable
              columns={[
                {
                  key: "name",
                  header: "NAME",
                  render: (cat: any) => (
                    <span className="text-gray-900 dark:text-gray-100">
                      {cat.name}
                    </span>
                  ),
                },
                {
                  key: "slug",
                  header: "SLUG",
                  render: (cat: any) => (
                    <span className="text-gray-900 dark:text-gray-100">
                      {cat.slug}
                    </span>
                  ),
                },
                {
                  key: "parent",
                  header: "PARENT",
                  render: (cat: any) => (
                    <span className="text-gray-900 dark:text-gray-100">
                      {cat.parent ? cat.parent.name : "-"}
                    </span>
                  ),
                },
                {
                  key: "postCount",
                  header: "POST COUNT",
                  render: (cat: any) => (
                    <span className="text-gray-900 dark:text-gray-100">
                      {cat.postCount || 0}
                    </span>
                  ),
                },
                {
                  key: "createdAt",
                  header: "CREATED AT",
                  render: (cat: any) => (
                    <span className="text-gray-900 dark:text-gray-100">
                      {formatDate(cat.createdAt)}
                    </span>
                  ),
                },
                {
                  key: "updatedAt",
                  header: "UPDATED AT",
                  render: (cat: any) => (
                    <span className="text-gray-900 dark:text-gray-100">
                      {formatDate(cat.updatedAt)}
                    </span>
                  ),
                },
              ]}
              data={categories}
              actions={(cat: any) => (
                <div className="flex items-center space-x-2">
                  <button
                    className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
                    title="Edit"
                    onClick={() => handleEdit(cat._id)}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                    title="Delete"
                    onClick={() => handleDelete(cat._id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
              emptyText="No categories found."
            />
          )}
          {/* Pagination Controls */}
          <TablePagination
            page={page}
            pages={pages}
            total={totalCategories}
            limit={limit}
            limitOptions={limitOptions}
            onLimitChange={handleLimitChange}
            onPageChange={handlePageChange}
          />
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
