import React, { useState } from "react";
import { BASE_URL } from "../../config/apiRoutes";
import Scan from "../../assets/scan.png";
import Call from "../../assets/icons/call.png";
import Email from "../../assets/icons/email.png";
import Calendar from "../../assets/icons/calender.png";
import Project from "../../assets/icons/projects.png";

interface QrModalProps {
  open: boolean;
  onClose: () => void;
  visit: any;
}

const QrModal: React.FC<QrModalProps> = ({ open, onClose, visit }) => {
  const [qrImage, setQrImage] = useState("");
  const [qrLoading, setQrLoading] = useState(false);

  React.useEffect(() => {
    const fetchQr = async () => {
      if (!visit) return;
      setQrLoading(true);
      const payload = {
        visitor_id:
          visit.visitor?._id || visit.visitor_id?._id || visit.visitor_id,
      };
      try {
        const token = localStorage.getItem("authToken");
        const res = await fetch(`${BASE_URL}/api/visits/schedule-web`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        setQrImage(data?.data?.qrCodeUrl || "");
      } catch (err) {
        setQrImage("");
      }
      setQrLoading(false);
    };
    if (open && visit) fetchQr();
    if (!open) setQrImage("");
  }, [open, visit]);

  if (!open || !visit) return null;

  // Visitor info
  const visitor = visit.visitor || visit.visitor_id || {};
  const project = visit.project || visit.project_id || {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      style={{ transition: "backdrop-filter 0.3s" }}
       onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}       
        className="bg-white rounded-xl shadow-lg p-0 w-full max-w-sm relative border border-red-400"
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &#10005;
        </button>
        <div className="flex flex-col items-center pt-8 pb-6">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-red-400 mb-2 -mt-16">
            {visitor.visitor_photo_url ? (
              <img
                src={visitor.visitor_photo_url}
                alt={visitor.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                {visitor.name?.[0] || "V"}
              </div>
            )}
          </div>
          {/* Name */}
          <div className="font-bold text-lg text-gray-800 mb-1 text-center">
            {visitor.name || "-"}
          </div>
          {/* Email & Phone */}
          <div className="flex flex-col items-center mb-2">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <img src={Email} alt="Email" className="w-4 h-auto" />
              <span>{visitor.email || "-"}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
              <img src={Call} alt="Phone" className="w-4 h-auto" />
              <span>{visitor.mobile || "-"}</span>
            </div>
          </div>
          <hr className="w-full border-gray-200 my-2" />
          {/* Visit Details */}
          <div className="w-full mb-4 px-8">
            <div className="font-semibold text-gray-700 mb-2">
              Visit Details
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
              <img
                src={Project}
                alt="Project"
                className="w-4 h-4 text-red-500"
              />
              <span className="font-medium">Project</span>
            </div>
            <div className="pl-6 text-gray-800 text-sm mb-2">
              {project.project_name || "-"}
            </div>
            <div className="flex items-center gap-2 text-gray-600 text-sm mt-4 mb-1">
              <img
                src={Calendar}
                alt="Visit Date & Time"
                className="w-4 h-4 text-red-500"
              />
              <span className="font-medium">Visit Date & Time</span>
            </div>
            <div className="pl-6 text-gray-800 text-sm">
              {visit.visit_datetime
                ? new Date(visit.visit_datetime).toLocaleString()
                : "-"}
            </div>
          </div>
          {/* QR Code */}
          <div className="w-full flex flex-col items-center mb-4">
            {qrLoading ? (
              <div className="text-gray-500">Loading QR...</div>
            ) : qrImage ? (
              <img
                src={qrImage}
                alt="QR Code"
                className="w-44 h-44 mt-4 object-contain rounded bg-white"
                style={{ position: "relative", zIndex: 2 }}
              />
            ) : (
              <div className="text-gray-400">No QR code found</div>
            )}
            <img
              src={Scan}
              alt="Scan Me Banner"
              className="w-full -mt-48"
              style={{ zIndex: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrModal;