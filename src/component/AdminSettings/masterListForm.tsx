import React, { useEffect, useState } from "react";

interface ListItem {
  id?: string;
  name?: string;
  description?: string;
  color?: string;
  icon?: File | string;
}

interface MasterListFormProps {
  category: string;
  onCreate: (newItem: FormData) => void;
  onCancel: () => void;
  initialValues?: ListItem;
}

const MasterListForm: React.FC<MasterListFormProps> = ({
  category,
  onCreate,
  onCancel,
  initialValues,
}) => {
  // If category prop is empty, show input box, else show read-only field
  const [inputCategory, setInputCategory] = useState(category || "");
  const [name, setName] = useState(initialValues?.name || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [color, setColor] = useState(initialValues?.color || "#FF5733");
  const [icon, setIcon] = useState<File | null>(null);

  useEffect(() => {
    if (initialValues) {
      setInputCategory(category);
      setName(initialValues.name || "");
      setDescription(initialValues.description || "");
      setColor(initialValues.color || "#FF5733");
    }
  }, [initialValues, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("category", inputCategory);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("order", "1");
    formData.append("is_active", "true");
    formData.append("metadata[color]", color);
    if (icon) {
      formData.append("icon", icon);
    }
    onCreate(formData);
  };

  const inputBaseStyle =
    "w-full px-4 py-2.5 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors font-medium";

  return (
    <div className="relative pt-2">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          {/* Category Field: input box if category is empty, else read-only */}
          <div className="md:col-span-1">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            {category ? (
              <input
                type="text"
                id="category"
                className={`${inputBaseStyle} bg-gray-100 cursor-not-allowed`}
                value={category}
                readOnly
                required
              />
            ) : (
              <input
                type="text"
                id="category"
                className={inputBaseStyle}
                value={inputCategory}
                onChange={(e) => setInputCategory(e.target.value)}
                placeholder="Enter category name"
                required
              />
            )}
          </div>

          {/* Name Field */}
          <div className="md:col-span-1">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className={inputBaseStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Residential"
              required
            />
          </div>
          {/* Description Field */}
          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              className={inputBaseStyle}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A short description of the item"
              required
            />
          </div>

          {/* Color Field */}
          <div className="md:col-span-1">
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                id="color"
                className="h-10 w-14 p-1 block rounded-md shadow-sm border-gray-300 cursor-pointer"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />
              <input
                type="text"
                className={inputBaseStyle}
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#4f46e5"
              />
            </div>
          </div>

          {/* Icon Field */}
          <div className="md:col-span-1">
            <label
              htmlFor="icon"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Icon
            </label>
            <input
              type="file"
              id="icon"
              className={inputBaseStyle}
              accept="image/*"
              onChange={(e) => setIcon(e.target.files?.[0] || null)}
              required={!initialValues} // Only required in add mode
            />
            {/* Show preview if editing and icon is a string (URL) */}
            {initialValues?.icon && typeof initialValues.icon === "string" && (
              <img
                src={initialValues.icon}
                alt="icon preview"
                className="mt-2 h-8 w-8 object-contain rounded"
              />
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4 gap-3">
          <button
            type="button"
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#DA0808] text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            {initialValues ? "Update Item" : "Create Item"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MasterListForm;