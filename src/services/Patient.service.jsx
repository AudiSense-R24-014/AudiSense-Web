import * as URL from './const/url';
const token = localStorage.getItem('token');

const getPatients = async () => {
    const response = await fetch(URL.PATIENTS, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}

const getPatient = async (id) => {
    const response = await fetch(URL.PATIENTS + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}

const createPatient = async (patient) => {
    const response = await fetch(URL.PATIENTS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(patient),
    });
    const data = await response.json();
    return data;
}

const updatePatient = async (id, patient) => {
    const response = await fetch(URL.PATIENTS + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(patient),
    });
    const data = await response.json();
    return data;
}

const deletePatient = async (id) => {
    const response = await fetch(URL.PATIENTS + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}

export default {
    getPatients,
    getPatient,
    createPatient,
    updatePatient,
    deletePatient,
}
