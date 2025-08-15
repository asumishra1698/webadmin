import React from "react";

export interface ImageModalState {
  isOpen: boolean;
  src: string;
  alt?: string;
}

export interface UseImageModalReturn {
  modal: ImageModalState;
  openModal: (src: string, alt?: string) => void;
  closeModal: () => void;
}

export function useImageModal(): UseImageModalReturn {
  const [modal, setModal] = React.useState<ImageModalState>({
    isOpen: false,
    src: "",
    alt: "",
  });

  const openModal = (src: string, alt?: string) => {
    setModal({ isOpen: true, src, alt });
  };

  const closeModal = () => {
    setModal({ isOpen: false, src: "", alt: "" });
  };

  return { modal, openModal, closeModal };
}

const ImageModal: React.FC<ImageModalState & { onClose: () => void }> = ({
  isOpen,
  src,
  alt,
  onClose,
}) => {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-4 relative max-w-lg w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-red-600 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={src}
          alt={alt || "Preview"}
          className="max-h-[80vh] w-auto rounded"
        />
        {alt && <div className="mt-2 text-gray-700 text-sm">{alt}</div>}
      </div>
    </div>
  );
};

export default ImageModal;
