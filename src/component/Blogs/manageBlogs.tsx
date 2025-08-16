import React, { useMemo, useState } from "react";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import Layout from "../../reuseable/Layout";
import { IMAGE_BASE_URL } from "../../config/apiRoutes";
import csvIcon from "../../assets/icons/csv.png";
import { useNavigate } from "react-router-dom";

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  description: string;
  author: { name: string };
  category: { name: string };
  tags: { name: string }[];
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
  const [blogs] = useState<BlogPost[]>([
    {
      _id: "1",
      title: "How to Use React",
      slug: "how-to-use-react",
      description:
        "A beginner's guide to using React for building web applications.",
      author: { name: "John Doe" },
      category: { name: "Web Development" },
      tags: [{ name: "React" }, { name: "Frontend" }],
      featuredImage: "sample1.jpg",
      galleryImages: ["gallery1.jpg", "gallery2.jpg"],
      metaTitle: "React Guide",
      metaDescription: "Learn React step by step.",
      canonicalUrl: "https://example.com/how-to-use-react",
      status: "published",
      createdAt: "2025-08-01T10:00:00Z",
      updatedAt: "2025-08-10T12:00:00Z",
    },
    {
      _id: "2",
      title: "Understanding TypeScript",
      slug: "understanding-typescript",
      description:
        "TypeScript brings type safety to JavaScript. Learn how to use it.",
      author: { name: "Jane Smith" },
      category: { name: "Programming" },
      tags: [{ name: "TypeScript" }, { name: "JavaScript" }],
      featuredImage: "sample2.jpg",
      galleryImages: ["gallery3.jpg"],
      metaTitle: "TypeScript Basics",
      metaDescription: "Why TypeScript matters.",
      canonicalUrl: "https://example.com/understanding-typescript",
      status: "draft",
      createdAt: "2025-07-15T09:00:00Z",
      updatedAt: "2025-07-20T14:00:00Z",
    },
  ]);
  const [loading] = useState(false);
  const Navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [error] = useState<string | null>(null);

  const exportUsers = () => {
    alert("Exporting users as CSV (static demo)");
  };
  const handleDeleteUser = (userId: string) => {
    alert(`Delete user with ID: ${userId}`);
  };

  const handleAddNewUser = () => {
    Navigate("/add-new-blog");
  };

  const actionButtons = useMemo(
    () => (
      <>
        <button
          onClick={handleAddNewUser}
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
    [exportUsers]
  );

  return (
    <Layout
      title="Manage Blogs"
      subtitle="View, edit, and manage blog posts"
      searchValue={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      searchPlaceholder="Search by Page Name"
      actionButtons={actionButtons}
      isHeaderFixed={true}
    >
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-20">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#DA0808]"></div>
              <span className="ml-4 text-gray-600">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-red-500 p-8 text-center">{error}</div>
          ) : blogs.length === 0 ? (
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
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        <img
                          src={IMAGE_BASE_URL + blog.featuredImage}
                          alt={blog.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-[#14133B] whitespace-nowrap">
                      {blog.title}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {blog.description.slice(0, 80)}...
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      {blog.author?.name}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500">
                      {blog.category?.name}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {blog.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-200 px-2 py-0.5 rounded text-xs"
                          >
                            {tag.name}
                          </span>
                        ))}
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
                          onClick={() => handleDeleteUser(blog._id)}
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
    </Layout>
  );
};

export default ManageBlogs;
