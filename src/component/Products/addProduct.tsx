import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../reuseable/Layout";
import { createProductRequest } from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  slug: "",
  description: "",
  price: "",
  salePrice: "",
  productcategory: [],
  brand: "",
  sku: "",
  barcode: "",
  variants: [{ color: "", size: "", material: "", style: "" }],
  stock: "",
  images: [] as File[],
  thumbnail: null as File | null,
  producttags: [],
  weight: "",
  dimensions: { length: "", width: "", height: "" },
  isFeatured: false,
  isActive: true,
  rating: "",
  reviews: [],
  discount: "",
  tax: "",
  shippingClass: "",
  warranty: "",
  returnPolicy: "",
  vendor: "",
};

const AddProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);

  // Handle input change for simple fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setForm({ ...form, [name]: e.target.checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Handle change for dimensions
  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      dimensions: {
        ...form.dimensions,
        [e.target.name]: e.target.value,
      },
    });
  };

  // Handle change for variants
  const handleVariantChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newVariants = [...form.variants];
    (newVariants[index] as Record<string, string>)[name] = value;
    setForm({ ...form, variants: newVariants });
  };

  // Add new variant row
  const addVariant = () => {
    setForm({
      ...form,
      variants: [
        ...form.variants,
        { color: "", size: "", material: "", style: "" },
      ],
    });
  };

  // Remove variant row
  const removeVariant = (index: number) => {
    const newVariants = form.variants.filter((_, i) => i !== index);
    setForm({ ...form, variants: newVariants });
  };

  const handleArrayChange = (name: string, value: string) => {
    setForm({
      ...form,
      [name]: value.split(",").map((v) => v.trim()),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createProductRequest(form as any));
  };

  return (
    <Layout
      title="Add Product"
      subtitle="Create a new product"
      isHeaderFixed={true}
      showBackButton={true}
      backButtonLink="/products"
    >
      <form
        className="max-w-full mx-auto bg-white p-8 rounded shadow"
        onSubmit={handleSubmit}
      >
        {/* Row 1: Name, Slug */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 font-medium">Slug</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>
        </div>
        {/* Row 2: Price, Sale Price, Stock */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/3">
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>
          <div className="w-1/3">
            <label className="block mb-1 font-medium">Sale Price</label>
            <input
              type="number"
              name="salePrice"
              value={form.salePrice}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="w-1/3">
            <label className="block mb-1 font-medium">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              required
            />
          </div>
        </div>
        {/* Row 3: Brand, SKU, Barcode */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/3">
            <label className="block mb-1 font-medium">Brand (ID)</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="w-1/3">
            <label className="block mb-1 font-medium">SKU</label>
            <input
              type="text"
              name="sku"
              value={form.sku}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="w-1/3">
            <label className="block mb-1 font-medium">Barcode</label>
            <input
              type="text"
              name="barcode"
              value={form.barcode}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
        </div>
        {/* Description */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            rows={3}
          />
        </div>
        {/* Product Categories, Product Tags */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
            <label className="block mb-1 font-medium">
              Product Categories (comma separated IDs)
            </label>
            <input
              type="text"
              name="productcategory"
              value={form.productcategory.join(",")}
              onChange={(e) =>
                handleArrayChange("productcategory", e.target.value)
              }
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="w-1/2">
            <label className="block mb-1 font-medium">
              Product Tags (comma separated IDs)
            </label>
            <input
              type="text"
              name="producttags"
              value={form.producttags.join(",")}
              onChange={(e) => handleArrayChange("producttags", e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
        </div>
        <div className="mb-4 flex gap-4">
          {/* Images Upload */}
          <div className="w-1/2">
            <label className="block mb-2 font-medium">
              Upload Product Images <span className="text-red-500">*</span>
            </label>
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              <div className="mb-2">
                <svg height="40" width="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 16V4M12 4L8 8M12 4L16 8"
                    stroke="#e11d48"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="3"
                    y="16"
                    width="18"
                    height="5"
                    rx="2"
                    fill="#e11d48"
                    opacity="0.1"
                  />
                </svg>
              </div>
              <label htmlFor="images-upload" className="cursor-pointer">
                <span className="bg-[#18184A] text-white px-6 py-2 rounded font-semibold">
                  Browse
                </span>
                <input
                  id="images-upload"
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      const files = Array.from(e.target.files);
                      setForm({
                        ...form,
                        images: files,
                      });
                    }
                  }}
                />
              </label>
              <p className="mt-2 text-xs text-gray-500">
                (File Types: jpg, jpeg, png, pdf, Max Size: 2 MB)
              </p>
            </div>
          </div>
          {/* Thumbnail Upload */}
          <div className="w-1/2">
            <label className="block mb-2 font-medium">
              Upload Thumbnail <span className="text-red-500">*</span>
            </label>
            <div className="border-dashed border-2 border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
              <div className="mb-2">
                <svg height="40" width="40" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 16V4M12 4L8 8M12 4L16 8"
                    stroke="#e11d48"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="3"
                    y="16"
                    width="18"
                    height="5"
                    rx="2"
                    fill="#e11d48"
                    opacity="0.1"
                  />
                </svg>
              </div>
              <label htmlFor="thumbnail-upload" className="cursor-pointer">
                <span className="bg-[#18184A] text-white px-6 py-2 rounded font-semibold">
                  Browse
                </span>
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setForm({
                        ...form,
                        thumbnail: e.target.files[0],
                      });
                    }
                  }}
                />
              </label>
              <p className="mt-2 text-xs text-gray-500">
                (File Types: jpg, jpeg, png, pdf, Max Size: 2 MB)
              </p>
            </div>
          </div>
        </div>
        {/* Variants */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Variants</label>
          {form.variants.map((variant, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="text"
                name="color"
                placeholder="Color"
                value={variant.color}
                onChange={(e) => handleVariantChange(idx, e)}
                className="border px-2 py-1 rounded w-1/4"
              />
              <input
                type="text"
                name="size"
                placeholder="Size"
                value={variant.size}
                onChange={(e) => handleVariantChange(idx, e)}
                className="border px-2 py-1 rounded w-1/4"
              />
              <input
                type="text"
                name="material"
                placeholder="Material"
                value={variant.material}
                onChange={(e) => handleVariantChange(idx, e)}
                className="border px-2 py-1 rounded w-1/4"
              />
              <input
                type="text"
                name="style"
                placeholder="Style"
                value={variant.style}
                onChange={(e) => handleVariantChange(idx, e)}
                className="border px-2 py-1 rounded w-1/4"
              />
              <button
                type="button"
                className="text-red-500"
                onClick={() => removeVariant(idx)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="text-green-600 mt-2"
            onClick={addVariant}
          >
            Add Variant
          </button>
        </div>
        {/* Weight, Dimensions */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/3">
            <label className="block mb-1 font-medium">Weight</label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="w-2/3">
            <label className="block mb-1 font-medium">
              Dimensions (Length, Width, Height)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                name="length"
                placeholder="Length"
                value={form.dimensions.length}
                onChange={handleDimensionChange}
                className="border px-2 py-1 rounded w-1/3"
              />
              <input
                type="number"
                name="width"
                placeholder="Width"
                value={form.dimensions.width}
                onChange={handleDimensionChange}
                className="border px-2 py-1 rounded w-1/3"
              />
              <input
                type="number"
                name="height"
                placeholder="Height"
                value={form.dimensions.height}
                onChange={handleDimensionChange}
                className="border px-2 py-1 rounded w-1/3"
              />
            </div>
          </div>
        </div>
        {/* Is Featured, Is Active, Rating */}
        <div className="mb-4 flex gap-4 items-center">
          <div className="w-1/3 flex items-center">
            <label className="block mb-1 font-medium mr-2">Is Featured</label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/3 flex items-center">
            <label className="block mb-1 font-medium mr-2">Is Active</label>
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
          </div>
          <div className="w-1/3">
            <label className="block mb-1 font-medium">Rating</label>
            <input
              type="number"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
              step="0.1"
            />
          </div>
        </div>
        {/* Reviews, Discount, Tax */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/3">
            <label className="block mb-1 font-medium">
              Reviews (comma separated IDs)
            </label>
            <input
              type="text"
              name="reviews"
              value={form.reviews.join(",")}
              onChange={(e) => handleArrayChange("reviews", e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="w-1/3">
            <label className="block mb-1 font-medium">Discount (%)</label>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="w-1/3">
            <label className="block mb-1 font-medium">Tax (%)</label>
            <input
              type="number"
              name="tax"
              value={form.tax}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
        </div>
        {/* Shipping Class, Warranty, Return Policy, Vendor */}
        <div className="mb-4 flex gap-4">
          <div className="w-1/4">
            <label className="block mb-1 font-medium">Shipping Class</label>
            <input
              type="text"
              name="shippingClass"
              value={form.shippingClass}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="w-1/4">
            <label className="block mb-1 font-medium">Warranty</label>
            <input
              type="text"
              name="warranty"
              value={form.warranty}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="w-1/4">
            <label className="block mb-1 font-medium">Return Policy</label>
            <input
              type="text"
              name="returnPolicy"
              value={form.returnPolicy}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
          <div className="w-1/4">
            <label className="block mb-1 font-medium">Vendor (ID)</label>
            <input
              type="text"
              name="vendor"
              value={form.vendor}
              onChange={handleChange}
              className="border px-3 py-2 rounded w-full"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default AddProduct;
