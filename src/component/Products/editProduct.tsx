import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "../../reuseable/Layout";
import Select from "react-select";
import {
    getProductByIdRequest,
    updateProductRequest,
    getProductCategoriesRequest,
    getProductTagsRequest,
    getProductBrandsRequest,
} from "../../redux/actions/productActions";
import { IMAGE_BASE_URL } from "../../config/apiRoutes";

const EditProduct: React.FC = () => {
    const dispatch = useDispatch();
    const { id } = useParams<{ id: string }>();
    const [form, setForm] = useState<any>(null);

    const product = useSelector((state: any) => state.product.product);
    const categories = useSelector((state: any) => state.product.categories);
    const tags = useSelector((state: any) => state.product.tags);
    const brands = useSelector((state: any) => state.product.brands);

    const getImageUrl = (img: any) => {
        if (!img) return "";
        if (typeof img === "string") return img;
        if (img instanceof File) return URL.createObjectURL(img);
        return "";
    };

    useEffect(() => {
        if (id) {
            dispatch(getProductByIdRequest(id));
        }
        dispatch(getProductCategoriesRequest({ page: 1, limit: 100, search: "" }));
        dispatch(getProductTagsRequest({ page: 1, limit: 100, search: "" }));
        dispatch(getProductBrandsRequest({ page: 1, limit: 100, search: "" }));
    }, [dispatch, id]);

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || "",
                slug: product.slug || "",
                description: product.description || "",
                price: product.price || "",
                salePrice: product.salePrice || "",
                productcategory: product.productcategory || [],
                brand: product.brand || "",
                sku: product.sku || "",
                barcode: product.barcode || "",
                variants: product.variants || [{ color: "", size: "", material: "", style: "" }],
                stock: product.stock || "",
                images: [],
                thumbnail: null,
                producttags: product.producttags || [],
                weight: product.weight || "",
                dimensions: product.dimensions
                    ? {
                        length: product.dimensions.length ?? "",
                        width: product.dimensions.width ?? "",
                        height: product.dimensions.height ?? "",
                    }
                    : { length: "", width: "", height: "" },
                isFeatured: product.isFeatured || false,
                isActive: product.isActive ?? true,
                rating: product.rating || "",
                reviews: product.reviews || [],
                discount: product.discount || "",
                tax: product.tax || "",
                shippingClass: product.shippingClass || "",
                warranty: product.warranty || "",
                returnPolicy: product.returnPolicy || "",
                vendor: product.vendor || "",
            });
        }
    }, [product]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
        setForm((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleDimensionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev: any) => ({
            ...prev,
            dimensions: {
                ...prev.dimensions,
                [name]: value,
            },
        }));
    };

    const handleCategorySelect = (selected: any) => {
        setForm((prev: any) => ({
            ...prev,
            productcategory: selected ? selected.map((item: any) => item.value) : [],
        }));
    };

    const handleTagSelect = (selected: any) => {
        setForm((prev: any) => ({
            ...prev,
            producttags: selected ? selected.map((item: any) => item.value) : [],
        }));
    };

    const handleBrandSelect = (selected: any) => {
        setForm((prev: any) => ({
            ...prev,
            brand: selected ? selected.value : "",
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        setForm((prev: any) => ({
            ...prev,
            [name]: files && files.length > 0 ? (name === "images" ? Array.from(files) : files[0]) : name === "images" ? [] : null,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form || !id) return;
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key === "images" && Array.isArray(value)) {
                value.forEach((file: File) => {
                    if (file instanceof File) {
                        formData.append("images", file);
                    }
                });
            } else if (key === "thumbnail" && value && value instanceof File) {
                formData.append("thumbnail", value);
            } else if (key === "variants" && Array.isArray(value)) {
                formData.append("variants", JSON.stringify(value));
            } else if (Array.isArray(value)) {
                value.forEach((v) => {
                    if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
                        formData.append(key, v.toString());
                    } else if (v instanceof File) {
                        formData.append(key, v);
                    } else if (typeof v === "object" && v !== null) {
                        formData.append(key, JSON.stringify(v));
                    }
                });
            } else if (
                typeof value === "object" &&
                value !== null &&
                !Array.isArray(value)
            ) {
                if (Object.keys(value).length > 0) {
                    formData.append(key, JSON.stringify(value));
                }
            } else if (
                value !== undefined &&
                value !== null &&
                (typeof value === "string" ||
                    typeof value === "number" ||
                    typeof value === "boolean")
            ) {
                formData.append(key, value.toString());
            }
        });

        dispatch(updateProductRequest(id, formData));
    };

    const handleVariantChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev: any) => {
            const newVariants = [...prev.variants];
            newVariants[index][name] = value;
            return { ...prev, variants: newVariants };
        });
    };

    const addVariant = () => {
        setForm((prev: any) => ({
            ...prev,
            variants: [...prev.variants, { color: "", size: "", material: "", style: "" }],
        }));
    };

    const removeVariant = (index: number) => {
        setForm((prev: any) => ({
            ...prev,
            variants: prev.variants.filter((_: any, i: number) => i !== index),
        }));
    };

    if (!form) {
        return (
            <Layout
                title="Edit Product"
                subtitle="Update product details"
                isHeaderFixed={true}
                showBackButton={true}
                backButtonLink="/products"
            >
                <div className="flex justify-center items-center h-64">
                    <span>Loading...</span>
                </div>
            </Layout>
        );
    }
    const categoryOptions = categories.map((cat: any) => ({
        value: cat._id,
        label: cat.name,
    }));
    const tagOptions = tags.map((tag: any) => ({
        value: tag._id,
        label: tag.name,
    }));
    const brandOptions = brands.map((brand: any) => ({
        value: brand._id,
        label: brand.name,
    }));
    const selectedCategories = categoryOptions.filter((opt: any) =>
        form.productcategory.includes(opt.value)
    );
    const selectedTags = tagOptions.filter((opt: any) =>
        form.producttags.includes(opt.value)
    );
    const selectedBrand =
        brandOptions.find((opt: any) => opt.value === form.brand) || null;

    return (
        <Layout
            title="Edit Product"
            subtitle="Update product details"
            isHeaderFixed={true}
            showBackButton={true}
            backButtonLink="/products"
        >
            <form
                className="max-w-full mx-auto bg-white p-8 rounded shadow"
                onSubmit={handleSubmit}
            >
                <div className="mb-4 flex gap-4">
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={form.slug}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                </div>
                <div className="mb-4 flex gap-4">
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Product Categories</label>
                        <Select
                            isMulti
                            options={categoryOptions}
                            value={selectedCategories}
                            onChange={handleCategorySelect}
                            placeholder="Select categories"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Product Tags</label>
                        <Select
                            isMulti
                            options={tagOptions}
                            value={selectedTags}
                            onChange={handleTagSelect}
                            placeholder="Select tags"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Brand</label>
                        <Select
                            options={brandOptions}
                            value={selectedBrand}
                            onChange={handleBrandSelect}
                            placeholder="Select brand"
                        />
                    </div>
                </div>
                <div className="mb-4 flex gap-4">
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Sale Price</label>
                        <input
                            type="number"
                            name="salePrice"
                            value={form.salePrice}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">SKU</label>
                        <input
                            type="text"
                            name="sku"
                            value={form.sku}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                </div>
                <div className="mb-4 flex gap-4">
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Barcode</label>
                        <input
                            type="text"
                            name="barcode"
                            value={form.barcode}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-1 font-medium">Variants</label>
                    {form.variants.map((variant: any, idx: number) => (
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
                <div className="mb-4 flex gap-4">
                    <div className="w-1/2">
                        <label className="block mb-1 font-medium">Images</label>
                        <input
                            type="file"
                            name="images"
                            multiple
                            onChange={handleFileChange}
                            className="w-full"
                        />
                        <div className="flex gap-2 mt-2 flex-wrap">
                            {product.images && product.images.length > 0 &&
                                product.images.map((img: any, idx: number) => (
                                    <a
                                        key={idx}
                                        href={getImageUrl(img)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <img
                                            src={`${IMAGE_BASE_URL}products/${getImageUrl(img)}`}
                                            alt={`Product Image ${idx + 1}`}
                                            className="w-16 h-16 object-cover rounded border"
                                        />
                                    </a>
                                ))
                            }
                            {form.images && form.images.length > 0 &&
                                form.images.map((img: any, idx: number) => (
                                    <a
                                        key={`new-${idx}`}
                                        href={getImageUrl(img)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <img
                                            src={getImageUrl(img)}
                                            alt={`Selected Image ${idx + 1}`}
                                            className="w-16 h-16 object-cover rounded border"
                                        />
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                    <div className="w-1/2">
                        <label className="block mb-1 font-medium">Thumbnail</label>
                        <input
                            type="file"
                            name="thumbnail"
                            onChange={handleFileChange}
                            className="w-full"
                        />
                        {/* Thumbnail Preview */}
                        <div className="mt-2">
                            {form.thumbnail ? (
                                <a
                                    href={
                                        form.thumbnail instanceof File
                                            ? URL.createObjectURL(form.thumbnail)
                                            : `${IMAGE_BASE_URL}products/${form.thumbnail}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={
                                            form.thumbnail instanceof File
                                                ? URL.createObjectURL(form.thumbnail)
                                                : `${IMAGE_BASE_URL}products/${form.thumbnail}`
                                        }
                                        alt="Thumbnail Preview"
                                        className="w-16 h-16 object-cover rounded border"
                                    />
                                </a>
                            ) : product.thumbnail ? (
                                <a
                                    href={`${IMAGE_BASE_URL}products/${product.thumbnail}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src={`${IMAGE_BASE_URL}products/${product.thumbnail}`}
                                        alt="Current Thumbnail"
                                        className="w-16 h-16 object-cover rounded border"
                                    />
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div className="mb-4 flex gap-4">
                    <div className="w-1/2">
                        <label className="block mb-1 font-medium">Weight</label>
                        <input
                            type="text"
                            name="weight"
                            value={form.weight}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    {/* Only one dimensions section below */}
                    <div className="w-1/2 flex gap-4">
                        <div className="w-1/3">
                            <label className="block mb-1 font-medium">Length</label>
                            <input
                                type="text"
                                name="length"
                                value={form.dimensions?.length ?? ""}
                                onChange={handleDimensionsChange}
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Length"
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="block mb-1 font-medium">Width</label>
                            <input
                                type="text"
                                name="width"
                                value={form.dimensions?.width ?? ""}
                                onChange={handleDimensionsChange}
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Width"
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="block mb-1 font-medium">Height</label>
                            <input
                                type="text"
                                name="height"
                                value={form.dimensions?.height ?? ""}
                                onChange={handleDimensionsChange}
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Height"
                            />
                        </div>
                    </div>
                </div>


                <div className="mb-4 flex gap-4">
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Discount</label>
                        <input
                            type="text"
                            name="discount"
                            value={form.discount}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Tax</label>
                        <input
                            type="text"
                            name="tax"
                            value={form.tax}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Shipping Class</label>
                        <input
                            type="text"
                            name="shippingClass"
                            value={form.shippingClass}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                </div>

                <div className="mb-4 flex gap-4">
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Warranty</label>
                        <input
                            type="text"
                            name="warranty"
                            value={form.warranty}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Return Policy</label>
                        <input
                            type="text"
                            name="returnPolicy"
                            value={form.returnPolicy}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block mb-1 font-medium">Vendor</label>
                        <input
                            type="text"
                            name="vendor"
                            value={form.vendor}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                </div>
                <div className="mb-4 flex gap-4">
                    <div className="w-1/2 flex items-center">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={form.isFeatured}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="font-medium">Featured</label>
                    </div>
                    <div className="w-1/2 flex items-center">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={form.isActive}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label className="font-medium">Active</label>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    >
                        Update Product
                    </button>
                </div>
            </form>
        </Layout>
    );
};

export default EditProduct;