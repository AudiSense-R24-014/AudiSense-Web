import * as URL from '../const/url';

const generateIdentificationLevel1 = async (data) => {
    const response = await fetch(URL.IDENTIFICATION_LEVEL1, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}

const getIdentificationLevel1 = async (id) => {
    const response = await fetch(URL.IDENTIFICATION_LEVEL1_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

const getAllTaskLevel1 = async () => {
    const response = await fetch(URL.IDENTIFICATION_LEVEL1, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

const deleteIdentificationLevel1 = async (id) => {
    const response = await fetch(URL.IDENTIFICATION_LEVEL1_ID(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

export default {
    generateIdentificationLevel1,
    getIdentificationLevel1,
    getAllTaskLevel1,
    deleteIdentificationLevel1
}