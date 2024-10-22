import * as URL from "./const/url";
const token = localStorage.getItem("audi-token");

const generate = async (feedback, length, questionCount, age) => {
    const response = await fetch(URL.COMPREHENSIVE_DOC_GEN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback, length, questionCount, age }),
    });
    const data = await response.json();
    return data;
};

const persist = async (generatedComprehension) => {
    const response = await fetch(URL.COMPREHENSIVE_TASK_PERSIST, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(generatedComprehension),
    });
    const data = await response.json();
    return data;
};

const persistFeedback = async (feedback) => {
    const response = await fetch(URL.COMPREHENSIVE_FEEDBACK, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
    });
    const data = await response.json();
    return data;
};

const getFeedbackById = async (id) => {
    const response = await fetch(URL.COMPREHENSIVE_FEEDBACK_BY_ID(id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

const getFeedback = async () => {
    const response = await fetch(URL.COMPREHENSIVE_FEEDBACK, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

const createActivity = async (activity) => {
    const response = await fetch(URL.COMPREHENSIVE_ACTIVITY, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
    });
    const data = await response.json();
    return data;
};

const getAllActivity = async () => {
    const response = await fetch(URL.COMPREHENSIVE_ACTIVITY, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

const getActivityById = async (id) => {
    const response = await fetch(URL.COMPREHENSIVE_ACTIVITY_BY_ID(id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

const updateActivityById = async (id, activity) => {
    const response = await fetch(URL.COMPREHENSIVE_ACTIVITY_BY_ID(id), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(activity),
    });
    const data = await response.json();
    return data;
};
const getComprehensionTaskById = async (id) => {
    const response = await fetch(URL.COMPREHENSIVE_TASK_BY_ID(id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
};

const getAcitivitiesByOrganization = async (organizationId) => {
    const response = await fetch(
        URL.COMPREHENSIVE_ACTIVITY_BY_ORGANIZATION(organizationId),
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await response.json();
    return data;
};

const deleteActivityById = async (id) => {
    const response = await fetch(URL.COMPREHENSIVE_ACTIVITY_BY_ID(id), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};

export default {
    generate,
    persist,
    persistFeedback,
    getFeedbackById,
    getFeedback,
    createActivity,
    getAllActivity,
    getActivityById,
    updateActivityById,
    getComprehensionTaskById,
    getAcitivitiesByOrganization,
    deleteActivityById
};
