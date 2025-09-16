import React, { useState, useEffect } from "react";
import Layout from "../../reuseable/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBrokerRequest } from "../../redux/actions/brokerActions";
import { getReferenceDataRequest } from "../../redux/actions/referenceActions";
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
const AddNewBroker: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.brokers);

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

  useEffect(() => {
    dispatch(getReferenceDataRequest());
  }, [dispatch]);

  const [formData, setFormData] = useState<BrokerFormData>({
    brokerName: "Ashutosh Mishra",
    companyName: "Ashu PVT LTD",
    companyType: "private_limited",
    ownerName: "Ashutosh Mishra",
    mobileBranchNumber: "7827284933",
    alt_mobile_number: "7827284931",
    website_url: "www.ashu.com",
    emailAddress: "ashutosh@ashu.com",
    alt_email_address: "ashutosh.alt@ashu.com",
    rereNumber: "RERA-123456",
    officeAddress: {
      line1: "Sahibabad",
      city: "Ghaziabad",
      state: "Uttar Pradesh",
      zip: "201005",
    },
    salesRmId: "",
    uploadedDocuments: {
      ownerPhotograph: null,
      adhaarCard: null,
      panCard: null,
      gstCertificate: null,
      officePremisesPhotograph: null,
      reraRegistrationCertificate: null,
      realEstateAgentMoU: null,
      crossedLetterHead: null,
      cancelledChequeCopy: null,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    field: keyof Omit<BrokerFormData, "officeAddress" | "uploadedDocuments">,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddressChange = (
    field: keyof BrokerFormData["officeAddress"],
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      officeAddress: { ...prev.officeAddress, [field]: value },
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (
    documentType: keyof BrokerFormData["uploadedDocuments"],
    file: File
  ) => {
    setFormData((prev) => ({
      ...prev,
      uploadedDocuments: {
        ...prev.uploadedDocuments,
        [documentType]: file,
      },
    }));
  };

  const removeFile = (
    documentType: keyof BrokerFormData["uploadedDocuments"]
  ) => {
    setFormData((prev) => ({
      ...prev,
      uploadedDocuments: {
        ...prev.uploadedDocuments,
        [documentType]: null,
      },
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.brokerName.trim()) {
      newErrors.brokerName = "Broker Name is required";
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company Name is required";
    }
    if (!formData.companyType.trim()) {
      newErrors.companyType = "Company Type is required";
    }
    if (!formData.ownerName.trim()) {
      newErrors.ownerName = "Owner Name is required";
    }
    if (!formData.rereNumber.trim()) {
      newErrors.rereNumber = "RERA Number is required";
    }
    if (!formData.mobileBranchNumber.trim()) {
      newErrors.mobileBranchNumber = "Mobile/Branch Number is required";
    }
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailAddress)) {
      newErrors.emailAddress = "Please enter a valid email address";
    }
    if (!formData.officeAddress.line1.trim())
      newErrors.line1 = "Address Line 1 is required";
    if (!formData.officeAddress.city.trim())
      newErrors.city = "City is required";
    if (!formData.officeAddress.state.trim())
      newErrors.state = "State is required";
    if (!formData.officeAddress.zip.trim()) {
      newErrors.zip = "Zip is required";
    } else if (!/^\d{6}$/.test(formData.officeAddress.zip)) {
      newErrors.zip = "Zip must be a 6-digit number";
    }
    if (!formData.uploadedDocuments.ownerPhotograph) {
      newErrors.ownerPhotograph = "Owner/Director Photograph is required";
    }
    if (!formData.uploadedDocuments.adhaarCard) {
      newErrors.adhaarCard = "Aadhar Card is required";
    }
    if (!formData.uploadedDocuments.panCard) {
      newErrors.panCard = "PAN Card is required";
    }
    if (!formData.uploadedDocuments.gstCertificate) {
      newErrors.gstCertificate = "GST Certificate is required";
    }
    if (!formData.uploadedDocuments.officePremisesPhotograph) {
      newErrors.officePremisesPhotograph =
        "Office Premises Photograph is required";
    }
    if (!formData.uploadedDocuments.reraRegistrationCertificate) {
      newErrors.reraRegistrationCertificate =
        "RERA Registration Certificate is required";
    }
    if (!formData.uploadedDocuments.realEstateAgentMoU) {
      newErrors.realEstateAgentMoU = "Real Estate Agent MoU is required";
    }
    if (!formData.uploadedDocuments.crossedLetterHead) {
      newErrors.crossedLetterHead = "Crossed Letter Head is required";
    }
    if (!formData.uploadedDocuments.cancelledChequeCopy) {
      newErrors.cancelledChequeCopy = "Cancelled Cheque Copy is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const data = new FormData();
    data.append("broker_name", formData.brokerName);
    data.append("company_name", formData.companyName);
    data.append("company_type", formData.companyType);
    data.append("owner_name", formData.ownerName);
    data.append("mobile_number", formData.mobileBranchNumber);
    data.append("email_address", formData.emailAddress);
    data.append("website_url", formData.website_url);
    data.append("alt_mobile_number", formData.alt_mobile_number);
    data.append("alt_email_address", formData.alt_email_address);
    data.append("rera_number", formData.rereNumber);
    data.append("sales_rm_id", formData.salesRmId);
    data.append("office_address.line1", formData.officeAddress.line1);
    data.append("office_address.city", formData.officeAddress.city);
    data.append("office_address.state", formData.officeAddress.state);
    data.append("office_address.zip", formData.officeAddress.zip);
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
    for (const [key, file] of Object.entries(formData.uploadedDocuments)) {
      if (file) {
        const backendKey = documentMap[key as keyof typeof documentMap];
        data.append(backendKey, file);
      }
    }
    dispatch(createBrokerRequest(data));
  };
  const handleCancel = () => {
    navigate("/brokers");
  }; 

  return (
    <Layout
      title="Add New Broker"
      subtitle="Register a new broker/channel partner with project assignment"
      showBackButton={true}
      backButtonLink="/brokers"
    >
      <div className="p-6 bg-gray-50 min-h-screen">
        <BrokerForm
          formData={formData}
          errors={errors}
          loading={loading}
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

export default AddNewBroker;