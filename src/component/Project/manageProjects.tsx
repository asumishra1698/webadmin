import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Layout from "../../reuseable/Layout";
import fillterIcon from "../../assets/icons/fillters.png";
import csvIcon from "../../assets/icons/csv.png";
import { Plus, Eye, Edit, Trash2 } from "lucide-react";
import ImageModal, { useImageModal } from "../../reuseable/ImageModal";
import type { RootState } from "../../redux/reducers/rootReducers";
import {
  GET_PROJECTS_REQUEST,
  GET_PROJECT_BY_ID_REQUEST,
  TOGGLE_PROJECT_STATUS_REQUEST,
} from "../../redux/actions/actionTypes";
import { exportProjectDataRequest } from "../../redux/actions/projectActions";
import Pagination from "../../reuseable/Pagination";
import { useDocumentMeta } from "../../reuseable/useDocumentMeta";
import DataTable from "../../reuseable/DataTable";

const ManageProjects: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { modal, openModal, closeModal } = useImageModal();

  const projects = useSelector((state: RootState) => state.projects.projects);

  const pagination = useSelector(
    (state: RootState) => state.projects.pagination
  );

  const loading = useSelector(
    (state: RootState) => state.projects.fetchLoading
  );

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [cityFilter, setCityFilter] = useState<string>("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    dispatch({
      type: GET_PROJECTS_REQUEST,
      payload: {
        page,
        limit,
        search: searchTerm,
        city: cityFilter,
        status: statusFilter === "all" ? "" : statusFilter,
        type: typeFilter === "all" ? "" : typeFilter,
      },
    });
  }, [dispatch, page, limit, searchTerm, cityFilter, statusFilter, typeFilter]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleAddNewProject = () => {
    navigate("/projects/add-new-project");
  };

  const handleViewDetails = (projectId: string) => {
    if (!projectId) {
      console.error("Project ID is undefined");
      return;
    }
    dispatch({ type: GET_PROJECT_BY_ID_REQUEST, payload: projectId });
    navigate(`/projects/projects-detail/${projectId}`);
  };

  const handleToggleStatus = (projectId: string, currentStatus: boolean) => {
    dispatch({
      type: TOGGLE_PROJECT_STATUS_REQUEST,
      payload: { projectId, is_active: !currentStatus },
    });
  };

  const handleDeleteProject = (projectId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this project?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DA0808",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: "DELETE_PROJECT_REQUEST", payload: projectId });
      }
    });
  };

  const handleExportCSV = () => {
    dispatch(exportProjectDataRequest());
  };

  const handleApplyFilters = () => {
    dispatch({
      type: GET_PROJECTS_REQUEST,
      payload: {
        page: 1,
        limit: 5,
        search: searchTerm,
        city: cityFilter,
        status: statusFilter === "all" ? "" : statusFilter,
        type: typeFilter === "all" ? "" : typeFilter,
      },
    });
    setShowAdvancedFilters(false);
  };

  const handleResetFilters = () => {
    setStatusFilter("all");
    setTypeFilter("all");
    setCityFilter("");
    setSearchTerm("");
    dispatch({
      type: GET_PROJECTS_REQUEST,
      payload: {
        page: 1,
        limit: 100,
        search: "",
        city: "",
        status: "",
        type: "",
      },
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    dispatch({
      type: GET_PROJECTS_REQUEST,
      payload: {
        page: 1,
        limit: 5,
        search: e.target.value,
        city: cityFilter,
        status: statusFilter === "all" ? "" : statusFilter,
        type: typeFilter === "all" ? "" : typeFilter,
      },
    });
  };

  const actionButtons = (
    <>
      <button
        onClick={handleAddNewProject}
        className="flex items-center px-4 py-2.5 bg-[#FFE5E5] text-[#DA0808] rounded-xl hover:bg-red-600 hover:text-white transition-colors font-medium border border-red-500"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Projects
      </button>
      <button
        className="flex items-center px-4 py-2.5 bg-[#14133B] text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
        onClick={handleExportCSV}
      >
        <img src={csvIcon} alt="CSV" className="w-5 h-5 mr-2" />
        Export CSV
      </button>
      <button
        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        className="flex items-center px-4 py-2.5 bg-[#DA0808] text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
      >
        <img src={fillterIcon} alt="Filter" className="w-5 h-5 mr-2" />
        Advanced Filters
      </button>
    </>
  );
  useDocumentMeta({
    title: "Projects",
    description: "Manage projects and their details across your organization",
  });

  const columns = [
    {
      key: "image",
      header: "IMAGE",
      render: (project: any) => {
        const firstImage =
          Array.isArray(project.media) &&
          project.media.find((m: any) => m.doc_type === "images");
        return firstImage ? (
          <img
            src={firstImage.img_url}
            alt={project.project_name}
            className="w-10 h-10 object-cover rounded-full cursor-pointer"
            onClick={() => openModal(firstImage.img_url, project.project_name)}
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        );
      },
    },
    {
      key: "project",
      header: "PROJECT",
      render: (project: any) => (
        <div
          className="font-medium text-gray-900 hover:text-red-600 cursor-pointer transition-colors whitespace-nowrap"
          onClick={() => handleViewDetails(project._id)}
        >
          {project.project_name}
          <span className="block text-xs text-gray-500 mt-1">
            {project.project_code}
          </span>
        </div>
      ),
    },
    {
      key: "location",
      header: "LOCATION",
      render: (project: any) => (
        <div className="font-medium text-gray-900">
          {project.address}
          <span className="block text-xs text-gray-500 mt-1">
            {project.city}, {project.state}
          </span>
        </div>
      ),
      className: "tracking-wide",
    },
    {
      key: "category",
      header: "CATEGORY",
      render: (project: any) => (
        <div className="text-gray-900 capitalize">
          {project.project_type?.name}
        </div>
      ),
    },
    {
      key: "visitors",
      header: "VISITORS",
      render: () => <div className="text-gray-900 capitalize">0</div>,
    },
    {
      key: "brokers",
      header: "BROKERS",
      render: () => <div className="text-gray-900 capitalize">0</div>,
    },
    {
      key: "date",
      header: "DATE",
      render: (project: any) => (
        <div className="text-gray-900 whitespace-nowrap">
          <span className="block text-xs text-gray-500 mt-1">
            Project Start: {formatDate(project.project_start_date)}
          </span>
          <span className="block text-xs text-gray-500 mt-1">
            Project Completion: {formatDate(project.project_completion_date)}
          </span>
          <span className="block text-xs text-gray-500 mt-1">
            Created At: {formatDate(project.createdAt)}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "STATUS",
      render: (project: any) => (
        <div className="flex items-center justify-center">
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              checked={project.is_active}
              onChange={() =>
                handleToggleStatus(project._id, project.is_active)
              }
              className="sr-only peer"
            />
            <div
              className={`w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors`}
            ></div>
            <div
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${project.is_active ? "translate-x-4" : ""
                }`}
            ></div>
          </label>
        </div>
      ),
    },
  ];

  const projectActions = (project: any) => (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handleViewDetails(project._id)}
        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
        title="View Details"
      >
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={() => navigate(`/projects/edit-project/${project._id}`)}
        className="p-1.5 text-green-600 hover:bg-green-100 rounded transition-colors"
        title="Edit Project"
      >
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDeleteProject(project._id)}
        className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
        title="Delete Project"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <Layout
      title="Projects / Sites"
      subtitle="Manage real estate site data across sales network"
      searchPlaceholder="Search by Name, City, Address"
      searchValue={searchTerm}
      onSearchChange={handleSearchChange}
      actionButtons={actionButtons}
      isHeaderFixed={true}
    >
      <div className="p-4">
        {showAdvancedFilters && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-[#14133B] mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              {/* Type Filter */}
              <div>
                <label className="block text-sm font-bold text-[#14133B] mb-1">
                  Type
                </label>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                >
                  <option value="all">All</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              {/* City Filter */}
              <div>
                <label className="block text-sm font-bold text-[#14133B] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3"
                  placeholder="Enter city"
                />
              </div>
            </div>
            <div className="flex justify-end items-center mt-6 space-x-3">
              <button
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
              <button
                className="px-6 py-2 bg-[#DA0808] text-white rounded-md hover:bg-red-700 font-medium"
                onClick={handleApplyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-20">
          <DataTable
            columns={columns}
            data={projects}
            actions={projectActions}
            rowKey="_id"
            emptyText="No projects found"
            loading={loading}
          />
        </div>

        <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />

        <ImageModal
          isOpen={modal.isOpen}
          src={modal.src}
          alt={modal.alt}
          onClose={closeModal}
        />
      </div>
    </Layout>
  );
};

export default ManageProjects;