import React, { useState } from "react";
import Layout from "../../reuseable/Layout";
import { Search } from "lucide-react";

import fillterIcon from "../../assets/icons/fillters.png";
import rmOutstandingIcon from "../../assets/icons/rmoutstanding.png";
import brokerOutstandingIcon from "../../assets/icons/brokeroutstanding.png";
import totalPaidIcon from "../../assets/icons/totalpaid.png";
import totalCommissionIcon from "../../assets/icons/commission.png";
import historyIcon from "../../assets/icons/history.png";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";

const financeStats = [
  {
    label: "Total Commission",
    value: "₹ 82,45,000",
    change: "+12% from last month",
    icon: totalCommissionIcon,
  },
  {
    label: "Total Paid",
    value: "₹ 64,45,000",
    change: "+12% from last month",
    icon: totalPaidIcon,
  },
  {
    label: "Broker Outstanding",
    value: "₹ 18,45,000",
    change: "+12% from last month",
    icon: brokerOutstandingIcon,
  },
  {
    label: "RM Outstanding",
    value: "₹ 8,45,000",
    change: "+12% from last month",
    icon: rmOutstandingIcon,
  },
];

const commissionData = [
  {
    id: 1,
    unitType: "2BHK Type 1",
    saleDate: "15 Jan 2025",
    broker: "Project 1",
    recipients: [
      {
        type: "Broker",
        name: "Rahul Sharma",
        commission: "2.5%",
        amount: "₹ 18,45,000",
        paid: "₹ 3,45,000",
        outstanding: "₹ 15,45,000",
        status: "Due",
      },
      {
        type: "RM",
        name: "Rahul Sharma",
        commission: "2.5%",
        amount: "₹ 18,45,000",
        paid: "₹ 3,45,000",
        outstanding: "₹ 15,45,000",
        status: "Paid",
      },
    ],
    total: "₹ 18,45,000",
  },
  {
    id: 2,
    unitType: "2BHK Type 1",
    saleDate: "15 Jan 2025",
    broker: "Project 2",
    recipients: [
      {
        type: "Broker",
        name: "Rahul Sharma",
        commission: "2.5%",
        amount: "₹ 18,45,000",
        paid: "₹ 3,45,000",
        outstanding: "₹ 15,45,000",
        status: "Due",
      },
      {
        type: "RM",
        name: "Rahul Sharma",
        commission: "2.5%",
        amount: "₹ 18,45,000",
        paid: "₹ 3,45,000",
        outstanding: "₹ 15,45,000",
        status: "Paid",
      },
    ],
    total: "₹ 18,45,000",
  },
  {
    id: 3,
    unitType: "2BHK Type 1",
    saleDate: "15 Jan 2025",
    broker: "Project 3",
    recipients: [
      {
        type: "Broker",
        name: "Rahul Sharma",
        commission: "2.5%",
        amount: "₹ 18,45,000",
        paid: "₹ 3,45,000",
        outstanding: "₹ 15,45,000",
        status: "Due",
      },
      {
        type: "RM",
        name: "Rahul Sharma",
        commission: "2.5%",
        amount: "₹ 18,45,000",
        paid: "₹ 3,45,000",
        outstanding: "₹ 15,45,000",
        status: "Paid",
      },
    ],
    total: "₹ 18,45,000",
  },
];

const transactionHistory = [
  {
    date: "15 Aug 2023",
    paid: "₹18,45,000",
    remaining: "₹18,45,000",
    remarks: "First Installment",
  },
  {
    date: "15 Aug 2023",
    paid: "₹18,45,000",
    remaining: "₹18,45,000",
    remarks: "-",
  },
  {
    date: "15 Aug 2023",
    paid: "₹18,45,000",
    remaining: "₹18,45,000",
    remarks: "Second",
  },
  {
    date: "15 Aug 2023",
    paid: "₹18,45,000",
    remaining: "₹18,45,000",
    remarks: "First Installment",
  },
  {
    date: "15 Aug 2023",
    paid: "₹18,45,000",
    remaining: "₹18,45,000",
    remarks: "First Installment",
  },
  {
    date: "15 Aug 2023",
    paid: "₹18,45,000",
    remaining: "₹18,45,000",
    remarks: "First Installment",
  },
  {
    date: "15 Aug 2023",
    paid: "₹18,45,000",
    remaining: "₹18,45,000",
    remarks: "First Installment",
  },
  {
    date: "15 Aug 2023",
    paid: "₹18,45,000",
    remaining: "₹18,45,000",
    remarks: "First Installment",
  },
];

