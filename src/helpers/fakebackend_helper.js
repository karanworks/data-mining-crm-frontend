import { APIClient } from "./api_helper";

import * as url from "./url_helper";

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Register Method
export const postFakeRegister = (data) =>
  api.create(url.POST_FAKE_REGISTER, data);

// Default Login Method
// export const postFakeLogin = data => api.create(url.POST_FAKE_LOGIN, data);

// Login Method
export const postLogin = (data) => {
  return api.create(url.POST_LOGIN, data);
};

export const getLogin = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/login`);
};
// *****************************************************************
// *************************** USERS *******************************
// *****************************************************************
export const getUsers = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/users`);
};

export const createUser = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/user/register`, data);
};
export const removeUser = (userId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/user/${userId}/delete`
  );
};

export const updateUser = (userId, data, status) => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/user/${userId}/edit`, {
    ...data,
    status,
  });
};

export const changePassword = (data) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/change-password`,
    data
  );
};

// *****************************************************************
// **************************** MAPPING ****************************
// *****************************************************************

export const getMenus = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/mapping`);
};
export const getMenusByRole = (roleId) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/role/${roleId}/mapping`);
};
export const getRoles = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/roles`);
};
export const changePermission = ({ menuId, subMenuId, roleId }) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/mapping`,
    { menuId, subMenuId, roleId }
  );
};

export const createRole = (values) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/role/create`, values);
};

export const updateRole = (roleId, values) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/edit`,
    values
  );
};

export const removeRole = (roleId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/role/${roleId}/delete`
  );
};

// *****************************************************************
// ************************* MONITORING ****************************
// *****************************************************************

export const monitoringGet = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/monitoring`);
};

export const getMonitoringData = (selectedCampaigns) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/monitoring`, {
    campaigns: selectedCampaigns,
  });
};

// *****************************************************************
// ****************** UPDATE SESSION (ACTIVE TIME) *****************
// *****************************************************************
export const updateSession = () => {
  return api.update(`${process.env.REACT_APP_SERVER_URL}/update-session`);
};

// *****************************************************************
// ************************* LOGIN HISTORY ************************
// *****************************************************************

export const loginHistoryGet = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/login-activity`);
};
export const loginHistoryData = ({ campaignIds: campaigns }) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/login-activity`,
    campaigns
  );
};

// *****************************************************************
// ************************ PROJECT DROPDOWN ***********************
// *****************************************************************

export const createDropdown = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/dropdown/create`,
    data
  );
};

// *****************************************************************
// ********************** ADD CLIENT *******************************
// *****************************************************************
export const getClients = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/clients`);
};

export const createClient = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/client/create`, data);
};

export const updateClient = (clientId, values, status) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/client/${clientId}/edit`,
    { ...values, status }
  );
};

export const removeClient = (clientId) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/client/delete`, {
    clientId,
  });
};

export const getClientUsers = (clientEmail) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/client/${clientEmail}/users`
  );
};

// *****************************************************************
// *********************** CENTER USERS ****************************
// *****************************************************************
export const getCenterUsers = ({ centerId }) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/center/${centerId}/center-users`
  );
};

export const createCenterUser = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/center/${data.centerId}/center-user/create`,
    data
  );
};

export const updateCenterUser = (centerId, centerUserId, data) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/center/${centerId}/center-user/${centerUserId}/edit`,
    data
  );
};

export const removeCenterUser = (centerId, centerUserId) => {
  return api.delete(
    `${process.env.REACT_APP_SERVER_URL}/center/${centerId}/center-user/${centerUserId}/delete`
  );
};
// *****************************************************************
// ************************** ADD DATA *****************************
// *****************************************************************

export const addDataUpload = (values) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/add-data`, values, {
    "Content-Type": "multipart/form-data",
  });
};

// *****************************************************************
// ************************ ADD WORK DATA **************************
// *****************************************************************
export const getAssignedWorkData = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/add-work-data`);
};

export const createAssignedWorkData = (data) => {
  return api.create(`${process.env.REACT_APP_SERVER_URL}/add-work-data`, data);
};

// *****************************************************************
// *********************** COMPLETED DATA **************************
// *****************************************************************
export const getCompletedWorkData = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/completed-data`);
};

export const removeCompletedWorkData = (dataId) => {
  return api.update(
    `${process.env.REACT_APP_SERVER_URL}/completed-data/delete`,
    {
      dataId,
    }
  );
};

export const updateCompletedWorkData = (data) => {
  console.log("GETTING DATA WHILE UPDATING ->", data);
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/completed-data/edit`,
    data
  );
};

export const exportCompletedWorkData = () => {
  return api.get(
    `${process.env.REACT_APP_SERVER_URL}/completed-data/export-data`,
    {
      responseType: "blob",
    }
  );
};

export const filterCompletedWorkData = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/completed-data/filter-data`,
    data
  );
};
export const submitCompletedWorkData = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/completed-data/submit-data`,
    data
  );
};

// *****************************************************************
// ***************************** REPORT ****************************
// *****************************************************************
export const getReportData = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/report`);
};

export const getReportDataForms = (tokenId) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/report/${tokenId}/forms`);
};

// *****************************************************************
// ********************* CHECK FORM DATA ***************************
// *****************************************************************

export const checkFormData = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/check-form-data`,
    data
  );
};
export const recheckFormData = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/check-form-data/recheck`,
    data
  );
};

// *****************************************************************
// ************************ COUNT REPORT ***************************
// *****************************************************************

export const getCountReportData = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/count-report`);
};

export const filterReportData = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/count-report/filter-data`,
    data
  );
};

// *****************************************************************
// ************************** INVOICE ******************************
// *****************************************************************

export const getInvoiceData = (token) => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/report/${token}/invoice`);
};

export const createInvoice = (data) => {
  return api.create(
    `${process.env.REACT_APP_SERVER_URL}/report/${data.token}/invoice`,
    data
  );
};
// *****************************************************************
// ************************** INVOICE ******************************
// *****************************************************************

export const getPayments = () => {
  return api.get(`${process.env.REACT_APP_SERVER_URL}/payment`);
};

// postForgetPwd
export const postFakeForgetPwd = (data) =>
  api.create(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
export const postJwtProfile = (data) =>
  api.create(url.POST_EDIT_JWT_PROFILE, data);

export const postFakeProfile = (data) =>
  api.update(url.POST_EDIT_PROFILE + "/" + data.idx, data);
