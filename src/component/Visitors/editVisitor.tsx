import React, { useEffect, useState } from "react";
import Layout from "../../reuseable/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchVisitorByIdRequest,
    updateVisitorRequest,
} from "../../redux/actions/visitorActions";
import type { RootState } from "../../redux/store";

const EditVisitor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentVisitor = useSelector(
        (state: RootState) => state.visitors.currentVisitor
    );

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        visitor_photo_url: "",
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchVisitorByIdRequest(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (currentVisitor) {
            setFormData({
                name: currentVisitor.name || "",
                email: currentVisitor.email || "",
                mobile: currentVisitor.mobile || "",
                visitor_photo_url: currentVisitor.visitor_photo_url || "",
            });
        }
    }, [currentVisitor]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        dispatch(updateVisitorRequest(id, formData));
        navigate("/visitors");
    };

    if (!currentVisitor) {
        return (
            <Layout>
                <div className="p-6">Loading...</div>
            </Layout>
        );
    }

    return (
        <Layout
            title="Edit Visitor"
            showBackButton={true}
            backButtonLink="/visitors"
        >
            <div className="p-4">
                <form onSubmit={handleSubmit} className="max-w-full mx-auto">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">
                            Visitor Details
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter Visitor Name"
                                    className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent border-gray-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter Email Address"
                                    className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent border-gray-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mobile <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter Mobile Number"
                                    className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent border-gray-300"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Visitor Photo
                                </label>
                                <input
                                    type="file"
                                    name="visitor_photo"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        setFormData((prev) => ({
                                            ...prev,
                                            visitor_photo: file,
                                            visitor_photo_url: file
                                                ? URL.createObjectURL(file)
                                                : prev.visitor_photo_url,
                                        }));
                                    }}
                                    className="w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent border-gray-300"
                                />
                                {formData.visitor_photo_url && (
                                    <img
                                        src={formData.visitor_photo_url}
                                        alt="Visitor"
                                        className="mt-2 w-24 h-24 rounded-full object-cover border"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate("/visitors")}
                            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                        >
                            Update Visitor
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default EditVisitor;