const FinanceCommission: React.FC = () => {
  useDocumentMeta({
    title: `Finance & Commission`,
    description: "Manage finance and commission details across your organization",
  });
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState<any>(null);

  const handleMarkAsPaid = (row: any, rec: any) => {
    setSelectedRecipient({ ...rec, ...row });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRecipient(null);
  };

  const handleHistoryClick = (row: any) => {
    setSelectedHistory(row);
    setHistoryModalOpen(true);
  };

  const handleCloseHistoryModal = () => {
    setHistoryModalOpen(false);
    setSelectedHistory(null);
  };

  return (
    <Layout
      title="Finance & Commission"
      subtitle="Manage your organization's team members and their permissions"
      isHeaderFixed={true}
    >
      <div className="p-6">
        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DA0808] text-sm"
              placeholder="Search by Project, Unit, Broker, RM"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="bg-[#DA0808] text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#b20606] transition-colors">
            <img src={fillterIcon} alt="Filter" className="w-5 h-5 mr-2" />
            Advanced Filters
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {financeStats.map((stat, idx) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-1 relative"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xl text-gray-500">{stat.label}</span>
                <span
                  className={
                    idx === 0
                      ? "bg-[#F3E8E8] p-2 rounded-full flex items-center justify-center"
                      : idx === 1
                      ? "bg-green-100 p-2 rounded-full flex items-center justify-center"
                      : idx === 2
                      ? "bg-purple-100 p-2 rounded-full flex items-center justify-center"
                      : "bg-blue-100 p-2 rounded-full flex items-center justify-center"
                  }
                >
                  <img src={stat.icon} alt={stat.label} className="w-5 h-5" />
                </span>
              </div>
              <div className="text-xl font-bold text-[#14133B]">
                {stat.value}
              </div>
              <div className="text-xs text-green-600 mt-1">{stat.change}</div>
            </div>
          ))}
        </div>
        {/* Table */}
        {commissionData.map((row) => (
          <div
            key={row.id}
            className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 mb-4 overflow-hidden"
          >
            {row.id === 1 && (
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-white border-b">
                    <th className="px-6 py-4 font-bold text-gray-800">
                      UNIT DETAILS
                    </th>
                    <th className="px-6 py-4 font-bold text-gray-800">
                      RECIPIENT
                    </th>
                    <th className="px-6 py-4 font-bold text-gray-800">
                      COMMISSION %
                    </th>
                    <th className="px-6 py-4 font-bold text-gray-800">
                      AMOUNT
                    </th>
                    <th className="px-6 py-4 font-bold text-gray-800">PAID</th>
                    <th className="px-6 py-4 font-bold text-gray-800">
                      OUTSTANDING
                    </th>
                    <th className="px-6 py-4 font-bold text-gray-800">
                      STATUS
                    </th>
                    <th className="px-6 py-4 font-bold text-gray-800">
                      ACTION
                    </th>
                  </tr>
                </thead>
              </table>
            )}
            <div className="flex items-start justify-between w-full px-6 py-4 border-b border-gray-100">
              <div>
                <div className="font-semibold text-sm text-[#14133B]">
                  {row.broker}
                </div>
                <div className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                  <span>Unit Type: {row.unitType}</span>
                  <span className="mx-1">•</span>
                  <span>Sale Date: {row.saleDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  className="bg-gray-100 hover:bg-gray-200 rounded-lg px-5 py-2 flex items-center gap-2 font-semibold text-[#14133B] shadow-none"
                  onClick={() => handleHistoryClick(row)}
                >
                  <img src={historyIcon} alt="History" className="w-5 h-5" />
                  <span className="text-base">Transaction History</span>
                </button>
                <div className="flex flex-col items-end">
                  <div className="font-bold text-2xl text-[#14133B]">
                    {row.total}
                  </div>
                  <div className="text-base text-gray-500 font-medium">
                    Total Sale Price
                  </div>
                </div>
              </div>
            </div>
            <table className="w-full text-sm text-left">
              <tbody>
                {row.recipients.map((rec, rIdx) => (
                  <tr key={rIdx} className="border-b last:border-b-0 bg-white">
                    <td className="px-6 py-4 font-bold text-gray-800">
                      <span
                        className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                          rec.type === "Broker"
                            ? "bg-purple-100 text-[#14133B]"
                            : "bg-blue-100 text-[#14133B]"
                        }`}
                      >
                        {rec.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">{rec.name}</td>
                    <td className="px-6 py-4">{rec.commission}</td>
                    <td className="px-6 py-4">{rec.amount}</td>
                    <td className="px-6 py-4">{rec.paid}</td>
                    <td className="px-6 py-4">{rec.outstanding}</td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`px-6 py-1 rounded-full text-xs font-semibold ${
                          rec.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {rec.status === "Due" ? (
                        <button
                          className="bg-[#DA0808] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#b20606] min-w-[120px]"
                          onClick={() => handleMarkAsPaid(row, rec)}
                        >
                          Mark as Paid
                        </button>
                      ) : (
                        <button className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-semibold cursor-default min-w-[130px]">
                          Fully Paid
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {modalOpen && selectedRecipient && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
            onClick={handleCloseModal}
          >
            <div
              className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-bold text-lg mb-2">Mark as Paid</div>
              <div className="mb-4">
                <div className="font-semibold text-[#14133B]">
                  {selectedRecipient.broker}
                </div>
                <div className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                  <span>Unit Type: {selectedRecipient.unitType}</span>
                  <span className="mx-1">•</span>
                  <span>Sale Date: {selectedRecipient.saleDate}</span>
                </div>
              </div>
              <div className="mb-4 flex justify-between items-center">
                <div className="text-gray-700">Total Commission Amount</div>
                <div className="font-semibold text-[#14133B]">
                  {selectedRecipient.amount}
                </div>
              </div>
              <div className="mb-4 flex justify-between items-center">
                <div className="text-gray-700">Outstanding Amount</div>
                <div className="font-semibold text-[#DA0808]">
                  {selectedRecipient.outstanding}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-1">
                  Paid Amount (₹)
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DA0808]"
                  defaultValue={selectedRecipient.outstanding}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-1">Remarks</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#DA0808]"
                  rows={2}
                  placeholder="Add Remarks"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-semibold"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button className="bg-[#14133B] text-white px-5 py-2 rounded-lg font-semibold">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {historyModalOpen && selectedHistory && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
            onClick={handleCloseHistoryModal}
          >
            <div
              className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="font-bold text-lg mb-2">Transaction History</div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-semibold text-[#14133B]">
                    {selectedHistory.broker}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 flex items-center gap-2">
                    <span>Unit Type: {selectedHistory.unitType}</span>
                    <span className="mx-1">•</span>
                    <span>Sale Date: {selectedHistory.saleDate}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-700">
                    Broker: Rajesh Sharma
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="font-bold text-2xl text-[#14133B]">
                    {selectedHistory.total}
                  </div>
                  <div className="text-base text-gray-500 font-medium">
                    Total Sale Price
                  </div>
                </div>
              </div>
              <table className="w-full text-sm text-left mt-4">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-2 font-semibold text-gray-700">
                      DATE
                    </th>
                    <th className="py-2 px-2 font-semibold text-gray-700">
                      PAID AMOUNT (₹)
                    </th>
                    <th className="py-2 px-2 font-semibold text-gray-700">
                      REMAINING (₹)
                    </th>
                    <th className="py-2 px-2 font-semibold text-gray-700">
                      REMARKS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((item, idx) => (
                    <tr key={idx} className="border-b last:border-b-0">
                      <td className="py-2 px-2">{item.date}</td>
                      <td className="py-2 px-2 font-semibold text-green-600">
                        {item.paid}
                      </td>
                      <td className="py-2 px-2 font-semibold text-[#DA0808]">
                        {item.remaining}
                      </td>
                      <td className="py-2 px-2">{item.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-6">
                <button
                  className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-semibold"
                  onClick={handleCloseHistoryModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FinanceCommission;