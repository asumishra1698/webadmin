import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductTagsRequest,
    createProductTagRequest,
    deleteProductTagRequest,
} from "../../redux/actions/productActions";
import Layout from "../../reuseable/Layout";
import TablePagination from "../../reuseable/TablePagination";
import Modal from "../../reuseable/modal";
import Tabs from "../../reuseable/Tabs";
import DataTable from "../../reuseable/DataTable";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../reuseable/formatDate";

const ManageProductTags: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: "", description: "" });
    const [activeTab, setActiveTab] = useState<"all products" | "category" | "tag" | "brand">("tag");

    const { tags, loading, error, total, page, pages, limit } = useSelector((state: any) => ({
        tags: state.product.tags,
        loading: state.product.loading,
        error: state.product.error,
        total: state.product.total,
        page: state.product.page,
        pages: state.product.pages,
        limit: state.product.limit,
    }));

    useEffect(() => {
        dispatch(getProductTagsRequest({ page: 1, limit, search: "" }));
    }, [dispatch, limit]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        dispatch(getProductTagsRequest({ page: 1, limit, search: value }));
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(getProductTagsRequest({ page: 1, limit: Number(e.target.value), search: searchTerm }));
    };

    const handlePageChange = (newPage: number) => {
        dispatch(getProductTagsRequest({ page: newPage, limit, search: searchTerm }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(createProductTagRequest({ name: form.name, description: form.description }));
        setShowModal(false);
        setForm({ name: "", description: "" });
    };

    const handleDelete = (id: string) => {
        dispatch(deleteProductTagRequest(id));
    };

    const actionButtons = (
        <button
            className="flex items-center px-4 py-2.5 bg-[#e5e5e5] text-[#000000] rounded-xl hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            onClick={() => setShowModal(true)}
        >
            <Plus className="w-4 h-4 mr-2" />
            Add Tag
        </button>
    );

    // DataTable columns
    const columns = [
        { key: "name", header: "NAME" },
        { key: "slug", header: "SLUG" },
        { key: "description", header: "DESCRIPTION" },
        {
            key: "isDeleted",
            header: "DELETED",
            render: (row: any) => (row.isDeleted ? "Yes" : "No"),
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
            title="Manage Tags"
            subtitle="View, edit, and manage product tags"
            searchValue={searchTerm}
            onSearchChange={handleSearchChange}
            searchPlaceholder="Search by Tag Name"
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
                    ) : tags.length === 0 ? (
                        <div className="py-12 text-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                                No tags found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adding a new tag.
                            </p>
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={tags}
                            emptyText="No tags found"
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
                    <h2 className="text-lg font-semibold mb-2">Add Tag</h2>
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            required
                            className="w-full border px-3 py-2 rounded"
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

export default ManageProductTags;