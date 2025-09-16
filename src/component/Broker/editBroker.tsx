import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../reuseable/Layout";
import { getReferenceDataRequest } from "../../redux/actions/referenceActions";
import {
  getBrokerByIdRequest,
  updateBrokerRequest,
} from "../../redux/actions/brokerActions";
import type { RootState } from "../../redux/store";
import BrokerForm, { type BrokerFormData } from "./BrokerForm";
const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
const documentMap: {
  [key in keyof BrokerFormData["uploadedDocuments"]]: string;
} = {
  ownerPhotograph: "owner_photo",
  adhaarCard: "aadhar_card",
  panCard: "pan_card",
  gstCertificate: "gst_certificate",
  officePremisesPhotograph: "office_photo",
  reraRegistrationCertificate: "rera_certificate",
  realEstateAgentMoU: "agent_mou",
  crossedLetterHead: "letter_head",
  cancelledChequeCopy: "cancelled_cheque",
};

const EMPTY_DOCUMENTS: BrokerFormData["uploadedDocuments"] = {
  ownerPhotograph: null,
  adhaarCard: null,
  panCard: null,
  gstCertificate: null,
  officePremisesPhotograph: null,
  reraRegistrationCertificate: null,
  realEstateAgentMoU: null,
  crossedLetterHead: null,
  cancelledChequeCopy: null,
};

