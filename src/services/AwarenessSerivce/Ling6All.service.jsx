import * as URL from '../const/url';

const generateLing6All = async (data) => {
    const response = await fetch(URL.LING_6_ALL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}

const getLing6All = async (data) => {
    const response = await fetch(URL.LING_6_ALL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}

const getOneLing6All = async (id) => {
    const response = await fetch(URL.LING_6_ALL_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

const updateLing6All = async (id, data) => {
    const response = await fetch(URL.LING_6_ALL_ID(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}

const deleteLing6All = async (id) => {
    const response = await fetch(URL.LING_6_ALL_ID(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

const getLing6AllNotAssigned = async () => {
    const response = await fetch(URL.LING_6_ALL_NOT_ASSIGNED, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

const getLing6AllByPatientID = async (id) => {
    const response = await fetch(URL.LING_6_ALL_BY_PATIENT_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

const analyzeLing6All = async (id, data) => {
    const response = await fetch(URL.LING6_ALL_ANALYZE(id), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}

export default {
    generateLing6All,
    getLing6All,
    getOneLing6All,
    updateLing6All,
    deleteLing6All,
    getLing6AllNotAssigned,
    getLing6AllByPatientID,
    analyzeLing6All,
};