import * as URL from './const/url';
const token = localStorage.getItem('token');


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

export default {
    login,
    getTherapists,
}
