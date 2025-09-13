import React from "react";
import IndianStatesSelect from "../../reuseable/IndianStatesSelect";

export interface ProjectFormData {
    developer: string;
    projectName: string;
    address: string;
    city: string;
    state: string;
    radiusMeters: string;
    projectType: string;
    latitude: string;
    longitude: string;
    createdBy: string;
    contactPerson: string;
    contact_email: string;
    contact_number: string;
    projectStartDate: string;
    projectCompletionDate: string;
    sales_rm_commission: string;
    broker_commission: string;
    uploadedFiles: {
        images: (File | string)[];
        videos: (File | string)[];
        documents: File | string | null;
        brochure: (File | string)[];
        workThroughVideo: (File | string)[];
        floorPlanImg: (File | string)[];
    };
}

interface ProjectFormProps {
    formData: ProjectFormData;
    errors: Record<string, string>;
    projectTypes: any[];
    handleInputChange: (
        field: keyof Omit<ProjectFormData, "uploadedFiles">,
        value: string | number
    ) => void;
    fullName?: string;
}

const ProjectForm: React.FC<ProjectFormProps> = ({
    formData,
    errors,
    projectTypes,
    handleInputChange,
}) => {
    return (
        <div className="bg-white rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Basic Project Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Developer */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Developer <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.developer}
                        maxLength={50}
                        onChange={(e) => handleInputChange("developer", e.target.value)}
                        placeholder="Enter Developer Name"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.developer ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.developer && (
                        <p className="text-red-500 text-sm mt-1">{errors.developer}</p>
                    )}
                </div>

                {/* Project Name */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        maxLength={50}
                        value={formData.projectName}
                        onChange={(e) => handleInputChange("projectName", e.target.value)}
                        placeholder="Enter Project Name"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.projectName ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.projectName && (
                        <p className="text-red-500 text-sm mt-1">{errors.projectName}</p>
                    )}
                </div>

                {/* Project Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Type <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.projectType}
                        onChange={(e) => handleInputChange("projectType", e.target.value)}
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.projectType ? "border-red-500" : "border-gray-300"
                            }`}
                    >
                        <option value="">Select Project Type</option>
                        {projectTypes.map((type) => (
                            <option key={type._id} value={type._id}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                    {errors.projectType && (
                        <p className="text-red-500 text-sm mt-1">{errors.projectType}</p>
                    )}
                </div>

                {/* Address */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        maxLength={50}
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter Project Address"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.address ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                </div>

                {/* City */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        maxLength={30}
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        placeholder="Enter City"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.city ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                </div>

                {/* State (using reusable component) */}
                <div>
                    <IndianStatesSelect
                        value={formData.state}
                        onChange={(val) => handleInputChange("state", val)}
                        required
                        error={errors.state}
                    />
                </div>

                {/* Commission For RM */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Commission For RM (%) <span className="text-red-500"></span>
                    </label>
                    <input
                        type="text"
                        maxLength={2}
                        value={formData.sales_rm_commission}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                            handleInputChange("sales_rm_commission", val);
                        }}
                        placeholder="Enter Commission For RM"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.sales_rm_commission ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.sales_rm_commission && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.sales_rm_commission}
                        </p>
                    )}
                </div>

                {/* Commission For Broker (%) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Commission For Broker (%) <span className="text-red-500"></span>
                    </label>
                    <input
                        type="text"
                        maxLength={2}
                        value={formData.broker_commission}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 2);
                            handleInputChange("broker_commission", val);
                        }}
                        placeholder="Enter Commission For Broker"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.broker_commission ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.broker_commission && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.broker_commission}
                        </p>
                    )}
                </div>

                {/* Radius (Meters) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Radius (Meters) <span className="text-red-500"></span>
                    </label>
                    <input
                        type="text"
                        maxLength={6}
                        value={formData.radiusMeters}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            handleInputChange("radiusMeters", val);
                        }}
                        placeholder="Enter Radius in Meters"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.radiusMeters ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.radiusMeters && (
                        <p className="text-red-500 text-sm mt-1">{errors.radiusMeters}</p>
                    )}
                </div>

                {/* Latitude */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Latitude <span className="text-red-500"></span>
                    </label>
                    <input
                        type="text"
                        maxLength={20}
                        value={formData.latitude}
                        onChange={(e) => handleInputChange("latitude", e.target.value)}
                        placeholder="Enter Latitude"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.latitude ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.latitude && (
                        <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>
                    )}
                </div>

                {/* Longitude */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Longitude <span className="text-red-500"></span>
                    </label>
                    <input
                        type="text"
                        maxLength={20}
                        value={formData.longitude}
                        onChange={(e) => handleInputChange("longitude", e.target.value)}
                        placeholder="Enter Longitude"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.longitude ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.longitude && (
                        <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>
                    )}
                </div>

                {/* Contact Person */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        maxLength={30}
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        placeholder="Enter Contact Person Name"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.contactPerson ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.contactPerson && (
                        <p className="text-red-500 text-sm mt-1">{errors.contactPerson}</p>
                    )}
                </div>

                {/* contact_number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        maxLength={10}
                        value={formData.contact_number}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                            handleInputChange("contact_number", val);
                        }}
                        placeholder="Enter Contact Number"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.contact_number ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.contact_number && (
                        <p className="text-red-500 text-sm mt-1">{errors.contact_number}</p>
                    )}
                </div>

                {/* contact_email */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        maxLength={50}
                        value={formData.contact_email}
                        onChange={(e) => handleInputChange("contact_email", e.target.value)}
                        placeholder="Enter Contact Email"
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.contact_email ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.contact_email && (
                        <p className="text-red-500 text-sm mt-1">{errors.contact_email}</p>
                    )}
                </div>

                {/* Project Start Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Start Date <span className="text-red-500"></span>
                    </label>
                    <input
                        type="date"
                        value={formData.projectStartDate}
                        onChange={(e) =>
                            handleInputChange("projectStartDate", e.target.value)
                        }
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.projectStartDate ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.projectStartDate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.projectStartDate}
                        </p>
                    )}
                </div>

                {/* Project Completion Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Completion Date <span className="text-red-500"></span>
                    </label>
                    <input
                        type="date"
                        value={formData.projectCompletionDate}
                        onChange={(e) =>
                            handleInputChange("projectCompletionDate", e.target.value)
                        }
                        className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.projectCompletionDate
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                    />
                    {errors.projectCompletionDate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.projectCompletionDate}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectForm;