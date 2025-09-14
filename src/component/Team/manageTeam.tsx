import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../reuseable/Layout";
import { Eye, Edit, Trash2, User, Plus } from "lucide-react";
import {
  getAllUsersRequest,
  registerRequest,
} from "../../redux/actions/authActions";
import { getReferenceDataRequest } from "../../redux/actions/referenceActions";
import type { RootState } from "../../redux/reducers/rootReducers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IMAGE_BASE_URL } from "../../config/apiRoutes";
import csvIcon from "../../assets/icons/csv.png";
import DataTable from "../../reuseable/DataTable";
import Pagination from "../../reuseable/Pagination";
import { formatDate } from "../../reuseable/formatDate";

const ManageTeam: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading, Pages, limit } = useSelector(
    (state: RootState) => ({
      users: state.auth.users,
      loading: state.auth.loading,
      totalUsers: state.auth.totalUsers,
      Pages: state.auth.Pages,
      limit: state.auth.limit,
    })
  );

  const roleReference = useSelector((state: RootState) =>
    (state.referenceData?.data?.data || []).filter((item: any) => item.cate_key === "role")
  );

  const departmentReference = useSelector((state: RootState) =>
    (state.referenceData?.data?.data || []).filter((item: any) => item.cate_key === "department")
  );

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const limitOptions = [5, 10, 20, 50, 100];
  const [dobDate, setDobDate] = useState<Date | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
    profilePic: null as File | null,
    dateOfBirth: "",
    department: "",
    gender: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        profilePic: e.target.files![0],
      }));
    }
  };

  const handleAddNewUser = () => {
    setShowAddUserModal(true);
  };

  useEffect(() => {
    if (dobDate) {
      const yyyy = dobDate.getFullYear();
      const mm = String(dobDate.getMonth() + 1).padStart(2, "0");
      const dd = String(dobDate.getDate()).padStart(2, "0");
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: `${yyyy}-${mm}-${dd}`,
      }));
    }
  }, [dobDate]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile Number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(formData.mobile)) {
      newErrors.mobile = "Please enter a valid mobile number";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    }
    if (!formData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = validateForm();
    if (!valid) return;
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("password", formData.password);
    data.append("role", formData.role);
    data.append("dateOfBirth", formData.dateOfBirth);
    data.append("department", formData.department);
    data.append("gender", formData.gender);
    if (formData.profilePic) {
      data.append("profilePic", formData.profilePic);
    }
    dispatch(registerRequest(data));
    setShowAddUserModal(false);
  };

  const exportUsers = () => {
    alert("Exporting users as CSV (static demo)");
  };
  const handleDeleteUser = (userId: string) => {
    alert(`Delete user with ID: ${userId}`);
  };

  useEffect(() => {
    dispatch(getReferenceDataRequest());
    dispatch(getAllUsersRequest({ page, limit, search: searchTerm }));
  }, [dispatch, page, limit, searchTerm]);


  const actionButtons = useMemo(
    () => (
      <>
        <button
          onClick={handleAddNewUser}
          className="flex items-center px-4 py-2.5 bg-[#e5e5e5] text-[#000000] rounded-xl hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </button>
        <button
          onClick={exportUsers}
          className="flex items-center px-4 py-2.5 bg-[#14133B] text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
        >
          <img src={csvIcon} alt="CSV" className="w-5 h-5 mr-2" />
          Export CSV
        </button>
      </>
    ),
    [exportUsers]
  );

  // DataTable columns
  const columns = [
    {
      key: "profile_picture",
      header: "PROFILE",
      render: (user: any) => (
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {user.profile_picture ? (
            <img
              src={`${IMAGE_BASE_URL}/profile/${user.profile_picture}`}
              alt={user.full_name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <User className="w-6 h-6 text-gray-500" />
          )}
        </div>
      ),
    },
    {
      key: "name",
      header: "NAME",
      render: (user: any) => (
        <div className="flex flex-col">
          <span>{user.full_name}</span>
          <span className="text-xs text-gray-500 mt-1">{user.email_address}</span>
          <span className="text-xs text-gray-500">{user.mobile_number}</span>
        </div>
      ),
    },
    { key: "gender", header: "Gender", render: (user: any) => user.gender },
    {
      key: "date_of_birth",
      header: "Date Of Birth",
      render: (user: any) => formatDate(user.date_of_birth),
    },
    { key: "role", header: "ROLE", render: (user: any) => user.role?.name || "-" },
    { key: "user_name", header: "USERNAME", render: (user: any) => user.user_name || "-" },
    {
      key: "joined",
      header: "JOINED",
      render: (user: any) => formatDate(user.createdAt),
    },
  ];

  const userActions = (user: any) => (
    <div className="flex items-center space-x-2">
      <button
        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
        title="View"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
        title="Edit"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
        title="Delete"
        onClick={() => handleDeleteUser(user._id)}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <Layout
      title="Manage Team"
      subtitle="View and manage your team members"
      searchValue={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      searchPlaceholder="Search by Page Name"
      actionButtons={actionButtons}
      isHeaderFixed={true}
    >
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-20">
          <DataTable
            columns={columns}
            data={users || []}
            actions={userActions}
            rowKey="_id"
            emptyText="No team members found"
            loading={loading}
          />
        </div>
      </div>

      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={() => setShowAddUserModal(false)}
        >
          <div className="bg-white rounded-lg shadow-lg p-8  w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded-lg w-full"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded-lg w-full"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded-lg w-full"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded-lg w-full"
                    required
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.gender ? "border-red-500" : "border-gray-300"
                      }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded-lg w-full"
                    required
                  >
                    <option value="">Select Role</option>
                    {roleReference[0]?.items?.map((role: any) => (
                      <option key={role.key} value={role.key}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="border px-3 py-2 rounded-lg w-full"
                    required
                  >
                    <option value="">Select Department</option>
                    {departmentReference[0]?.items?.map((department: any) => (
                      <option key={department.key} value={department.key}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <DatePicker
                    selected={dobDate}
                    onChange={(date: Date | null) => setDobDate(date)}
                    dateFormat="dd/MM/yyyy"
                    placeholderText="DD/MM/YYYY"
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                      }`}
                    wrapperClassName="w-full"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border px-3 py-2 rounded-lg w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border"
                  onClick={() => setShowAddUserModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#000000] text-white"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Pagination
        page={page}
        totalPages={Pages}
        limit={limit}
        setPage={setPage}
        setLimit={(newLimit) => {
          setPage(1);
          dispatch(getAllUsersRequest({
            page: 1,
            limit: newLimit,
            search: searchTerm,
          }));
        }}
        limits={limitOptions}
      />
    </Layout>
  );
};
export default ManageTeam;