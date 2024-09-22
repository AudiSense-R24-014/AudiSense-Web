import * as URL from './const/url';
const token = localStorage.getItem('audi-token');

const createOrgRequest = async (orgRequest) => {
    const response = await fetch(URL.ORG_REQUESTS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orgRequest),
    });
    const data = await response.json();
    return data;
};

const getAllOrgRequests = async () => {
    const response = await fetch(URL.ORG_REQUESTS, {
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
    createOrgRequest,
    getAllOrgRequests,
};