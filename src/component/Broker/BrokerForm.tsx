import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import uploadIcon from "../../assets/icons/upload.png";
import { useDispatch } from "react-redux";
// import Select from "react-select";
import { getProjectsRequest } from "../../redux/actions/projectActions";
import { getSalesRmRequest } from "../../redux/actions/salesRmActions";
import type { RootState } from "../../redux/reducers/rootReducers";

export interface BrokerFormData {
    brokerName: string;
    companyName: string;
    companyType: string;
    ownerName: string;
    mobileBranchNumber: string;
    alt_mobile_number: string;
    website_url: string;
    emailAddress: string;
    alt_email_address: string;
    rereNumber: string;
    officeAddress: {
        line1: string;
        city: string;
        state: string;
        zip: string;
    };
    salesRmId: string;
    assignedProjectIds?: string[];
    uploadedDocuments: {
        ownerPhotograph: File | string | null;
        adhaarCard: File | string | null;
        panCard: File | string | null;
        gstCertificate: File | string | null;
        officePremisesPhotograph: File | string | null;
        reraRegistrationCertificate: File | string | null;
        realEstateAgentMoU: File | string | null;
        crossedLetterHead: File | string | null;
        cancelledChequeCopy: File | string | null;
    };
}

interface BrokerFormProps {
    formData: BrokerFormData;
    errors: Record<string, string>;
    loading: boolean;
    companyTypes: { _id: string; key: string; name: string }[];
    indianStates: string[];
    onInputChange: (
        field: keyof Omit<BrokerFormData, "officeAddress" | "uploadedDocuments">,
        value: string
    ) => void;
    onAddressChange: (
        field: keyof BrokerFormData["officeAddress"],
        value: string
    ) => void;
    onFileUpload: (
        documentType: keyof BrokerFormData["uploadedDocuments"],
        file: File
    ) => void;
    removeFile: (documentType: keyof BrokerFormData["uploadedDocuments"]) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
}

const DocumentUpload: React.FC<{
    title: string;
    subtitle: string;
    documentType: keyof BrokerFormData["uploadedDocuments"];
    isRequired?: boolean;
    formData: BrokerFormData;
    errors?: Record<string, string>;
    onFileUpload: (
        documentType: keyof BrokerFormData["uploadedDocuments"],
        file: File
    ) => void;
    removeFile: (documentType: keyof BrokerFormData["uploadedDocuments"]) => void;
}> = ({
    title,
    documentType,
    isRequired = false,
    formData,
    errors = {},
    onFileUpload,
    removeFile,
}) => {
        const file = formData.uploadedDocuments[documentType];
        return (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                <div className="text-center">
                    <h4 className="font-medium text-gray-900 mb-1">
                        {title} {isRequired && <span className="text-red-500">*</span>}
                    </h4>
                    {file ? (
                        <div className="space-y-3 mt-4">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto">
                                {file ? (
                                    typeof file === "object" &&
                                        "type" in file &&
                                        file.type.startsWith("image/") ? (
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Preview"
                                            className="w-12 h-12 object-cover"
                                        />
                                    ) : typeof file === "string" && file.startsWith("http") ? (
                                        <img
                                            src={file}
                                            alt="Preview"
                                            className="w-12 h-12 object-cover"
                                        />
                                    ) : null
                                ) : null}
                            </div>
                            <p className="text-sm text-gray-700 font-medium">
                                {typeof file === "object" && "name" in file ? file.name : ""}
                            </p>
                            <button
                                onClick={() => removeFile(documentType)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                Remove
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto">
                                <img src={uploadIcon} alt="Upload" className="w-auto h-auto" />
                            </div>
                            <label className="cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const selectedFile = e.target.files?.[0];
                                        if (selectedFile) {
                                            onFileUpload(documentType, selectedFile);
                                        }
                                    }}
                                />
                                <span className="inline-block bg-[#14133B] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                                    Browse
                                </span>
                            </label>
                            <p className="text-xs text-gray-500 mt-3">
                                (File Types: jpg, jpeg, png, pdf, Max Size: 2 MB)
                            </p>
                        </div>
                    )}
                    {!formData.uploadedDocuments[documentType] && errors[documentType] && (
                        <p className="text-red-500 text-xs mt-2 w-full">
                            {errors[documentType]}
                        </p>
                    )}
                </div>
            </div>
        );
    };

