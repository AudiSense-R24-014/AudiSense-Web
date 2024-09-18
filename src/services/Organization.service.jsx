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

export default {
    createOrganization,
};