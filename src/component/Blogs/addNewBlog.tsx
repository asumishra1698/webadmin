import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../reuseable/Layout";
import {
  createBlogPostRequest,
  getBlogCategoryRequest,
  getBlogTagRequest,
} from "../../redux/actions/blogActions";
import Select from "react-select";

const initialState = {
  title: "",
  description: "",
  category: [] as string[],
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

  useEffect(() => {
    dispatch(getBlogCategoryRequest({ page: 1, limit: 10, search: "" }));
    dispatch(getBlogTagRequest({ page: 1, limit: 10, search: "" }));
  }, [dispatch]);

  // Select categories and tags from redux
  const categories = useSelector((state: any) =>
    Array.isArray(state.blog?.categories?.categories)
      ? state.blog.categories.categories
      : []
  );
  const tags = useSelector((state: any) =>
    Array.isArray(state.blog?.tags?.tags) ? state.blog.tags.tags : []
  );

  // Prepare options for react-select
  const categoryOptions = categories.map((cat: any) => ({
    value: cat._id,
    label: cat.name,
  }));
  const tagOptions = tags.map((tag: any) => ({
    value: tag._id,
    label: tag.name,
  }));

  // React Select handlers
  const handleCategorySelect = (selected: any) => {
    setForm((prev) => ({
      ...prev,
      category: selected ? selected.map((opt: any) => opt.value) : [],
    }));
  };

  const handleTagSelect = (selected: any) => {
    setForm((prev) => ({
      ...prev,
      tags: selected ? selected.map((opt: any) => opt.value) : [],
    }));
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    form.category.forEach((catId) => formData.append("category[]", catId));
    form.tags.forEach((tagId) => formData.append("tags[]", tagId));
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

  // For react-select value
  const selectedCategoryOptions = categoryOptions.filter((opt: any) =>
    form.category.includes(opt.value)
  );
  const selectedTagOptions = tagOptions.filter((opt: any) =>
    form.tags.includes(opt.value)
  );

  return (
    <Layout
      title="Add New Blog"
      subtitle="Create a new blog post"
      showBackButton={true}
      backButtonLink="/blogs"
    >
      <div className="p-4">
        <div className="max-w-full mx-auto bg-white rounded-lg shadow p-8">
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
              <Select
                isMulti
                options={categoryOptions}
                value={selectedCategoryOptions}
                onChange={handleCategorySelect}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select categories..."
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Tags</label>
              <Select
                isMulti
                options={tagOptions}
                value={selectedTagOptions}
                onChange={handleTagSelect}
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Select tags..."
              />
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
      </div>
    </Layout>
  );
};

export default AddNewBlog;
