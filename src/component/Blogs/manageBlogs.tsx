import React, { useEffect, useMemo, useState } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import Layout from "../../reuseable/Layout";
import { IMAGE_BASE_URL } from "../../config/apiRoutes";
import csvIcon from "../../assets/icons/csv.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogPostsRequest } from "../../redux/actions/blogActions";
import type { RootState } from "../../redux/reducers/rootReducers";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  author: { name?: string } | null;
  category: { _id: string; name: string; slug: string }[];
  tags: { _id: string; name: string; slug: string }[];
  featuredImage: string;
  galleryImages: string[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
}

const ManageBlogs: React.FC = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  // Redux state
  const { posts, loading, error, total, page, pages, limit } = useSelector(
    (state: RootState) => ({
      posts: state.blog.posts,
      loading: state.blog.loading,
      error: state.blog.error,
      total: state.blog.total,
      page: state.blog.page,
      pages: state.blog.pages,
      limit: state.blog.limit,
    })
  );

  const [searchTerm, setSearchTerm] = useState("");
  const limitOptions = [5, 10, 20, 50, 100];
  const [activeTab, setActiveTab] = useState<"all blogs" | "category" | "tag">(
    "all blogs"
  );

  useEffect(() => {
    dispatch(getAllBlogPostsRequest({ page: 1, limit: 10, search: "" }));
  }, [dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(
      getAllBlogPostsRequest({ page: newPage, limit, search: searchTerm })
    );
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      getAllBlogPostsRequest({
        page: 1,
        limit: Number(e.target.value),
        search: searchTerm,
      })
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(
      getAllBlogPostsRequest({ page: 1, limit, search: e.target.value })
    );
  };

  const exportUsers = () => {
    alert("Exporting blogs as CSV (static demo)");
  };
  const handleDeleteBlog = (blogId: string) => {
    alert(`Delete blog with ID: ${blogId}`);
  };

  const handleAddNewBlog = () => {
    Navigate("/add-new-blog");
  };

  const actionButtons = useMemo(
    () => (
      <>
        <button
          onClick={handleAddNewBlog}
          className="flex items-center px-4 py-2.5 bg-[#FFE5E5] text-[#DA0808] rounded-xl hover:bg-red-600 hover:text-white transition-colors font-medium border border-red-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Blog
        </button>
        <button
          onClick={exportUsers}
          className="flex items-center px-4 py-2.5 bg-[#14133B] text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
        >
          <img src={csvIcon} alt="CSV" className="w-5 h-5 mr-2" />
          Export CSV
        </button>
      </>
    ),
    []
  );

  return (
    <Layout
      title="Manage Blogs"
      subtitle="View, edit, and manage blog posts"
      searchValue={searchTerm}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search by Page Name"
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA0808]"></div>
              <span className="ml-4 text-gray-600">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-red-500 p-8 text-center">{error}</div>
          ) : posts.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No blogs found
              </h3>
              <p className="text-gray-600">Try adding a new blog post.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    IMAGE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    TITLE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    DESCRIPTION
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    AUTHOR
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    CATEGORY
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    TAGS
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    STATUS
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((blog: BlogPost) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        {blog.featuredImage ? (
                          <img
                            src={IMAGE_BASE_URL + blog.featuredImage}
                            alt={blog.title}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <span className="text-gray-400 text-xs">
                            No Image
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-[#14133B] whitespace-nowrap">
                      {blog.title}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {blog.description?.slice(0, 80)}...
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      {blog.author?.name || "-"}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      {blog.category && blog.category.length > 0
                        ? blog.category.map((cat) => cat.name).join(", ")
                        : "-"}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags?.length > 0 ? (
                          blog.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="bg-gray-200 px-2 py-0.5 rounded text-xs"
                            >
                              {tag.name}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400 text-xs">No Tags</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-400">
                      {blog.status}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete"
                          onClick={() => handleDeleteBlog(blog._id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-3 max-w-full mx-auto">
          <span className="text-sm text-gray-700 mb-2 md:mb-0"></span>
          <div className="flex gap-2 items-center">
            <strong className="text-[#DA0808]">Page {page}</strong> of{" "}
            <strong>{pages}</strong> &nbsp;|&nbsp;
            <span className="text-gray-500">Total Blogs:</span>{" "}
            <strong>{total}</strong>
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
              {limitOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button
              className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-red-600 transition disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-red-600 transition disabled:opacity-50"
              disabled={page >= pages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageBlogs;
