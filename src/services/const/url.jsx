const BASE_URL = 'http://localhost:3000';

export const THERAPISTS = `${BASE_URL}/therapists/`;
export const THERAPISTS_LOGIN = `${BASE_URL}/therapists/login/`;
export const COMPREHENSIVE_DOC_GEN = `${BASE_URL}/comprehension-generate/`;
export const COMPREHENSIVE_TASK_PERSIST = `${BASE_URL}/comprehension-task/`;
export const COMPREHENSIVE_FEEDBACK = `${BASE_URL}/comprehension-feedback/`;
export const PATIENTS = `${BASE_URL}/patients/`;


export const AWARENESS_BASIC = `${BASE_URL}/awareness-sound/`;
export const AWARENESS_BASIC_ID = (id) => `${BASE_URL}/awareness-sound/${id}/`;
export const AWARENESS_BASIC_NOT_ASSIGNED = `${BASE_URL}/awareness-sound/notHavePatientID/`;
export const AWARENESS_BASIC_BY_PATIENT_ID = (id) => `${BASE_URL}/awareness-sound/patientID/${id}/`;

export const LING_6_ALL = `${BASE_URL}/ling6-all/`;
export const LING_6_ALL_ID = (id) => `${BASE_URL}/ling6-all/${id}/`;
export const LING_6_ALL_NOT_ASSIGNED = `${BASE_URL}/ling6-all/notHavePatientID/`;
export const LING_6_ALL_BY_PATIENT_ID = (id) => `${BASE_URL}/ling6-all/patientID/${id}/`;

export const LING_6_SEPARATE = `${BASE_URL}/ling6-separate/`;
export const LING_6_SEPARATE_ID = (id) => `${BASE_URL}/ling6-separate/${id}/`;
export const LING_6_SEPARATE_NOT_ASSIGNED = `${BASE_URL}/ling6-separate/notHavePatientID/`;
export const LING_6_SEPARATE_BY_PATIENT_ID = (id) => `${BASE_URL}/ling6-separate/patientID/${id}/`;


