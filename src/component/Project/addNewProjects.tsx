import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../reuseable/Layout";
import { CREATE_PROJECT_REQUEST } from "../../redux/actions/actionTypes";
import { getReferenceDataRequest } from "../../redux/actions/referenceActions";
import type { RootState } from "../../redux/reducers/rootReducers";
import { FileText, Video, Image as ImageIcon } from "lucide-react";
import ProjectForm from "./ProjectForm";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";
import { toast } from "react-toastify";

interface ProjectFormData {
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
  sales_rm_commission: string;
  broker_commission: string;
  projectCompletionDate: string;
  uploadedFiles: {
    images: File[];
    videos: File[];
    documents: File | null;
    brochure: File[];
    workThroughVideo: File[];
    floorPlanImg: File[];
  };
}

const AddNewProjects: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: referenceData } = useSelector(
    (state: RootState) => state.referenceData
  );

  const categoriesArray =
    referenceData?.data && Array.isArray(referenceData.data)
      ? referenceData.data
      : [];

  const projectTypes =
    categoriesArray.find(
      (item) =>
        item.category.replace(/[_\s]/g, "").toLowerCase() === "projecttype"
    )?.items || [];

  useEffect(() => {
    dispatch(getReferenceDataRequest());
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const roleId = user.role_id || "Admin";

  const [formData, setFormData] = useState<ProjectFormData>({
    developer: "",
    projectName: "",
    address: "",
    city: "",
    state: "",
    radiusMeters: "",
    projectType: "",
    latitude: "28.584054037585155",
    longitude: "77.12345678901234",
    createdBy: roleId,
    contactPerson: "",
    contact_email: "",
    contact_number: "",
    projectStartDate: "",
    projectCompletionDate: "",
    sales_rm_commission: "12",
    broker_commission: "8",
    uploadedFiles: {
      images: [],
      videos: [],
      documents: null,
      brochure: [],
      workThroughVideo: [],
      floorPlanImg: [],
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const loading = useSelector(
    (state: RootState) => state.projects.createLoading
  );

  const handleInputChange = (
    field: keyof Omit<ProjectFormData, "uploadedFiles">,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleFileUpload = (
    fileType: keyof ProjectFormData["uploadedFiles"],
    files: FileList
  ) => {
    let validFiles = Array.from(files ?? []);
    if (fileType === "images" || fileType === "floorPlanImg") {
      const filtered = validFiles.filter(
        (file) =>
          (file.type === "image/jpeg" || file.type === "image/png") &&
          file.size <= 5 * 1024 * 1024
      );
      if (filtered.length < validFiles.length) {
        setErrors((prev) => ({
          ...prev,
          [fileType]:
            "Only JPEG/PNG images allowed and each file must be 5MB or less.",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          [fileType]: "",
        }));
      }
      validFiles = filtered;
    }

    if (fileType === "videos" || fileType === "workThroughVideo") {
      const maxSize = 5 * 1024 * 1024;
      const filtered = validFiles.filter((file) => file.size <= maxSize);
      if (filtered.length < validFiles.length) {
        toast.error("Some files were too large and have been ignored.");
      }
      validFiles = filtered;
    }
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: {
        ...prev.uploadedFiles,
        [fileType]:
          fileType === "images" ||
          fileType === "videos" ||
          fileType === "brochure" ||
          fileType === "workThroughVideo" ||
          fileType === "floorPlanImg"
            ? Array.from(files ?? [])
            : (files && files[0]) || null,
      },
    }));
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      uploadedFiles: {
        ...prev.uploadedFiles,
        images: Array.isArray(prev.uploadedFiles.images)
          ? prev.uploadedFiles.images.filter((_, i) => i !== index)
          : [],
        videos: Array.isArray(prev.uploadedFiles.videos)
          ? prev.uploadedFiles.videos.filter((_, i) => i !== index)
          : [],
        brochure: Array.isArray(prev.uploadedFiles.brochure)
          ? prev.uploadedFiles.brochure.filter((_, i) => i !== index)
          : [],
        workThroughVideo: Array.isArray(prev.uploadedFiles.workThroughVideo)
          ? prev.uploadedFiles.workThroughVideo.filter((_, i) => i !== index)
          : [],
        floorPlanImg: Array.isArray(prev.uploadedFiles.floorPlanImg)
          ? prev.uploadedFiles.floorPlanImg.filter((_, i) => i !== index)
          : [],
        documents:
          prev.uploadedFiles.documents && index === 0
            ? null
            : prev.uploadedFiles.documents,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.developer.trim()) {
      newErrors.developer = "Developer is required";
    }
    if (!formData.projectName.trim()) {
      newErrors.projectName = "Project Name is required";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.projectType.trim()) {
      newErrors.projectType = "Project Type is required";
    }
    if (!formData.latitude.trim()) {
      newErrors.latitude = "Latitude is required";
    }
    if (!formData.longitude.trim()) {
      newErrors.longitude = "Longitude is required";
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact Person is required";
    }
    if (!formData.contact_number.trim()) {
      newErrors.contact_number = "Contact Number is required";
    }
    if (!formData.contact_email.trim()) {
      newErrors.contact_email = "Contact Email is required";
    }
    if (!formData.projectStartDate.trim()) {
      newErrors.projectStartDate = "Project Start Date is required";
    }
    if (!formData.projectCompletionDate.trim()) {
      newErrors.projectCompletionDate = "Project Completion Date is required";
    }
    if (
      !formData.uploadedFiles.images ||
      formData.uploadedFiles.images.length === 0
    ) {
      newErrors.images = "At least one image is required";
    }
    if (
      !formData.uploadedFiles.videos ||
      formData.uploadedFiles.videos.length === 0
    ) {
      newErrors.videos = "At least one video is required";
    }
    if (
      !formData.uploadedFiles.floorPlanImg ||
      formData.uploadedFiles.floorPlanImg.length === 0
    ) {
      newErrors.floorPlanImg = "Floor plan image is required";
    }
    if (!formData.uploadedFiles.documents) {
      newErrors.documents = "Document is required";
    }
    if (
      !formData.uploadedFiles.brochure ||
      formData.uploadedFiles.brochure.length === 0
    ) {
      newErrors.brochure = "Brochure is required";
    }
    if (
      !formData.uploadedFiles.workThroughVideo ||
      formData.uploadedFiles.workThroughVideo.length === 0
    ) {
      newErrors.workThroughVideo = "Walkthrough video is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const projectData = new FormData();
    projectData.append("developer", formData.developer);
    projectData.append("project_name", formData.projectName);
    projectData.append("address", formData.address);
    projectData.append("city", formData.city);
    projectData.append("state", formData.state);
    projectData.append("radius_meters", formData.radiusMeters.toString());
    projectData.append("project_type", formData.projectType);
    projectData.append("latitude", formData.latitude);
    projectData.append("longitude", formData.longitude);
    projectData.append("created_by", formData.createdBy);
    projectData.append("contact_person", formData.contactPerson);
    projectData.append("contact_email", formData.contact_email);
    projectData.append("contact_number", formData.contact_number);
    projectData.append("sales_rm_commission", formData.sales_rm_commission);
    projectData.append("broker_commission", formData.broker_commission);
    projectData.append("project_start_date", formData.projectStartDate);
    projectData.append(
      "project_completion_date",
      formData.projectCompletionDate
    );
    if (formData.uploadedFiles.images.length > 0) {
      formData.uploadedFiles.images.forEach((img) => {
        projectData.append("images", img);
      });
    }

    if (
      Array.isArray(formData.uploadedFiles.videos) &&
      formData.uploadedFiles.videos.length > 0
    ) {
      formData.uploadedFiles.videos.forEach((video) => {
        projectData.append("videos", video);
      });
    }

    if (formData.uploadedFiles.documents) {
      projectData.append("documents", formData.uploadedFiles.documents);
    }

    if (formData.uploadedFiles.brochure.length > 0) {
      formData.uploadedFiles.brochure.forEach((file) => {
        projectData.append("brochure", file);
      });
    }

    if (formData.uploadedFiles.workThroughVideo.length > 0) {
      formData.uploadedFiles.workThroughVideo.forEach((file) => {
        projectData.append("workThroughVideo", file);
      });
    }

    if (formData.uploadedFiles.floorPlanImg.length > 0) {
      formData.uploadedFiles.floorPlanImg.forEach((file) => {
        projectData.append("floorPlanImg", file);
      });
    }
    

    dispatch({
      type: CREATE_PROJECT_REQUEST,
      payload: { projectData },
    });
  };

  const handleCancel = () => {
    navigate("/projects");
  };

  const FileUpload: React.FC<{
    title: string;
    fileType: keyof ProjectFormData["uploadedFiles"];
    isRequired?: boolean;
  }> = ({ title, fileType, isRequired = false }) => {
    const file = formData.uploadedFiles[fileType];
    const filesArray: File[] =
      (fileType === "images" ||
        fileType === "videos" ||
        fileType === "brochure" ||
        fileType === "workThroughVideo" ||
        fileType === "floorPlanImg") &&
      Array.isArray(file)
        ? file
        : file && file instanceof File
        ? [file]
        : [];
    let icon = <ImageIcon className="w-8 h-8 text-red-600" />;
    if (fileType === "videos" || fileType === "workThroughVideo")
      icon = <Video className="w-8 h-8 text-red-600" />;
    if (fileType === "documents" || fileType === "brochure")
      icon = <FileText className="w-8 h-8 text-red-600" />;

    useDocumentMeta({
      title: `Add New Project`,
      description: "Manage projects and their details across your organization",
    });

    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
        <div className="text-center">
          <h4 className="font-medium text-gray-900 mb-1">
            {title} {isRequired && <span className="text-red-500">*</span>}
          </h4>
          {filesArray.length > 0 ? (
            <div className="space-y-3 mt-4">
              {filesArray.map((f: File, idx: number) => (
                <div key={idx} className="mb-2">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto">
                    {f.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(f)}
                        alt="Preview"
                        className="w-16 h-16"
                      />
                    ) : f.type.startsWith("video/") ? (
                      <Video className="w-8 h-8 text-red-600" />
                    ) : (
                      icon
                    )}
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{f.name}</p>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center w-16 h-16 mx-auto">
                {icon}
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept={
                    fileType === "images" || fileType === "floorPlanImg"
                      ? ".jpg,.jpeg,.png"
                      : fileType === "videos" || fileType === "workThroughVideo"
                      ? ".mp4"
                      : fileType === "documents" || fileType === "brochure"
                      ? ".pdf"
                      : ".pdf,.jpg,.jpeg,.png,.mp4"
                  }
                  multiple={
                    fileType === "images" ||
                    fileType === "videos" ||
                    // fileType === "brochure" ||
                    // fileType === "workThroughVideo" ||
                    fileType === "floorPlanImg"
                  }
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFileUpload(fileType, e.target.files);
                    }
                  }}
                />
                <span className="inline-block bg-[#14133B] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Browse
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-3">
                {fileType === "images" || fileType === "floorPlanImg"
                  ? "(File Types: jpg, jpeg, png, Max Size: 2 MB each)"
                  : fileType === "videos" || fileType === "workThroughVideo"
                  ? "(File Type: mp4, Max Size: 5 MB each)"
                  : "(File Type: pdf, Max Size: 2 MB)"}
              </p>
              {errors[fileType] && (
                <p className="text-red-500 text-xs mt-2 w-full col-span-full">
                  {errors[fileType]}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout
      title="Add New Project / Site"
      subtitle="Register a new project site with sales mapping & asset mapping"
      showBackButton={true}
      backButtonLink="/projects"
    >
      <div className="p-6 bg-gray-50 min-h-screen">
        <form onSubmit={handleSubmit} className="max-w-full mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <ProjectForm
              formData={formData}
              errors={errors}
              projectTypes={projectTypes}
              handleInputChange={handleInputChange}
            />
          </div>

          {/* File Upload Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Upload Files
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FileUpload title="Images" fileType="images" />
              <FileUpload title="Videos" fileType="videos" />
              <FileUpload title="Documents" fileType="documents" />
              <FileUpload title="Brochure" fileType="brochure" />
              <FileUpload
                title="Walkthrough Video"
                fileType="workThroughVideo"
              />
              <FileUpload title="Floor Plan Images" fileType="floorPlanImg" />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-[#DA0808] text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                "Save Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddNewProjects;