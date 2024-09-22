import * as URL from './const/url';
const token = localStorage.getItem('audi-token');

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

const getOrganizationById = async (id) => {
    const response = await fetch(URL.ORGANIZATION_BY_ID(id), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
}

const updateOrganization = async (id, organization) => {
    const response = await fetch(URL.ORGANIZATION_BY_ID(id), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(organization),
    });
    const data = await response.json();
    return data;
}

const removeTherapist = async (organizationId, therapistId) => {
    const response = await fetch(URL.ORGANIZATION_REMOVE_THERAPIST, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ organizationId, therapistId }),
    });
    const data = await response.json();
    return data;
}

export default {
    createOrganization,
    getOrganizationById,
    updateOrganization,
    removeTherapist,
    getOrganizationByJoinCode,
};