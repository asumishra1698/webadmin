import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../reuseable/Layout";
import CustomEditor from "../../reuseable/CustomEditor";
import { X } from "lucide-react";
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
  blogtags: [] as string[],
  featuredImage: null as File | null,
  galleryImages: [] as File[],
  metaTitle: "",
  metaDescription: "",
  status: "draft",
};

const AddNewBlog: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const [featuredPreview, setFeaturedPreview] = useState<string | null>(null);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getBlogCategoryRequest({ page: 1, search: "" }));
    dispatch(getBlogTagRequest({ page: 1, search: "" }));
  }, [dispatch]);

  // Select categories and tags from redux
  const categories = useSelector((state: any) =>
    Array.isArray(state.blog?.categories?.categories)
      ? state.blog.categories.categories
      : []
  );
  const blogTags = useSelector((state: any) =>
    Array.isArray(state.blog?.blogtags?.blogTags)
      ? state.blog.blogtags.blogTags
      : []
  ); 

  // Prepare options for react-select
  const categoryOptions = categories.map((cat: any) => ({
    value: cat._id,
    label: cat.name,
  }));
  const tagOptions = blogTags.map((tag: any) => ({
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
      blogtags: selected ? selected.map((opt: any) => opt.value) : [],
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

  // Featured image preview
  useEffect(() => {
    if (form.featuredImage) {
      const url = URL.createObjectURL(form.featuredImage);
      setFeaturedPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setFeaturedPreview(null);
    }
  }, [form.featuredImage]);

  // Gallery images preview
  useEffect(() => {
    if (form.galleryImages.length > 0) {
      const urls = form.galleryImages.map((file) => URL.createObjectURL(file));
      setGalleryPreviews(urls);
      return () => urls.forEach((url) => URL.revokeObjectURL(url));
    } else {
      setGalleryPreviews([]);
    }
  }, [form.galleryImages]);

  useEffect(() => {
    if (form.title) {
      const slug = form.title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9\-]/g, "");
      setForm((prev) => ({
        ...prev,
        canonicalUrl: slug,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        canonicalUrl: "",
      }));
    }
  }, [form.title]);

  // Remove featured image
  const handleRemoveFeatured = () => {
    setForm((prev) => ({ ...prev, featuredImage: null }));
    setFeaturedPreview(null);
  };

  // Remove gallery image by index
  const handleRemoveGalleryImage = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== idx),
    }));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    form.category.forEach((catId) => formData.append("category[]", catId));
    form.blogtags.forEach((tagId) => formData.append("tags[]", tagId));
    if (form.featuredImage)
      formData.append("featuredImage", form.featuredImage);
    form.galleryImages.forEach((file) =>
      formData.append("galleryImages", file)
    );
    formData.append("metaTitle", form.metaTitle);
    formData.append("metaDescription", form.metaDescription);
    formData.append("status", form.status);
    dispatch(createBlogPostRequest(formData));
  };

  // For react-select value
  const selectedCategoryOptions = categoryOptions.filter((opt: any) =>
    form.category.includes(opt.value)
  );
  const selectedTagOptions = tagOptions.filter((opt: any) =>
    form.blogtags.includes(opt.value)
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
              <CustomEditor
                value={form.description}
                onChange={(val) =>
                  setForm((prev) => ({ ...prev, description: val }))
                }
              />
            </div>
            <div className="mb-4 flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
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
              <div className="w-full md:w-1/2">
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
              {featuredPreview && (
                <div className="relative inline-block mt-2">
                  <img
                    src={featuredPreview}
                    alt="Featured Preview"
                    className="w-32 h-24 object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveFeatured}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                    title="Remove"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              )}
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
              {galleryPreviews.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-2">
                  {galleryPreviews.map((url, idx) => (
                    <div key={idx} className="relative inline-block">
                      <img
                        src={url}
                        alt={`Gallery Preview ${idx + 1}`}
                        className="w-24 h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                        title="Remove"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
              <label className="block font-medium mb-1">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-[#000000] text-white rounded"
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
