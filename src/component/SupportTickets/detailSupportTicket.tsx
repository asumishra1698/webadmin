import React from "react";
import Layout from "../../reuseable/Layout";
import {
  Paperclip,
  ChevronDown,
  Eye,
  Download,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";

const ticketData = {
  id: "#TCKT-2451",
  category: "Technical Issue",
  raisedBy: "Sarah Johnson (Receptionist)",
  createdDate: "17 July 2025, 10:52 AM",
  lastUpdated: "18 July 2025, 10:52 AM",
  status: "In Progress",
  description:
    "The visitor check-in system is experiencing intermittent crashes when processing multiple check-ins simultaneously. This issue occurs specifically when a new visitor is being registered while another visitor is completing their check-in process. The system freezes momentarily before displaying an error message stating 'Database connection timeout'. This has happened three times today, causing delays in the reception area and requiring manual restart of the application. The most recent occurrence was at approximately 10:30 AM when we had a group of 5 visitors arriving for the marketing department meeting.",
  timeline: [
    {
      id: 1,
      timestamp: "17 July 2025, 10:52 AM",
      title: "Ticket Created",
      by: "Sarah Johnson (Receptionist)",
      comment: null,
    },
    {
      id: 2,
      timestamp: "17 July 2025, 10:52 AM",
      title: "Assigned to Support Team",
      by: "System",
      comment: null,
    },
    {
      id: 3,
      timestamp: "17 July 2025, 10:52 AM",
      title: "Comment Added",
      by: "Alex Chen (Admin)",
      comment:
        "We're investigating the issue. Can you please provide your username and the app version you're currently using?",
    },
    {
      id: 4,
      timestamp: "17 July 2025, 10:52 AM",
      title: 'Status Changed to "In Progress"',
      by: "Alex Chen (Admin)",
      comment: null,
    },
  ],
  attachments: [
    {
      id: 1,
      name: "Screenshot.png",
      size: "1.2 MB",
      type: "image",
      url: "#",
    },
    {
      id: 2,
      name: "Error_Log.pdf",
      size: "1.2 MB",
      type: "pdf",
      url: "#",
    },
  ],
};

const DetailItem: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <div className="text-base font-medium text-gray-800">{children}</div>
  </div>
);

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

const DetailSupportTicket: React.FC = () => {
  useDocumentMeta({
    title: `Support Tickets Details`,
    description:
      "Manage support tickets and their details across your organization",
  });
  return (
    <Layout
      title="Support Tickets"
      subtitle="Handle and resolve user support tickets efficiently."
      showBackButton={true}
      backButtonLink="/support-tickets"
    >
      <div className="p-6 bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <Card title="Ticket Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DetailItem label="Ticket ID">{ticketData.id}</DetailItem>
                <DetailItem label="Category">{ticketData.category}</DetailItem>
                <DetailItem label="Raised By">{ticketData.raisedBy}</DetailItem>
                <DetailItem label="Created Date">
                  {ticketData.createdDate}
                </DetailItem>
                <DetailItem label="Last Updated">
                  {ticketData.lastUpdated}
                </DetailItem>
                <DetailItem label="Status">
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-amber-100 text-amber-800">
                    {ticketData.status}
                  </span>
                </DetailItem>
              </div>
            </Card>

            <Card title="Issue Description">
              <p className="text-gray-600 leading-relaxed">
                {ticketData.description}
              </p>
            </Card>

            <Card title="Ticket Timeline">
              <div className="relative">
                <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-red-200"></div>
                {ticketData.timeline.map((item) => (
                  <div key={item.id} className="relative pl-10 pb-8">
                    <div className="absolute left-0 top-1.5 w-5 h-5 bg-red-500 rounded-full border-4 border-white"></div>
                    <p className="text-sm text-gray-500 mb-1">
                      {item.timestamp}
                    </p>
                    <h4 className="font-semibold text-gray-800">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-600">by {item.by}</p>
                    {item.comment && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-md border border-gray-200 text-sm text-gray-700">
                        {item.comment}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Attachments">
              <div className="space-y-3">
                {ticketData.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      {file.type === "image" ? (
                        <ImageIcon className="w-6 h-6 text-blue-500" />
                      ) : (
                        <FileText className="w-6 h-6 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium text-gray-800">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {file.type === "image" && (
                        <a
                          href={file.url}
                          className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
                        >
                          <Eye className="w-4 h-4" /> View
                        </a>
                      )}
                      <a
                        href={file.url}
                        download
                        className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
                      >
                        <Download className="w-4 h-4" /> Download
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add Response
              </h3>
              <div className="mb-4">
                <label
                  htmlFor="response"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Response
                </label>
                <textarea
                  id="response"
                  rows={5}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                  placeholder="Type your update here..."
                ></textarea>
              </div>
              <button className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4">
                <Paperclip className="w-4 h-4" /> Attach File
              </button>
              <button className="w-full bg-gray-800 text-white font-semibold py-2.5 rounded-md hover:bg-gray-900 transition-colors">
                Send Response
              </button>

              <hr className="my-6" />

              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Update Status
              </h3>
              <div className="relative mb-4">
                <select className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2.5 px-3 pr-8 focus:ring-red-500 focus:border-red-500">
                  <option>Select Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <button className="w-full bg-red-600 text-white font-semibold py-2.5 rounded-md hover:bg-red-700 transition-colors">
                Update Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailSupportTicket;