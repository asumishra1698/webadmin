import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  GET_PROJECT_BY_ID_REQUEST,
  GET_PROJECT_BY_ID_SUCCESS,
  GET_PROJECT_BY_ID_FAILURE,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  TOGGLE_PROJECT_STATUS_REQUEST,
  TOGGLE_PROJECT_STATUS_SUCCESS,
  TOGGLE_PROJECT_STATUS_FAILURE,
  GET_VISITORS_BY_PROJECT_ID_REQUEST,
  GET_VISITORS_BY_PROJECT_ID_SUCCESS,
  GET_VISITORS_BY_PROJECT_ID_FAILURE,
  GET_BROKER_BY_PROJECT_ID_REQUEST,
  GET_BROKER_BY_PROJECT_ID_SUCCESS,
  GET_BROKER_BY_PROJECT_ID_FAILURE,
  EXPORT_PROJECT_DATA_REQUEST,
  EXPORT_PROJECT_DATA_SUCCESS,
  EXPORT_PROJECT_DATA_FAILURE,
  DELETE_PROJECT_MEDIA_REQUEST,
  DELETE_PROJECT_MEDIA_SUCCESS,
  DELETE_PROJECT_MEDIA_FAILURE,
} from "./actionTypes";

// ========================
// TYPE DEFINITIONS
// ========================

export interface ProjectMedia {
  img_url: string;
  doc_type: "image" | "document";
  description: string;
  created_by: string;
  _id: string;
  created_on_date: string;
}

export interface ProjectType {
  metadata: {
    color: string;
    icon: string;
  };
  _id: string;
  category: string;
  key: string;
  name: string;
  description: string;
  order: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Project {
  location: { type: string };
  _id: string;
  developer: string;
  project_name: string;
  address: string;
  city: string;
  state: string;
  radius_meters: number;
  project_type: ProjectType;
  status: boolean;
  is_active: boolean;
  is_deleted: boolean;
  media: ProjectMedia[];
  created_by: string | null;
  created_on_date: string;
  project_code: string;
  contact_person: string;
  contact_number?: string;
  contact_email?: string;
  project_completion_date: string;
  project_start_date: string;
  sales_rm_commission?: string;
  broker_commission?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  mediaCount: number;
  id: string;
  latitude?: string;
  longitude?: string;
  visitors?: any[];
  brokers?: any[];
}

export interface ProjectsResponse {
  success: boolean;
  message: string;
  data: {
    data: Project[];
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  statusCode: number;
}

export interface CreateProjectPayload {
  developer: string;
  project_name: string;
  address: string;
  city: string;
  state: string;
  radius_meters: number;
  project_type: string;
  contact_person: string;
  project_completion_date: string;
  project_start_date: string;
  status?: boolean;
  media?: File[];
}

// ========================
// ACTION CREATORS
// ========================

export const getProjectsRequest = () => ({ type: GET_PROJECTS_REQUEST });

export const getProjectsSuccess = (data: ProjectsResponse["data"]) => ({
  type: GET_PROJECTS_SUCCESS,
  payload: data,
});

export const getProjectsFailure = (error: string) => ({
  type: GET_PROJECTS_FAILURE,
  payload: error,
});

export const getProjectByIdRequest = (projectId: string) => ({
  type: GET_PROJECT_BY_ID_REQUEST,
  payload: projectId,
});

export const getProjectByIdSuccess = (project: Project) => ({
  type: GET_PROJECT_BY_ID_SUCCESS,
  payload: project,
});

export const getProjectByIdFailure = (error: string) => ({
  type: GET_PROJECT_BY_ID_FAILURE,
  payload: error,
});

export const createProjectRequest = () => ({
  type: CREATE_PROJECT_REQUEST,
});

export const createProjectSuccess = (projectData: Project) => ({
  type: CREATE_PROJECT_SUCCESS,
  payload: projectData,
});

export const createProjectFailure = (error: string) => ({
  type: CREATE_PROJECT_FAILURE,
  payload: error,
});

export const updateProjectRequest = (params: {
  id: string;
  data: FormData;
}) => ({
  type: UPDATE_PROJECT_REQUEST,
  payload: params,
});

export const updateProjectSuccess = (project: Project) => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: project,
});

export const updateProjectFailure = (error: string) => ({
  type: UPDATE_PROJECT_FAILURE,
  payload: error,
});

export const deleteProjectRequest = () => ({ type: DELETE_PROJECT_REQUEST });

export const deleteProjectSuccess = (projectId: string) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: projectId,
});

export const deleteProjectFailure = (error: string) => ({
  type: DELETE_PROJECT_FAILURE,
  payload: error,
});

export const toggleProjectStatusRequest = (
  projectId: string,
  is_active: boolean
) => ({
  type: TOGGLE_PROJECT_STATUS_REQUEST,
  payload: { projectId, is_active },
});

export const toggleProjectStatusSuccess = (project: Project) => ({
  type: TOGGLE_PROJECT_STATUS_SUCCESS,
  payload: project,
});

export const toggleProjectStatusFailure = (error: string) => ({
  type: TOGGLE_PROJECT_STATUS_FAILURE,
  payload: error,
});

export const getVisitorsByProjectRequest = (projectId: string) => ({
  type: GET_VISITORS_BY_PROJECT_ID_REQUEST,
  payload: projectId,
});

export const getVisitorsByProjectSuccess = (data: any[]) => ({
  type: GET_VISITORS_BY_PROJECT_ID_SUCCESS,
  payload: { data },
});

export const getVisitorsByProjectFailure = (error: string) => ({
  type: GET_VISITORS_BY_PROJECT_ID_FAILURE,
  payload: error,
});

export const getBrokerByProjectIdRequest = (projectId: string) => ({
  type: GET_BROKER_BY_PROJECT_ID_REQUEST,
  payload: projectId,
});

export const getBrokerByProjectIdSuccess = (data: any) => ({
  type: GET_BROKER_BY_PROJECT_ID_SUCCESS,
  payload: data,
});

export const getBrokerByProjectIdFailure = (error: string) => ({
  type: GET_BROKER_BY_PROJECT_ID_FAILURE,
  payload: error,
});

export const exportProjectDataRequest = () => ({
  type: EXPORT_PROJECT_DATA_REQUEST,
});

export const exportProjectDataSuccess = (data: any) => ({
  type: EXPORT_PROJECT_DATA_SUCCESS,
  payload: data,
});

export const exportProjectDataFailure = (error: string) => ({
  type: EXPORT_PROJECT_DATA_FAILURE,
  payload: error,
});

export const deleteProjectMediaRequest = (projectId: string, mediaId: string) => ({
  type: DELETE_PROJECT_MEDIA_REQUEST,
  payload: { projectId, mediaId },
});

export const deleteProjectMediaSuccess = (mediaId: string) => ({
  type: DELETE_PROJECT_MEDIA_SUCCESS,
  payload: mediaId,
});

export const deleteProjectMediaFailure = (error: string) => ({
  type: DELETE_PROJECT_MEDIA_FAILURE,
  payload: error,
});