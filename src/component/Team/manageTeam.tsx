import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../reuseable/Layout";
import { Eye, Edit, Trash2, User, Plus } from "lucide-react";
import {
  getAllUsersRequest,
  registerRequest,
} from "../../redux/actions/authActions";
import type { RootState } from "../../redux/reducers/rootReducers";

import { IMAGE_BASE_URL } from "../../config/apiRoutes";
import csvIcon from "../../assets/icons/csv.png";

const ManageTeam: React.FC = () => {
  const dispatch = useDispatch();
  const { users, loading, totalUsers, Pages, limit } = useSelector(
    (state: RootState) => ({
      users: state.auth.users,
      loading: state.auth.loading,
      totalUsers: state.auth.totalUsers,
      Pages: state.auth.Pages,
      limit: state.auth.limit,
    })
  );

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const limitOptions = [5, 10, 20, 50, 100];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "",
    profilePic: null as File | null,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("mobile", formData.mobile);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (formData.profilePic) {
      data.append("profilePic", formData.profilePic);
    }
    // Dispatch your register action here, e.g.:
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
    dispatch(getAllUsersRequest({ page, limit, search: searchTerm }));
  }, [dispatch, page, limit, searchTerm]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

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
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000000]"></div>
              <span className="ml-4 text-gray-600">Loading...</span>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    PHOTO
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    NAME
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    EMAIL
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    MOBILE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    ROLE
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    USERNAME
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    JOINED
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users && users.length > 0 ? (
                  users.map((user: any) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                          {user.profilePic ? (
                            <img
                              src={`${IMAGE_BASE_URL}/profile/${user.profilePic}`}
                              alt={user.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <User className="w-6 h-6 text-gray-500" />
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-medium text-[#14133B] whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="py-4 px-6">{user.email}</td>
                      <td className="py-4 px-6">{user.mobile}</td>
                      <td className="py-4 px-6 capitalize">{user.role}</td>
                      <td className="py-4 px-6">{user.username}</td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {new Date(user.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-6">
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
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8}>
                      <div className="py-12 text-center">
                        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No team members found
                        </h3>
                        <p className="text-gray-600">
                          Try adding a new team member.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                  <option value="user">User</option>
                </select>
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

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-3 max-w-full mx-auto">
          <span className="text-sm text-gray-700 mb-2 md:mb-0"></span>
          <div className="flex gap-2 items-center">
            <strong className="text-[#000000]">Page {page}</strong> of{" "}
            <strong>{Pages}</strong> &nbsp;|&nbsp;
            <span className="text-gray-500">Total Users:</span>{" "}
            <strong>{totalUsers}</strong>
            <label
              className="text-sm text-gray-600 mr-2"
              htmlFor="limit-select"
            >
              Rows per page:
            </label>
            <select
              id="limit-select"
              value={limit}
              onChange={(e) => {
                setPage(1);
                dispatch(
                  getAllUsersRequest({
                    page: 1,
                    limit: Number(e.target.value),
                    search: searchTerm,
                  })
                );
              }}
              className="px-2 py-1 rounded border bg-gray-100 text-gray-700"
              style={{ minWidth: 60 }}
            >
              {limitOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <button
              className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-gray-600 transition disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 rounded-lg border bg-red-600 text-white hover:bg-gray-600 transition disabled:opacity-50"
              disabled={page >= Pages}
              onClick={() => handlePageChange(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ManageTeam;
