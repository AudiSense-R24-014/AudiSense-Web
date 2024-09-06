import * as URL from '../const/url';

const generateAwarenessSounds = async (data) => {
    const response = await fetch(URL.AWARENESS_BASIC, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}

const getAwarenessSounds = async () => {
    const response = await fetch(URL.AWARENESS_BASIC, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

const getOneAwarenessSound = async (id) => {
    const response = await fetch(URL.AWARENESS_BASIC_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

const updateAwarenessSound = async (id, data) => {
    const response = await fetch(URL.AWARENESS_BASIC_ID(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;

}

const deleteAwarenessSound = async (id) => {
    const response = await fetch(URL.AWARENESS_BASIC_ID(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response;
}

const getNotAssignedAwarenessSounds = async () => {
    const response = await fetch(URL.AWARENESS_BASIC_NOT_ASSIGNED, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

const getAwarenessSoundsByPatientID = async (id) => {
    const response = await fetch(URL.AWARENESS_BASIC_BY_PATIENT_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

export default {
    generateAwarenessSounds,
    getAwarenessSounds,
    getOneAwarenessSound,
    updateAwarenessSound,
    deleteAwarenessSound,
    getNotAssignedAwarenessSounds,
    getAwarenessSoundsByPatientID,
};
