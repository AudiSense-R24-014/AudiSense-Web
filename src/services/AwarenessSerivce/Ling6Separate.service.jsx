import * as URL from '../const/url';

const generateLing6Separate = async (data) => {
    const response = await fetch(URL.LING_6_SEPARATE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}

const getLing6Separates = async (data) => {
    const response = await fetch(URL.LING_6_SEPARATE, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}

const getOneLing6Separate = async (id) => {
    const response = await fetch(URL.LING_6_SEPARATE_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

const updateLing6Separate = async (id, data) => {
    const response = await fetch(URL.LING_6_SEPARATE_ID(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}

const deleteLing6Separate = async (id) => {
    const response = await fetch(URL.LING_6_SEPARATE_ID(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

const getLing6SeparateNotAssigned = async () => {
    const response = await fetch(URL.LING_6_ALL_NOT_ASSIGNED, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

const getLing6SeparateByPatientID = async (id) => {
    const response = await fetch(URL.LING_6_SEPARATE_BY_PATIENT_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

export default {
    generateLing6Separate,
    getLing6Separates,
    getOneLing6Separate,
    updateLing6Separate,
    deleteLing6Separate,
    getLing6SeparateNotAssigned,
    getLing6SeparateByPatientID,
}
