import React, { useEffect, useMemo, useState } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import Swal from "sweetalert2";
import Layout from "../../reuseable/Layout";
import { IMAGE_BASE_URL } from "../../config/apiRoutes";
import csvIcon from "../../assets/icons/csv.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlogPostRequest,
  getAllBlogPostsRequest,
} from "../../redux/actions/blogActions";
import type { RootState } from "../../redux/reducers/rootReducers";
import TablePagination from "../../reuseable/TablePagination";
import Tabs from "../../reuseable/Tabs";
import DataTable from "../../reuseable/DataTable";

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
  status: "draft" | "published";
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

  const handleStatusToggle = (blog: BlogPost) => {
    const newStatus = blog.status === "published" ? "draft" : "published";
    dispatch({
      type: "UPDATE_BLOG_STATUS_REQUEST",
      payload: { id: blog._id, status: newStatus },
    });
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
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#aaa",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteBlogPostRequest(blogId));
        Swal.fire("Deleted!", "Blog has been deleted.", "success");
      }
    });
  };

  const handleAddNewBlog = () => {
    Navigate("/add-new-blog");
  };

  const actionButtons = useMemo(
    () => (
      <>
        <button
          onClick={handleAddNewBlog}
          className="flex items-center px-4 py-2.5 bg-[#e5e5e5] text-[#000000] rounded-xl hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-500"
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000000] dark:border-gray-300"></div>
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
                  key: "featuredImage",
                  header: "IMAGE",
                  render: (blog: BlogPost) => (
                    <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                      {blog.featuredImage ? (
                        <img
                          src={IMAGE_BASE_URL + blog.featuredImage}
                          alt={blog.title}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-xs">
                          No Image
                        </span>
                      )}
                    </div>
                  ),
                },
                {
                  key: "title",
                  header: "TITLE",
                  render: (blog: BlogPost) => (
                    <span className="font-medium text-[#14133B] dark:text-gray-100 whitespace-nowrap">
                      {blog.title}
                    </span>
                  ),
                },
                {
                  key: "author",
                  header: "AUTHOR",
                  render: (blog: BlogPost) => (
                    <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {blog.author?.name || "-"}
                    </span>
                  ),
                },
                {
                  key: "category",
                  header: "CATEGORY",
                  render: (blog: BlogPost) => (
                    <div className="flex flex-wrap gap-1">
                      {blog.category && blog.category.length > 0 ? (
                        blog.category.map((cat, idx) => (
                          <span
                            key={cat._id || idx}
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              background: [
                                "#FDE68A",
                                "#A7F3D0",
                                "#BFDBFE",
                                "#FCA5A5",
                                "#C4B5FD",
                                "#F9A8D4",
                                "#FECACA",
                                "#D1FAE5",
                              ][idx % 8],
                              color: "#222",
                            }}
                          >
                            {cat.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-xs">
                          No Category
                        </span>
                      )}
                    </div>
                  ),
                },
                {
                  key: "tags",
                  header: "TAGS",
                  render: (blog: BlogPost) => (
                    <div className="flex flex-wrap gap-1">
                      {blog.tags?.length > 0 ? (
                        blog.tags.map((tag, idx) => (
                          <span
                            key={tag._id || idx}
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              background: [
                                "#FDE68A",
                                "#A7F3D0",
                                "#BFDBFE",
                                "#FCA5A5",
                                "#C4B5FD",
                                "#F9A8D4",
                                "#FECACA",
                                "#D1FAE5",
                              ][idx % 8],
                              color: "#222",
                            }}
                          >
                            {tag.name}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500 text-xs">
                          No Tags
                        </span>
                      )}
                    </div>
                  ),
                },
                {
                  key: "status",
                  header: "STATUS",
                  render: (blog: BlogPost) => (
                    <button
                      onClick={() => handleStatusToggle(blog)}
                      className={`px-3 py-1 rounded-full font-semibold transition-colors text-xs ${
                        blog.status === "published"
                          ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700"
                          : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700"
                      }`}
                      title="Toggle status"
                    >
                      {blog.status === "published" ? "Published" : "Draft"}
                    </button>
                  ),
                },
              ]}
              data={posts}
              actions={(blog: BlogPost) => (
                <div className="flex items-center space-x-2">
                  <button
                    className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors"
                    title="View"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                    title="Delete"
                    onClick={() => handleDeleteBlog(blog._id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
              emptyText="No blogs found"
            />
          )}
        </div>
      </div>
      {/* Pagination Controls */}
      <TablePagination
        page={page}
        pages={pages}
        total={total}
        limit={limit}
        limitOptions={limitOptions}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
};

export default ManageBlogs;