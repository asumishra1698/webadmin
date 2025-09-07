import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Copy, Plus, Edit, Trash2 } from "lucide-react";
import DataTable from "../../reuseable/DataTable";
import Layout from "../../reuseable/Layout";
import { getProductsRequest, deleteProductRequest, duplicateProductRequest, exportProductsRequest } from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";
import TablePagination from "../../reuseable/TablePagination";
import Tabs from "../../reuseable/Tabs";
import { IMAGE_BASE_URL } from "../../config/apiRoutes";
import { formatDate } from "../../reuseable/formatDate";

const ManageProducts: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all products" | "category" | "tag" | "brand"
  >("all products");
  const limitOptions = [5, 10, 20, 50, 100];

  const products = useSelector((state: any) => state.product.products);
  const loading = useSelector((state: any) => state.product.loading);
  const error = useSelector((state: any) => state.product.error);
  const total = useSelector((state: any) => state.product.total);
  const page = useSelector((state: any) => state.product.page);
  const pages = useSelector((state: any) => state.product.pages);
  const limit = useSelector((state: any) => state.product.limit);

  useEffect(() => {
    dispatch(getProductsRequest({ page: 1, limit: 10, search: "" }));
  }, [dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(getProductsRequest({ page: newPage, limit, search: searchTerm }));
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      getProductsRequest({
        page: 1,
        limit: Number(e.target.value),
        search: searchTerm,
      })
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch(getProductsRequest({ page: 1, limit, search: e.target.value }));
  };

  const handleEdit = (id: string) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductRequest(id));
    }
  };

  const actionButtons = (
    <>
      <button
        className="flex items-center px-4 py-2.5 bg-[#e5e5e5] text-[#000000] rounded-xl hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        onClick={() => dispatch(exportProductsRequest())}
      >
        <Plus className="w-4 h-4 mr-2" />
        Export Product
      </button>
      <button
        className="flex items-center px-4 py-2.5 bg-[#e5e5e5] text-[#000000] rounded-xl hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        onClick={() => navigate("/add-product")}
      >
        <Plus className="w-4 h-4 mr-2" />
        Import Product
      </button>
      <button
        className="flex items-center px-4 py-2.5 bg-[#e5e5e5] text-[#000000] rounded-xl hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        onClick={() => navigate("/add-product")}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Product
      </button>
    </>
  );

  return (
    <Layout
      title="Manage Products"
      subtitle="View, edit, and manage products"
      searchValue={searchTerm}
      onSearchChange={handleSearchChange}
      searchPlaceholder="Search by Product Name"
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden mb-20">
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
          ) : products.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adding a new product.
              </p>
            </div>
          ) : (
            <DataTable
              columns={[
                {
                  key: "thumbnail",
                  header: "THUMBNAIL",
                  render: (row) =>
                    row.thumbnail ? (
                      <a
                        href={`${IMAGE_BASE_URL}products/${row.thumbnail}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={`${IMAGE_BASE_URL}products/${row.thumbnail}`}
                          alt="Thumbnail"
                          className="w-12 h-12 object-cover rounded border"
                        />
                      </a>
                    ) : (
                      "-"
                    ),
                },
                {
                  key: "name_slug",
                  header: "NAME / SLUG",
                  render: (row) => (
                    <>
                      <div>
                        <span className="font-semibold">{row.name}</span>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">{row.slug?.toLowerCase()}</span>
                      </div>
                    </>
                  ),
                },
                {
                  key: "productcategory",
                  header: "CATEGORY",
                  render: (row) =>
                    Array.isArray(row.productcategory)
                      ? row.productcategory
                        .map((cat: any) => cat.name)
                        .join(", ")
                      : "-",
                },
                {
                  key: "brand",
                  header: "BRAND",
                  render: (row) =>
                    row.brand ? (
                      <div className="flex flex-col text-xs">
                        <span className="font-semibold">{row.brand.name}</span>
                        <span className="text-gray-400 dark:text-gray-500">
                          {row.brand.description}
                        </span>
                      </div>
                    ) : (
                      "-"
                    ),
                },
                {
                  key: "price",
                  header: "PRICE",
                  render: (row) => `₹${row.price}`,
                },
                { key: "stock", header: "STOCK" },
                {
                  key: "created_updated",
                  header: "CREATED / UPDATED",
                  render: (row) => (
                    <div className="flex flex-col text-xs">
                      <span>
                        <span className="font-semibold">Created:</span>{" "}
                        {row.createdAt ? formatDate(row.createdAt) : "-"}
                      </span>
                      <span>
                        <span className="font-semibold">Updated:</span>{" "}
                        {row.updatedAt ? formatDate(row.updatedAt) : "-"}
                      </span>
                    </div>
                  ),
                },
              ]}
              data={products}
              actions={(row) => (
                <div className="flex items-center space-x-2">
                  <button
                    className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors"
                    title="Duplicate"
                    onClick={() => dispatch(duplicateProductRequest(row._id))}
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
                    title="Edit"
                    onClick={() => handleEdit(row._id)}
                  >
                    <Edit className="w-5 h-5" />
                  </button>
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
      </div>

      {/* Pagination Controls */}
      <TablePagination
        page={page}
        pages={pages}
        total={total}
        limit={limit}
        limitOptions={limitOptions}
        onLimitChange={handleLimitChange}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
};

export default ManageProducts;