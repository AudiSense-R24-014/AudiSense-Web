import * as URL from "./const/url";
const token = localStorage.getItem("audi-token");

const createOrgRequest = async (orgRequest) => {
  const response = await fetch(URL.ORG_REQUESTS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orgRequest),
  });
  const data = await response.json();
  return data;
};

const getAllOrgRequests = async () => {
  const response = await fetch(URL.ORG_REQUESTS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const getOrgRequestsByOrgId = async (orgId) => {
  const response = await fetch(URL.ORG_REQUESTS_BY_ORGID(orgId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const addTherapistToOrg = async (orgReqId, organizationId, therapistId) => {
  const response = await fetch(URL.ORG_REQUESTS_ADD_THERAPIST, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orgReqId, organizationId, therapistId }),
  });
  const data = await response.json();
  return data;
};

const updateOrgRequest = async (id, orgRequest) => {
  const response = await fetch(URL.ORG_REQUESTS_BY_ID(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orgRequest),
  });
  const data = await response.json();
  return data;
};

const deleteOrgRequest = async (id) => {
  const response = await fetch(URL.ORG_REQUESTS_BY_ID(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
};

const approveAdminOrgRequest = async (orgReqId, organizationId, therapistId) => {
  const response = await fetch(URL.ORG_REQUESTS_APPROVE_ADMIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orgReqId, organizationId, therapistId }),
  });
  const data = await response.json();
  return data;
};

export default {
  createOrgRequest,
  getAllOrgRequests,
  getOrgRequestsByOrgId,
  addTherapistToOrg,
  updateOrgRequest,
  deleteOrgRequest,
  approveAdminOrgRequest,
};
