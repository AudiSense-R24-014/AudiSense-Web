import * as URL from "./const/url";
const token = localStorage.getItem("audi-token");

const getCLFs = async () => {
    const response = await fetch(URL.CLFS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
};

const getCLFById = async (id) => {
    const response = await fetch(URL.CLF_BY_ID(id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
};

const createCLF = async (clf) => {
    const response = await fetch(URL.CLFS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clf),
    });
    const data = await response.json();
    console.log(data);
    return data;
};

const deleteCLF = async (id) => {
    const response = await fetch(URL.CLF_BY_ID(id), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
};

const updateCLF = async (clf) => {
    const response = await fetch(URL.CLF_BY_ID(clf._id), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clf),
    });
    const data = await response.json();
    return data;
};

export default { getCLFs, getCLFById, createCLF, deleteCLF, updateCLF };
