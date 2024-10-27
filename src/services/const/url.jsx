const BASE_URL = import.meta.env.VITE_API_GATEWAY_URL; 

export const THERAPISTS = `${BASE_URL}/therapists/`;
export const THERAPIST_BY_ID = (id) => `${BASE_URL}/therapists/${id}/`;
export const THERAPISTS_VALIDATE = `${BASE_URL}/therapists/validate/`;
export const THERAPISTS_LOGIN = `${BASE_URL}/therapists/login/`;
export const THERAPISTS_VERIFY = `${BASE_URL}/therapists/ensurePassword/`;
export const THERAPISTS_CHANGE_PASSWORD = `${BASE_URL}/therapists/changePassword/`;

export const PATIENTS = `${BASE_URL}/patients/`;
export const PATIENT_BY_ID = (id) => `${BASE_URL}/patients/${id}/`;
export const PATIENTS_FOR_ORGANIZATION = (id) => `${BASE_URL}/patients/organization/${id}/`;

export const CHILDREN = `${BASE_URL}/children/`;
export const CHILD_BY_ID = (id) => `${BASE_URL}/children/${id}/`;

export const CLFS = `${BASE_URL}/clfs/`;
export const CLF_BY_ID = (id) => `${BASE_URL}/clfs/${id}/`;

export const ORGANIZATIONS = `${BASE_URL}/organizations/`;
export const ORGANIZATION_BY_JOIN_CODE = (code) => `${BASE_URL}/organizations/joincode/${code}/`;
export const ORGANIZATION_BY_ID = (id) => `${BASE_URL}/organizations/${id}/`;
export const ORGANIZATION_REMOVE_THERAPIST = `${BASE_URL}/organizations/therapist/remove/`;
export const ORGANIZATION_MAKE_ADMIN = `${BASE_URL}/organizations/admin/`;
export const ORGANIZATION_REMOVE_ADMIN = `${BASE_URL}/organizations/admin/remove/`;
export const ORGANIZATION_IS_ADMIN = `${BASE_URL}/organizations/isTherapistAdmin/`;
export const ORGANIZATION_DASHBOARD = (id) => `${BASE_URL}/organizations/dashboard/${id}/`;

export const ORG_REQUESTS = `${BASE_URL}/orgRequests/`;
export const ORG_REQUESTS_BY_ID = (id) => `${BASE_URL}/orgRequests/${id}/`;
export const ORG_REQUESTS_BY_ORGID = (id) => `${BASE_URL}/orgRequests/organization/${id}/`;
export const ORG_REQUESTS_ADD_THERAPIST = `${BASE_URL}/orgRequests/addTherapist/`;
export const ORG_REQUESTS_APPROVE_ADMIN = `${BASE_URL}/orgRequests/makeAdmin/`;

export const DISCRIMINATION_AUTO_GEN = `${BASE_URL}/discrimination/`;
export const DISCRIMINATION_CORRECTIVE=`${BASE_URL}/discriminationOpt/`;
export const DISCRIMINATION_MANUAL=`${BASE_URL}/discrimination_manual/`;
export const DISCRIMINATION_TASK_PERSIST=`${BASE_URL}/discrimination-task/`;
export const DISCRIMINATION_QUESTION=`${BASE_URL}/discriminationQuestion/`;
export const DISCRIMINATION_ACTIVITY=`${BASE_URL}/activityDiscrimination/`;
export const DISCRIMINATION_ACTIVITY_BY_ORGANIZATION = (id) => `${BASE_URL}/activityDiscrimination/organization/${id}/`;

export const AWARENESS_BASIC = `${BASE_URL}/awareness-sound/`;
export const AWARENESS_BASIC_ID = (id) => `${BASE_URL}/awareness-sound/${id}/`;
export const AWARENESS_BASIC_NOT_ASSIGNED = `${BASE_URL}/awareness-sound/notHavePatientID/`;
export const AWARENESS_BASIC_BY_PATIENT_ID = (id) => `${BASE_URL}/awareness-sound/patientID/${id}/`;
export const AWARENESS_GAZE_ANALYZE = `${BASE_URL}/gaze-analyze/`;
export const AWARNESS_SOUND_ANALYZE = (id) => `${BASE_URL}/awareness-sound-analyze/${id}/`;
export const LING6_ALL_ANALYZE = (id) => `${BASE_URL}/ling6-all-analyze/${id}/`;

export const LING_6_ALL = `${BASE_URL}/ling6-all/`;
export const LING_6_ALL_ID = (id) => `${BASE_URL}/ling6-all/${id}/`;
export const LING_6_ALL_NOT_ASSIGNED = `${BASE_URL}/ling6-all/notHavePatientID/`;
export const LING_6_ALL_BY_PATIENT_ID = (id) => `${BASE_URL}/ling6-all/patientID/${id}/`;

export const LING_6_SEPARATE = `${BASE_URL}/ling6-separate/`;
export const LING_6_SEPARATE_ID = (id) => `${BASE_URL}/ling6-separate/${id}/`;
export const LING_6_SEPARATE_NOT_ASSIGNED = `${BASE_URL}/ling6-separate/notHavePatientID/`;
export const LING_6_SEPARATE_BY_PATIENT_ID = (id) => `${BASE_URL}/ling6-separate/patientID/${id}/`;

export const IDENTIFICATION_LEVEL1 = `${BASE_URL}/identification-level1/`;
export const IDENTIFICATION_LEVEL1_ID = (id) => `${BASE_URL}/identification-level1/${id}/`;
export const IDENTIFICATION_LEVEL2 = `${BASE_URL}/identification-level2/`;
export const IDENTIFICATION_LEVEL2_ID = (id) => `${BASE_URL}/identification-level2/${id}/`;

export const COMPREHENSIVE_DOC_GEN = `${BASE_URL}/comprehension-generate/`;
export const COMPREHENSIVE_TASK_PERSIST = `${BASE_URL}/comprehension-task/`;
export const COMPREHENSIVE_TASK_BY_ID = (id) => `${BASE_URL}/comprehension-task/${id}/`;
export const COMPREHENSIVE_FEEDBACK = `${BASE_URL}/comprehension-feedback/`;
export const COMPREHENSIVE_FEEDBACK_BY_ID = (id) => `${BASE_URL}/comprehension-feedback/${id}/`;
export const COMPREHENSIVE_ACTIVITY = `${BASE_URL}/comprehension-activity/`;
export const COMPREHENSIVE_ACTIVITY_BY_ID = (id) => `${BASE_URL}/comprehension-activity/${id}/`;
export const COMPREHENSIVE_ACTIVITY_BY_ORGANIZATION = (id) => `${BASE_URL}/comprehension-activity/organization/${id}/`;