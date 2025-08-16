import React, { useState } from "react";
import Layout from "../../reuseable/Layout";
import { Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Dummy parent categories for dropdown
const parentCategories = [
  { value: "parent1", label: "Parent Category 1" },
  { value: "parent2", label: "Parent Category 2" },
];

const initialCategories = [
  { id: "cat1", name: "Category 1", parent: "Parent Category 1" },
  { id: "cat2", name: "Category 2", parent: "Parent Category 2" },
];

const manageBlogCategory: React.FC = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all blogs" | "category" | "tag" | "sub category"
  >("category");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setCategories([
      ...categories,
      {
        id: Date.now().toString(),
        name: categoryName,
        parent: parentCategory,
      },
    ]);
    setCategoryName("");
    setParentCategory("");
    setShowModal(false);
  };

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.parent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const actionButtons = (
    <button
      onClick={() => setShowModal(true)}
      className="flex items-center px-4 py-2.5 bg-[#FFF7E5] text-[#DA8708] rounded-xl hover:bg-yellow-600 hover:text-white transition-colors font-medium border border-yellow-500"
    >
      <Plus className="w-4 h-4 mr-2" />
      Create Category
    </button>
  );

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
      <div className="p-6">
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
        <div className="bg-white rounded-lg shadow p-8">
          <ul className="mb-4">
            {filteredCategories.length === 0 ? (
              <li className="py-2 text-gray-500">No categories found.</li>
            ) : (
              filteredCategories.map((cat) => (
                <li key={cat.id} className="py-2 border-b flex justify-between">
                  <span>
                    {cat.name}{" "}
                    <span className="text-xs text-gray-500">
                      ({cat.parent})
                    </span>
                  </span>
                </li>
              ))
            )}
          </ul>
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
                    required
                  >
                    <option value="">Select Parent Category</option>
                    {parentCategories.map((opt) => (
                      <option key={opt.value} value={opt.label}>
                        {opt.label}
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
