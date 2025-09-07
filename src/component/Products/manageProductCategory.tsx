import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategoriesRequest, createProductCategoryRequest, deleteProductCategoryRequest } from "../../redux/actions/productActions";
import Layout from "../../reuseable/Layout";
import TablePagination from "../../reuseable/TablePagination";
import Tabs from "../../reuseable/Tabs";
import DataTable from "../../reuseable/DataTable";
import { Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "../../reuseable/modal";
import { IMAGE_BASE_URL } from "../../config/apiRoutes";
import { formatDate } from "../../reuseable/formatDate";


const ManageProductCategory: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState<
        "all products" | "category" | "tag" | "brand"
    >("category");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        bannerImage: null as File | null,
        thumbnailImage: null as File | null,
    });

    const { categories, loading, error, total, page, pages, limit } = useSelector(
        (state: any) => ({
            categories: state.product.categories,
            loading: state.product.loading,
            error: state.product.error,
            total: state.product.total,
            page: state.product.page,
            pages: state.product.pages,
            limit: state.product.limit,
        })
    );

    useEffect(() => {
        dispatch(getProductCategoriesRequest({ page: 1, limit, search: searchTerm }));
    }, [dispatch, searchTerm]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        dispatch(getProductCategoriesRequest({ page: 1, limit, search: value }));
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as any;
        setForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        if (form.bannerImage) formData.append("bannerImage", form.bannerImage);
        if (form.thumbnailImage) formData.append("thumbnailImage", form.thumbnailImage);
        dispatch(createProductCategoryRequest(formData));
        setShowModal(false);
        setForm({ name: "", description: "", bannerImage: null, thumbnailImage: null });
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(getProductCategoriesRequest({ page: 1, limit: Number(e.target.value), search: searchTerm }));
    };

    const handlePageChange = (newPage: number) => {
        dispatch(getProductCategoriesRequest({ page: newPage, limit, search: searchTerm }));
    };

    const actionButtons = (
        <button
            className="flex items-center px-4 py-2.5 bg-[#e5e5e5] text-[#000000] rounded-xl hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            onClick={() => setShowModal(true)}
        >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
        </button>
    );

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            dispatch(deleteProductCategoryRequest(id));
        }
    };

    return (
        <Layout
            title="Manage Categories"
            subtitle="View, edit, and manage categories"
            searchValue={searchTerm}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search by Category Name"
            actionButtons={actionButtons}
            isHeaderFixed={true}
        >
            <div className="p-4">
                <Tabs
                    tabs={[
                        {
                            label: "All Products",
                            value: "all products",
                            onClick: () => {
                                setActiveTab("all products");
                                navigate("/products");
                            },
                        },
                        {
                            label: "Category",
                            value: "category",
                            onClick: () => {
                                setActiveTab("category");
                                navigate("/product-categories");
                            },
                        },
                        {
                            label: "Tags",
                            value: "tag",
                            onClick: () => {
                                setActiveTab("tag");
                                navigate("/product-tags");
                            },
                        },
                        {
                            label: "Brand",
                            value: "brand",
                            onClick: () => {
                                setActiveTab("brand");
                                navigate("/product-brands");
                            },
                        },
                    ]}
                    activeTab={activeTab}
                />
                <div className="bg-white dark:bg-[#181f2a] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-20">
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
                    ) : categories.length === 0 ? (
                        <div className="py-12 text-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                No categories found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adding a new product.
                            </p>
                        </div>
                    ) : (
                        <DataTable
                            columns={[
                                { key: "name", header: "NAME" },
                                { key: "slug", header: "SLUG" },
                                {
                                    key: "description",
                                    header: "DESCRIPTION",
                                },
                                {
                                    key: "bannerImage",
                                    header: "BANNER IMAGE",
                                    render: (row: any) => row.bannerImage ? <img src={`${IMAGE_BASE_URL}productcategories/${row.bannerImage}`} alt={row.name} className="w-10 h-10 object-cover rounded" /> : 'N/A',
                                },
                                {
                                    key: "thumbnailImage",
                                    header: "THUMBNAIL IMAGE",
                                    render: (row: any) => row.thumbnailImage ? <img src={`${IMAGE_BASE_URL}productcategories/${row.thumbnailImage}`} alt={row.name} className="w-10 h-10 object-cover rounded" /> : 'N/A',
                                },
                                {
                                    key: "createdAt",
                                    header: "CREATED AT",
                                    render: (row: any) => formatDate(row.createdAt),
                                },
                                {
                                    key: "updatedAt",
                                    header: "UPDATED AT",
                                    render: (row: any) => formatDate(row.updatedAt),
                                },
                            ]}
                            data={categories}
                            actions={(row) => (
                                <div className="flex items-center space-x-2">
                                    <button
                                        className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                                        title="Delete"
                                        onClick={() => handleDelete(row._id)}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                            emptyText="No products found"
                        />
                    )}
                </div>
                <TablePagination
                    page={page}
                    pages={pages}
                    total={total}
                    limit={limit}
                    limitOptions={[5, 10, 20, 50, 100]}
                    onLimitChange={handleLimitChange}
                    onPageChange={handlePageChange}
                />
            </div>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-lg font-semibold mb-2">Add Category</h2>
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleFormChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleFormChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Banner Image</label>
                        <input
                            type="file"
                            name="bannerImage"
                            accept="image/*"
                            onChange={handleFormChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Thumbnail Image</label>
                        <input
                            type="file"
                            name="thumbnailImage"
                            accept="image/*"
                            onChange={handleFormChange}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default ManageProductCategory;