const BrokerForm: React.FC<BrokerFormProps> = ({
    formData,
    errors,
    loading,
    companyTypes,
    onInputChange,
    onAddressChange,
    onFileUpload,
    removeFile,
    indianStates,
    onSubmit,
    onCancel,
}) => {
    const dispatch = useDispatch();
    const salesRms = useSelector((state: RootState) => state.salesRms.salesRms);
    console.log("Sales RMs :", salesRms);
    useEffect(() => {
        dispatch(getSalesRmRequest());
        dispatch(getProjectsRequest());
    }, [dispatch]);

    return (
        <form onSubmit={onSubmit} className="max-w-full mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Basic Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Broker Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Broker Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={formData.brokerName}
                            maxLength={35}
                            onChange={(e) => onInputChange("brokerName", e.target.value)}
                            placeholder="Enter Broker Name"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.brokerName ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.brokerName && (
                            <p className="text-red-500 text-sm mt-1">{errors.brokerName}</p>
                        )}
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            maxLength={35}
                            value={formData.companyName}
                            onChange={(e) => onInputChange("companyName", e.target.value)}
                            placeholder="Enter Company Name"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.companyName ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.companyName && (
                            <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sales RM <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.salesRmId}
                            onChange={(e) => onInputChange("salesRmId", e.target.value)}
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.salesRmId ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Select Sales RM</option>
                            {salesRms.map((rm: any) => (
                                <option key={rm._id} value={rm._id}>
                                    {rm.name} ({rm.mobile})
                                </option>
                            ))}
                        </select>
                        {errors.salesRmId && (
                            <p className="text-red-500 text-sm mt-1">{errors.salesRmId}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.companyType}
                            onChange={(e) => onInputChange("companyType", e.target.value)}
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.companyType ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Select Type</option>
                            {companyTypes.map((type) => (
                                <option key={type._id} value={type.key}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                        {errors.companyType && (
                            <p className="text-red-500 text-sm mt-1">{errors.companyType}</p>
                        )}
                    </div>

                    {/* Owner Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Owner Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            maxLength={35}
                            value={formData.ownerName}
                            onChange={(e) => onInputChange("ownerName", e.target.value)}
                            placeholder="Enter Contact Person Name"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.ownerName ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.ownerName && (
                            <p className="text-red-500 text-sm mt-1">{errors.ownerName}</p>
                        )}
                    </div>

                    {/* Mobile/Branch Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            maxLength={10}
                            value={formData.mobileBranchNumber}
                            onChange={(e) =>
                                onInputChange(
                                    "mobileBranchNumber",
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                            placeholder="Enter Mobile Number"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.mobileBranchNumber ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.mobileBranchNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.mobileBranchNumber}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alternate Mobile Number
                        </label>
                        <input
                            type="text"
                            value={formData.alt_mobile_number}
                            maxLength={10}
                            onChange={(e) =>
                                onInputChange(
                                    "alt_mobile_number",
                                    e.target.value.replace(/\D/g, "")
                                )
                            }
                            placeholder="Enter Alternate Mobile Number"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.alt_mobile_number ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.alt_mobile_number && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.alt_mobile_number}
                            </p>
                        )}
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            maxLength={40}
                            value={formData.emailAddress}
                            onChange={(e) => onInputChange("emailAddress", e.target.value)}
                            placeholder="Enter Email Address"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.emailAddress ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.emailAddress && (
                            <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Alternate Email Address
                        </label>
                        <input
                            type="email"
                            maxLength={40}
                            value={formData.alt_email_address}
                            onChange={(e) =>
                                onInputChange("alt_email_address", e.target.value)
                            }
                            placeholder="Enter Alternate Email Address"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.alt_email_address ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.alt_email_address && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.alt_email_address}
                            </p>
                        )}
                    </div>

                    {/* Website URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Website URL
                        </label>
                        <input
                            type="text"
                            maxLength={40}
                            value={formData.website_url}
                            onChange={(e) => onInputChange("website_url", e.target.value)}
                            placeholder="Enter Website URL"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.website_url ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.website_url && (
                            <p className="text-red-500 text-sm mt-1">{errors.website_url}</p>
                        )}
                    </div>

                    {/* RERA Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            RERA Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            maxLength={20}
                            value={formData.rereNumber}
                            onChange={(e) => onInputChange("rereNumber", e.target.value)}
                            placeholder="Enter RERA Number"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.rereNumber ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.rereNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.rereNumber}</p>
                        )}
                    </div>

                    {/* Office Address Line 1 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Office Address Line 1 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            maxLength={40}
                            value={formData.officeAddress.line1}
                            onChange={(e) => onAddressChange("line1", e.target.value)}
                            placeholder="Enter Address Line 1"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.line1 ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.line1 && (
                            <p className="text-red-500 text-sm mt-1">{errors.line1}</p>
                        )}
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            City <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            maxLength={40}
                            value={formData.officeAddress.city}
                            onChange={(e) => onAddressChange("city", e.target.value)}
                            placeholder="Enter City"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.city ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                    </div>

                    {/* State */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            State <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.officeAddress.state}
                            onChange={(e) => onAddressChange("state", e.target.value)}
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.state ? "border-red-500" : "border-gray-300"
                                }`}
                        >
                            <option value="">Select State</option>
                            {indianStates.map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                        {errors.state && (
                            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                        )}
                    </div>

                    {/* Zip Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Zip Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            maxLength={6}
                            value={formData.officeAddress.zip}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, "");
                                onAddressChange("zip", val);
                            }}
                            placeholder="Enter Zip Code"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.zip ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.zip && (
                            <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Required Documents Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Required Documents
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DocumentUpload
                        title="Upload Owner/Director Photograph"
                        subtitle="Upload Aadhaar Card | Front & Back"
                        documentType="ownerPhotograph"
                        isRequired={true}
                        formData={formData}
                        errors={errors}
                        onFileUpload={onFileUpload}
                        removeFile={removeFile}
                    />

                    <DocumentUpload
                        title="Upload Aadhaar Card (Front & Back)"
                        subtitle="Please Upload Front/Back images of your aadhaar"
                        documentType="adhaarCard"
                        isRequired={true}
                        formData={formData}
                        errors={errors}
                        onFileUpload={onFileUpload}
                        removeFile={removeFile}
                    />
                    <DocumentUpload
                        title="Upload PAN Card"
                        subtitle="Upload PAN card image copy for identity verification"
                        documentType="panCard"
                        isRequired={true}
                        formData={formData}
                        errors={errors}
                        onFileUpload={onFileUpload}
                        removeFile={removeFile}
                    />
                    <DocumentUpload
                        title="Upload GST Certificate"
                        subtitle="Upload your GST certificate to verify your company"
                        documentType="gstCertificate"
                        isRequired={true}
                        formData={formData}
                        errors={errors}
                        onFileUpload={onFileUpload}
                        removeFile={removeFile}
                    />
                    <DocumentUpload
                        title="Upload Office Premises Photographs *"
                        subtitle="Upload photos of your office premises for verification"
                        documentType="officePremisesPhotograph"
                        isRequired={true}
                        formData={formData}
                        errors={errors}
                        onFileUpload={onFileUpload}
                        removeFile={removeFile}
                    />
                    <DocumentUpload
                        title="Upload Rera Registration Certificate"
                        subtitle="Upload photos of your Rera registration certificate for verification"
                        documentType="reraRegistrationCertificate"
                        isRequired={true}
                        formData={formData}
                        errors={errors}
                        onFileUpload={onFileUpload}
                        removeFile={removeFile}
                    />
                    <DocumentUpload
                        title="Upload Crossed Letter Head"
                        subtitle="Upload Crossed Letter Head"
                        documentType="crossedLetterHead"
                        isRequired={true}
                        formData={formData}
                        errors={errors}
                        onFileUpload={onFileUpload}
                        removeFile={removeFile}
                    />
                    <DocumentUpload
                        title="Upload Cancelled Cheque Copy"
                        subtitle="Upload a copy of the cancelled cheque"
                        documentType="cancelledChequeCopy"
                        isRequired={true}
                        formData={formData}
                        errors={errors}
                        onFileUpload={onFileUpload}
                        removeFile={removeFile}
                    />
                    <DocumentUpload
                        title="Upload Real Estate Agent MoU"
                        subtitle="Upload a copy of the Real Estate Agent MoU"
                        documentType="realEstateAgentMoU"
                        isRequired={true}
                        formData={formData}
                        errors={errors}
                        onFileUpload={onFileUpload}
                        removeFile={removeFile}
                    />
                </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                    {loading ? (
                        <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Creating...
                        </>
                    ) : (
                        "Save Broker"
                    )}
                </button>
            </div>
        </form>
    );
};

export default BrokerForm;