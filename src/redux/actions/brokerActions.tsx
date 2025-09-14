import {
  // ========================
  // BROKER ACTION
  // ========================

  GET_BROKERS_REQUEST,
  GET_BROKERS_SUCCESS,
  GET_BROKERS_FAILURE,
  CREATE_BROKER_REQUEST,
  CREATE_BROKER_SUCCESS,
  CREATE_BROKER_FAILURE,
  GET_BROKER_BY_ID_REQUEST,
  GET_BROKER_BY_ID_SUCCESS,
  GET_BROKER_BY_ID_FAILURE,
  UPDATE_BROKER_REQUEST,
  UPDATE_BROKER_SUCCESS,
  UPDATE_BROKER_FAILURE,
  APPROVE_BROKER_REQUEST,
  APPROVE_BROKER_SUCCESS,
  APPROVE_BROKER_FAILURE,
  REJECT_BROKER_REQUEST,
  REJECT_BROKER_SUCCESS,
  REJECT_BROKER_FAILURE,
  EXPORT_BROKER_DATA_REQUEST,
  EXPORT_BROKER_DATA_SUCCESS,
  EXPORT_BROKER_DATA_FAILURE,
  DELETE_BROKER_REQUEST,
  DELETE_BROKER_SUCCESS,
  DELETE_BROKER_FAILURE,
  REFERED_VISITORS_BY_BROKER_REQUEST,
  REFERED_VISITORS_BY_BROKER_SUCCESS,
  REFERED_VISITORS_BY_BROKER_FAILURE,

  // ========================
  // BROKER TEAM ACTION
  // ========================
  GET_BROKER_TEAM_REQUEST,
  GET_BROKER_TEAM_SUCCESS,
  GET_BROKER_TEAM_FAILURE,
  UPDATE_BROKER_TEAM_MEMBER_STATUS_REQUEST,
  UPDATE_BROKER_TEAM_MEMBER_STATUS_SUCCESS,
  UPDATE_BROKER_TEAM_MEMBER_STATUS_FAILURE,

  // ========================
  // BROKER KPI Actions
  // ========================
  GET_BROKER_KPI_REQUEST,
  GET_BROKER_KPI_SUCCESS,
  GET_BROKER_KPI_FAILURE,
} from "./actionTypes";

export interface GetBrokersParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  project?: string;
  filterStatus?: string;
  fromDate?: string;
  toDate?: string;
}

export const getBrokersRequest = (params: GetBrokersParams) => ({
  type: GET_BROKERS_REQUEST,
  payload: params,
});

export const getBrokersSuccess = (data: any) => ({
  type: GET_BROKERS_SUCCESS,
  payload: data,
});

export const getBrokersFailure = (error: string) => ({
  type: GET_BROKERS_FAILURE,
  payload: error,
});

export const createBrokerRequest = (brokerData: any) => ({
  type: CREATE_BROKER_REQUEST,
  payload: brokerData,
});

export const createBrokerSuccess = (data: any) => ({
  type: CREATE_BROKER_SUCCESS,
  payload: data,
});

export const createBrokerFailure = (error: string) => ({
  type: CREATE_BROKER_FAILURE,
  payload: error,
});

export const getBrokerByIdRequest = (id: string) => ({
  type: GET_BROKER_BY_ID_REQUEST,
  payload: id,
});

export const getBrokerByIdSuccess = (data: any) => ({
  type: GET_BROKER_BY_ID_SUCCESS,
  payload: data,
});

export const getBrokerByIdFailure = (error: string) => ({
  type: GET_BROKER_BY_ID_FAILURE,
  payload: error,
});

export const updateBrokerRequest = (id: string, brokerData: any) => ({
  type: UPDATE_BROKER_REQUEST,
  payload: { id, brokerData },
});

export const updateBrokerSuccess = (data: any) => ({
  type: UPDATE_BROKER_SUCCESS,
  payload: data,
});

