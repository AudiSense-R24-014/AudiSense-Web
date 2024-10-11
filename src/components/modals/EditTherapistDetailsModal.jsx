import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TherapistService from "../../services/Therapist.service";
import Swal from "sweetalert2";

export default function EditTherapistDetailsModal({ visible, onClose }) {
  // States for form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [contactNo, setContactNo] = useState("");

  // Individual error states
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [regNoError, setRegNoError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNoError, setContactNoError] = useState(""); // New state for contact number error

  const [therapistDetails, setTherapistDetails] = useState({});

  // Load therapist details from localStorage
  useEffect(() => {
    const storedDetails = JSON.parse(localStorage.getItem("audi-user"));
    setTherapistDetails(storedDetails);

    // Populate form fields with existing data
    if (storedDetails) {
      setFirstName(storedDetails.firstName);
      setLastName(storedDetails.lastName);
      setRegNo(storedDetails.regNumber);
      setEmail(storedDetails.email);
      setContactNo(storedDetails.contactNo || "");
    }
  }, []);

  if (!visible) {
    return null;
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error states
    setFirstNameError("");
    setLastNameError("");
    setRegNoError("");
    setEmailError("");
    setContactNoError("");

    let valid = true;

    // First name validation
    if (!firstName) {
      setFirstNameError("First name is required.");
      valid = false;
    }

    // Last name validation
    if (!lastName) {
      setLastNameError("Last name is required.");
      valid = false;
    }

    // Registration number validation
    if (!regNo) {
      setRegNoError("Registration number is required.");
      valid = false;
    }

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Please enter a valid email.");
      valid = false;
    }

    // Contact number validation (optional)
    if (contactNo && !/^\d{10}$/.test(contactNo)) {
      // Adjust the regex to your phone number format
      setContactNoError("Please enter a valid 10-digit contact number.");
      valid = false;
    }

    // If any field is invalid, stop submission
    if (!valid) {
      return;
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You are about to update your profile details!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update",
        cancelButtonText: "No, cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Updating Therapist Details",
            text: "Please wait...",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });
          TherapistService.updateTherapist(therapistDetails._id, {
            firstName,
            lastName,
            regNumber: regNo,
            email,
            contactNo,
          })
            .then((response) => {
              if (response._id != null) {
                // Update the therapist details in localStorage
                localStorage.setItem(
                  "audi-user",
                  JSON.stringify({
                    ...therapistDetails,
                    firstName,
                    lastName,
                    regNumber: regNo,
                    email,
                    contactNo,
                  })
                );
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Therapist details updated successfully.",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Failed to update therapist details.",
                });
              }
            })
            .catch((error) => {
              console.error(error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update therapist details.",
              });
            });
        }
      });
    }

    // Handle the submission logic here (e.g., API call to save changes)
    console.log("Form submitted:", {
      firstName,
      lastName,
      regNo,
      email,
      contactNo,
    });
  };

  return (
    <div
      className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center py-2"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl relative w-full max-w-3xl mx-4 sm:mx-8 lg:w-2/3 xl:w-1/2 overflow-auto max-h-full p-4 sm:p-6 lg:p-8">
        <div className="pb-2">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
            aria-label="Close"
          >
            <X />
          </button>
          <h1 className="font-bold font-montserrat text-lg">
            Edit Profile Details
          </h1>
        </div>
        {/* Modal Content */}
        <div className="font-montserrat pt-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-field"
                />
                {firstNameError && (
                  <p className="text-red-500 text-sm mt-1">{firstNameError}</p>
                )}
              </div>
            </div>

            {/* Last Name */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-field"
                />
                {lastNameError && (
                  <p className="text-red-500 text-sm mt-1">{lastNameError}</p>
                )}
              </div>
            </div>

            {/* Registration Number */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="regNo"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  name="regNo"
                  id="regNo"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  className="input-field"
                />
                {regNoError && (
                  <p className="text-red-500 text-sm mt-1">{regNoError}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>
            </div>

            {/* Contact Number (optional) */}
            <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
              <div className="flex-1">
                <label
                  htmlFor="contactNo"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Contact Number (Optional)
                </label>
                <input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  className="input-field"
                />
                {contactNoError && (
                  <p className="text-red-500 text-sm mt-1">{contactNoError}</p>
                )}
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-center py-10">
              <button
                type="submit"
                className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

EditTherapistDetailsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
