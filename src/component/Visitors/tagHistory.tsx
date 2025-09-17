import React from "react";
import ImageModal, { useImageModal } from "../../reuseable/ImageModal";

interface TagHistoryProps {
  tagHistory: any[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  page: number;
  setPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  totalPages: number;
}

const TagHistory: React.FC<TagHistoryProps> = ({ tagHistory }) => {
  const { modal, openModal, closeModal } = useImageModal();

  if (!tagHistory || tagHistory.length === 0) {
    return (
      <div className="p-6 text-gray-500 text-center">No tag-history found.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 text-xs text-gray-600 uppercase">
          <tr>
            <th className="px-6 py-3">Project</th>
            <th className="px-6 py-3">Broker/Direct</th>
            <th className="px-6 py-3">Sales RM</th>
            <th className="px-6 py-3">Tag Start</th>
            <th className="px-6 py-3">Tag Expiry</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {tagHistory.map((tag: any) => (
            <tr key={tag._id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {/* Project Image */}
                  {tag.project_id?.media &&
                  Array.isArray(tag.project_id.media) &&
                  tag.project_id.media.find(
                    (m: any) => m.doc_type === "image"
                  ) ? (
                    <img
                      src={
                        tag.project_id.media.find(
                          (m: any) => m.doc_type === "image"
                        ).img_url
                      }
                      alt={tag.project_id?.project_name}
                      className="w-10 h-10 object-cover rounded-full cursor-pointer"
                      onClick={() =>
                        openModal(
                          tag.project_id.media.find(
                            (m: any) => m.doc_type === "image"
                          ).img_url,
                          tag.project_id?.project_name
                        )
                      }
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                  <div>
                    {tag.project_id?.project_name || "-"}
                    <div className="text-xs text-gray-500">
                      {tag.project_id?.city}, {tag.project_id?.state}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                {tag.broker_id?.broker_name || "Direct"}
                <div className="text-xs text-gray-500">
                  {tag.broker_id?.mobile_number}
                </div>
                <div className="text-xs text-gray-500">
                  {tag.broker_id?.email_address}
                </div>
              </td>
              <td className="px-6 py-4">
                {tag.sales_rm_id?.full_name || "-"}
                <div className="text-xs text-gray-500">
                  {tag.sales_rm_id?.mobile_number || "-"}
                </div>
                <div className="text-xs text-gray-500">
                  {tag.sales_rm_id?.email_address || "-"}
                </div>
              </td>
              <td className="px-6 py-4">
                {tag.tag_start_date
                  ? new Date(tag.tag_start_date).toLocaleDateString()
                  : "-"}
              </td>
              <td className="px-6 py-4">
                {tag.tag_expiry_date
                  ? new Date(tag.tag_expiry_date).toLocaleDateString()
                  : "-"}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                    tag.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {tag.is_active ? "Active" : "Expired"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Image Modal */}
      <ImageModal
        isOpen={modal.isOpen}
        src={modal.src}
        alt={modal.alt}
        onClose={closeModal}
      />
    </div>
  );
};

export default TagHistory;