export const updateBrokerFailure = (error: string) => ({
  type: UPDATE_BROKER_FAILURE,
  payload: error,
});

export const approveBrokerRequest = (id: string) => ({
  type: APPROVE_BROKER_REQUEST,
  payload: id,
});

export const approveBrokerSuccess = (data: any) => ({
  type: APPROVE_BROKER_SUCCESS,
  payload: data,
});

export const approveBrokerFailure = (error: string) => ({
  type: APPROVE_BROKER_FAILURE,
  payload: error,
});

export const rejectBrokerRequest = (id: string) => ({
  type: REJECT_BROKER_REQUEST,
  payload: id,
});

export const rejectBrokerSuccess = (data: any) => ({
  type: REJECT_BROKER_SUCCESS,
  payload: data,
});

export const rejectBrokerFailure = (error: string) => ({
  type: REJECT_BROKER_FAILURE,
  payload: error,
});

export const exportBrokerDataRequest = (params: GetBrokersParams) => ({
  type: EXPORT_BROKER_DATA_REQUEST,
  payload: params,
});

export const exportBrokerDataSuccess = (data: any) => ({
  type: EXPORT_BROKER_DATA_SUCCESS,
  payload: data,
});

export const exportBrokerDataFailure = (error: string) => ({
  type: EXPORT_BROKER_DATA_FAILURE,
  payload: error,
});

export const deleteBrokerRequest = (id: string) => ({
  type: DELETE_BROKER_REQUEST,
  payload: id,
});

export const deleteBrokerSuccess = (id: string) => ({
  type: DELETE_BROKER_SUCCESS,
  payload: id,
});

export const deleteBrokerFailure = (error: string) => ({
  type: DELETE_BROKER_FAILURE,
  payload: error,
});

export const referedVisitorsByBrokerRequest = (payload: {
  brokerId: string;
  search?: string;
}) => ({
  type: REFERED_VISITORS_BY_BROKER_REQUEST,
  payload: payload,
});

export const referedVisitorsByBrokerSuccess = (data: any) => ({
  type: REFERED_VISITORS_BY_BROKER_SUCCESS,
  payload: data,
});

export const referedVisitorsByBrokerFailure = (error: string) => ({
  type: REFERED_VISITORS_BY_BROKER_FAILURE,
  payload: error,
});

// ========================
// BROKER TEAM ACTION
// ========================

export const getBrokerTeamRequest = (brokerId: string) => ({
  type: GET_BROKER_TEAM_REQUEST,
  payload: brokerId,
});

export const getBrokerTeamSuccess = (data: any) => ({
  type: GET_BROKER_TEAM_SUCCESS,
  payload: data,
});

export const getBrokerTeamFailure = (error: string) => ({
  type: GET_BROKER_TEAM_FAILURE,
  payload: error,
});

export const updateBrokerTeamMemberStatusRequest = (
  brokerId: string,
  payload: { memberId: string; status: string }
) => ({
  type: UPDATE_BROKER_TEAM_MEMBER_STATUS_REQUEST,
  payload: { brokerId, ...payload },
});

export const updateBrokerTeamMemberStatusSuccess = (data: any) => ({
  type: UPDATE_BROKER_TEAM_MEMBER_STATUS_SUCCESS,
  payload: data,
});

export const updateBrokerTeamMemberStatusFailure = (error: string) => ({
  type: UPDATE_BROKER_TEAM_MEMBER_STATUS_FAILURE,
  payload: error,
});

// ========================
// BROKER KPI ACTION
// ========================

export const getBrokerKpiRequest = (id: string) => ({
  type: GET_BROKER_KPI_REQUEST,
  payload: id,
});

export const getBrokerKpiSuccess = (data: string) => ({
  type: GET_BROKER_KPI_SUCCESS,
  payload: data,
});

export const getBrokerFaliure = (data: string) => ({
  type: GET_BROKER_KPI_FAILURE,
  payload: data,
});