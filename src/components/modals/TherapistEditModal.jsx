import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import TherapistService from "../../services/Therapist.service";
import Swal from "sweetalert2";
import OrganizationService from "../../services/Organization.service";

export default function TherapistEditModal({ visible, onClose, therapist }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (therapist) {
      setFormData({
        firstName: therapist?.firstName || "",
        lastName: therapist?.lastName || "",
        email: therapist?.email || "",
        contact: therapist?.contact || "",
        position: therapist?.position || "",
      });
    }
  }, [therapist]);

  if (!visible) {
    return null;
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMakeAdmin = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to make ${therapist.firstName} ${therapist.lastName} an admin`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        OrganizationService.makeTherapistAdmin(
          therapist?.organization,
          therapist?._id
        )
          .then((data) => {
            if (data?.message === "Therapist made admin successfully") {
              Swal.fire({
                title: "Success",
                text: "Therapist made admin successfully",
                icon: "success",
                preConfirm: () => {
                  window.location.reload();
                },
              });
            } else {
              Swal.fire({
                title: "Error",
                text: "Error making therapist an admin",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  const submit = (e) => {
    e.preventDefault();
    TherapistService.updateTherapist(therapist._id, formData)
      .then((data) => {
        if (data._id) {
          Swal.fire({
            title: "Success",
            text: "Therapist updated successfully",
            icon: "success",
            preConfirm: () => {
              window.location.reload();
            },
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Error updating therapist",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center py-2"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl relative w-full max-w-3xl mx-4 sm:mx-8 lg:w-2/3 xl:w-1/2 overflow-auto max-h-full p-4 sm:p-6 lg:p-8">
        <div className="border-b-2 p-2 lg:p-4 lg:px-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
            aria-label="Close"
          >
            <X />
          </button>
          <h1 className="font-bold font-montserrat text-lg">
            View & Edit Therapist's Position
          </h1>
        </div>

        <div className="font-montserrat p-2 lg:p-4 lg:px-8">
          <form className="space-y-6 px-4" onSubmit={submit}>
            {/* First Name and Last Name */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="first"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  First Name
                  <span className="text-red-600 text-xs">
                    {" "}
                    (Only for viewing)
                  </span>
                </label>
                <input
                  type="text"
                  name="fName"
                  id="fName"
                  className="input-field"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Name
                  <span className="text-red-600 text-xs">
                    {" "}
                    (Only for viewing)
                  </span>
                </label>
                <input
                  type="text"
                  name="lName"
                  id="lName"
                  className="input-field"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>
            {/* contactNo and email */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="position"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Position{" "}
                  <p className="text-emerald-700 text-xs">
                    (You are allowed to change the designation of the therapist)
                  </p>
                </label>
                <input
                  type="text"
                  name="position"
                  id="position"
                  className="input-field"
                  placeholder="Position"
                  value={formData?.position}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            {/* password and repeat password */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                  <span className="text-red-600 text-xs">
                    {" "}
                    (Only for viewing)
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="input-field"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="contactNo"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Contact Number
                  <span className="text-red-600 text-xs">
                    {" "}
                    (Only for viewing)
                  </span>
                </label>
                <input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  className="input-field"
                  value={formData.contact || "N/A"}
                  placeholder="Contact Number"
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>
            <div className="flex justify-between pt-5 pb-3">
              <button
                type="button"
                className="text-white bg-green-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
                onClick={handleMakeAdmin}
              >
                Make an Admin
              </button>

              <button
                type="submit"
                className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5 ml-auto"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

TherapistEditModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  therapist: PropTypes.object.isRequired,
};
