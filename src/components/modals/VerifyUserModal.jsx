import { X, Eye, EyeOff } from "lucide-react"; // Using lucide-react for icons
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TherapistService from "../../services/Therapist.service";
import Swal from "sweetalert2";

export default function VerifyUserModal({
  visible,
  onClose,
  titleText,
  optionalText,
  onConfirm,
}) {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ password: "" });

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password validation
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    if (value.length < 6) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must be at least 6 characters",
      }));
    } else {
      setError((prevError) => ({ ...prevError, password: "" }));
    }
  };

  // Get user email from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("audi-user");
    if (storedUser) {
      const { email } = JSON.parse(storedUser);
      setUserEmail(email);
    }
  }, []);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError((prevError) => ({
        ...prevError,
        password: "Password must be at least 6 characters",
      }));
      return;
    }

    TherapistService.verifyUser(userEmail, password)
      .then((data) => {
        console.log(data);
        if (data?.user == true && data?.password == true) {
          console.log("User verified successfully");
          onConfirm();
        } else{
          Swal.fire({
            icon: "error",
            title: "Error Occurred",
            text: "Incorrect password",
          });
        }
      }).catch((error) => {
        console.error(error);
      });
  };

  if (!visible) return null; // Return null if modal is not visible

  return (
    <div
      className="fixed inset-0 bg-opacity-20 backdrop-blur-sm bg-black flex justify-center items-center py-2"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl relative w-full max-w-3xl mx-4 sm:mx-8 lg:w-1/3 xl:w-1/4 overflow-auto max-h-full p-4 sm:p-6 lg:p-8">
        <div className="pb-2">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
            aria-label="Close"
          >
            <X />
          </button>
          <h1 className="font-bold font-montserrat text-lg">
            {titleText || "Verify User"}
          </h1>
          <h1 className="font-montserrat text-sm text-red-500">
            {optionalText || "Verify to proceed"}
          </h1>
        </div>
        {/* Modal Content */}
        <div className="font-montserrat pt-4">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-4">
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={userEmail}
                  className="input-field"
                  required
                  disabled
                />
              </div>
              <div className="flex-1 relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="flex-1 relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="input-field"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
                {error.password && (
                  <p className="text-red-500 text-xs mt-1">{error.password}</p>
                )}
              </div>
            </div>
            <div className="flex justify-center py-10">
              <button
                type="submit"
                className="text-white bg-audi-purple hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-12 py-2.5"
              >
                Verify & Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

VerifyUserModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  titleText: PropTypes.string,
  optionalText: PropTypes.string,
};
