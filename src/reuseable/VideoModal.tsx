import React from "react";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  src: string;
  alt?: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  src,
  alt,
  onClose,
}) => {
  if (!isOpen) return null;
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg p-4 relative max-w-2xl w-full">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <video
          src={src}
          controls
          autoPlay
          className="w-full max-h-[70vh] rounded"
        >
          Sorry, your browser doesn't support embedded videos.
        </video>
        {alt && <div className="mt-2 text-center text-gray-700">{alt}</div>}
      </div>
    </div>
  );
};

export default VideoModal;