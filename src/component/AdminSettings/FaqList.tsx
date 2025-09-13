import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
//   getFaqsRequest,
//   addFaqsRequest,
//   deleteFaqsRequest,
// } from "../../redux/actions/faqActions";
import Layout from "../../reuseable/Layout";
import { Plus } from "lucide-react";
import Swal from "sweetalert2";

const FaqList: React.FC = () => {
  const dispatch = useDispatch();
  const { faqs } = useSelector((state: any) => state.faq);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
    category: "general",
  });

  useEffect(() => {
    // dispatch(getFaqsRequest());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: any) => {
    setNewFaq({ ...newFaq, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // dispatch(addFaqsRequest(newFaq));
    setNewFaq({
      question: "",
      answer: "",
      category: "general",
    });
    handleCloseModal();
  };

  const handleDelete = (faqId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this FAQ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DA0808",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // dispatch(deleteFaqsRequest(faqId));
      }
    });
  };

  const actionButtons = useMemo(
    () => (
      <div className="flex items-center space-x-4">
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            // dispatch(getFaqsRequest({ category: e.target.value }));
          }}
          className="border rounded px-3 py-2"
        >
          <option value="">All Categories</option>
          <option value="service">Service</option>
          <option value="payment">Payment</option>
          <option value="account">Account</option>
          <option value="general">General</option>
        </select>
        <button
          onClick={handleOpenModal}
          className="flex items-center px-4 py-2.5 bg-[#DA0808] text-white rounded-md hover:bg-red-600 transition-colors font-medium shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New FAQ
        </button>
      </div>
    ),
    []
  );

  return (
    <Layout
      actionButtons={actionButtons}
      searchPlaceholder="Search"
      searchValue={searchTerm}
      showBackButton={true}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      isHeaderFixed={true}
    >
      <div className="p-4">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Question
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Answer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {faqs.map((faq: any) => (
              <tr key={faq._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {faq.question}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {faq.answer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {faq.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(faq._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm overflow-y-auto h-full w-full z-90 flex items-center justify-center">
          <div className="relative p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
                Add New FAQ
              </h3>
              <div className="mt-2">
                <label
                  htmlFor="question"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Question
                </label>
                <input
                  type="text"
                  name="question"
                  id="question"
                  value={newFaq.question}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="answer"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Answer
                </label>
                <textarea
                  name="answer"
                  id="answer"
                  value={newFaq.answer}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="category"
                  className="block text-left text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={newFaq.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="service">Service</option>
                  <option value="payment">Payment</option>
                  <option value="account">Account</option>
                </select>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-[#DA0808] text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default FaqList;