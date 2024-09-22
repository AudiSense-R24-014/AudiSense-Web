import * as URL from './const/url';
const token = localStorage.getItem('token');

const createOrganization = async (organization) => {
    const response = await fetch(URL.ORGANIZATIONS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(organization),
    });
    const data = await response.json();
    return data;
};

const getOrganizationByJoinCode = async (code) => {
    const response = await fetch(URL.ORGANIZATION_BY_JOIN_CODE(code), {
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
    createOrganization,
    getOrganizationByJoinCode,
};