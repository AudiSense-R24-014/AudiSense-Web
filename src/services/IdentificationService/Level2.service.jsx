import * as URL from '../const/url';

const generateIdentificationLevel2 = async (data) => {
    const response = await fetch(URL.IDENTIFICATION_LEVEL2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
}

const getIdentificationLevel2 = async (id) => {
    const response = await fetch(URL.IDENTIFICATION_LEVEL2_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}

const getAllTaskLevel2 = async () => {
    const response = await fetch(URL.IDENTIFICATION_LEVEL2, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const responseData = await response.json();
    return responseData;
}


export default {
    generateIdentificationLevel2,
    getIdentificationLevel2,
    getAllTaskLevel2
}