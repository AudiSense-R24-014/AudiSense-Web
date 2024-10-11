import React, { useEffect, useState } from "react";
import userIcon from "../assets/images/user.png";
import TherapistService from "../services/Therapist.service";
import Swal from "sweetalert2";
import EditTherapistDetailsModal from "./modals/EditTherapistDetailsModal";

export default function SessionHeader() {
  const [user, setUser] = useState({});
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [openEditTherapistModal, setOpenEditTherapistModal] = useState(false);

  useEffect(() => {
    TherapistService.validateToken()
      .then((data) => {
        setUser(data);
        localStorage.setItem("audi-user", JSON.stringify(data));
        if (!data?._id) {
          Swal.fire({
            icon: "error",
            title: "User Session Expired!",
            text: "Please login again!",
            preConfirm: () => {
              localStorage.removeItem("audi-token");
              localStorage.removeItem("audi-user");
              window.location.href = "/login";
            },
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const toggleSidebar = () => {
    setSidebarExpanded((prevState) => !prevState);
  };

  return (
    <div className="flex justify-end shadow-md shadow-blue-900/20">
      <div className="px-2 lg:px-4 py-2">
        <div className="flex flex-row items-center">
          <div className="mx-3 font-montserrat whitespace-nowrap">
            <h1 className="text-right font-semibold text-base leading-tight">
              {user.firstName} {user.lastName}
            </h1>
            <h2 className="text-right text-sm text-gray-500 leading-tight">
              {user.position || "Therapist"}
            </h2>
          </div>
          <button
            className="w-11 h-11 rounded-full ring-2 ring-purple-300 p-0"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <img
              className="w-full h-full rounded-full"
              src={userIcon}
              alt="User avatar"
            />
          </button>
        </div>
      </div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${
          sidebarExpanded ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "250px", zIndex: 50 }} // adjust the width as per your design
      >
        <div className="p-4">
          <div className="flex justify-end items-center mb-4">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setSidebarExpanded(false)}
            >
              ✕
            </button>
          </div>

          {/* User Profile Information */}
          <div className="bg-white font-nunito px-6">
            <div className="flex flex-col items-center">
              <img
                src={userIcon}
                alt="User avatar"
                className="w-24 h-24 rounded-full mb-4 ring-2 ring-purple-300"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-gray-600 font-bold ">{user.position || "Therapist"}</p>
              <p className="text-sm text-gray-600 font-bold mb-1">
                {user.regNumber || "Therapist"}
              </p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.contactNo || "N/A"}</p>

              {/* Edit Button */}
              <div className="flex justify-center w-full mt-6">
                <button
                  onClick={() => setOpenEditTherapistModal(true)}
                  className="bg-purple-500 text-white py-1 px-4 rounded-md hover:bg-purple-700 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-50">
        <EditTherapistDetailsModal
          visible={openEditTherapistModal}
          onClose={() => setOpenEditTherapistModal(false)}
        />
      </div>
    </div>
  );
}
