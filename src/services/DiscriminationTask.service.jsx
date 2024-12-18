import * as URL from './const/url';
const token = localStorage.getItem("audi-token");

const auto_generate = async (age, stage, level) => {
    const response = await fetch(URL.DISCRIMINATION_AUTO_GEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ age, stage, level }),
    });
    const data = await response.json();
    return data;
};

const corrective_generate = async (age, stage, word_1, level) => {
    const response = await fetch(URL.DISCRIMINATION_CORRECTIVE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ age, stage, word_1, level }),
    });
    const data = await response.json();
    return data;
};

const manual_generate = async (word) => {
    const response = await fetch(URL.DISCRIMINATION_MANUAL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word }),
    });
    const data = await response.json();
    return data;
};

const persist = async (generatedDiscrimination) => {
    const response = await fetch(URL.DISCRIMINATION_TASK_PERSIST, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(generatedDiscrimination),
    });
    const data = await response.json();
    return data;
};

const createDiscriminationQuestion = async (word1, word2, level) => {
    const response = await fetch(URL.DISCRIMINATION_QUESTION, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word1, word2, level }),
    });
    const data = await response.json();
    return data;
}
const getDiscriminationTasks = async () => {
    console.log("getDiscriminationTasks");
    const response = await fetch(URL.DISCRIMINATION_QUESTION, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

const createActivity = async (activity) => {
    const response = await fetch(URL.DISCRIMINATION_ACTIVITY, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(activity),
    });
    const data = await response.json();
    return data;
};

const getAcitivitiesByOrganization = async (organizationId) => {
    const response = await fetch(URL.DISCRIMINATION_ACTIVITY_BY_ORGANIZATION(organizationId),
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
    const data = await response.json();
    return data;
};

const getActivityById = async (id) => {
    const response = await fetch(URL.DISCRIMINATION_ACTIVITY_BY_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;
};

const updateActivityById = async (id, updatedActivity) => {
    const response = await fetch(URL.DISCRIMINATION_ACTIVITY_BY_ID(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedActivity),
    });
    const data = await response.json();
    return data;
};


export default {
    auto_generate,
    corrective_generate,
    manual_generate,
    persist,
    createDiscriminationQuestion,
    getDiscriminationTasks,
    createActivity,
    getAcitivitiesByOrganization,
    getActivityById,
    updateActivityById
};