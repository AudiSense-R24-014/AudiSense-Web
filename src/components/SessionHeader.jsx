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

  const closeSidebar = () => {
    setSidebarExpanded(false);
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
          <img
            className="w-11 h-11 rounded-full ring-2 ring-purple-300"
            src={userIcon}
            alt="Bordered avatar"
            onClick={toggleSidebar}
          />
        </div>
      </div>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 ${sidebarExpanded ? "translate-x-0" : "translate-x-full"
          }`}
        style={{ width: "250px",  zIndex: 50  }} // adjust the width as per your design
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Profile Details</h2>
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setSidebarExpanded(false)}
            >
              ✕
            </button>
          </div>

          {/* User Profile Information */}
          <div className="bg-white p-6 rounded-lg shadow-xl border-2 border-blue-950">
            <div className="flex flex-col items-center">
              <img
                src={userIcon}
                alt="User avatar"
                className="w-16 h-16 rounded-full mb-4 ring-2 ring-purple-300"
              />
              <h3 className="text-lg font-bold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600 font-bold">{user.regNumber || "Therapist"}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.position || "Therapist"}</p>

              <div className="mt-4 w-full">
                <h4 className="text-sm font-semibold mb-1">Contact</h4>
                <p className="text-sm text-gray-600">Phone: {user.phone || 'N/A'}</p>
                <p className="text-sm text-gray-600">Address: {user.address || 'N/A'}</p>
              </div>
              {/* Edit Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setOpenEditTherapistModal(true);
                  }}
                  className="mt-6 ml-28 bg-purple-500 text-white py-1 px-4 rounded-md hover:bg-purple-700 transition"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditTherapistDetailsModal visible={openEditTherapistModal} onClose={()=>{setOpenEditTherapistModal(false)}}/>
    </div>
  );
}
