import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductBrandsRequest,
    createProductBrandRequest,
    deleteProductBrandRequest,
} from "../../redux/actions/productActions";
import Layout from "../../reuseable/Layout";
import TablePagination from "../../reuseable/TablePagination";
import Modal from "../../reuseable/modal";
import Tabs from "../../reuseable/Tabs";
import DataTable from "../../reuseable/DataTable";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ManageProductBrand: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: "", description: "", logo: null as File | null });

    const [activeTab, setActiveTab] = useState<"all products" | "category" | "tag" | "brand">("brand");


    const { brands, loading, error, total, page, pages, limit } = useSelector((state: any) => state.product);

    useEffect(() => {
        dispatch(getProductBrandsRequest({ page: 1, limit, search: "" }));
    }, [dispatch, limit]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        dispatch(getProductBrandsRequest({ page: 1, limit, search: value }));
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(getProductBrandsRequest({ page: 1, limit: Number(e.target.value), search: searchTerm }));
    };

    const handlePageChange = (newPage: number) => {
        dispatch(getProductBrandsRequest({ page: newPage, limit, search: searchTerm }));
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
        if (form.logo) formData.append("logo", form.logo);

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        dispatch(createProductBrandRequest(formData));
        setShowModal(false);
        setForm({ name: "", description: "", logo: null });
    };

    const handleDelete = (id: string) => {
        dispatch(deleteProductBrandRequest(id));
    };

    const actionButtons = (
        <button
            className="flex items-center px-4 py-2.5 bg-[#e5e5e5] text-[#000000] rounded-xl hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            onClick={() => setShowModal(true)}
        >
            <Plus className="w-4 h-4 mr-2" />
            Add Brand
        </button>
    );

    const columns = [
        { key: "name", header: "NAME" },
        { key: "description", header: "DESCRIPTION" },
        {
            key: "createdAt",
            header: "CREATED AT",
            render: (row: any) => new Date(row.createdAt).toLocaleString(),
        },
        {
            key: "updatedAt",
            header: "UPDATED AT",
            render: (row: any) => new Date(row.updatedAt).toLocaleString(),
        },
        {
            key: "actions",
            header: "ACTION",
            render: (row: any) => (
                <button
                    className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                    title="Delete"
                    onClick={() => handleDelete(row._id)}
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            ),
        },
    ];

    return (
        <Layout
            title="Manage Brands"
            subtitle="View, edit, and manage product brands"
            searchValue={searchTerm}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search by Brand Name"
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
                <div className="bg-white dark:bg-[#181f2a] rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-20 mt-4">
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
                    ) : brands.length === 0 ? (
                        <div className="py-12 text-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                No brands found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adding a new brand.
                            </p>
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={brands}
                            emptyText="No brands found"
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
                    <h2 className="text-lg font-semibold mb-2">Add Brand</h2>
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
                        <label className="block mb-1 font-medium">Logo</label>
                        <input
                            type="file"
                            name="logo"
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
                            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default ManageProductBrand;