const EditBroker: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedBroker, loading: formLoading } = useSelector(
    (state: RootState) => state.brokers
  );

  const { data: referenceData } = useSelector(
    (state: RootState) => state.referenceData
  );

  const categoriesArray =
    referenceData?.data && Array.isArray(referenceData.data)
      ? referenceData.data
      : [];

  const companyTypes =
    categoriesArray.find((item) => item.cate_key === "company_type")?.items ||
    [];

  const initialBrokerData = useRef<BrokerFormData | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<BrokerFormData>({
    brokerName: "",
    companyName: "",
    companyType: "",
    ownerName: "",
    mobileBranchNumber: "",
    alt_mobile_number: "",
    alt_email_address: "",
    website_url: "",
    emailAddress: "",
    rereNumber: "",
    salesRmId: "",
    officeAddress: { line1: "", city: "", state: "", zip: "" },
    uploadedDocuments: { ...EMPTY_DOCUMENTS },
  });

  useEffect(() => {
    if (selectedBroker) {
      const apiToFormDocMap: {
        [apiType: string]: keyof BrokerFormData["uploadedDocuments"];
      } = {
        owner_photo: "ownerPhotograph",
        aadhar_card: "adhaarCard",
        pan_card: "panCard",
        gst_certificate: "gstCertificate",
        office_photo: "officePremisesPhotograph",
        rera_certificate: "reraRegistrationCertificate",
        agent_mou: "realEstateAgentMoU",
        letter_head: "crossedLetterHead",
        cancelled_cheque: "cancelledChequeCopy",
      };
      const documents: BrokerFormData["uploadedDocuments"] = {
        ...EMPTY_DOCUMENTS,
      };
      selectedBroker.documents?.forEach((doc) => {
        const formKey = apiToFormDocMap[doc.type];
        if (formKey) {
          (documents as any)[formKey] = doc.url;
        }
      });

      setFormData({
        brokerName: selectedBroker.broker_name || "",
        companyName: selectedBroker.company_name || "",
        companyType: selectedBroker.company_type?._id || "",
        ownerName: selectedBroker.owner_name || "",
        mobileBranchNumber: selectedBroker.mobile_number || "",
        alt_mobile_number: selectedBroker.alt_mobile_number || "",
        alt_email_address: selectedBroker.alt_email_address || "",
        website_url: selectedBroker.website_url || "",
        emailAddress: selectedBroker.email_address || "",
        rereNumber: selectedBroker.rera_number || "",
        salesRmId:
          selectedBroker.sales_rm_id &&
          typeof selectedBroker.sales_rm_id === "object" &&
          "_id" in selectedBroker.sales_rm_id
            ? (selectedBroker.sales_rm_id as any)._id
            : selectedBroker.sales_rm_id || "",
        officeAddress: {
          line1: selectedBroker.office_address?.line1 || "",
          city: selectedBroker.office_address?.city || "",
          state: selectedBroker.office_address?.state || "",
          zip: selectedBroker.office_address?.zip || "",
        },
        uploadedDocuments: documents,
      });
      initialBrokerData.current = formData;
    }
  }, [selectedBroker]);

  useEffect(() => {
    dispatch(getReferenceDataRequest());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getBrokerByIdRequest(id));
    }
  }, [dispatch, id]);

  const handleInputChange = (
    field: keyof Omit<BrokerFormData, "officeAddress" | "uploadedDocuments">,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleAddressChange = (
    field: keyof BrokerFormData["officeAddress"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      officeAddress: { ...prev.officeAddress, [field]: value },
    }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileUpload = (
    documentType: keyof BrokerFormData["uploadedDocuments"],
    file: File | null
  ) => {
    setFormData((prev) => ({
      ...prev,
      uploadedDocuments: { ...prev.uploadedDocuments, [documentType]: file },
    }));
  };

  const removeFile = (
    documentType: keyof BrokerFormData["uploadedDocuments"]
  ) => {
    setFormData((prev) => ({
      ...prev,
      uploadedDocuments: { ...prev.uploadedDocuments, [documentType]: null },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.brokerName.trim())
      newErrors.brokerName = "Broker Name is required";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company Name is required";
    if (!formData.companyType.trim())
      newErrors.companyType = "Company Type is required";
    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner Name is required";
    if (!formData.mobileBranchNumber.trim())
      newErrors.mobileBranchNumber = "Mobile Number is required";
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address";
    }
    if (!formData.rereNumber.trim())
      newErrors.rereNumber = "RERA Number is required";
    if (!formData.officeAddress.line1.trim())
      newErrors.line1 = "Address Line 1 is required";
    if (!formData.officeAddress.city.trim())
      newErrors.city = "City is required";
    if (!formData.officeAddress.state.trim())
      newErrors.state = "State is required";
    if (!formData.officeAddress.zip.trim()) newErrors.zip = "Zip is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !id) return;

    const data = new FormData();
    data.append("broker_name", formData.brokerName);
    data.append("company_name", formData.companyName);
    data.append("company_type", formData.companyType);
    data.append("owner_name", formData.ownerName);
    data.append("mobile_number", formData.mobileBranchNumber);
    data.append("alt_mobile_number", formData.alt_mobile_number || "");    
    data.append("email_address", formData.emailAddress);
    data.append("alt_email_address", formData.alt_email_address || "");
    data.append("website_url", formData.website_url || "");
    data.append("rera_number", formData.rereNumber);
    data.append("office_address.line1", formData.officeAddress.line1);
    data.append("office_address.city", formData.officeAddress.city);
    data.append("office_address.state", formData.officeAddress.state);
    data.append("office_address.zip", formData.officeAddress.zip);
    data.append("sales_rm_id", formData.salesRmId);
    formData.assignedProjectIds?.forEach((id) => {
      data.append("assigned_project_ids[]", id);
    });

    for (const key in formData.uploadedDocuments) {
      if (formData.uploadedDocuments.hasOwnProperty(key)) {
        const file =
          formData.uploadedDocuments[
            key as keyof BrokerFormData["uploadedDocuments"]
          ];
        if (file instanceof File) {
          const backendKey = documentMap[key as keyof typeof documentMap];
          data.append(backendKey, file);
        }
      }
    }
    dispatch(updateBrokerRequest(id, data));
  };
  const handleCancel = () => navigate("/brokers");  

  return (
    <Layout
      title="Edit Broker"
      subtitle={`Update details for ${selectedBroker?.broker_name || "broker"}`}
      showBackButton={true}
      backButtonLink="/brokers"
    >
      <div className="p-6 bg-gray-50 min-h-screen">
        <BrokerForm
          formData={formData}
          errors={errors}
          loading={formLoading}
          companyTypes={companyTypes}
          indianStates={indianStates}
          onInputChange={handleInputChange}
          onAddressChange={handleAddressChange}
          onFileUpload={handleFileUpload}
          removeFile={removeFile}
          onSubmit={handleSubmit}
          onCancel={handleCancel}          
        />
      </div>
    </Layout>
  );
};

export default EditBroker;