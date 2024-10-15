import * as URL from "./const/url";
const token = localStorage.getItem("audi-token");

const getChildren = async () => {
    const response = await fetch(URL.CHILDREN, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
};

const getChildById = async (id) => {
    const response = await fetch(URL.CHILD_BY_ID(id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
};

const createChild = async (child) => {
    const response = await fetch(URL.CHILDREN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(child),
    });
    const data = await response.json();
    return data;
};

const updateChild = async (id, child) => {
    const response = await fetch(URL.CHILD_BY_ID(id), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(child),
    });
    const data = await response.json();
    return data;
};

export default { getChildren, getChildById, createChild, updateChild };
