import { X } from "lucide-react";
import React, { useState } from "react";
import PropTypes from "prop-types";
import TherapistService from "../../services/Therapist.service";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ChangePasswordModal({ visible, onClose, user }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({}); // Error state for each field

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {}; // Object to hold new error messages

    // Validate current password
    if (!currentPassword) {
      newErrors.currentPassword = "Current Password is required";
    }

    // Validate new password
    if (!newPassword) {
      newErrors.newPassword = "New Password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "New Password must be at least 6 characters long";
    }

    // Validate confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm New Password is required";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "New Password and Confirm New Password must match";
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Handle password change logic
    TherapistService.changePassword(user.email, currentPassword, newPassword)
      .then((data) => {
        if (data.status !== 200) {
          // Handle errors based on the returned status and message
          if (data.status === 404) {
            setErrors({ email: data.message });
            Swal.fire({
              icon: "error",
              title: "User Not Found",
              text: data.message,
            });
          } else if (data.status === 401) {
            setErrors({ currentPassword: data.message });
            Swal.fire({
              icon: "error",
              title: "Incorrect Password",
              text: data.message,
            });
          } else {
            setErrors({ general: "An error occurred. Please try again." });
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An error occurred. Please try again.",
            });
          }
        } else {
          // Password updated successfully, show success alert and close the modal
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Password updated successfully!",
          }).then(() => {
            localStorage.removeItem("audi-token");
            localStorage.removeItem("audi-user");
            localStorage.removeItem("audi-sidebar-status");
            window.location.href = "/";
          });
        }
      })
      .catch((error) => {
        // Handle unexpected errors
        console.error(error);
        setErrors({ general: "An unexpected error occurred." });
        Swal.fire({
          icon: "error",
          title: "Unexpected Error",
          text: "An unexpected error occurred. Please try again later.",
        });
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
          <h1 className="font-bold font-montserrat text-lg">Change Password</h1>
        </div>
        {/* Modal Content */}
        <div className="font-montserrat pt-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Current Password */}
            <div className="flex flex-col">
              <label
                htmlFor="currentPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                id="currentPassword"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className={`input-field ${
                  errors.currentPassword ? "border-red-500" : ""
                }`}
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col">
              <label
                htmlFor="newPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`input-field ${
                  errors.newPassword ? "border-red-500" : ""
                }`}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword}
                </p>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`input-field ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
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

ChangePasswordModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
