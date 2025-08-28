import React, { useEffect, useState } from "react";
import Layout from "../../reuseable/Layout";
import { Plus, X, Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createBlogTagRequest,
  deleteBlogTagRequest,
  getBlogTagRequest,
} from "../../redux/actions/blogActions";
import TablePagination from "../../reuseable/TablePagination";
import Tabs from "../../reuseable/Tabs";
import DataTable from "../../reuseable/DataTable";

const ManageTag: React.FC = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [tagName, setTagName] = useState("");
  const limitOptions = [10, 20, 50, 100];
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all blogs" | "category" | "tag">(
    "tag"
  );

  const {
    blogTags = [],
    totalTags = 0,
    page = 1,
    pages = 1,
    limit = 10,
    loading,
    error,
  } = useSelector((state: any) => {
    const tagState = state.blog.blogtags || {};
    return {
      blogTags: Array.isArray(tagState.blogTags) ? tagState.blogTags : [],
      totalTags: tagState.totalTags || 0,
      page: tagState.page || 1,
      pages: tagState.pages || 1,
      limit: tagState.limit || 10,
      loading: state.blog.loading,
      error: state.blog.error,
    };
  });
  console.log("Tags from Redux:", blogTags);

  useEffect(() => {
    dispatch(getBlogTagRequest({ page: 1, limit, search: "" }));
  }, [dispatch, limit]);

  // Search handler
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(getBlogTagRequest({ page: 1, limit, search: e.target.value }));
  };

  // Pagination handler
  const handlePageChange = (newPage: number) => {
    dispatch(getBlogTagRequest({ page: newPage, limit, search: searchTerm }));
  };

  // Limit handler
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      getBlogTagRequest({
        page: 1,
        limit: Number(e.target.value),
        search: searchTerm,
      })
    );
  };

  const actionButtons = (
    <button
      onClick={() => setShowModal(true)}
      className="flex items-center px-4 py-2.5 bg-[#E5FFE5] text-[#08DA87] rounded-xl hover:bg-green-600 hover:text-white transition-colors font-medium border border-green-500"
    >
      <Plus className="w-4 h-4 mr-2" />
      Create Tag
    </button>
  );

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) {
      alert("Tag name is required");
      return;
    }
    dispatch(createBlogTagRequest({ name: tagName }));
    setTagName("");
    setShowModal(false);
  };

  const handleEdit = (id: string) => {
    alert(`Edit tag: ${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      // Dispatch delete action here
      dispatch(deleteBlogTagRequest(id));
    }
  };

  // Helper to format date
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleString();
  };

  return (
    <Layout
      title="Tag Management"
      subtitle="Manage all tags here"
      searchValue={searchTerm}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search Tag"
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#08DA87] dark:border-green-400"></div>
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
                  render: (tag: any) => (
                    <span className="text-gray-900 dark:text-gray-100">
                      {tag.name}
                    </span>
                  ),
                },
                {
                  key: "parent",
                  header: "PARENT",
                  render: (tag: any) => (
                    <span className="text-gray-900 dark:text-gray-100">
                      {tag.parent ? tag.parent.name : "-"}
                    </span>
                  ),
                },
                {
                  key: "createdAt",
                  header: "CREATED AT",
                  render: (tag: any) => (
                    <span className="text-gray-900 dark:text-gray-100">
                      {formatDate(tag.createdAt)}
                    </span>
                  ),
                },
                {
                  key: "updatedAt",
                  header: "UPDATED AT",
                  render: (tag: any) => (
                    <span className="text-gray-900 dark:text-gray-100">
                      {formatDate(tag.updatedAt)}
                    </span>
                  ),
                },
              ]}
              data={blogTags}
              actions={(tag: any) => (
                <div className="flex items-center space-x-2">
                  <button
                    className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
                    title="Edit"
                    onClick={() => handleEdit(tag._id)}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                    title="Delete"
                    onClick={() => handleDelete(tag._id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )}
              emptyText="No tags found."
            />
          )}
          {/* Pagination Controls */}
          <TablePagination
            page={page}
            pages={pages}
            total={totalTags}
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
                <h2 className="text-xl font-semibold mb-4">Create Tag</h2>
                <form onSubmit={handleAddTag}>
                  <label className="block mb-2 font-medium">Tag Name</label>
                  <input
                    type="text"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    className="border px-3 py-2 rounded w-full mb-4"
                    placeholder="Enter tag name"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
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
export default ManageTag;
