import * as url from "./endpoints/url";

let token: any = null;

// Check if localStorage is available
if (typeof localStorage !== "undefined") {
  token = localStorage.getItem("token");
  // You can use the token here
} else {
  console.error("localStorage is not available in this environment.");
}

const getAllTherapists = async () => {
  return fetch(url.THERAPIST_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getTherapistById = async (id: any) => {
  return fetch(url.THERAPIST_URL_ID(id), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const updateTherapist = async (id: any, therapist: any) => {
  return fetch(url.THERAPIST_URL_ID(id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(therapist),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteTherapist = async (id: any) => {
  return fetch(url.THERAPIST_URL_ID(id), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const createTherapist = async (therapist: any) => {
  return fetch(url.THERAPIST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(therapist),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const loginTherapist = async (email: any, password: any) => {
  return fetch(url.THERAPIST_LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export {
  getAllTherapists,
  getTherapistById,
  updateTherapist,
  deleteTherapist,
  createTherapist,
  loginTherapist,
};
