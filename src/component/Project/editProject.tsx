import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../reuseable/Layout";
import { getReferenceDataRequest } from "../../redux/actions/referenceActions";
import {
    getProjectByIdRequest,
    updateProjectRequest,
    deleteProjectMediaRequest,
} from "../../redux/actions/projectActions";
import type { RootState } from "../../redux/reducers/rootReducers";
import ProjectForm, { type ProjectFormData } from "./ProjectForm";
import { FileText, Video, Image as ImageIcon } from "lucide-react";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";

interface ProjectMedia {
    img_url: string;
    doc_type:
    | "images"
    | "videos"
    | "documents"
    | "workThroughVideo"
    | "floorPlanImg"
    | "brochure";
    _id?: string;
}

const EditProject: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getIdFromUrl = () => {
        const pathParts = window.location.pathname.split("/").filter(Boolean);
        return pathParts.pop() || "";
    };
    const id = getIdFromUrl();

    const { currentProject, loading } = useSelector(
        (state: RootState) => state.projects
    );
    const { data: referenceData } = useSelector(
        (state: RootState) => state.referenceData
    );

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<ProjectFormData>({
        developer: "",
        projectName: "",
        address: "",
        city: "",
        state: "",
        radiusMeters: "",
        projectType: "",
        latitude: "0",
        longitude: "0",
        createdBy: "",
        contactPerson: "",
        contact_number: "",
        contact_email: "",
        projectStartDate: "",
        projectCompletionDate: "",
        sales_rm_commission: "0",
        broker_commission: "0",
        uploadedFiles: {
            images: [],
            videos: [],
            documents: null,
            brochure: [],
            workThroughVideo: [],
            floorPlanImg: [],
        },
    });

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
        if (id) {
            dispatch(getProjectByIdRequest(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (currentProject) {
            const getMediaUrls = (
                docType:
                    | "images"
                    | "videos"
                    | "documents"
                    | "brochure"
                    | "workThroughVideo"
                    | "floorPlanImg"
            ) => {
                return (
                    currentProject?.media
                        ?.filter((m: ProjectMedia) => m.doc_type === docType)
                        .map((m: ProjectMedia) => m.img_url)
                        .filter(Boolean) || []
                );
            };

            setFormData({
                developer: currentProject.developer || "",
                projectName: currentProject.project_name || "",
                address: currentProject.address || "",
                city: currentProject.city || "",
                state: currentProject.state || "",
                radiusMeters: String(currentProject.radius_meters || 0),
                projectType:
                    typeof currentProject.project_type === "string"
                        ? currentProject.project_type
                        : currentProject.project_type?._id || "",
                latitude: currentProject.latitude || "0",
                longitude: currentProject.longitude || "0",
                createdBy: currentProject.created_by || "",
                contactPerson: currentProject.contact_person || "",
                contact_number: currentProject.contact_number || "",
                contact_email: currentProject.contact_email || "",
                projectStartDate:
                    currentProject.project_start_date?.split("T")[0] || "",
                projectCompletionDate:
                    currentProject.project_completion_date?.split("T")[0] || "",
                sales_rm_commission: currentProject.sales_rm_commission || "0",
                broker_commission: currentProject.broker_commission || "0",
                uploadedFiles: {
                    images: getMediaUrls("images"),
                    videos: getMediaUrls("videos").length > 0 ? getMediaUrls("videos") : [],
                    documents: getMediaUrls("documents")[0] || null,
                    brochure: getMediaUrls("brochure"),
                    workThroughVideo: getMediaUrls("workThroughVideo"),
                    floorPlanImg: getMediaUrls("floorPlanImg"),
                },
            });
        }
    }, [currentProject]);

    const handleInputChange = (
        field: keyof Omit<ProjectFormData, "uploadedFiles">,
        value: string | number
    ) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.developer.trim())
            newErrors.developer = "Developer is required";
        if (!formData.projectName.trim())
            newErrors.projectName = "Project Name is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const projectData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key !== "uploadedFiles") {
                const snakeCaseKey = key.replace(
                    /[A-Z]/g,
                    (letter) => `_${letter.toLowerCase()}`
                );
                projectData.append(snakeCaseKey, String(value));
            }
        });

        Object.entries(formData.uploadedFiles).forEach(([key, value]) => {
            if (
                (key === "images" ||
                    key === "videos" ||
                    key === "brochure" ||
                    key === "workThroughVideo" ||
                    key === "floorPlanImg") &&
                Array.isArray(value)
            ) {
                value.forEach((file) => {
                    if (file instanceof File) {
                        projectData.append(key, file);
                    }
                });
            } else if (value instanceof File) {
                projectData.append(key, value);
            }
        });

        dispatch(updateProjectRequest({ id, data: projectData }));
    };

    const FileUpload: React.FC<{
        title: string;
        fileType: keyof ProjectFormData["uploadedFiles"];
        isRequired?: boolean;
    }> = ({ title, fileType, isRequired = false }) => {
        const files = Array.isArray(formData.uploadedFiles[fileType])
            ? (formData.uploadedFiles[fileType] as (File | string)[])
            : formData.uploadedFiles[fileType]
                ? [formData.uploadedFiles[fileType] as File | string]
                : [];

        // Icon selection
        let icon = <ImageIcon className="w-8 h-8 text-red-600" />;
        if (fileType === "videos")
            icon = <Video className="w-8 h-8 text-red-600 mx-auto mb-2" />;
        if (fileType === "documents")
            icon = <FileText className="w-8 h-8 text-red-600 mx-auto mb-2" />;

        useDocumentMeta({
            title: `Edit Project`,
            description: "Manage projects and their details across your organization",
        });

        return (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                <div className="text-center">
                    <h4 className="font-medium text-gray-900 mb-1">
                        {title} {isRequired && <span className="text-red-500">*</span>}
                    </h4>
                    {files.length > 0 ? (
                        <div className="space-y-3 mt-4">
                            {files.map((file, idx) => (
                                <div key={idx} className="mb-2">
                                    <div className="flex items-center justify-center w-16 h-16 mx-auto">
                                        {file instanceof File && file.type.startsWith("image/") ? (
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt="Preview"
                                                className="w-16 h-16 object-cover"
                                            />
                                        ) : typeof file === "string" &&
                                            /\.(jpg|jpeg|png|gif)$/i.test(file) ? (
                                            <img
                                                src={file}
                                                alt="Preview"
                                                className="w-16 h-16 object-cover"
                                            />
                                        ) : file instanceof File &&
                                            file.type.startsWith("video/") ? (
                                            <Video className="w-8 h-8 text-red-600" />
                                        ) : file instanceof File &&
                                            file.type === "application/pdf" ? (
                                            <FileText className="w-8 h-8 text-red-600" />
                                        ) : (
                                            icon
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-700 font-medium truncate">
                                        {file instanceof File
                                            ? file.name
                                            : typeof file === "string"
                                                ? file.split("/").pop()
                                                : ""}
                                    </p>
                                    {typeof file === "string" && (
                                        <a
                                            href={file}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            View File
                                        </a>
                                    )}
                                    {file instanceof File && (
                                        <p className="text-xs text-gray-500">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (
                                                typeof file === "string" &&
                                                currentProject &&
                                                currentProject._id
                                            ) {
                                                const docType =
                                                    fileType === "images"
                                                        ? "images"
                                                        : fileType === "videos"
                                                            ? "videos"
                                                            : fileType === "brochure"
                                                                ? "brochure"
                                                                : fileType === "workThroughVideo"
                                                                    ? "workThroughVideo"
                                                                    : fileType === "floorPlanImg"
                                                                        ? "floorPlanImg"
                                                                        : "documents";
                                                const mediaItem = currentProject.media?.find(
                                                    (m: ProjectMedia) =>
                                                        m.doc_type === docType && m.img_url === file
                                                );
                                                if (mediaItem && mediaItem._id) {
                                                    dispatch(
                                                        deleteProjectMediaRequest(
                                                            currentProject._id,
                                                            mediaItem._id
                                                        )
                                                    );
                                                }
                                            }
                                            // Remove from local state
                                            setFormData((prev: any) => ({
                                                ...prev,
                                                uploadedFiles: {
                                                    ...prev.uploadedFiles,
                                                    [fileType]: files.filter((_, i) => i !== idx),
                                                },
                                            }));
                                        }}
                                        className="text-red-600 hover:text-red-800 text-sm font-medium ml-4"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4 mt-4">
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
                                                : ".pdf"
                                    }
                                    multiple={fileType === "images" || fileType === "floorPlanImg"}
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setFormData((prev: any) => ({
                                                ...prev,
                                                uploadedFiles: {
                                                    ...prev.uploadedFiles,
                                                    [fileType]:
                                                        fileType === "images" || fileType === "floorPlanImg"
                                                            ? [...files, ...Array.from(e.target.files ?? [])]
                                                            : (e.target.files && e.target.files[0]) || null,
                                                },
                                            }));
                                        }
                                    }}
                                />
                                <span className="inline-block bg-[#14133B] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                                    Browse
                                </span>
                            </label>
                            <p className="text-xs text-gray-500 mt-3">
                                {fileType === "images"
                                    ? "(File Types: jpg, jpeg, png, Max Size: 2 MB each)"
                                    : fileType === "videos"
                                        ? "(File Type: mp4, Max Size: 2 MB)"
                                        : "(File Type: pdf, Max Size: 2 MB)"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <Layout
            title="Edit Project / Site"
            subtitle="Update project site details"
            showBackButton={true}
            backButtonLink="/projects"
        >
            <div className="p-6 bg-gray-50 min-h-screen">
                <form onSubmit={handleSubmit} className="max-w-full mx-auto space-y-6">
                    <ProjectForm
                        formData={formData}
                        errors={errors}
                        projectTypes={projectTypes}
                        handleInputChange={handleInputChange}
                    />

                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">
                            Upload Files
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FileUpload title="Images" fileType="images" />
                            <FileUpload title="Videos" fileType="videos" />
                            <FileUpload title="Documents" fileType="documents" />
                            <FileUpload title="Brochure" fileType="brochure" />
                            <FileUpload
                                title="Work Through Video"
                                fileType="workThroughVideo"
                            />
                            <FileUpload title="Floor Plan" fileType="floorPlanImg" />
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate("/projects")}
                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-2.5 bg-[#DA0808] text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Updating...
                                </>
                            ) : (
                                "Update Project"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditProject;