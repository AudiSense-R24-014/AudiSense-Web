import * as URL from './const/url';
const token = localStorage.getItem('audi-token');


const login = async (email, password) => {
    const response = await fetch(URL.THERAPISTS_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
};

const createTherapist = async (therapist) => {
    const response = await fetch(URL.THERAPISTS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(therapist),
    });
    const data = await response.json();
    return data;
};

const getTherapists = async () => {
    const response = await fetch(URL.THERAPISTS, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}

const validateToken = async () => {
    const response = await fetch(URL.THERAPISTS_VALIDATE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}

const updateTherapist = async (id, therapist) => {
    const response = await fetch(URL.THERAPIST_BY_ID(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(therapist),
    });
    const data = await response.json();
    return data;
}


export default {
    login,
    getTherapists,
    createTherapist,
    validateToken,
    updateTherapist
}
