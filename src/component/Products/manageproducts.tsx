import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Eye, Trash2, Edit, Plus } from "lucide-react";
import Layout from "../../reuseable/Layout";
import { getProductsRequest } from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";

const ManageProducts: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "all products" | "category" | "tag" | "brand"
  >("all products");
  const limitOptions = [5, 10, 20, 50, 100];

  const { products, loading, error, total, page, pages, limit } = useSelector(
    (state: any) => ({
      products: state.product.products,
      loading: state.product.loading,
      error: state.product.error,
      total: state.product.total,
      page: state.product.page,
      pages: state.product.pages,
      limit: state.product.limit,
    })
  );

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
    alert(`Edit product: ${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      // dispatch(deleteProductRequest(id));
      alert("Delete logic here");
    }
  };

  const actionButtons = (
    <button
      className="flex items-center px-4 py-2.5 bg-[#e5e5e5] text-[#000000] rounded-xl hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-500"
      onClick={() => navigate("/add-product")}
    >
      <Plus className="w-4 h-4 mr-2" />
      Add Product
    </button>
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
        <div className="flex flex-wrap items-center justify-between border-b border-gray-200 gap-4 mb-4">
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveTab("all products")}
              className={`text-sm font-medium pb-2 cursor-pointer transition-colors ${
                activeTab === "all products"
                  ? "text-red-500 border-b-2 border-gray-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setActiveTab("category")}
              className={`text-sm font-medium pb-2 cursor-pointer transition-colors ${
                activeTab === "category"
                  ? "text-red-500 border-b-2 border-gray-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Category
            </button>
            <button
              onClick={() => setActiveTab("tag")}
              className={`text-sm font-medium pb-2 cursor-pointer transition-colors ${
                activeTab === "tag"
                  ? "text-red-500 border-b-2 border-gray-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Tags
            </button>
            <button
              onClick={() => setActiveTab("brand")}
              className={`text-sm font-medium pb-2 cursor-pointer transition-colors ${
                activeTab === "brand"
                  ? "text-red-500 border-b-2 border-gray-500"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Brand
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-20">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000000]"></div>
              <span className="ml-4 text-gray-600">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-red-500 p-8 text-center">{error}</div>
          ) : products.length === 0 ? (
            <div className="py-12 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">Try adding a new product.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    NAME
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    CATEGORY
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    BRAND
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    PRICE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    STOCK
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product: any) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-[#14133B] whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 whitespace-nowrap">
                      {Array.isArray(product.productcategory)
                        ? product.productcategory
                            .filter((cat: any) => cat && cat.name)
                            .map((cat: any) => cat.name)
                            .join(", ")
                        : "-"}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 whitespace-nowrap">
                      {product.brand && product.brand.name
                        ? product.brand.name
                        : "-"}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 whitespace-nowrap">
                      ₹{product.price}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 whitespace-nowrap">
                      {product.stock}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
                          title="Edit"
                          onClick={() => handleEdit(product._id)}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete"
                          onClick={() => handleDelete(product._id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* Pagination Controls */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-3 max-w-full mx-auto">
          <span className="text-sm text-gray-700 mb-2 md:mb-0"></span>
          <div className="flex gap-2 items-center">
            <strong className="text-[#000000]">Page {page}</strong> of{" "}
            <strong>{pages}</strong> &nbsp;|&nbsp;
            <span className="text-gray-500">Total Products:</span>{" "}
            <strong>{total}</strong>
            <label
              className="text-sm text-gray-600 mr-2"
              htmlFor="limit-select"
            >
              Rows per page:
            </label>
            <select
              id="limit-select"
              value={limit}
              onChange={handleLimitChange}
              className="px-2 py-1 rounded border bg-gray-100 text-gray-700"
              style={{ minWidth: 60 }}
            >
              {limitOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button
              className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-gray-600 transition disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-gray-600 transition disabled:opacity-50"
              disabled={page >= pages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
