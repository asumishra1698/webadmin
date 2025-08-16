import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../reuseable/Layout";
import { createBlogPostRequest } from "../../redux/actions/blogActions";

const initialState = {
  title: "",
  description: "",
  category: "",
  tags: [] as string[],
  featuredImage: null as File | null,
  galleryImages: [] as File[],
  metaTitle: "",
  metaDescription: "",
  canonicalUrl: "",
  status: "draft",
};

const AddNewBlog: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [tagInput, setTagInput] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "featuredImage") {
        setForm((prev) => ({ ...prev, featuredImage: files[0] }));
      } else if (name === "galleryImages") {
        setForm((prev) => ({ ...prev, galleryImages: Array.from(files) }));
      }
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim()) {
      setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    form.tags.forEach((tag) => formData.append("tags[]", tag));
    if (form.featuredImage)
      formData.append("featuredImage", form.featuredImage);
    form.galleryImages.forEach((file) =>
      formData.append("galleryImages", file)
    );
    formData.append("metaTitle", form.metaTitle);
    formData.append("metaDescription", form.metaDescription);
    formData.append("canonicalUrl", form.canonicalUrl);
    formData.append("status", form.status);
    dispatch(createBlogPostRequest(formData));
  };

  return (
    <Layout title="Add New Blog" subtitle="Create a new blog post">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="border px-3 py-2 rounded w-full"
                placeholder="Add tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 bg-blue-500 text-white rounded"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-200 px-2 py-1 rounded text-xs flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    className="ml-2 text-red-500"
                    onClick={() => handleRemoveTag(idx)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Featured Image</label>
            <input
              type="file"
              name="featuredImage"
              accept="image/*"
              onChange={handleFileChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Gallery Images</label>
            <input
              type="file"
              name="galleryImages"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Meta Title</label>
            <input
              type="text"
              name="metaTitle"
              value={form.metaTitle}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Meta Description</label>
            <input
              type="text"
              name="metaDescription"
              value={form.metaDescription}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Canonical URL</label>
            <input
              type="text"
              name="canonicalUrl"
              value={form.canonicalUrl}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-[#DA0808] text-white rounded"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddNewBlog;