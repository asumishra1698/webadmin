import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, Trash2, Edit, Plus } from "lucide-react";
import Layout from "../../reuseable/Layout";
import { getProductsRequest } from "../../redux/actions/productActions";
import { useNavigate } from "react-router-dom";
import TablePagination from "../../reuseable/TablePagination";
import Tabs from "../../reuseable/Tabs";

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
      className="flex items-center px-4 py-2.5 bg-[#e5e5e5] text-[#000000] rounded-xl hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-500 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
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
        <Tabs
          tabs={[
            {
              label: "All Products",
              value: "all products",
              onClick: () => setActiveTab("all products"),
            },
            {
              label: "Category",
              value: "category",
              onClick: () => setActiveTab("category"),
            },
            {
              label: "Tags",
              value: "tag",
              onClick: () => setActiveTab("tag"),
            },
            {
              label: "Brand",
              value: "brand",
              onClick: () => setActiveTab("brand"),
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
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
                    NAME
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
                    CATEGORY
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
                    BRAND
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
                    PRICE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
                    STOCK
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((product: any) => (
                  <tr
                    key={product._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-[#14133B] dark:text-gray-100 whitespace-nowrap">
                      {product.name}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {Array.isArray(product.productcategory)
                        ? product.productcategory
                            .filter((cat: any) => cat && cat.name)
                            .map((cat: any) => cat.name)
                            .join(", ")
                        : "-"}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {product.brand && product.brand.name
                        ? product.brand.name
                        : "-"}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      ₹{product.price}
                    </td>
                    <td className="py-4 px-6 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {product.stock}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors"
                          title="View"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          className="p-1.5 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 rounded transition-colors"
                          title="Edit"
                          onClick={() => handleEdit(product._id)}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
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
